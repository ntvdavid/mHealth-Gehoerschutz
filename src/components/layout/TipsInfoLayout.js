import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { COLORS } from '../../constants/colors';

export default function TipsInfoLayout({ children, footer }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {children}

      {footer && <View style={styles.buttonWrapper}>{footer}</View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background || '#f8fafc',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    gap: 16,
  },
  buttonWrapper: {
    marginTop: 8,
  },
});