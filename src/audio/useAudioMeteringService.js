/**
 * useAudioMeteringService.js  (v2)
 * -----------------------------------------------------------------------
 * Ergänzt gegenüber v1:
 *  - Android: audioSource 'unprocessed' (Fallback 'voice_recognition') zur
 *    Deaktivierung von AGC/Rauschunterdrückung -> lineare, kalibrierbare
 *    Pegel. Wichtigste Stellschraube für die ±5dB-Genauigkeit.
 *  - Persistenz: Messwerte (Zeitstempel, Datum, dB) und Kalibrierung werden
 *    in einfachen JSON-Dateien gespeichert (siehe storage.js), übersteht
 *    App-Neustarts.
 *  - Throttled Storage: Live-Anzeige bleibt schnell (200ms), aber in die
 *    DB wird nur alle `storageIntervalMs` geschrieben (Standard 1s), um
 *    die Datenbank nicht unnötig aufzublähen.
 * -----------------------------------------------------------------------
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useAudioRecorder,
  useAudioRecorderState,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  createAudioPlayer,
} from 'expo-audio';
import {
  initStorage,
  appendReading,
  saveCalibration,
  getLatestCalibration,
} from './storage';

// -------------------------------------------------------------------------
// Event-Emitter als Rohdaten-Service (siehe v1)
// -------------------------------------------------------------------------
class SimpleEmitter {
  constructor() {
    this.listeners = new Set();
  }
  on(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
  emit(payload) {
    this.listeners.forEach((cb) => {
      try {
        cb(payload);
      } catch (e) {
        console.warn('[audioMeteringEmitter] Listener-Fehler:', e);
      }
    });
  }
}

export const audioMeteringEmitter = new SimpleEmitter();

// -------------------------------------------------------------------------
// Konfiguration
// -------------------------------------------------------------------------

// Ein einziger Ton wird für beide Kalibrierungsarten genutzt:
// - intern: dieses Gerät spielt ihn selbst über den Lautsprecher ab
// - extern: ein zweites Gerät mit derselben App spielt ihn ab
//   (siehe ExternalTonePlayerScreen.js) - daher wird hier keine separate
//   Tondatei mehr benötigt.
const TONE_ASSET_INTERNAL = require('../../assets/calibration-tone.wav');

const SILENCE_PHASE_DURATION_MS = 30_000;
const SILENCE_SAMPLE_INTERVAL_MS = 1_000;
const TONE_PHASE_DURATION_MS = 10_000;
const TONE_SAMPLE_INTERVAL_MS = 1_000;
// Kurze Pause nach Bestätigung "Lautstärke steht/Ton läuft", bevor gemessen
// wird - federt Einschwing-/Reaktionszeit des Nutzers ab.
const TONE_SETTLE_MS = 500;
const CONTINUOUS_POLL_INTERVAL_MS = 200; // Live-Anzeige
const DEFAULT_STORAGE_INTERVAL_MS = 1_000; // DB-Schreibrate

// Plausibilitätsprüfung: Mindestabstand zwischen Ton-Pegel und
// Störgeräuschpegel. Ist der Unterschied kleiner, war die Lautstärke
// vermutlich nicht hoch genug (oder der Ton kam nicht beim Mikro an) -
// die Kalibrierung wird trotzdem übernommen, aber mit Warnflag markiert.
const MIN_TONE_DELTA_DB = 15;

// Android: 'unprocessed' deaktiviert AGC/NS am zuverlässigsten. Manche
// Geräte unterstützen es nicht und fallen dann automatisch auf 'default'
// zurück - 'voice_recognition' ist die dokumentierte Fallback-Empfehlung
// von Google und ebenfalls AGC-frei.
const RECORDING_OPTIONS = {
  ...RecordingPresets.HIGH_QUALITY,
  isMeteringEnabled: true,
  android: {
    ...RecordingPresets.HIGH_QUALITY.android,
    audioSource: 'unprocessed',
  },
};

const RECORDING_OPTIONS_FALLBACK_ANDROID = {
  ...RECORDING_OPTIONS,
  android: {
    ...RECORDING_OPTIONS.android,
    audioSource: 'voice_recognition',
  },
};

// -------------------------------------------------------------------------
// Hilfsfunktionen
// -------------------------------------------------------------------------

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const median = (arr) => {
  if (!arr.length) return NaN;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

const isValidRawMetering = (value) =>
  typeof value === 'number' &&
  Number.isFinite(value) &&
  value > -159;

// -------------------------------------------------------------------------
// Haupt-Hook
// -------------------------------------------------------------------------

/**
 * @param {object} options
 * @param {number} [options.referenceSpl=70]
 * @param {boolean} [options.persistSamples=true]
 * @param {number} [options.storageIntervalMs=1000]
 */
export function useAudioMeteringService(options = {}) {
  const {
    referenceSpl = 70,
    persistSamples = true,
    storageIntervalMs = DEFAULT_STORAGE_INTERVAL_MS,
  } = options;

  const recorder = useAudioRecorder(RECORDING_OPTIONS);
  const recorderState = useAudioRecorderState(
    recorder,
    CONTINUOUS_POLL_INTERVAL_MS
  );

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionResolved, setPermissionResolved] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(null);
  const [calibration, setCalibration] = useState(null);
  const [storageReady, setStorageReady] = useState(false);

  const rawBufferRef = useRef([]);
  const lastEmittedMeteringRef = useRef(null);
  const lastStorageWriteRef = useRef(0);
  const toneReadyResolverRef = useRef(null);

  /**
   * Wird vom UI aufgerufen, sobald der Nutzer bestätigt hat, dass die
   * Lautstärke auf Maximum steht (intern) bzw. der Ton auf dem externen
   * Gerät läuft (extern). Lässt runCalibration() mit der Messung
   * weitermachen.
   */
  const confirmToneReady = useCallback(() => {
    if (toneReadyResolverRef.current) {
      toneReadyResolverRef.current();
      toneReadyResolverRef.current = null;
    }
  }, []);

  // ---- Storage init + letzte Kalibrierung laden --------------------------------
  useEffect(() => {
    (async () => {
      await initStorage();
      const saved = await getLatestCalibration();
      if (saved) setCalibration(saved);
      setStorageReady(true);
    })();
  }, []);

  // ---- Berechtigung --------------------------------------------------------
  const requestPermission = useCallback(async () => {
    try {
      const status = 
        await AudioModule.requestRecordingPermissionsAsync();

      setPermissionGranted(status.granted);

      if (status.granted) {
        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });
      }

      return status.granted;
    } finally {
      setPermissionResolved(true);
    }
  }, []);

  // ---- Start/Stop mit Fallback für nicht unterstützte Audioquelle ---------
  const prepareRecorderRobust = useCallback(async () => {
    try {
      await recorder.prepareToRecordAsync(RECORDING_OPTIONS);
    } catch (e) {
      console.warn(
        "'unprocessed' audioSource nicht unterstützt, Fallback auf 'voice_recognition'",
        e
      );
      await recorder.prepareToRecordAsync(RECORDING_OPTIONS_FALLBACK_ANDROID);
    }
  }, [recorder]);

  const startRecording = useCallback(async () => {
    if (!permissionGranted) {
      const granted = await requestPermission();
      if (!granted) throw new Error('Mikrofonberechtigung verweigert');
    }
    await prepareRecorderRobust();
    recorder.record();
  }, [permissionGranted, recorder, requestPermission, prepareRecorderRobust]);

  const stopRecording = useCallback(async () => {
    if (recorder.isRecording) {
      await recorder.stop();
    }
  }, [recorder]);

  // ---- Kontinuierliches Auslesen + Rohdaten-Service + Persistenz ----------
  useEffect(() => {
    const raw = recorderState?.metering;
    if (!isValidRawMetering(raw)) {
      return;
    }
    if (raw === lastEmittedMeteringRef.current) {
      return;
    } 

    lastEmittedMeteringRef.current = raw;

    const now = Date.now();
    const calibratedDb = calibration ? raw + calibration.offsetDb : null;

    const hasValidCalibratedValue = 
      Number.isFinite(calibratedDb) &&
      calibratedDb >= 0;

    if (!hasValidCalibratedValue) {
      return;
    }

    const sample = {
      timestamp: now,
      rawDbfs: raw,
      calibratedDb,
      isRecording: recorderState.isRecording,
    };

    rawBufferRef.current.push(sample);
    if (rawBufferRef.current.length > 300) rawBufferRef.current.shift();

    audioMeteringEmitter.emit(sample);

    // Throttled Persistenz - nur speichern, wenn ein dB-Wert vorliegt
    // (kalibriert falls möglich, sonst roher dBFS-Wert als Fallback)

    if (
      persistSamples &&
      storageReady &&
      recorderState.isRecording &&
      hasValidCalibratedValue && 
      now - lastStorageWriteRef.current >= storageIntervalMs
    ) {
      lastStorageWriteRef.current = now;
      appendReading({ timestamp: now, db: calibratedDb }).catch((e) =>
        console.warn('[storage] Fehler beim Speichern der Messung:', e)
      );
    }
  }, [
    recorderState?.metering,
    recorderState?.isRecording,
    calibration,
    persistSamples,
    storageReady,
    storageIntervalMs,
  ]);

  // ---- Kalibrierung ---------------------------------------------------------

  const collectMeteringSamples = useCallback(
    async (durationMs, intervalMs, onTick) => {
      const samples = [];
      const steps = Math.floor(durationMs / intervalMs);
      for (let i = 0; i < steps; i++) {
        await sleep(intervalMs);
        const status = recorder.getStatus();
        const value = status?.metering;
        if (isValidRawMetering(value)) {
          samples.push(value);
        }
        onTick?.(i + 1, steps, value);
      }
      return samples;
    },
    [recorder]
  );

  /**
   * @param {object} calibrationOptions
   * @param {'internal'|'external'} [calibrationOptions.toneSource='internal']
   *   Beide Varianten pausieren vor der Ton-Phase und warten auf eine
   *   explizite Bestätigung über confirmToneReady() - z.B. um dem Nutzer
   *   Zeit zu geben, die Lautstärke auf Maximum zu stellen.
   *   'internal': Ton wird nach der Bestätigung automatisch über den
   *      Handy-Lautsprecher abgespielt (auf iOS durch das
   *      Earpiece-Routing-Problem eingeschränkt).
   *   'external': Nutzer spielt den Ton auf einem zweiten Gerät ab und
   *      bestätigt danach.
   */
  const runCalibration = useCallback(
    async (calibrationOptions = {}) => {
      const { toneSource = 'internal' } = calibrationOptions;

      if (!permissionGranted) {
        const granted = await requestPermission();
        if (!granted) throw new Error('Mikrofonberechtigung verweigert');
      }

      setIsCalibrating(true);
      setCalibrationProgress({ phase: 'silence', percent: 0, toneSource });

      const wasAlreadyRecording = recorder.isRecording;
      let player = null;
      try {
        if (!wasAlreadyRecording) {
          await prepareRecorderRobust();
          recorder.record();
          await sleep(300);
        }

        // --- Phase A: Stille-Referenz ---
        const silenceSamples = await collectMeteringSamples(
          SILENCE_PHASE_DURATION_MS,
          SILENCE_SAMPLE_INTERVAL_MS,
          (done, total) =>
            setCalibrationProgress({
              phase: 'silence',
              percent: Math.round((done / total) * 100),
              toneSource,
            })
        );
        if (silenceSamples.length === 0) {
          throw new Error('Keine gültigen Metering-Werte in der Stille-Phase.');
        }
        const noiseFloorDbfs = median(silenceSamples);

        // --- Verpflichtender Bestätigungsschritt vor der Ton-Phase ---
        // Gilt für BEIDE Tonquellen: der Nutzer muss aktiv bestätigen,
        // dass die Lautstärke auf Maximum steht (extern zusätzlich: dass
        // der Ton dort bereits läuft), bevor gemessen wird.
        setCalibrationProgress({
          phase: 'awaiting-tone-ready',
          percent: 0,
          toneSource,
        });
        await new Promise((resolve) => {
          toneReadyResolverRef.current = resolve;
        });

        if (toneSource === 'internal') {
          player = createAudioPlayer(TONE_ASSET_INTERNAL);
          player.loop = true;
          player.volume = 1.0;
          player.play();
        }

        await sleep(TONE_SETTLE_MS);

        // --- Phase B: Referenzton messen ---
        setCalibrationProgress({ phase: 'tone', percent: 0, toneSource });
        const toneSamples = await collectMeteringSamples(
          TONE_PHASE_DURATION_MS,
          TONE_SAMPLE_INTERVAL_MS,
          (done, total) =>
            setCalibrationProgress({
              phase: 'tone',
              percent: Math.round((done / total) * 100),
              toneSource,
            })
        );

        if (toneSamples.length === 0) {
          throw new Error('Keine gültigen Metering-Werte in der Ton-Phase.');
        }
        const toneDbfs = median(toneSamples);
        const offsetDb = referenceSpl - toneDbfs;

        // --- Plausibilitätsprüfung ---
        // Zu geringer Abstand zwischen Ton- und Störgeräuschpegel deutet
        // darauf hin, dass die Lautstärke nicht hoch genug war (oder der
        // Ton nicht beim Mikro ankam). Die Kalibrierung wird trotzdem
        // übernommen (besser als keine), aber explizit markiert, statt
        // sie stillschweigend als verlässlich zu behandeln.
        const toneNoiseDeltaDb = toneDbfs - noiseFloorDbfs;
        const lowSignalWarning = toneNoiseDeltaDb < MIN_TONE_DELTA_DB;

        const result = {
          noiseFloorDbfs,
          toneDbfs,
          offsetDb,
          referenceSpl,
          toneSource,
          toneNoiseDeltaDb,
          lowSignalWarning,
          timestamp: Date.now(),
        };

        await saveCalibration(result);
        setCalibration(result);
        return result;
      } finally {
        if (player) {
          player.pause();
          player.remove();
        }
        toneReadyResolverRef.current = null;
        if (!wasAlreadyRecording) {
          await recorder.stop();
        }
        setIsCalibrating(false);
        setCalibrationProgress(null);
      }
    },
    [
      permissionGranted,
      recorder,
      requestPermission,
      prepareRecorderRobust,
      collectMeteringSamples,
      referenceSpl,
    ]
  );

  const toCalibratedDb = useCallback(
    (rawDbfs) => (calibration ? rawDbfs + calibration.offsetDb : null),
    [calibration]
  );

  // Alter der Kalibrierung in Tagen - für Warnhinweis in der UI nützlich
  const calibrationAgeDays = calibration
    ? (Date.now() - calibration.timestamp) / (1000 * 60 * 60 * 24)
    : null;

  return {
    permissionGranted,
    permissionResolved,
    requestPermission,

    startRecording,
    stopRecording,
    isRecording: recorderState?.isRecording ?? false,

    currentRawDbfs: isValidRawMetering(
      recorderState?.metering
    )
      ? recorderState.metering
      : null,

    currentCalibratedDb: (() => {
      const raw = recorderState?.metering;

      if (!isValidRawMetering(raw)) {
        return null;
      }

      const value = toCalibratedDb(raw);

      return Number.isFinite(value) && value >= 0
        ? value
        : null;
    })(),

    runCalibration,
    confirmToneReady,
    isCalibrating,
    calibrationProgress,
    calibration,
    calibrationAgeDays,
    toCalibratedDb,

    storageReady,
  };
}
