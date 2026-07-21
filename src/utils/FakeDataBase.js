/**
 * This is a fake database for demonstration purposes.
 * In a real application, you would fetch this data from an API or a real database.
 * Key would be the date in 'YYYY-MM-DD' format, and the value would be an array of objects containing the value and label for each time point.
 */

const fakeDatabase = {
  "2026-07-22": [ // Mittwoch
    { value: 42, label: '08h' }, { value: 45, label: '10h' }, { value: 50, label: '12h' }, { value: 52, label: '14h' }, { value: 48, label: '16h' }, { value: 60, label: '18h' }, { value: 45, label: '20h' }
  ],
  "2026-07-21": [ // Dienstag
    { value: 38, label: '08h' }, { value: 48, label: '10h' }, { value: 45, label: '12h' }, { value: 55, label: '14h' }, { value: 50, label: '16h' }, { value: 58, label: '18h' }, { value: 42, label: '20h' }
  ],
  "2026-07-20": [ // Montag
    { value: 40, label: '08h' }, { value: 42, label: '10h' }, { value: 60, label: '12h' }, { value: 48, label: '14h' }, { value: 45, label: '16h' }, { value: 55, label: '18h' }, { value: 40, label: '20h' }
  ],
  "2026-07-19": [ // Sonntag (Ruhiger Tag)
    { value: 35, label: '08h' }, { value: 38, label: '10h' }, { value: 40, label: '12h' }, { value: 45, label: '14h' }, { value: 42, label: '16h' }, { value: 40, label: '18h' }, { value: 38, label: '20h' }
  ],
  "2026-07-18": [ // Samstag (Lauter Abend)
    { value: 35, label: '08h' }, { value: 40, label: '10h' }, { value: 45, label: '12h' }, { value: 60, label: '14h' }, { value: 75, label: '16h' }, { value: 88, label: '18h' }, { value: 95, label: '20h' }
  ],
  "2026-07-17": [ // Freitag (Deine Daten)
    { value: 45, label: '08h' }, { value: 35, label: '10h' }, { value: 85, label: '12h' }, { value: 66, label: '14h' }, { value: 60, label: '16h' }, { value: 69, label: '18h' }, { value: 63, label: '20h' }
  ],
  "2026-07-16": [ // Donnerstag (Deine Daten)
    { value: 40, label: '08h' }, { value: 35, label: '10h' }, { value: 55, label: '12h' }, { value: 60, label: '14h' }, { value: 45, label: '16h' }, { value: 61, label: '18h' }, { value: 66, label: '20h' }
  ],
  "2026-07-15": [ // Mittwoch
    { value: 42, label: '08h' }, { value: 48, label: '10h' }, { value: 50, label: '12h' }, { value: 55, label: '14h' }, { value: 45, label: '16h' }, { value: 58, label: '18h' }, { value: 40, label: '20h' }
  ],
  "2026-07-14": [ // Dienstag
    { value: 38, label: '08h' }, { value: 40, label: '10h' }, { value: 45, label: '12h' }, { value: 48, label: '14h' }, { value: 42, label: '16h' }, { value: 50, label: '18h' }, { value: 45, label: '20h' }
  ],
  "2026-07-13": [ // Montag
    { value: 45, label: '08h' }, { value: 50, label: '10h' }, { value: 55, label: '12h' }, { value: 48, label: '14h' }, { value: 45, label: '16h' }, { value: 60, label: '18h' }, { value: 42, label: '20h' }
  ],
  "2026-07-12": [ // Sonntag (Entspannt)
    { value: 30, label: '08h' }, { value: 35, label: '10h' }, { value: 38, label: '12h' }, { value: 42, label: '14h' }, { value: 40, label: '16h' }, { value: 45, label: '18h' }, { value: 35, label: '20h' }
  ],
  "2026-07-11": [ // Samstag (Nachmittags laut)
    { value: 40, label: '08h' }, { value: 55, label: '10h' }, { value: 75, label: '12h' }, { value: 82, label: '14h' }, { value: 80, label: '16h' }, { value: 65, label: '18h' }, { value: 50, label: '20h' }
  ],
  "2026-07-10": [ // Freitag
    { value: 42, label: '08h' }, { value: 45, label: '10h' }, { value: 50, label: '12h' }, { value: 55, label: '14h' }, { value: 65, label: '16h' }, { value: 78, label: '18h' }, { value: 85, label: '20h' }
  ],
  "2026-07-09": [ // Donnerstag
    { value: 38, label: '08h' }, { value: 42, label: '10h' }, { value: 48, label: '12h' }, { value: 50, label: '14h' }, { value: 45, label: '16h' }, { value: 55, label: '18h' }, { value: 40, label: '20h' }
  ],
  "2026-07-08": [ // Mittwoch
    { value: 40, label: '08h' }, { value: 45, label: '10h' }, { value: 50, label: '12h' }, { value: 55, label: '14h' }, { value: 48, label: '16h' }, { value: 60, label: '18h' }, { value: 45, label: '20h' }
  ],
  "2026-07-07": [ // Dienstag
    { value: 42, label: '08h' }, { value: 48, label: '10h' }, { value: 55, label: '12h' }, { value: 50, label: '14h' }, { value: 45, label: '16h' }, { value: 58, label: '18h' }, { value: 42, label: '20h' }
  ],
  "2026-07-06": [ // Montag
    { value: 38, label: '08h' }, { value: 40, label: '10h' }, { value: 45, label: '12h' }, { value: 48, label: '14h' }, { value: 42, label: '16h' }, { value: 50, label: '18h' }, { value: 38, label: '20h' }
  ],
  "2026-07-05": [ // Sonntag
    { value: 35, label: '08h' }, { value: 38, label: '10h' }, { value: 40, label: '12h' }, { value: 45, label: '14h' }, { value: 42, label: '16h' }, { value: 45, label: '18h' }, { value: 40, label: '20h' }
  ],
  "2026-07-04": [ // Samstag (Sehr lauter Abend)
    { value: 40, label: '08h' }, { value: 45, label: '10h' }, { value: 55, label: '12h' }, { value: 65, label: '14h' }, { value: 70, label: '16h' }, { value: 85, label: '18h' }, { value: 92, label: '20h' }
  ],
  "2026-07-03": [ // Freitag
    { value: 45, label: '08h' }, { value: 48, label: '10h' }, { value: 52, label: '12h' }, { value: 58, label: '14h' }, { value: 65, label: '16h' }, { value: 75, label: '18h' }, { value: 80, label: '20h' }
  ],
  "2026-07-02": [ // Donnerstag
    { value: 38, label: '08h' }, { value: 42, label: '10h' }, { value: 45, label: '12h' }, { value: 50, label: '14h' }, { value: 48, label: '16h' }, { value: 55, label: '18h' }, { value: 40, label: '20h' }
  ],
  "2026-07-01": [ // Mittwoch
    { value: 40, label: '08h' }, { value: 45, label: '10h' }, { value: 50, label: '12h' }, { value: 55, label: '14h' }, { value: 48, label: '16h' }, { value: 60, label: '18h' }, { value: 42, label: '20h' }
  ],
  "2026-06-30": [ // Dienstag
    { value: 42, label: '08h' }, { value: 48, label: '10h' }, { value: 55, label: '12h' }, { value: 50, label: '14h' }, { value: 45, label: '16h' }, { value: 58, label: '18h' }, { value: 45, label: '20h' }
  ],
  "2026-06-29": [ // Montag
    { value: 38, label: '08h' }, { value: 40, label: '10h' }, { value: 45, label: '12h' }, { value: 48, label: '14h' }, { value: 42, label: '16h' }, { value: 50, label: '18h' }, { value: 38, label: '20h' }
  ],
  "2026-06-28": [ // Sonntag
    { value: 35, label: '08h' }, { value: 38, label: '10h' }, { value: 42, label: '12h' }, { value: 45, label: '14h' }, { value: 40, label: '16h' }, { value: 42, label: '18h' }, { value: 35, label: '20h' }
  ],
  "2026-06-27": [ // Samstag
    { value: 38, label: '08h' }, { value: 45, label: '10h' }, { value: 60, label: '12h' }, { value: 70, label: '14h' }, { value: 75, label: '16h' }, { value: 82, label: '18h' }, { value: 88, label: '20h' }
  ],
  "2026-06-26": [ // Freitag
    { value: 40, label: '08h' }, { value: 45, label: '10h' }, { value: 50, label: '12h' }, { value: 55, label: '14h' }, { value: 60, label: '16h' }, { value: 70, label: '18h' }, { value: 78, label: '20h' }
  ],
  "2026-06-25": [ // Donnerstag
    { value: 42, label: '08h' }, { value: 48, label: '10h' }, { value: 52, label: '12h' }, { value: 58, label: '14h' }, { value: 45, label: '16h' }, { value: 55, label: '18h' }, { value: 40, label: '20h' }
  ],
  "2026-06-24": [ // Mittwoch
    { value: 38, label: '08h' }, { value: 42, label: '10h' }, { value: 48, label: '12h' }, { value: 50, label: '14h' }, { value: 45, label: '16h' }, { value: 52, label: '18h' }, { value: 38, label: '20h' }
  ],
  "2026-06-23": [ // Dienstag
    { value: 40, label: '08h' }, { value: 45, label: '10h' }, { value: 50, label: '12h' }, { value: 55, label: '14h' }, { value: 48, label: '16h' }, { value: 60, label: '18h' }, { value: 42, label: '20h' }
  ],
  "2026-06-22": [ // Montag
    { value: 42, label: '08h' }, { value: 48, label: '10h' }, { value: 55, label: '12h' }, { value: 50, label: '14h' }, { value: 45, label: '16h' }, { value: 58, label: '18h' }, { value: 45, label: '20h' }
  ]
};

export function getDataForDate(date) {
  return fakeDatabase[date] || [];
}