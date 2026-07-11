import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeeklyReview() {
  return (
      <View styles={styles.tabContainer}>
        <Text style={styles.titelText}>
          Weekly Screen geladen!
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  tabContainer: { 
    flex: 1,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    
    
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    
    marginHorizontal: 8,
  },

  titelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  }

});