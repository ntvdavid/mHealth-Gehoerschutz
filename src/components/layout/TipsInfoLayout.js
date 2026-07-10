import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { COLORS } from '../../constants/colors';

export default function TipsInfoLayout({ children, footer }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
    >
      {children}

      {footer && <View style={styles.buttonWrapper}>{footer}</View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  buttonWrapper: {
    marginTop: 24,
  },
});