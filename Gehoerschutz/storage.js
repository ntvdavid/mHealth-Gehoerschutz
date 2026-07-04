/**
 * storage.js
 * -----------------------------------------------------------------------
 * Einfache Persistenz auf Basis mehrerer JSON-Dateien (statt SQLite).
 * Nutzt expo-file-system (Kern-Modul, läuft in Expo Go).
 *
 * Gespeichert wird pro Messung:
 *   - timestamp: Unix-Zeit in ms
 *   - date:      ISO-Datumsstring (lesbar, z.B. für Export/Debugging)
 *   - db:        der (kalibrierte, falls vorhanden, sonst rohe) dB-Wert
 *
 * ROTATION STATT LÖSCHEN:
 * Alle Messwerte liegen in /audio-readings/ als mehrere Dateien
 * (readings-000001.json, readings-000002.json, ...). Sobald eine Datei
 * MAX_READINGS_PER_FILE Einträge erreicht, wird automatisch eine neue
 * Datei begonnen. Es werden NIE alte Werte verworfen - auch nicht bei
 * einem Neustart der Aufnahme. Zum Auslesen (getReadings) werden alle
 * relevanten Dateien zusammengeführt.
 *
 * Die Kalibrierung selbst bleibt in einer separaten Einzeldatei, da sie
 * nur einen aktuellen Zustand (keine Historie von Messpunkten) darstellt.
 * -----------------------------------------------------------------------
 */

import * as FileSystem from 'expo-file-system';

const READINGS_DIR = FileSystem.documentDirectory + 'audio-readings/';
const CALIBRATION_FILE = FileSystem.documentDirectory + 'audio-calibration.json';
const FILE_PREFIX = 'readings-';
const FILE_SUFFIX = '.json';

// Größe pro Datei, nicht die Gesamt-Historie. Bei 1 Messung/Sekunde
// entspricht das ca. 1,4 Stunden pro Datei - danach beginnt automatisch
// die nächste. Es geht dabei nichts verloren, es kommt nur eine weitere
// Datei hinzu.
const MAX_READINGS_PER_FILE = 5_000;

// -------------------------------------------------------------------------
// Hilfsfunktionen
// -------------------------------------------------------------------------

async function readJsonFile(path, fallback) {
  try {
    const info = await FileSystem.getInfoAsync(path);
    if (!info.exists) return fallback;
    const content = await FileSystem.readAsStringAsync(path);
    return content ? JSON.parse(content) : fallback;
  } catch (e) {
    console.warn('[storage] Fehler beim Lesen von', path, e);
    return fallback;
  }
}

async function writeJsonFile(path, data) {
  try {
    await FileSystem.writeAsStringAsync(path, JSON.stringify(data));
  } catch (e) {
    console.warn('[storage] Fehler beim Schreiben von', path, e);
  }
}

/** Liefert alle vorhandenen Readings-Dateinamen, chronologisch sortiert. */
async function listReadingFiles() {
  try {
    const files = await FileSystem.readDirectoryAsync(READINGS_DIR);
    return files
      .filter((f) => f.startsWith(FILE_PREFIX) && f.endsWith(FILE_SUFFIX))
      .sort(); // "readings-000001.json" < "readings-000002.json" ...
  } catch (e) {
    return [];
  }
}

function fileIndexFromName(filename) {
  const match = filename.match(/readings-(\d+)\.json/);
  return match ? parseInt(match[1], 10) : 0;
}

function fileNameFromIndex(index) {
  return `${FILE_PREFIX}${String(index).padStart(6, '0')}${FILE_SUFFIX}`;
}

// -------------------------------------------------------------------------
// Init
// -------------------------------------------------------------------------

/** Stellt sicher, dass Verzeichnis + Kalibrierungsdatei existieren. */
export async function initStorage() {
  const dirInfo = await FileSystem.getInfoAsync(READINGS_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(READINGS_DIR, { intermediates: true });
  }

  const files = await listReadingFiles();
  if (files.length === 0) {
    // Erste Datei anlegen
    await writeJsonFile(READINGS_DIR + fileNameFromIndex(1), []);
  }

  const calibration = await readJsonFile(CALIBRATION_FILE, undefined);
  if (calibration === undefined) {
    await writeJsonFile(CALIBRATION_FILE, null);
  }
}

// -------------------------------------------------------------------------
// Messwerte
// -------------------------------------------------------------------------

/**
 * Hängt eine Messung an die aktuell aktive Datei an. Ist diese voll
 * (MAX_READINGS_PER_FILE erreicht), wird automatisch eine neue Datei
 * begonnen - bestehende Dateien bleiben unangetastet.
 */
export async function appendReading({ timestamp, db }) {
  const files = await listReadingFiles();
  let activeFile = files[files.length - 1];

  if (!activeFile) {
    activeFile = fileNameFromIndex(1);
    await writeJsonFile(READINGS_DIR + activeFile, []);
  }

  let current = await readJsonFile(READINGS_DIR + activeFile, []);

  if (current.length >= MAX_READINGS_PER_FILE) {
    // Aktuelle Datei ist voll -> neue Datei beginnen, alte bleibt erhalten
    const nextIndex = fileIndexFromName(activeFile) + 1;
    activeFile = fileNameFromIndex(nextIndex);
    current = [];
  }

  current.push({
    timestamp,
    date: new Date(timestamp).toISOString(),
    db: Math.round(db * 10) / 10,
  });

  await writeJsonFile(READINGS_DIR + activeFile, current);
}

/** Alle Messwerte im Zeitraum [fromTimestamp, toTimestamp] (ms epoch), über alle Dateien hinweg. */
export async function getReadings(fromTimestamp, toTimestamp) {
  const files = await listReadingFiles();
  const result = [];

  for (const file of files) {
    const entries = await readJsonFile(READINGS_DIR + file, []);
    for (const entry of entries) {
      if (entry.timestamp >= fromTimestamp && entry.timestamp <= toTimestamp) {
        result.push(entry);
      }
    }
  }

  result.sort((a, b) => a.timestamp - b.timestamp);
  return result;
}

/** Liest wirklich alle jemals gespeicherten Messwerte (über alle Dateien). */
export async function getAllReadings() {
  const files = await listReadingFiles();
  const result = [];
  for (const file of files) {
    const entries = await readJsonFile(READINGS_DIR + file, []);
    result.push(...entries);
  }
  result.sort((a, b) => a.timestamp - b.timestamp);
  return result;
}

/**
 * Löscht wirklich ALLE gespeicherten Messwerte (alle Dateien). Bewusst
 * als expliziter, separater Aufruf - passiert nie automatisch.
 */
export async function clearAllReadings() {
  const files = await listReadingFiles();
  for (const file of files) {
    await FileSystem.deleteAsync(READINGS_DIR + file, { idempotent: true });
  }
  await writeJsonFile(READINGS_DIR + fileNameFromIndex(1), []);
}

/** Kleine Übersicht für Debugging/Anzeige: Anzahl Dateien + Gesamteinträge. */
export async function getStorageInfo() {
  const files = await listReadingFiles();
  let totalEntries = 0;
  for (const file of files) {
    const entries = await readJsonFile(READINGS_DIR + file, []);
    totalEntries += entries.length;
  }
  return { fileCount: files.length, totalEntries, files };
}

// -------------------------------------------------------------------------
// Kalibrierung (unverändert: eine einzelne Datei, da nur aktueller Zustand)
// -------------------------------------------------------------------------

export async function saveCalibration(calibration) {
  await writeJsonFile(CALIBRATION_FILE, calibration);
}

export async function getLatestCalibration() {
  return readJsonFile(CALIBRATION_FILE, null);
}