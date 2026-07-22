import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, } from 'react-native';
import { SafeAreaProvider, SafeAreaView, } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useKeepAwake } from 'expo-keep-awake';
import { Home, History, Lightbulb } from 'lucide-react-native';

import HomeScreen from './src/screens/HomeScreen';
import CalibrationScreen from './src/screens/CalibrationScreen';

import FullscreenConsequencesScreen from './src/screens/recommendations/FullscreenConsequencesScreen';
import FullscreenRecommendationsScreen from './src/screens/recommendations/FullscreenRecommendationsScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import WeeklyReview from './src/screens/WeeklyReview';

import InfoConsequencesScreen from './src/screens/info/InfoConsequencesScreen';
import InfoKnowledgeScreen from './src/screens/info/InfoKnowledgeScreen';
import InfoRecommendationsScreen from './src/screens/info/InfoRecommendationsScreen';
import InfoRisksScreen from './src/screens/info/InfoRisksScreen';

import InfoTabBar from './src/components/info/InfoTabBar';
import { hasSeenCalibrationPrompt, markCalibrationPromptSeen } from './src/audio/storage';

import { COLORS } from './src/constants/colors';
import { NotificationService } from './src/services/notification';
import { useAudioMeteringService } from './src/audio/useAudioMeteringService';

import { audioMeteringEmitter } from './src/audio/useAudioMeteringService';

const tabs = [
  { id: "home", label: "Home" },
  { id: "history", label: "Verlauf" },
  { id: "info", label: "Info" },
];

export default function App() {
  useKeepAwake();

  const audioMeter = useAudioMeteringService({
    referenceSpl: 70,
    storageIntervalMs: 1000,
  });

  const [
    notificationPermissionResolved,
    setNotificationPermissionResolved,
  ] = useState(false);

  const calibrationPromptCheckedRef = useRef(false);
  const microphonePermissionRequestedRef = useRef(false);

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await NotificationService.init();
      } catch (error) {
        console.warn(
          'Notification-Berechtigung konnte nicht initialisiert werden:',
          error
        );
      } finally {
        setNotificationPermissionResolved(true);
      }
    };
    initializeNotifications();
  }, []);

  useEffect(() => {
    if (
      !notificationPermissionResolved || microphonePermissionRequestedRef.current
    ) {
      return;
    }

    microphonePermissionRequestedRef.current = true;

    audioMeter.requestPermission().catch((error) => {
      console.warn(
        'Mikrofonberechtigung konnte nicht angefragt werden:',
          error
      );
    });
  }, [
    notificationPermissionResolved,
    audioMeter.requestPermission,
  ]);

  useEffect(() => {
    const allPermissionsResolved = 
      audioMeter.permissionResolved &&
      notificationPermissionResolved;

    if (
      !audioMeter.storageReady || !allPermissionsResolved || calibrationPromptCheckedRef.current
    ) {
      return;
    }

    calibrationPromptCheckedRef.current = true;

    const checkCalibrationPrompt = async () => {
      const hasSeenPrompt = await hasSeenCalibrationPrompt();

      if (hasSeenPrompt || audioMeter.calibration) {
        return;
      }

      setTimeout(() => {
        Alert.alert(
          'Kalibrierung erforderlich',
          'Bevor Lautstärkewerte angezeigt werden können, solltest du das Mikrofon einmal kalibrieren.',
          [
            {
              text: 'Abbrechen',
              style: 'cancel',
              onPress: async () => {
                await markCalibrationPromptSeen();
              },
            },
            {
              text: 'Zur Kalibrierung',
              onPress: async () => {
                await markCalibrationPromptSeen();
                setActiveTab('calibration');
              },
            },
          ]
          );
        }, 400);
      };

      checkCalibrationPrompt().catch((error) => {
        console.warn(
          'Kalibrierungshinweis konnte nicht geprüft werden:',
          error
        );
      });
    }, [
      audioMeter.storageReady,
      audioMeter.permissionResolved,
      audioMeter.calibration,
      notificationPermissionResolved,
    ]);

  // 1. HAUPT-NAVIGATION
  const [activeTab, setActiveTab] = useState("home");

  // 2. SUB-STATES FÜR DIE EINZELNEN SCREENS
  const [historyTab, setHistoryTab] = useState("Tagesrückblick");
  const [infoScreen, setInfoScreen] = useState('recommendations');
  const [alertFlowScreen, setAlertFlowScreen] = useState('recommendations');

  // Funktion, um einen Lärm-Wert an den HomeScreen zu streamen
  const triggerFakeLarm = (dbValue) => {
    audioMeteringEmitter.emit({
      rawDbfs: -Math.abs(dbValue), // Simuliert dbFS Pegel
      calibratedDb: dbValue,       // Dein HomeScreen reagiert hierauf!
      isRecording: true
    });
  };

  const renderMainContent = () => {
    if (activeTab === "home") {
      return (
        <View style={styles.appShell}>
          <HomeScreen
            audioMeter={audioMeter}
            onOpenCalibration={() => setActiveTab('calibration')}
            onNavigateToRecommendations={() => {
              setAlertFlowScreen('recommendations');
              setActiveTab('fullscreen');
            }} 
            onNavigateToNotificationTest={() => setActiveTab('notification')}
          />

          <StatusBar style="auto" />
        </View>
      );
    }

    if (activeTab === 'calibration') {
      return (
        <View style={styles.appShell}>
          <CalibrationScreen
            audioMeter={audioMeter}
            onBack={() => setActiveTab('home')}
          />

          <StatusBar style='auto'/>
        </View>
      );
    }

    if (activeTab === "history") {
      return (
        <SafeAreaView 
          style={styles.flex1}
          edges={['top']}
        >
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
        </SafeAreaView >
      );
    }

    if (activeTab === "info") {
      return (
        <SafeAreaView
          style={styles.appShell}
          edges={['top']}
        >
          <InfoTabBar activeTab={infoScreen === 'consequences' ? 'recommendations' : infoScreen} onChangeTab={setInfoScreen} />

          {infoScreen === 'risks' && <InfoRisksScreen />}
          
          {infoScreen === 'recommendations' && (
            <InfoRecommendationsScreen onShowConsequences={() => setInfoScreen('consequences')} />
          )}
          
          {infoScreen === 'consequences' && (
            <InfoConsequencesScreen onBackToRecommendations={() => setInfoScreen('recommendations')} />
          )}
          
          {infoScreen === 'knowledge' && <InfoKnowledgeScreen />}
          <StatusBar style="auto" />
        </SafeAreaView>
      );
    }

    if (activeTab === "fullscreen") {
      return (
        <View style={styles.appShell}>
          {alertFlowScreen === 'consequences' ? (
            <FullscreenConsequencesScreen
              onClose={() => setActiveTab('home')}
              onBackToRecommendations={() => setAlertFlowScreen('recommendations')}
            />
          ) : (
            <FullscreenRecommendationsScreen
              onClose={() => setActiveTab('home')}
              onShowConsequences={() => setAlertFlowScreen('consequences')}
            />
          )}
          <StatusBar style="auto" />
        </View>
      );
    }

    if (activeTab === "notification") {
      return (
        <SafeAreaView style={styles.notificationScreen}>
          <TouchableOpacity style={styles.backButton} onPress={() => setActiveTab('home')}>
            <Text style={styles.demoButtonText}>Zurück zum Homescreen</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Gehörschutz aktiv</Text>
          <Text style={styles.subtitle}>Der Bildschirm bleibt an, um dich durchgehend zu warnen.</Text>
          <View style={styles.buttonContainer}>
            <Button title="Simuliere Lärm-Warnung" onPress={() => NotificationService.triggerVolumeAlert(85)} color="#d9534f" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Stoppe Lärm-Warnung" onPress={() => NotificationService.cancelAlert()} color="#5cb85c" />
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      );
    }

    return null;
  };

  return (
    <SafeAreaProvider>
      <View style={styles.safeArea}>
        <View style={styles.flex1}>
          {renderMainContent()}
        </View>

        {/* Die untere Navigationsleiste wird NUR angezeigt, wenn wir in den normalen Tabs sind */}
        {['home', 'history', 'info'].includes(activeTab) && (
          <View style={styles.bottomNavContainer}>
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setActiveTab(tab.id)}
                  style={styles.tabButton}
                >
                  {tab.id === "home" && <Home size={22} color={active ? "#007a7a" : "#a0b8b8"} />}
                  {tab.id === "history" && <History size={22} color={active ? "#007a7a" : "#a0b8b8"} />}
                  {tab.id === "info" && <Lightbulb size={22} color={active ? "#007a7a" : "#a0b8b8"} />}
                  <Text style={[styles.tabTextBase, active ? styles.tabTextActive : styles.tabTextInactive]}>
                    {tab.label}
                  </Text>
                  {active && <View style={styles.activeTabDot} />}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // --- Basis-Styles ---
  flex1: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background || '#f8fafc',
  },
  appShell: {
    flex: 1,
    backgroundColor: COLORS.background || '#f8fafc',
  },

  // --- Bottom Navigation Styles (Die hatten gefehlt!) ---
  bottomNavContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingBottom: 32,
    paddingTop: 12,
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
    gap: 4,
  },
  tabTextBase: {
    fontSize: 10,
  },
  tabTextActive: {
    fontWeight: 'bold',
    color: '#007a7a',
  },
  tabTextInactive: {
    fontWeight: 'normal',
    color: '#94a3b8',
  },
  activeTabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#007a7a',
    marginTop: 2,
  },

  // --- History Styles (Die hatten auch gefehlt!) ---
  historyToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 4,
    marginHorizontal: 20,
    marginTop: 16,
  },
  historyToggleButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyToggleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  historyContentContainer: {
    flex: 1,
    marginTop: 16,
  },

  homeTestButtons: {
    position: 'absolute',
    top: 48,
    right: 16,
    gap: 8,
    zIndex: 20,
  },
  demoButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#eef4f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  demoButtonText: {
    color: COLORS.text || '#1e293b',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notificationScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 24,
    left: 20,
    backgroundColor: '#eef4f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 15,
    width: '80%',
  },
});
