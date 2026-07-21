/**
 * This is a fake database for demonstration purposes.
 * In a real application, you would fetch this data from an API or a real database.
 * Key would be the date in 'YYYY-MM-DD' format, and the value would be an object 
 * containing the measurements array and the dangerous minutes.
 */

const fakeDatabase = {
  "2026-07-22": { dangerous: 0, data: [ { value: 42, label: '08h' }, { value: 45, label: '10h' }, { value: 50, label: '12h' }, { value: 52, label: '14h' }, { value: 48, label: '16h' }, { value: 60, label: '18h' }, { value: 45, label: '20h' } ] },
  "2026-07-21": { dangerous: 0, data: [ { value: 38, label: '08h' }, { value: 48, label: '10h' }, { value: 45, label: '12h' }, { value: 55, label: '14h' }, { value: 50, label: '16h' }, { value: 58, label: '18h' }, { value: 42, label: '20h' } ] },
  "2026-07-20": { dangerous: 0, data: [ { value: 40, label: '08h' }, { value: 42, label: '10h' }, { value: 60, label: '12h' }, { value: 48, label: '14h' }, { value: 45, label: '16h' }, { value: 55, label: '18h' }, { value: 40, label: '20h' } ] },
  "2026-07-19": { dangerous: 0, data: [ { value: 35, label: '08h' }, { value: 38, label: '10h' }, { value: 40, label: '12h' }, { value: 45, label: '14h' }, { value: 42, label: '16h' }, { value: 40, label: '18h' }, { value: 38, label: '20h' } ] },
  "2026-07-18": { dangerous: 110, data: [ { value: 35, label: '08h' }, { value: 40, label: '10h' }, { value: 45, label: '12h' }, { value: 60, label: '14h' }, { value: 75, label: '16h' }, { value: 88, label: '18h' }, { value: 95, label: '20h' } ] },
  "2026-07-17": { dangerous: 320, data: [ { value: 120, label: '08h' }, { value: 135, label: '10h' }, { value: 130, label: '12h' }, { value: 100, label: '14h' }, { value: 90, label: '16h' }, { value: 95, label: '18h' }, { value: 77, label: '20h' } ] },
  "2026-07-16": { dangerous: 0, data: [ { value: 40, label: '08h' }, { value: 35, label: '10h' }, { value: 55, label: '12h' }, { value: 60, label: '14h' }, { value: 45, label: '16h' }, { value: 61, label: '18h' }, { value: 66, label: '20h' } ] },
  "2026-07-15": { dangerous: 0, data: [ { value: 42, label: '08h' }, { value: 48, label: '10h' }, { value: 50, label: '12h' }, { value: 55, label: '14h' }, { value: 45, label: '16h' }, { value: 58, label: '18h' }, { value: 40, label: '20h' } ] },
  "2026-07-14": { dangerous: 0, data: [ { value: 38, label: '08h' }, { value: 40, label: '10h' }, { value: 45, label: '12h' }, { value: 48, label: '14h' }, { value: 42, label: '16h' }, { value: 50, label: '18h' }, { value: 45, label: '20h' } ] },
  "2026-07-13": { dangerous: 0, data: [ { value: 45, label: '08h' }, { value: 50, label: '10h' }, { value: 55, label: '12h' }, { value: 48, label: '14h' }, { value: 45, label: '16h' }, { value: 60, label: '18h' }, { value: 42, label: '20h' } ] },
  "2026-07-12": { dangerous: 0, data: [ { value: 30, label: '08h' }, { value: 35, label: '10h' }, { value: 38, label: '12h' }, { value: 42, label: '14h' }, { value: 40, label: '16h' }, { value: 45, label: '18h' }, { value: 35, label: '20h' } ] },
  "2026-07-11": { dangerous: 0, data: [ { value: 40, label: '08h' }, { value: 55, label: '10h' }, { value: 75, label: '12h' }, { value: 82, label: '14h' }, { value: 80, label: '16h' }, { value: 65, label: '18h' }, { value: 50, label: '20h' } ] },
  "2026-07-10": { dangerous: 45, data: [ { value: 42, label: '08h' }, { value: 45, label: '10h' }, { value: 50, label: '12h' }, { value: 55, label: '14h' }, { value: 65, label: '16h' }, { value: 78, label: '18h' }, { value: 85, label: '20h' } ] },
  "2026-07-09": { dangerous: 0, data: [ { value: 38, label: '08h' }, { value: 42, label: '10h' }, { value: 48, label: '12h' }, { value: 50, label: '14h' }, { value: 45, label: '16h' }, { value: 55, label: '18h' }, { value: 40, label: '20h' } ] },
  "2026-07-08": { dangerous: 0, data: [ { value: 40, label: '08h' }, { value: 45, label: '10h' }, { value: 50, label: '12h' }, { value: 55, label: '14h' }, { value: 48, label: '16h' }, { value: 60, label: '18h' }, { value: 45, label: '20h' } ] },
  "2026-07-07": { dangerous: 0, data: [ { value: 42, label: '08h' }, { value: 48, label: '10h' }, { value: 55, label: '12h' }, { value: 50, label: '14h' }, { value: 45, label: '16h' }, { value: 58, label: '18h' }, { value: 42, label: '20h' } ] },
  "2026-07-06": { dangerous: 0, data: [ { value: 38, label: '08h' }, { value: 40, label: '10h' }, { value: 45, label: '12h' }, { value: 48, label: '14h' }, { value: 42, label: '16h' }, { value: 50, label: '18h' }, { value: 38, label: '20h' } ] },
  "2026-07-05": { dangerous: 0, data: [ { value: 35, label: '08h' }, { value: 38, label: '10h' }, { value: 40, label: '12h' }, { value: 45, label: '14h' }, { value: 42, label: '16h' }, { value: 45, label: '18h' }, { value: 40, label: '20h' } ] },
  "2026-07-04": { dangerous: 90, data: [ { value: 40, label: '08h' }, { value: 45, label: '10h' }, { value: 55, label: '12h' }, { value: 65, label: '14h' }, { value: 70, label: '16h' }, { value: 85, label: '18h' }, { value: 92, label: '20h' } ] },
  "2026-07-03": { dangerous: 0, data: [ { value: 45, label: '08h' }, { value: 48, label: '10h' }, { value: 52, label: '12h' }, { value: 58, label: '14h' }, { value: 65, label: '16h' }, { value: 75, label: '18h' }, { value: 80, label: '20h' } ] },
  "2026-07-02": { dangerous: 0, data: [ { value: 38, label: '08h' }, { value: 42, label: '10h' }, { value: 45, label: '12h' }, { value: 50, label: '14h' }, { value: 48, label: '16h' }, { value: 55, label: '18h' }, { value: 40, label: '20h' } ] },
  "2026-07-01": { dangerous: 0, data: [ { value: 40, label: '08h' }, { value: 45, label: '10h' }, { value: 50, label: '12h' }, { value: 55, label: '14h' }, { value: 48, label: '16h' }, { value: 60, label: '18h' }, { value: 42, label: '20h' } ] },
  "2026-06-30": { dangerous: 0, data: [ { value: 42, label: '08h' }, { value: 48, label: '10h' }, { value: 55, label: '12h' }, { value: 50, label: '14h' }, { value: 45, label: '16h' }, { value: 58, label: '18h' }, { value: 45, label: '20h' } ] },
  "2026-06-29": { dangerous: 0, data: [ { value: 38, label: '08h' }, { value: 40, label: '10h' }, { value: 45, label: '12h' }, { value: 48, label: '14h' }, { value: 42, label: '16h' }, { value: 50, label: '18h' }, { value: 38, label: '20h' } ] },
  "2026-06-28": { dangerous: 0, data: [ { value: 35, label: '08h' }, { value: 38, label: '10h' }, { value: 42, label: '12h' }, { value: 45, label: '14h' }, { value: 40, label: '16h' }, { value: 42, label: '18h' }, { value: 35, label: '20h' } ] },
  "2026-06-27": { dangerous: 45, data: [ { value: 38, label: '08h' }, { value: 45, label: '10h' }, { value: 60, label: '12h' }, { value: 70, label: '14h' }, { value: 75, label: '16h' }, { value: 82, label: '18h' }, { value: 88, label: '20h' } ] },
  "2026-06-26": { dangerous: 0, data: [ { value: 40, label: '08h' }, { value: 45, label: '10h' }, { value: 50, label: '12h' }, { value: 55, label: '14h' }, { value: 60, label: '16h' }, { value: 70, label: '18h' }, { value: 78, label: '20h' } ] },
  "2026-06-25": { dangerous: 0, data: [ { value: 42, label: '08h' }, { value: 48, label: '10h' }, { value: 52, label: '12h' }, { value: 58, label: '14h' }, { value: 45, label: '16h' }, { value: 55, label: '18h' }, { value: 40, label: '20h' } ] },
  "2026-06-24": { dangerous: 0, data: [ { value: 38, label: '08h' }, { value: 42, label: '10h' }, { value: 48, label: '12h' }, { value: 50, label: '14h' }, { value: 45, label: '16h' }, { value: 52, label: '18h' }, { value: 38, label: '20h' } ] },
  "2026-06-23": { dangerous: 0, data: [ { value: 40, label: '08h' }, { value: 45, label: '10h' }, { value: 50, label: '12h' }, { value: 55, label: '14h' }, { value: 48, label: '16h' }, { value: 60, label: '18h' }, { value: 42, label: '20h' } ] },
  "2026-06-22": { dangerous: 0, data: [ { value: 42, label: '08h' }, { value: 48, label: '10h' }, { value: 55, label: '12h' }, { value: 50, label: '14h' }, { value: 45, label: '16h' }, { value: 58, label: '18h' }, { value: 45, label: '20h' } ] }
};

export function getDataForDate(date) {
  // Gibt jetzt das Objekt zurück. Falls das Datum nicht existiert, gibt es leere Standardwerte zurück.
  return fakeDatabase[date] || { dangerous: 0, data: [] };
}