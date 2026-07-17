import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react-native";

import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { HighlightCard, HighlightCardHeader, HighlightCardTitle, HighlightCardContent } from '../components/ui/HighlightCard';
import StatCard from "../components/home/StatCard";
import { COLORS } from "../constants/colors";
import TrendBanner from '../components/ui/TrendBanner';

export default function HistoryScreen() {
  return (
    <View style={historyScreen.view}>
      <ScrollView contentContainerStyle={historyScreen.scrollView} showsVerticalScrollIndicator={false}>

        <Text style={historyScreen.tageszusammenfassung}>
          Tageszusammenfassung
        </Text>

        <View style={historyScreen.datePickerContainer}>
          <TouchableOpacity style={historyScreen.iconButtonChevron}>
            <ChevronLeft size={16} color="#334155" />
          </TouchableOpacity>
          <Text style={historyScreen.dateText}>
            DATE AKTUALISIEREN
          </Text>
          <TouchableOpacity style={historyScreen.iconButtonChevron}>
            <ChevronRight size={16} color="#334155" />
          </TouchableOpacity>
        </View>

        <View style={historyScreen.statsContainer}>
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


        <TrendBanner />


        <HighlightCard>
          {/* Hier kommt die Warnbox */}
          <HighlightCardContent>
            {/* Hier kommt dann später echtes Warnbox hin */}
            <View style={historyScreen.warningContainer}>
              <Text style={historyScreen.warningText}>Warnbox Platzhalter</Text>
            </View>
          </HighlightCardContent>
        </HighlightCard>

      </ScrollView>
    </View>
  );
}

const historyScreen = StyleSheet.create({

  view: {
    flex: 1,
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

  tageszusammenfassung: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },

  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },

  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  iconButtonChevron: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',

  },

  card: {
    marginBottom: 20,
  },

  cardContent: {
    height: 160,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  warningContainer: {
    height: 160,
    backgroundColor: '#fff7ed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  slateText: {
    color: '#94a3b8',
  },

  warningText: {
    color: '#fed7aa',
  }
})