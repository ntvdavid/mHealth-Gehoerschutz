import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useKeepAwake } from 'expo-keep-awake';

import HomeScreen from './src/screens/HomeScreen';

import FullscreenConsequencesScreen from './src/screens/recommendations/FullscreenConsequencesScreen';
import FullscreenRecommendationsScreen from './src/screens/recommendations/FullscreenRecommendationsScreen';

import TipsConsequencesScreen from './src/screens/tips/TipsConsequencesScreen';
import TipsRecommendationsScreen from './src/screens/tips/TipsRecommendationsScreen';
import TipsRisksScreen from './src/screens/tips/TipsRisksScreen';
import TipsTabBar from './src/components/tips/TipsTabBar';

import { COLORS } from './src/constants/colors';
import { NotificationService } from './src/services/notification';

import { audioMeteringEmitter } from './src/audio/useAudioMeteringService';
import { Home } from 'lucide-react-native';

export default function App() {
  useKeepAwake();

  useEffect(() => {
    NotificationService.init();
  }, []);

  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [demoMode, setDemoMode] = useState('home');
  const [alertFlowScreen, setAlertFlowScreen] =
    useState('recommendations');
  const [tipsScreen, setTipsScreen] =
    useState('recommendations');

  function handleClose() {
    setAlertFlowScreen('recommendations');
    setDemoMode('home');
  }

  // Funktion, um einen Lärm-Wert an den HomeScreen zu streamen
  const triggerFakeLarm = (dbValue) => {
    audioMeteringEmitter.emit({
      rawDbfs: -Math.abs(dbValue), // Simuliert dbFS Pegel
      calibratedDb: dbValue,       // Dein HomeScreen reagiert hierauf!
      isRecording: true
    });
  };

  if (demoMode === 'home') {
    return (
      <View style={styles.appShell}>
        <HomeScreen onNavigateToRecommendations={() => setDemoMode('fullmode')} />

        <View style={styles.homeTestButtons}>
          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => setDemoMode('tips')}
          >
            <Text style={styles.demoButtonText}>
              Tipps testen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={() =>triggerFakeLarm(120)}
          >
            <Text style={styles.demoButtonText}>
              Warnscreen testen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => setDemoMode('notification')}
          >
            <Text style={styles.demoButtonText}>
              Notification testen
            </Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }

  if (demoMode === 'tips') {
    return (
      <SafeAreaView style={styles.appShell}>
        <View style={styles.demoSwitcher}>
          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => setDemoMode('home')}
          >
            <Text style={styles.demoButtonText}>
              Zurück zum Homescreen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => setDemoMode('fullscreen')}
          >
            <Text style={styles.demoButtonText}>
              Fullscreen testen
            </Text>
          </TouchableOpacity>
        </View>

        <TipsTabBar
          activeTab={
            tipsScreen === 'consequences'
              ? 'recommendations'
              : tipsScreen
          }
          onChangeTab={setTipsScreen}
        />

        {tipsScreen === 'risks' && <TipsRisksScreen />}

        {tipsScreen === 'recommendations' && (
          <TipsRecommendationsScreen
            onShowConsequences={() =>
              setTipsScreen('consequences')
            }
          />
        )}

        {tipsScreen === 'consequences' && (
          <TipsConsequencesScreen
            onBackToRecommendations={() =>
              setTipsScreen('recommendations')
            }
          />
        )}

        {tipsScreen === 'knowledge' && (
          <View style={styles.placeholderScreen}>
            <Text style={styles.placeholderTitle}>
              Wissen
            </Text>

            <Text style={styles.placeholderText}>
              Dieser Screen wird von einem anderen
              Gruppenmitglied umgesetzt.
            </Text>
          </View>
        )}

        <View style={styles.fakeBottomNavigation}>
          <Text style={styles.fakeBottomNavigationText}>
            Home
          </Text>

          <Text style={styles.fakeBottomNavigationText}>
            Verlauf
          </Text>

          <Text style={styles.fakeBottomNavigationTextActive}>
            Tipps
          </Text>
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  if (demoMode === 'notification') {
    return (
      <SafeAreaView style={styles.notificationScreen}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setDemoMode('home')}
        >
          <Text style={styles.demoButtonText}>
            Zurück zum Homescreen
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Gehörschutz aktiv
        </Text>

        <Text style={styles.subtitle}>
          Der Bildschirm bleibt an, um dich durchgehend zu warnen.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Simuliere Lärm (85 dB)"
            onPress={() =>
              NotificationService.triggerVolumeAlert(85)
            }
            color="#d9534f"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Stoppe Lärm-Warnung"
            onPress={() =>
              NotificationService.cancelAlert()
            }
            color="#5cb85c"
          />
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.appShell}>
      <View style={styles.fullscreenSwitcher}>
        <TouchableOpacity
          style={styles.demoButton}
          onPress={() => setDemoMode('home')}
        >
          <Text style={styles.demoButtonText}>
            Zurück zum Homescreen
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={() => setDemoMode('tips')}
        >
          <Text style={styles.demoButtonText}>
            Tipps testen
          </Text>
        </TouchableOpacity>
      </View>

      {alertFlowScreen === 'consequences' ? (
        <FullscreenConsequencesScreen
          onClose={handleClose}
          onBackToRecommendations={() =>
            setAlertFlowScreen('recommendations')
          }
        />
      ) : (
        <FullscreenRecommendationsScreen
          onClose={handleClose}
          onShowConsequences={() =>
            setAlertFlowScreen('consequences')
          }
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  homeTestButtons: {
    position: 'absolute',
    top: 48,
    right: 16,
    gap: 8,
    zIndex: 20,
  },

  demoSwitcher: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  fullscreenSwitcher: {
    position: 'absolute',
    top: 48,
    left: 24,
    right: 24,
    zIndex: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  demoButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#eef4f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  demoButtonText: {
    color: COLORS.text,
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

  fakeBottomNavigation: {
    minHeight: 64,
    borderTopWidth: 1,
    borderTopColor: '#d8e2e7',
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 8,
  },

  fakeBottomNavigationText: {
    color: '#7a8790',
    fontSize: 12,
    fontWeight: 'bold',
  },

  fakeBottomNavigationTextActive: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },

  placeholderScreen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: COLORS.background,
  },

  placeholderTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  placeholderText: {
    color: '#52616b',
    fontSize: 14,
    lineHeight: 21,
  },
});