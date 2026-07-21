import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {TrendingDown, TrendingUp} from 'lucide-react-native';


import { HighlightCard, HighlightCardContent } from '../components/ui/HighlightCard';
import { Card } from '../components/ui/Card';
import ScoreChart from '../components/ui/ScoreChart';
import { COLORS } from '../constants/colors';
import StatCard from '../components/home/StatCard';
import WeekStats from '../components/home/WeekStats';

export default function WeeklyReview() {

  //Später kommt dieser Score wahrscheinlich aus einer Datenbank oder über "props"
  const score = 30; 

  let cardColor = '';
  let fontColor = '';
  let warningMessage = '';
  let evaluation = '';
  let evalColor = '';
  let icon = null;

  if (score >= 65) {
    cardColor = '#dcfce7'; // Grün
    fontColor = '#166534';
    warningMessage = 'Alles im grünen Bereich! Dein Gehör ist gut geschützt.';
    evaluation = 'Gut';
    evalColor = COLORS.green;
    icon = <TrendingUp size={20} color={COLORS.green} />;
  } else if (score >= 40) {
    cardColor = '#ffedd5'; // Orange
    fontColor = '#9a3412';
    warningMessage = 'Achtung: Dein Gehör wurde diese Woche moderat belastet.';
    evaluation = 'Moderat';
    evalColor = COLORS.orange;
    icon = <TrendingDown size={20} color={COLORS.orange} />;
  } else {
    cardColor = '#fee2e2'; // Rot
    fontColor = '#991b1b';
    warningMessage = 'Warnung: Kritisches Level erreicht. Schone dein Gehör!';
    evaluation = 'Kritisch';
    evalColor = COLORS.warning;
    icon = <TrendingDown size={20} color={COLORS.warning} />;
  }

  return (
    <View style={weeklyScreen.view}>
      <ScrollView contentContainerStyle={weeklyScreen.scrollView}>
        
        <HighlightCard>
          <HighlightCardContent>
            <View style={[weeklyScreen.warningContainer, { backgroundColor: cardColor }]}>
              <Text style={[weeklyScreen.warningText, { color: fontColor }]}>
                {warningMessage}
              </Text>
              {icon}
            </View>
          </HighlightCardContent>
        </HighlightCard>

        <View style={weeklyScreen.scoreContainer}>
          <Card style={{ flex: 1, marginRight: 8 }}>
            <StatCard
              title="Dein Hearing Score"
              value={evaluation}
              subtitle="Je besser dein Score, desto besser schützt du dein Gehör."
              color={evalColor}
            />
            <ScoreChart score={score} />
          </Card>
        </View>

        <View style={weeklyScreen.statsContainer}>
          <StatCard
            title="Lautester Tag"
            subtitle="90 dB"
            value="Mittwoch"
            color={COLORS.orange}
          />
          <StatCard
            title="Sicherster Tag"
            subtitle="70 dB"
            value="Freitag"
            color={COLORS.green}
          />
          <StatCard
            title="Durchschnittl. Pegel"
            value="80 dB"
            color={COLORS.blue}
          />
        </View>

        <WeekStats />
      </ScrollView>
    </View>
  );
}

const weeklyScreen = StyleSheet.create({
  view: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    gap: 16,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 6,
    justifyContent: 'space-between',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  
  
  warningContainer: {
    height: 160,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, 
  },
  warningText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});