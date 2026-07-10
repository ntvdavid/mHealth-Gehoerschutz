import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';

export default function ConsequencesContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Warum Laerm gefaehrlich sein kann</Text>

      <Text style={styles.introText}>
        Laute Umgebungen koennen dein Gehoer belasten. Besonders kritisch wird
        es, wenn hohe Lautstaerken lange anhalten oder regelmaessig auftreten.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Kurzfristige Folgen</Text>
        <Text style={styles.infoText}>
          Nach starker Laermbelastung koennen Ohrdruck, Piepen oder ein
          dumpfes Hoergefuehl auftreten. Das ist ein Warnsignal deines Koerpers.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Langfristige Folgen</Text>
        <Text style={styles.infoText}>
          Wiederholter Laerm kann das Risiko fuer dauerhafte Hoerschaeden
          erhoehen. Diese Schaeden entstehen oft langsam und werden erst spaet
          bemerkt.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Warum Pausen wichtig sind</Text>
        <Text style={styles.infoText}>
          Ruhige Phasen helfen deinen Ohren, sich zu erholen. Je frueher du auf
          Warnzeichen reagierst, desto besser kannst du dein Gehoer schuetzen.
        </Text>
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
  infoBox: {
    backgroundColor: '#eef4f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  infoTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: 8,
  },
  infoText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    lineHeight: 21,
  },
});