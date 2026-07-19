import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Shield } from 'lucide-react-native';

import TipsInfoLayout from '../../components/layout/TipsInfoLayout';
import TipsSectionHeader from '../../components/tips/TipsSectionHeader';
import { COLORS } from '../../constants/colors';

export default function TipsRisksScreen() {
  return (
    <TipsInfoLayout>
      <TipsSectionHeader title="Verstehe die Risiken">
        Lärm wirkt nicht nur über die Lautstärke, sondern auch über die Dauer.
        Je lauter es wird, desto kürzer ist die empfohlene Hörzeit.
      </TipsSectionHeader>

      <ListeningTimeCard />

      <PeakLevelsCard />

      <View style={styles.ruleBox}>
        <Shield size={20} color={COLORS.primary} />

        <Text style={styles.ruleText}>
          <Text style={styles.ruleTextBold}>Merksatz:</Text> Schon wenige
          Dezibel mehr verkürzen die empfohlene Expositionszeit deutlich.
        </Text>
      </View>
    </TipsInfoLayout>
  );
}

function ListeningTimeCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Lautstärke × Zeit</Text>
      <Text style={styles.cardText}>
        Diese Richtwerte zeigen, wie schnell sich sichere Hörzeit bei höheren
        Pegeln verkürzt.
      </Text>

      <View style={styles.timeList}>
        <ListeningTimeRow level="80 dB" time="bis zu 40 Stunden pro Woche" />
        <ListeningTimeRow level="90 dB" time="bis zu 4 Stunden pro Woche" />
        <ListeningTimeRow level="100 dB" time="nur etwa 20 Minuten pro Woche" />
      </View>
    </View>
  );
}

function ListeningTimeRow({ level, time }) {
  return (
    <View style={styles.timeRow}>
      <Text style={styles.timeLevel}>{level}</Text>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
}

function PeakLevelsCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Typische Spitzenpegel</Text>
      <Text style={styles.cardText}>
        Manche Alltagssituationen erreichen sehr hohe Lautstärken, auch wenn sie
        nur kurz auftreten.
      </Text>

      <View style={styles.peakList}>
        <PeakLevelRow title="Baustelle" value="95 dB" variant="medium" />
        <PeakLevelRow title="Konzert / Club" value="100 dB" variant="high" />
        <PeakLevelRow title="Max. Kopfhörerlautstärke" value="105 dB" variant="high" />
      </View>
    </View>
  );
}

function PeakLevelRow({ title, value, variant }) {
  const isHighRisk = variant === 'high';

  return (
    <View style={styles.peakRow}>
      <View>
        <Text style={styles.peakTitle}>{title}</Text>
        <Text style={styles.peakSubtitle}>Typischer Spitzenpegel</Text>
      </View>

      <Text style={isHighRisk ? styles.redValue : styles.orangeValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    color: COLORS.text || '#1e293b',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardText: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 21,
  },
  timeList: {
    marginTop: 14,
    gap: 10,
  },
  timeRow: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  timeLevel: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeText: {
    color: COLORS.text || '#1e293b',
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
  },
  peakList: {
    marginTop: 14,
    gap: 10,
  },
  peakRow: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  peakTitle: {
    color: COLORS.text || '#1e293b',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  peakSubtitle: {
    color: '#64748b',
    fontSize: 12,
  },
  redValue: {
    color: '#dc2626',
    fontSize: 20,
    fontWeight: 'bold',
  },
  orangeValue: {
    color: '#f97316',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ruleBox: {
    backgroundColor: '#e0f2f1',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#b2dfdb',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  ruleText: {
    color: COLORS.text || '#1e293b',
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
  },
  ruleTextBold: {
    fontWeight: 'bold',
  },
});