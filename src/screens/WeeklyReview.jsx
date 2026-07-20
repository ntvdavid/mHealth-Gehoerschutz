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

        <View style={weeklyScreen.scoreContainer}>
          <Card style={{ flex: 1, marginRight: 8 }}>
          <StatCard
            title="Dein Hearing Score"
            value="GUT"
            subtitle="90/100"
            color={COLORS.primary}
          />
          <ScoringRing />
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
    gap: 6,
    justifyContent: 'space-between',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  titelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  scrollView: {
    flexGrow: 1,
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