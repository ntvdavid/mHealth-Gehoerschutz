import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';

export default function TipsRisksScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.title}>Verstehe die Risiken</Text>

      <Text style={styles.introText}>
        Manche Alltagsgeraeusche sind lauter als gedacht und koennen das Gehoer
        dauerhaft schaedigen.
      </Text>

      <View style={[styles.riskCard, styles.highRiskCard]}>
        <View>
          <Text style={styles.riskTitle}>Konzert / Club</Text>
          <Text style={styles.riskSubtitle}>Typischer Spitzenpegel</Text>
        </View>
        <Text style={styles.redValue}>100 dB</Text>
      </View>

      <View style={[styles.riskCard, styles.mediumRiskCard]}>
        <View>
          <Text style={styles.riskTitle}>Baustelle</Text>
          <Text style={styles.riskSubtitle}>Typischer Spitzenpegel</Text>
        </View>
        <Text style={styles.orangeValue}>95 dB</Text>
      </View>

      <View style={[styles.riskCard, styles.highRiskCard]}>
        <View>
          <Text style={styles.riskTitle}>Max. Kopfhoererlautstaerke</Text>
          <Text style={styles.riskSubtitle}>Typischer Spitzenpegel</Text>
        </View>
        <Text style={styles.redValue}>105 dB</Text>
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleIcon}>♡</Text>
        <Text style={styles.ruleText}>
          <Text style={styles.ruleTextBold}>15-Minuten-Regel:</Text> Bei 100 dB
          sind laut WHO-Empfehlung maximal 15 Minuten Exposition pro Tag
          unbedenklich.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 32,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: 8,
  },
  introText: {
    ...TYPOGRAPHY.body,
    color: '#52616b',
    lineHeight: 21,
    marginBottom: 24,
  },
  riskCard: {
    minHeight: 74,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  highRiskCard: {
    backgroundColor: '#fff1f1',
    borderColor: '#ffc4c4',
  },
  mediumRiskCard: {
    backgroundColor: '#fff8ed',
    borderColor: '#ffd9a8',
  },
  riskTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  riskSubtitle: {
    color: '#52616b',
    fontSize: 12,
  },
  redValue: {
    color: '#e72d2d',
    fontSize: 22,
    fontWeight: 'bold',
  },
  orangeValue: {
    color: '#f28a16',
    fontSize: 22,
    fontWeight: 'bold',
  },
  ruleBox: {
    backgroundColor: '#e2f3f3',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ruleIcon: {
    color: COLORS.primary,
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  ruleText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    flex: 1,
    lineHeight: 21,
  },
  ruleTextBold: {
    fontWeight: 'bold',
  },
});