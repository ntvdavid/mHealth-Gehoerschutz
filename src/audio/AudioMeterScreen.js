/**
 * AudioMeterScreen.js
 */
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAudioMeteringService } from './useAudioMeteringService';
import HistoryChart from './HistoryChart';

export default function AudioMeterScreen() {
  const {
    permissionGranted,
    startRecording,
    stopRecording,
    isRecording,
    currentCalibratedDb,
    runCalibration,
    confirmToneReady,
    isCalibrating,
    calibrationProgress,
    calibration,
    calibrationAgeDays,
  } = useAudioMeteringService({ referenceSpl: 70, storageIntervalMs: 1000 });

  const [toneSource, setToneSource] = useState('internal');

  const calibrationIsStale = calibrationAgeDays !== null && calibrationAgeDays > 14;

  const handleStartCalibration = async () => {
    try {
      const result = await runCalibration({ toneSource });
      if (result.lowSignalWarning) {
        Alert.alert(
          'Schwaches Signal erkannt',
          `Der Referenzton war nur ${result.toneNoiseDeltaDb.toFixed(1)} dB lauter als das Störgeräusch (empfohlen: mind. 15 dB). ` +
            'Die Kalibrierung wurde trotzdem übernommen, ist aber möglicherweise ungenau. ' +
            'Bitte Lautstärke prüfen und neu kalibrieren.',
          [{ text: 'OK' }]
        );
      }
    } catch (e) {
      Alert.alert('Kalibrierung fehlgeschlagen', e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mikrofon-Berechtigung: {permissionGranted ? 'OK' : 'fehlt'}</Text>

      <View style={styles.dbDisplay}>
        <Text style={styles.dbValue}>
          {currentCalibratedDb !== null ? currentCalibratedDb.toFixed(1) : '–'}
        </Text>
        <Text style={styles.dbUnit}>dB (±5 dB, kalibriert)</Text>
      </View>

      {!calibration && (
        <Text style={styles.warning}>
          Noch keine Kalibrierung vorhanden – Anzeige ist unkalibriert (rohe dBFS-Skala).
        </Text>
      )}
      {calibrationIsStale && (
        <Text style={styles.warning}>
          Letzte Kalibrierung ist {Math.round(calibrationAgeDays)} Tage alt – Neukalibrierung empfohlen.
        </Text>
      )}
      {calibration?.lowSignalWarning && (
        <Text style={styles.warning}>
          Aktuelle Kalibrierung hat schwaches Signal (nur {calibration.toneNoiseDeltaDb.toFixed(1)} dB
          Abstand zum Störgeräusch) – Genauigkeit ist eingeschränkt, Neukalibrierung empfohlen.
        </Text>
      )}

      {isCalibrating && calibrationProgress && (
        <Text style={styles.progress}>
          Kalibrierung läuft – Phase: {calibrationProgress.phase} ({calibrationProgress.percent}%)
          {calibrationProgress.phase === 'silence' && ' – Gerät jetzt in leisem Raum ablegen'}
        </Text>
      )}

      {/* Verpflichtender Bestätigungsschritt vor der Ton-Phase - für BEIDE Tonquellen */}
      {isCalibrating && calibrationProgress?.phase === 'awaiting-tone-ready' && (
        <View style={styles.externalPrompt}>
          <Text style={styles.externalPromptText}>
            {calibrationProgress.toneSource === 'external'
              ? 'Stelle die Lautstärke des Wiedergabegeräts auf Maximum und starte dort den Referenzton (Screen "Referenzton abspielen", ~1-2m Abstand). Dann hier bestätigen:'
              : 'Stelle die Lautstärke DIESES Geräts auf Maximum (Lautstärketaste). Der Referenzton wird danach automatisch abgespielt. Dann bestätigen:'}
          </Text>
          <Button title="Bestätigen" onPress={confirmToneReady} />
        </View>
      )}

      <View style={styles.buttonRow}>
        <Button title="Aufnahme starten" onPress={startRecording} disabled={isRecording} />
        <Button title="Aufnahme stoppen" onPress={stopRecording} disabled={!isRecording} />
      </View>

      {/* Auswahl der Tonquelle für die Kalibrierung */}
      <View style={styles.toneSourceRow}>
        <Text
          onPress={() => setToneSource('internal')}
          style={[styles.toneOption, toneSource === 'internal' && styles.toneOptionActive]}
        >
          Interner Lautsprecher
        </Text>
        <Text
          onPress={() => setToneSource('external')}
          style={[styles.toneOption, toneSource === 'external' && styles.toneOptionActive]}
        >
          Externe Tonquelle
        </Text>
      </View>

      <Button
        title="Kalibrierung starten"
        onPress={handleStartCalibration}
        disabled={isCalibrating}
      />

      <View style={styles.chartSection}>
        <HistoryChart />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 12, alignItems: 'center' },
  title: { fontSize: 13, color: '#666' },
  dbDisplay: { alignItems: 'center', marginVertical: 16 },
  dbValue: { fontSize: 56, fontWeight: '700', color: '#111' },
  dbUnit: { fontSize: 13, color: '#888' },
  warning: { color: '#b45309', fontSize: 13, textAlign: 'center' },
  progress: { color: '#2563eb', fontSize: 13, textAlign: 'center' },
  buttonRow: { flexDirection: 'row', gap: 12 },
  toneSourceRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  toneOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#666',
    fontSize: 13,
  },
  toneOptionActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
    color: '#fff',
    fontWeight: '600',
  },
  externalPrompt: {
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    alignItems: 'center',
  },
  externalPromptText: { fontSize: 13, color: '#1e40af', textAlign: 'center' },
  chartSection: { marginTop: 24, width: '100%', alignItems: 'center' },
});
