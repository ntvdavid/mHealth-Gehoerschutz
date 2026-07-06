import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import FullscreenConsequencesScreen from './src/screens/recommendations/FullscreenConsequencesScreen';
import FullscreenRecommendationsScreen from './src/screens/recommendations/FullscreenRecommendationsScreen';
import TipsConsequencesScreen from './src/screens/tips/TipsConsequencesScreen';
import TipsRecommendationsScreen from './src/screens/tips/TipsRecommendationsScreen';
import TipsRisksScreen from './src/screens/tips/TipsRisksScreen';
import TipsTabBar from './src/components/tips/TipsTabBar';
import { COLORS } from './src/constants/colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [demoMode, setDemoMode] = useState('fullscreen');
  const [alertFlowScreen, setAlertFlowScreen] = useState('recommendations');
  const [tipsScreen, setTipsScreen] = useState('recommendations');

  function handleClose() {
    Alert.alert('X gedrueckt', 'Spaeter geht es hier zurueck zum Warnscreen.');
  }

  if (demoMode === 'tips') {
    return (
      <SafeAreaView style={styles.appShell}>
        <View style={styles.demoSwitcher}>
          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => setDemoMode('fullscreen')}
          >
            <Text style={styles.demoButtonText}>Fullscreen testen</Text>
          </TouchableOpacity>
        </View>

        <TipsTabBar
          activeTab={tipsScreen === 'consequences' ? 'recommendations' : tipsScreen}
          onChangeTab={setTipsScreen}
        />

        {tipsScreen === 'risks' && <TipsRisksScreen />}

        {tipsScreen === 'recommendations' && (
          <TipsRecommendationsScreen
            onShowConsequences={() => setTipsScreen('consequences')}
          />
        )}

        {tipsScreen === 'consequences' && (
          <TipsConsequencesScreen
            onBackToRecommendations={() => setTipsScreen('recommendations')}
          />
        )}

        {tipsScreen === 'knowledge' && (
          <View style={styles.placeholderScreen}>
            <Text style={styles.placeholderTitle}>Wissen</Text>
            <Text style={styles.placeholderText}>
              Dieser Screen wird wahrscheinlich von einem anderen Gruppenmitglied
              umgesetzt.
            </Text>
          </View>
        )}

        <View style={styles.fakeBottomNavigation}>
          <Text style={styles.fakeBottomNavigationText}>Home</Text>
          <Text style={styles.fakeBottomNavigationText}>Verlauf</Text>
          <Text style={styles.fakeBottomNavigationTextActive}>Tipps</Text>
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <>
      <View style={styles.fullscreenSwitcher}>
        <TouchableOpacity
          style={styles.demoButton}
          onPress={() => setDemoMode('tips')}
        >
          <Text style={styles.demoButtonText}>Tipps testen</Text>
        </TouchableOpacity>
      </View>

      {alertFlowScreen === 'consequences' ? (
        <FullscreenConsequencesScreen
          onClose={handleClose}
          onBackToRecommendations={() => setAlertFlowScreen('recommendations')}
        />
      ) : (
        <FullscreenRecommendationsScreen
          onClose={handleClose}
          onShowConsequences={() => setAlertFlowScreen('consequences')}
        />
      )}

      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  demoSwitcher: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: COLORS.background,
  },
  fullscreenSwitcher: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 10,
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