import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function InfoCardIcon({ source, size = 64, style }) {
  return (
    <Image
      source={source}
      style={[styles.icon, { width: size, height: size }, style]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    borderRadius: 14,
  },
});
