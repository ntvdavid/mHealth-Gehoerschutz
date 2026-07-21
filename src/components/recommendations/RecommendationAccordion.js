import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InfoCardIcon from '../info/InfoCardIcon';
import { COLORS } from '../../constants/colors';

export default function RecommendationAccordion({
  title,
  children,
  icon,
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
        <View style={styles.titleRow}>
          {icon && <InfoCardIcon source={icon} size={48} />}
          <Text style={styles.title}>{title}</Text>
        </View>

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
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    minHeight: 60,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: COLORS.text || '#1e293b',
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
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
    borderTopColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 12,
  },
  contentText: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 21,
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingRight: 12,
  },
});
