import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight, TriangleAlert, ShieldIcon, Baby, Tv, MusicIcon, Plane, Mic, HeadphonesIcon } from 'lucide-react-native';
import ScoreChart from '../../components/ui/ScoreChart';
import TipsInfoLayout from '../../components/layout/TipsInfoLayout';
import TipsSectionHeader from '../../components/tips/TipsSectionHeader';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import StatCard from '../../components/home/StatCard';
import { HighlightCard, HighlightCardContent } from '../../components/ui/HighlightCard';

export default function TipsKnowledgeScreen() {
  return (
    <TipsInfoLayout>
      <TipsSectionHeader
        title="Wusstest du schon?"
        children="Wissen, das dein Gehör schützt. Hier findest du alles, was du über Lärm, Hörverlust und Prävention wissen musst.">
      </TipsSectionHeader>

      <Card style={styles.card}>
        <CardHeader style={styles.cardHeader}>
          <TriangleAlert size={20} color="#007a7a" />
          <CardTitle style={styles.title}> 10 dB mehr bedeuten doppelt so laut </CardTitle>
        </CardHeader>

        <CardContent style={styles.scoreContainer}>
          <Text style={styles.contentText}>
            Unser Gehör nimmt Lautstärke logarithmisch wahr. Schon 10 dB mehr verdoppeln die empfundene Lautstärke – und vervierfachen die tatsächliche Schallenergie.
          </Text>
        </CardContent>

        <CardFooter style={styles.footer}>
          <TouchableOpacity style={styles.readMoreButton} activeOpacity={0.7}>
            <Text style={styles.readMoreText}>Ganzen Artikel lesen</Text>
            <ChevronRight size={16} color="#007a7a" />
          </TouchableOpacity>
        </CardFooter>
      </Card>

      <Card style={styles.card}>
        <CardContent style={styles.scoreContainer}>
          <View style={styles.ringWrapper}>
            {/* Hier wird der ScoreChart mit einem Beispielwert von 85 angezeigt */}
            <ScoreChart score={85} />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>Lange Musik, hohes Risiko</Text>
            <Text style={styles.contentText}>
              Musik über 85 dB über eine Stunde kann die Haarzellen im Innenohr dauerhaft schädigen. Diese erholen sich nicht mehr.
            </Text>
          </View>
        </CardContent>
        <CardFooter style={styles.footer}>
          <TouchableOpacity style={styles.readMoreButton} activeOpacity={0.7}>
            <Text style={styles.readMoreText}>Ganzen Artikel lesen</Text>
            <ChevronRight size={16} color="#007a7a" />
          </TouchableOpacity>
        </CardFooter>
      </Card>

      <Card style={styles.card}>
        <CardContent style={styles.shieldWrapper}>
          <View style={styles.iconWrapper}>
            <ShieldIcon size={40} color="#007a7a" />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>Gehörschäden sind meistens vermeidbar.</Text>
            <Text style={styles.contentText}>
              Musik über 85 dB über eine Stunde kann die Haarzellen im Innenohr dauerhaft schädigen. Diese erholen sich nicht mehr.
            </Text>
          </View>
        </CardContent>

        <CardFooter style={styles.footer}>
          <TouchableOpacity style={styles.readMoreButton} activeOpacity={0.7}>
            <Text style={styles.readMoreText}>Ganzen Artikel lesen</Text>
            <ChevronRight size={16} color="#007a7a" />
          </TouchableOpacity>
        </CardFooter>
      </Card>

      {/* kein Bock die StatCard neuzuschreiben, sodass jede Alltag Situation einen Progressbar besitzt. 
      100000000 mio prozent würde einen User nicht jucken. 
      */}

      {/* <TipsSectionHeader title="So laut ist dein Alltag">
      </TipsSectionHeader>

      <StatCard value={<Text><Baby /></Text>} subtitle="dB" color="#007a7a" />
      <StatCard value={<Text><Tv /></Text>} subtitle="dB" color="#007a7a" />
      <StatCard value={<Text><MusicIcon /></Text>} subtitle="dB" color="#007a7a" />
      <StatCard value={<Text><Plane /></Text>} subtitle="dB" color="#007a7a" />
      <StatCard value={<Text><Mic /></Text>} subtitle="dB" color="#007a7a" /> */}

      <HighlightCard style={styles.warningContainer}>
        <HighlightCardContent style={styles.topAlignedContainer}>
          <View style={styles.iconTopWrapper}>
            <HeadphonesIcon size={40} color="#9a3412" />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.contentTextTipp}>
              60/60-Regel: Höre maximal 60% der Lautstärke und nicht länger als 60 Minuten am Stück – das schont dein Gehör langfristig.
            </Text>
          </View>
        </HighlightCardContent>
      </HighlightCard>

    </TipsInfoLayout>
  );
}


const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    marginHorizontal: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  warningContainer: {
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fef3c7',
  },
  contentTextTipp: {

    color: '#9a3412',
    lineHeight: 22,
    fontWeight: '500',
  },
  topAlignedContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    gap: 16,
    width: '100%',
  },
  iconTopWrapper: {
    width: 40,
    marginTop: 2,
    marginRight: 8,
    paddingLeft: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 16,
    width: '100%',
  },
  shieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 10,
    width: '100%',
  },
  textWrapper: {
    flex: 1,
    flexShrink: 1,
    gap: 4,
  },
  ringWrapper: {
    transform: [{ scale: 0.7 }],
    width: 160,
    alignItems: 'center',
    marginVertical: -20,
  },
  contentText: {
    color: '#475569',
    lineHeight: 22,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
    marginTop: 8,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  readMoreText: {
    color: '#007a7a',
    fontWeight: '600',
    fontSize: 14,
  },
});