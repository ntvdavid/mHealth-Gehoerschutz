import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react-native";
import { TrendingDown, TrendingUp } from 'lucide-react-native';

import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { HighlightCard, HighlightCardHeader, HighlightCardTitle, HighlightCardContent } from '../components/ui/HighlightCard';
import StatCard from "../components/home/StatCard";
import StatCardModal from "../components/home/StatCardModal";
import { COLORS } from "../constants/colors";
import TrendBanner from '../components/ui/TrendBanner';
import { getDataForDate } from '../utils/FakeDataBase';
import DateSelector from '../components/ui/DateSelector';

export default function HistoryScreen() {

  const [selectedDate, setSelectedDate] = useState("2026-07-17");
  const [selectedCard, setSelectedCard] = useState(null);
  const { data, dangerous } = getDataForDate(selectedDate);
  const displayDate = selectedDate.split('-').reverse().join('.');

  const changeDay = (offset) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + offset);
    const newDateString = currentDate.toISOString().split('T')[0];
    setSelectedDate(newDateString);
  };

  const highestValue = data.length > 0 ? Math.max(...data.map(item => item.value)) : 0;
  const averageValue = data.length > 0 ? (data.reduce((sum, item) => sum + item.value, 0) / data.length).toFixed(2) : 0;
  const warningThreshold = 85; // Example threshold for warning

  let cardColor = '';
  let fontColor = '';
  let warningMessage = '';
  let icon = null;

  const avgDb = parseFloat(averageValue);

  if (avgDb < 70) {
    cardColor = '#dcfce7'; // Grün
    fontColor = '#166534';
    warningMessage = 'Alles im grünen Bereich! Dein Gehör war heute sicher.';

    icon = <TrendingDown size={20} color="#166534" style={{ marginTop: 8 }} />;
  } else if (avgDb < 80) {
    cardColor = '#ffedd5'; // Orange
    fontColor = '#9a3412';
    warningMessage = 'Achtung: Dein Gehör wurde heute moderat belastet.';
    icon = <TrendingUp size={20} color="#9a3412" style={{ marginTop: 8 }} />;
  } else {
    cardColor = '#fee2e2'; // Rot
    fontColor = '#991b1b';
    warningMessage = 'Warnung: Hohe Lärmbelastung heute. Gönn deinen Ohren Ruhe!';
    icon = <AlertTriangle size={20} color="#991b1b" style={{ marginTop: 8 }} />;
  }

  return (
    <View style={historyScreen.view}>
      <ScrollView contentContainerStyle={historyScreen.scrollView} showsVerticalScrollIndicator={false}>

        <Text style={historyScreen.tageszusammenfassung}>
          Tageszusammenfassung
        </Text>

        <View style={historyScreen.datePickerContainer}>
          {/* Pfeil nach Links: -1 Tag */}
          <TouchableOpacity
            style={historyScreen.iconButtonChevron}
            onPress={() => changeDay(-1)}
          >
            <ChevronLeft size={16} color="#334155" />
          </TouchableOpacity>

          <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate}>
            <Text style={historyScreen.dateText}>
              {displayDate}
            </Text>
          </DateSelector>

          {/* Pfeil nach Rechts: +1 Tag */}
          <TouchableOpacity
            style={historyScreen.iconButtonChevron}
            onPress={() => changeDay(1)}
          >
            <ChevronRight size={16} color="#334155" />
          </TouchableOpacity>
        </View>

        <View style={historyScreen.statsContainer}>
          <StatCard
            title="Ø Pegel"
            value={averageValue}
            subtitle=" dB"
            onPress={() =>
              setSelectedCard({
                title: "Ø Pegel",
                description: "Deine durchschnittliche Lautstärke über den gesamten Tag hinweg.",
              })
            }
          />

          <StatCard
            title="Peak"
            value={highestValue}
            color={highestValue >= warningThreshold ? COLORS.warning : COLORS.text}
            onPress={() =>
              setSelectedCard({
                title: "Peak",
                description: "Der höchste gemessene Lautstärkepegel des Tages.",
              })
            }
          />

          <StatCard
            title="Schädl. Bereich"
            value={dangerous}
            subtitle={"min"}
            onPress={() =>
              setSelectedCard({
                title: "Schädlicher Bereich",
                description: "Zeigt an, wie lange dein Gehör schädlichem Lärm ausgesetzt war.",
              })
            }
          />
        </View>

        <TrendBanner data={data} />

        <HighlightCard>
          <HighlightCardContent>
            <View style={[historyScreen.warningContainer, { backgroundColor: cardColor }]}>
              <Text style={[historyScreen.warningText, { color: fontColor }]}>
                {warningMessage}
              </Text>
              {icon}
            </View>
          </HighlightCardContent>
        </HighlightCard>

        <StatCardModal
          visible={selectedCard !== null}
          title={selectedCard?.title}
          description={selectedCard?.description}
          onClose={() => setSelectedCard(null)}
        />
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
    gap: 6,
    justifyContent: 'space-between',
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
    fontSize: 18,
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
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  warningText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  slateText: {
    color: '#94a3b8',
  },
})