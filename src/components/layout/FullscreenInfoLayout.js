import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../../constants/colors';

export default function FullscreenInfoLayout({ children, footer, onClose }) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        {children}

        {footer && <View style={styles.buttonWrapper}>{footer}</View>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 16,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef4f5',
  },
  closeButtonText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    marginTop: 8,
  },
});