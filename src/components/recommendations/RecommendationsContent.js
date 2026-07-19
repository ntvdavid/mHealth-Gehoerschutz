import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TipsSectionHeader from '../tips/TipsSectionHeader';
import RecommendationAccordion from './RecommendationAccordion';
import { COLORS } from '../../constants/colors';

export default function RecommendationsContent() {
  return (
    <>
      <TipsSectionHeader title="Was du jetzt tun kannst">
        Schütze dein Gehör direkt in einer lauten Umgebung. Diese Tipps helfen
        dir, dein Risiko zu senken und bewusster mit Lärm umzugehen.
      </TipsSectionHeader>

      <View style={styles.accordionList}>
        <RecommendationAccordion title="Ohrschutz nutzen" defaultOpen>
          Nutze Ohrstöpsel oder Kapselgehörschutz, wenn du dich in lauten
          Umgebungen befindest.
        </RecommendationAccordion>

        <RecommendationAccordion title="Lautstärke reduzieren">
          Stelle Musik, Videos oder Telefonate leiser ein, besonders wenn du
          Kopfhörer über längere Zeit nutzt.
        </RecommendationAccordion>

        <RecommendationAccordion title="Abstand zur Lärmquelle halten">
          Je weiter du von Lautsprechern, Maschinen oder Verkehr entfernt bist,
          desto geringer ist die Belastung für dein Gehör.
        </RecommendationAccordion>

        <RecommendationAccordion title="Lärmpausen einlegen">
          Gönne deinen Ohren regelmäßig ruhige Pausen, damit sie sich nach hoher
          Belastung erholen können.
        </RecommendationAccordion>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Was du generell tun kannst</Text>
        <Text style={styles.cardText}>
          Gute Vorbereitung hilft dir, laute Situationen bewusster zu erleben
          und dein Gehör langfristig zu schützen.
        </Text>

        <View style={styles.stepList}>
          <StepItem
            label="Vorher"
            text="Plane Gehörschutz ein und überlege, wie lange du dich in lauter Umgebung aufhalten wirst."
          />
          <StepItem
            label="Währenddessen"
            text="Halte Abstand zu Lautsprechern oder Maschinen und lege bewusst ruhige Pausen ein."
          />
          <StepItem
            label="Danach"
            text="Gib deinen Ohren Erholung und achte auf Warnzeichen wie Pfeifen, Druck oder dumpfes Hören."
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Situationsbezogene Tipps</Text>

        <View style={styles.tipList}>
          <TipItem
            title="Kopfhörer"
            text="Bleibe möglichst unter 60 % der maximalen Lautstärke. Gut sitzende oder geräuschreduzierende Kopfhörer helfen, weniger laut hören zu müssen."
          />
          <TipItem
            title="Konzert / Club"
            text="Trage Ohrstöpsel und stelle dich nicht direkt neben Lautsprecher. Schon etwas Abstand kann die Belastung senken."
          />
          <TipItem
            title="Arbeit / Maschinen"
            text="Verwende geeigneten Gehörschutz konsequent, auch wenn die laute Tätigkeit nur kurz dauert."
          />
        </View>
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.cardTitle}>Warum Pausen wichtig sind</Text>
        <Text style={styles.cardText}>
          Ruhige Phasen helfen deinen Ohren, sich nach Belastung zu erholen. Je
          früher du auf Warnzeichen reagierst, desto besser kannst du dein Gehör
          schützen.
        </Text>
      </View>
    </>
  );
}

function StepItem({ label, text }) {
  return (
    <View style={styles.stepItem}>
      <Text style={styles.stepLabel}>{label}</Text>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  );
}

function TipItem({ title, text }) {
  return (
    <View style={styles.tipItem}>
      <Text style={styles.tipTitle}>{title}</Text>
      <Text style={styles.tipText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  accordionList: {
    width: '100%',
    gap: 16,
  },
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
  stepList: {
    marginTop: 14,
    gap: 10,
  },
  stepItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  stepLabel: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepText: {
    color: COLORS.text || '#1e293b',
    fontSize: 14,
    lineHeight: 20,
  },
  tipList: {
    gap: 12,
    marginTop: 8,
  },
  tipItem: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  tipTitle: {
    color: COLORS.text || '#1e293b',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipText: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 21,
  },
  ruleBox: {
    backgroundColor: '#e0f2f1',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#b2dfdb',
    padding: 16,
  },
});