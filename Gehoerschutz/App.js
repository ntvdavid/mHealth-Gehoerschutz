import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Home, History, Lightbulb, X } from 'lucide-react-native';

import Dashboard from "./src/components/Dashboard";
import AwarenessScreen from "./src/components/AwarenessScreen";
import HistoryScreen from "./src/components/HistoryScreen";
import WeeklyReview from "./src/components/WeeklyReview";

const tabs = [
  { id: "home", label: "Home" },
  { id: "history", label: "Verlauf" },
  { id: "tips", label: "Tipps" },
];

export default function App() {

  // 2. Deine States
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [historyTab, setHistoryTab] = useState("Tagesrückblick");
  const [tipsTab, setTipsTab] = useState("Wissen");

  function renderMainContent() {
    switch (activeTab) {
      case "home":
        return <Dashboard />;

      case "history":
        return (
          <View style={styles.flex1}>
            <View style={styles.historyToggleContainer}>
              {(["Tagesrückblick", "Wochenrückblick"]).map((label) => (
                <TouchableOpacity
                  key={label}
                  onPress={() => setHistoryTab(label)}
                  style={[
                    styles.historyToggleButton,
                    { backgroundColor: historyTab === label ? "#007a7a" : "transparent" }
                  ]}
                >
                  <Text style={[
                    styles.historyToggleText,
                    { color: historyTab === label ? "white" : "#6b8080" }
                  ]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.historyContentContainer}>
              {historyTab === "Tagesrückblick" ? <HistoryScreen /> : <WeeklyReview />}
            </View>
          </View>
        );

      case "tips":
        return <AwarenessScreen />;

      default:
        return null;
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>

        <View style={styles.flex1}>
          {renderMainContent()}
        </View>

        {/* Die untere Navigationsleiste (Bottom Nav) */}
        <View style={styles.bottomNavContainer}>
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={styles.tabButton}
              >
                {/* Wenn der Tab aktiv ist, machen wir das Icon dunkler/farbig, sonst hellgrau */}
                {tab.id === "home" && <Home size={22} color={active ? "#007a7a" : "#a0b8b8"} />}
                {tab.id === "history" && <History size={22} color={active ? "#007a7a" : "#a0b8b8"} />}
                {tab.id === "tips" && <Lightbulb size={22} color={active ? "#007a7a" : "#a0b8b8"} />}

                <Text style={[
                  styles.tabTextBase,
                  active ? styles.tabTextActive : styles.tabTextInactive
                ]}>
                  {tab.label}
                </Text>

                {/* Der kleine Punkt unter dem aktiven Tab */}
                {active && <View style={styles.activeTabDot} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Hier ist das Herzstück: Dein natives StyleSheet
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc', // bg-slate-50
  },
  historyToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6', // bg-gray-100
    borderRadius: 16,           // rounded-2xl
    padding: 4,                 // p-1 (1 * 4)
    marginHorizontal: 20,       // mx-5 (5 * 4)
    marginTop: 16,              // mt-4 (4 * 4)
  },
  historyToggleButton: {
    flex: 1,
    paddingVertical: 8,         // py-2 (2 * 4)
    borderRadius: 12,           // rounded-xl
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyToggleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  historyContentContainer: {
    flex: 1,
    marginTop: 16,              // mt-4
  },
  bottomNavContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff', // bg-white
    borderTopWidth: 1,          // border-t
    borderTopColor: '#e2e8f0',  // border-slate-200
    paddingBottom: 32,          // pb-8 (8 * 4)
    paddingTop: 12,             // pt-3 (3 * 4)
    // shadow-sm
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,                     // gap-1 (1 * 4)
  },
  tabTextBase: {
    fontSize: 10,               // text-[10px]
  },
  tabTextActive: {
    fontWeight: 'bold',         // font-bold
    color: '#007a7a',           // text-[#007a7a]
  },
  tabTextInactive: {
    fontWeight: 'normal',       // font-normal
    color: '#94a3b8',           // text-slate-400
  },
  activeTabDot: {
    width: 4,                   // w-1
    height: 4,                  // h-1
    borderRadius: 2,            // rounded-full (Hälfte der Breite/Höhe)
    backgroundColor: '#007a7a', // bg-[#007a7a]
    marginTop: 2,               // mt-0.5 (0.5 * 4 = 2)
  }
});