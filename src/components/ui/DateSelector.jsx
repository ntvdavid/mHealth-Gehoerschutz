import React, { useState } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateSelector({ selectedDate, onDateChange, children }) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selected) => {
    // Android schließt das Pop-up nach dem Klick automatisch
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    
    if (event.type === 'dismissed') return;

    if (selected) {
      const year = selected.getFullYear();
      const month = String(selected.getMonth() + 1).padStart(2, '0');
      const day = String(selected.getDate()).padStart(2, '0');
      
      onDateChange(`${year}-${month}-${day}`);
    }
  };

  if (Platform.OS === 'ios') {
    return (
      <DateTimePicker
        value={new Date(selectedDate)}
        mode="date"
        display="compact"
        onChange={handleDateChange}
        minimumDate={new Date('2026-06-22')}
        maximumDate={new Date('2026-07-22')}
      />
    );
  }

  return (
    <>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
        {children}
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={new Date(selectedDate)}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date('2026-06-22')}
          maximumDate={new Date('2026-07-22')}
        />
      )}
    </>
  );
}