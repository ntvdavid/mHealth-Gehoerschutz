import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';

export default function RecommendationAccordion({
  title,
  children,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  function toggleAccordion() {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleAccordion}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.icon}>{isOpen ? '-' : '+'}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.content}>
          <Text style={styles.contentText}>{children}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d8e2e7',
    marginBottom: 12,
    overflow: 'hidden',
  },
  header: {
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    flex: 1,
    paddingRight: 12,
  },
  icon: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    width: 28,
    textAlign: 'center',
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: '#d8e2e7',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  contentText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    lineHeight: 21,
  },
});