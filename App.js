import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useKeepAwake } from 'expo-keep-awake';

import HomeScreen from './src/screens/HomeScreen';
import CalibrationScreen from './src/screens/CalibrationScreen';

import FullscreenConsequencesScreen from './src/screens/recommendations/FullscreenConsequencesScreen';
import FullscreenRecommendationsScreen from './src/screens/recommendations/FullscreenRecommendationsScreen';

import TipsConsequencesScreen from './src/screens/tips/TipsConsequencesScreen';
import TipsRecommendationsScreen from './src/screens/tips/TipsRecommendationsScreen';
import TipsRisksScreen from './src/screens/tips/TipsRisksScreen';
import TipsTabBar from './src/components/tips/TipsTabBar';
import { hasSeenCalibrationPrompt, markCalibrationPromptSeen } from './src/audio/storage';

import { COLORS } from './src/constants/colors';
import { NotificationService } from './services/notification';
import { useAudioMeteringService } from './src/audio/useAudioMeteringService';
import { getNoiseStatus } from './src/utils/getNoiseStatus';

export default function App() {
  useKeepAwake();

  const [
    notificationPermissionResolved,
    setNotificationPermissionResolved,
  ] = useState(false);

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

  return (
    <SafeAreaProvider>
      <AppContent
        notificationPermissionResolved={
          notificationPermissionResolved
        } />
    </SafeAreaProvider>
  );
}

const WARNING_THRESHOLD_DB = 100;

function AppContent({
  notificationPermissionResolved,
}) {
    const [demoMode, setDemoMode] = useState('home');
    const [alertFlowScreen, setAlertFlowScreen] =
      useState('recommendations');
    const [tipsScreen, setTipsScreen] =
      useState('recommendations');

    const audioMeter = useAudioMeteringService({ referenceSpl: 70, storageIntervalMs: 1000 });
    const calibrationPromptCheckedRef = useRef(false);
    const microphonePermissionRequestedRef = useRef(false);
    const warningTriggeredRef = useRef(false);

    const currentDb = audioMeter.currentCalibratedDb;
    const noiseStatus = getNoiseStatus(currentDb);
    const displayDb = Number.isFinite(currentDb)
      ? `${Math.round(currentDb)} dB`
      : null;

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
      if (
        demoMode === 'home' &&
        audioMeter.isRecording &&
        Number.isFinite(currentDb) &&
        currentDb >= WARNING_THRESHOLD_DB
      ) {
        setDemoMode('notification');
      }
    }, [demoMode, audioMeter.isRecording, currentDb]);

    useEffect(() => {
      if (demoMode !== 'notification') {
        warningTriggeredRef.current = false;
        return;
      }

      if (
        !warningTriggeredRef.current &&
        Number.isFinite(currentDb) &&
        currentDb >= WARNING_THRESHOLD_DB
      ) {
        warningTriggeredRef.current = true;
        NotificationService.triggerVolumeAlert(Math.round(currentDb));
      }
    }, [demoMode, currentDb]);

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
                  setDemoMode('calibration');
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

  function handleClose() {
    setAlertFlowScreen('recommendations');
    setDemoMode('home');
  }

  if (demoMode === 'home') {
    return (
      <View style={styles.appShell}>
        <HomeScreen 
          audioMeter={audioMeter}
          onOpenCalibration={() =>
            setDemoMode('calibration')
          } 
        />

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
            onPress={() => setDemoMode('fullscreen')}
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

  if (demoMode === 'calibration') {
    return (
      <View style={styles.appShell}>
        <CalibrationScreen
          audioMeter={audioMeter}
          onBack={() => setDemoMode('home')}
        />

        <StatusBar style='auto'/>
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
          Lärmwarnung
        </Text>

        <Text style={styles.subtitle}>
          {displayDb
            ? `Aktueller Pegel: ${displayDb}. Max. empfohlene Expositionsdauer: ${noiseStatus.exposure}.`
            : 'Messung läuft noch oder Kalibrierung fehlt.'}
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title={`Simuliere Lärm (${WARNING_THRESHOLD_DB} dB)`}
            onPress={() =>
              NotificationService.triggerVolumeAlert(WARNING_THRESHOLD_DB)
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