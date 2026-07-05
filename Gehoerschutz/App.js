import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, History, Lightbulb, X } from 'lucide-react-native';
import "./src/styles/tailwind.css"; // WICHTIG: Startet Tailwind für die gesamte App

import Dashboard from "./src/components/Dashboard";
// import AlarmScreen from "./src/app/components/AlarmScreen";
// import RisksScreen from "./src/app/components/RisksScreen";
// import RecommendationsScreen from "./src/app/components/RecommendationsScreen";
// import AwarenessScreen from "./src/app/components/AwarenessScreen";
import HistoryScreen from "./src/components/HistoryScreen";
// import WeeklyReview from "./src/app/components/WeeklyReview";

const tabs = [
  { id: "home", label: "Home", icon: <Home size={22} color="#a0b8b8" /> },
  { id: "history", label: "Verlauf", icon: <History size={22} color="#a0b8b8" /> },
  { id: "tips", label: "Tipps", icon: <Lightbulb size={22} color="#a0b8b8" /> },
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
        return <HistoryScreen />;

      case "tips":
        return <View><Text>Tips Platzhalter</Text></View>;
        
      default:
        return null;
    }
  }


  
  return (
    // Der Haupt-Container für den ganzen Bildschirm
    <View className="flex-1 bg-slate-50">
      
      {/* 1. Dein Haupt-Inhalt wird hier dynamisch geladen! */}
      <View className="flex-1">
        {renderMainContent()}
      </View>

      {/* Die untere Navigationsleiste (Bottom Nav) */}
      <View className="flex-row bg-white border-t border-slate-200 pb-8 pt-3 shadow-sm">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <TouchableOpacity 
              key={tab.id} 
              onPress={() => setActiveTab(tab.id)}
              className="flex-1 items-center justify-center gap-1"
            >
              {/* Wenn der Tab aktiv ist, machen wir das Icon dunkler/farbig, sonst hellgrau */}
              {tab.id === "home" && <Home size={22} color={active ? "#007a7a" : "#a0b8b8"} />}
              {tab.id === "history" && <History size={22} color={active ? "#007a7a" : "#a0b8b8"} />}
              {tab.id === "tips" && <Lightbulb size={22} color={active ? "#007a7a" : "#a0b8b8"} />}
              
              <Text className={`text-[10px] ${active ? 'font-bold text-[#007a7a]' : 'font-normal text-slate-400'}`}>
                {tab.label}
              </Text>
              
              {/* Der kleine Punkt unter dem aktiven Tab */}
              {active && <View className="w-1 h-1 rounded-full bg-[#007a7a] mt-0.5" />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
