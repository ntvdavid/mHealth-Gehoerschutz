import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { HighlightCard, HighlightCardHeader, HighlightCardTitle, HighlightCardContent } from '../components/ui/HighlightCard';
import { Card } from '../components/ui/Card';
import ScoringRing from '../components/ui/ScoringRing';
import { COLORS } from '../constants/colors';
import StatCard from '../components/home/StatCard';
import WeekStats from '../components/home/WeekStats';

export default function WeeklyReview() {
  return (

    <View style={weeklyScreen.view}>
      <ScrollView contentContainerStyle={weeklyScreen.scrollView}>
        <HighlightCard>
          {/* Hier kommt die Warnbox */}
          <HighlightCardContent>
            {/* Hier kommt dann später echtes Warnbox hin */}
            <View style={weeklyScreen.warningContainer}>
              <Text style={weeklyScreen.warningText}>Warnbox Platzhalter</Text>
            </View>
          </HighlightCardContent>
        </HighlightCard>


        <Card>
          <ScoringRing />
        </Card>

        <View style={weeklyScreen.statsContainer}>
          <StatCard
            title="Durchschnitt"
            value="?%"
          />

          <StatCard
            title="Peak"
            value="?"
            color={COLORS.warning}
          />

          <StatCard
            title="Schädl. Bereich"
            value="? dB"
          />
        </View>

        <WeekStats />
      </ScrollView>
    </View>
  );
}

const weeklyScreen = StyleSheet.create({
   view: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',


    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    marginHorizontal: 8,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  titelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    gap: 16,
  },
  warningContainer: {
    height: 160,
    backgroundColor: '#55fb5b',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningText: {
    color: '#50e054',
  },

});