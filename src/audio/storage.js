// src/audio/storage.js (Temporärer Dummy für das Testing), konnte ansonsten expo nicht starten weil ich file nicht hatte 

export async function initStorage() {
  console.log("[Storage Dummy] initStorage aufgerufen");
  return true;
}

export async function appendReading(reading) {
  // Tut temporär nichts, verhindert aber Abstürze beim Testen
  return true;
}

export async function saveCalibration(calibration) {
  console.log("[Storage Dummy] Kalibrierung gespeichert", calibration);
  return true;
}

export async function getLatestCalibration() {
  // Gibt null zurück, damit der Hook weiß, dass noch keine Kalibrierung existiert
  return null;
}