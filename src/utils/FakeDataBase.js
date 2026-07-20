
{/**
 * This is a fake database for demonstration purposes.
 * In a real application, you would fetch this data from an API or a real database.
 * Key would be the date in 'YYYY-MM-DD' format, and the value would be an array of objects containing the value and label for each time point.
 */}

const fakeDatabase = {
  "2026-07-17": [ // Heute
    { value: 45, label: '08h' },
    { value: 35, label: '10h' },  
    { value: 85, label: '12h' },
    { value: 66, label: '14h' }, 
    { value: 60, label: '16h' }, 
    { value: 69, label: '18h' },  
    { value: 63, label: '20h' }
  ],
  "2026-07-16": [ // Gestern
    { value: 40, label: '08h' },
    { value: 35, label: '10h' }, 
    { value: 55, label: '12h' },
    { value: 60, label: '14h' }, 
    { value: 45, label: '16h' }, 
    { value: 61, label: '18h' }, 
    { value: 66, label: '20h' }
  ]
};

export function getDataForDate(date) {
  return fakeDatabase[date] || [];
}