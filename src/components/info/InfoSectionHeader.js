import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';

export default function InfoSectionHeader({ title, children }) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {children && <Text style={styles.introText}>{children}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.text || '#1e293b',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  introText: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 21,
  },
});
