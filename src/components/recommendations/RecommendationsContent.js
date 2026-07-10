import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import RecommendationAccordion from './RecommendationAccordion';

export default function RecommendationsContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Was du jetzt tun kannst</Text>

      <Text style={styles.introText}>
        Schuetze dein Gehoer direkt nach einer lauten Umgebung. Diese Tipps
        helfen dir, dein Risiko zu senken und bewusster mit Laerm umzugehen.
      </Text>

      <View style={styles.accordionList}>
        <RecommendationAccordion title="Ohrschutz nutzen" defaultOpen>
          Nutze Ohrstoepsel oder Kapselgehoerschutz, wenn du dich in lauten
          Umgebungen befindest.
        </RecommendationAccordion>

        <RecommendationAccordion title="Lautstaerke reduzieren">
          Stelle Musik, Videos oder Telefonate leiser ein, besonders wenn du
          Kopfhoerer ueber laengere Zeit nutzt.
        </RecommendationAccordion>

        <RecommendationAccordion title="Laermpausen einlegen">
          Goenne deinen Ohren regelmaessig ruhige Pausen, damit sie sich nach
          hoher Belastung erholen koennen.
        </RecommendationAccordion>

        <RecommendationAccordion title="Abstand zur Laermquelle halten">
          Je weiter du von Lautsprechern, Maschinen oder Verkehr entfernt bist,
          desto geringer ist die Belastung fuer dein Gehoer.
        </RecommendationAccordion>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    marginBottom: 16,
  },
  introText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    lineHeight: 21,
    marginBottom: 24,
  },
  accordionList: {
    width: '100%',
  },
});