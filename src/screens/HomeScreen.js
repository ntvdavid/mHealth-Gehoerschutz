import React, { useState, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/header/Header";
import BottomNavigation from "../components/navigation/BottomNavigation";
import SideMenu from "../components/navigation/SideMenu";
import NoiseCircle from "../components/home/NoiseCircle";
import StatCard from "../components/home/StatCard";
import StatCardModal from "../components/home/StatCardModal";
import WeekStats from "../components/home/WeekStats";
import DBInfo from "../components/home/DBInfo";
import NotificationSettingsScreen from "./NotificationSettingsScreen";
import PrivacySettingsScreen from "./PrivacySettingsScreen";
import AboutAppScreen from "./AboutAppScreen";
import { getTodayPeak } from "../audio/storage";

import NoiseAlertModal from "../components/layout/NoiseAlertModal";
import {NotificationService} from "../services/notification";

import { audioMeteringEmitter } from "../audio/useAudioMeteringService";
import { COLORS } from "../constants/colors";

export default function HomeScreen({ audioMeter, onOpenCalibration, onNavigateToRecommendations, onNavigateToNotificationTest }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [noiseLevel, setNoiseLevel] = useState(null);
    const [todayPeak, setTodayPeak] = useState(null);

    const [activeSettingsPage, setActiveSettingsPage] = useState(null);

    const isDemoMode = useRef(false);

    const loadTodayPeak = async () => {
        try {
            const peak = await getTodayPeak();
            setTodayPeak(peak);
        } catch (error) {
            console.warn(
                "[HomeScreen] Tages-Peak konnte nicht geladen werden:",
                error
            );
        }
    };

    useEffect(() => {
        loadTodayPeak();
    }, []);

    useEffect(() => {
        NotificationService.init();
        
        const unsubscribe = audioMeteringEmitter.on((sample) => {

            if (isDemoMode.current) {
                return;
            }

            if (!Number.isFinite(sample.calibratedDb)) {
                return;
            }

            const roundedDb = Math.round(sample.calibratedDb);
            
            setNoiseLevel(roundedDb);

            setTodayPeak((prevPeak) => {
                if (prevPeak === null) {
                    return sample.calibratedDb;
                }

                return Math.max(prevPeak, sample.calibratedDb);
            });

            const WARNING_THRESHOLD_DB = 100;

            if (roundedDb >= WARNING_THRESHOLD_DB && !alertVisible) {
                setAlertVisible(true);
                NotificationService.triggerVolumeAlert(roundedDb);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [alertVisible]);

    const handleTriggerDemoAlarm = () => {
        isDemoMode.current = true;
        const DEMO_DB_VALUE = 102;
        setNoiseLevel(DEMO_DB_VALUE);
        setAlertVisible(true);
        NotificationService.triggerVolumeAlert(DEMO_DB_VALUE);
    }


    const { 
        currentCalibratedDb,
        isRecording,
        isCalibrating,
        startRecording,
        stopRecording,
    } = audioMeter;

    if (activeSettingsPage === "notifications") {
        return (
            <NotificationSettingsScreen
                onBack={() => setActiveSettingsPage(null)}
            />
        );
    }

    if (activeSettingsPage === "privacy") {
        return (
            <PrivacySettingsScreen
                onBack={() => setActiveSettingsPage(null)}
            />
        );
    }

    if (activeSettingsPage === "about") {
        return (
            <AboutAppScreen
                onBack={() => setActiveSettingsPage(null)}
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header 
                onMenuPress={() => setMenuVisible(true)}
            />
            
            <ScrollView 
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <NoiseCircle 
                    noiseLevel={currentCalibratedDb}  
                    onInfoPress={() => setInfoVisible(true)}
                />

                <View style={styles.demoButtonCenterContainer}>
                    <TouchableOpacity
                        style={styles.demoButtonCenter}
                        onPress={handleTriggerDemoAlarm}
                    >
                        <Text style={styles.demoButtonText}>⚠ Demo: Alarm auslösen</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.measurementControls}>
                    <TouchableOpacity
                        style={[
                            styles.measurementButton,
                            isRecording && styles.measurementButtonDisabled,
                        ]}
                        onPress={startRecording}
                        disabled={isRecording || isCalibrating}
                    >
                        <Text style={styles.measurementButtonText}>
                            Messung starten
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.measurementButton,
                            !isRecording && styles.measurementButtonDisabled,
                        ]}
                        onPress={stopRecording}
                        disabled={!isRecording || isCalibrating}
                    >
                        <Text style={styles.measurementButtonText}>
                            Messung stoppen
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsContainer}>
                    <StatCard 
                        title="Tagesbelastung"
                        value="63%"
                        onPress={() =>
                            setSelectedCard({
                                title: "Tagesbelastung",
                                description: "Du hast heute bereits 63 % deiner empfohlenen täglichen Lärmbelastung erreicht.",
                            })
                        }
                    />

                    <StatCard 
                        title="Sichere Zeit"
                        value="1h 30min"
                        subtitle="verbleibend"
                        onPress={() =>
                            setSelectedCard({
                                title: "Sichere Zeit",
                                description: "Bei der aktuellen Lautstärke kannst du dich ungefähr noch 1 Stunde und 30 Minuten sicher aufhalten.",
                            })
                        }
                    />

                    <StatCard
                        title="Peak heute"
                        value={
                            todayPeak !== null
                                ? `${Math.round(todayPeak)} dB`
                                : "– dB"
                        }
                        color={COLORS.warning}
                        onPress={() =>
                            setSelectedCard({
                                title: "Peak heute",
                                description:
                                    todayPeak !== null
                                        ? `Der höchste heute gemessene Lautstärkewert beträgt ${Math.round(todayPeak)} dB.`
                                        : "Heute wurde noch kein Lautstärkewert gemessen.",
                            })
                        }
                    />
                </View>
                <WeekStats/>
            </ScrollView>

            <SideMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onCalibrationPress={() => {
                    setMenuVisible(false);
                    onOpenCalibration();
                }}
                onNotificationsPress={() => {
                    setMenuVisible(false);
                    setActiveSettingsPage("notifications");
                }}
                onPrivacyPress={() => {
                    setMenuVisible(false);
                    setActiveSettingsPage("privacy");
                }}
                onAboutPress={() => {
                    setMenuVisible(false);
                    setActiveSettingsPage("about");
                }}
                onNotificationTestPress={() => {
                    setMenuVisible(false);
                    onNavigateToNotificationTest();
                }}
            />

            <DBInfo
                visible={infoVisible}
                onClose={() => setInfoVisible(false)}
            />

            <StatCardModal
                visible={selectedCard !== null}
                title={selectedCard?.title}
                description={selectedCard?.description}
                onClose={() => setSelectedCard(null)}
            />

            <NoiseAlertModal
                visible={alertVisible}
                currentDb={noiseLevel ?? 0}
                onClose={() => {
                    setAlertVisible(false);
                    isDemoMode.current = false; // Reset demo mode when closing the alert
                    NotificationService.cancelAlert();
                }}
                onGoToRecommendations={onNavigateToRecommendations}
            />  
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 30,
        gap: 16,
    },
    demoButtonCenterContainer: {
        alignItems: "center",
        width: "100%",
        marginVertical: 4,
    },
    demoButtonCenter: {
        backgroundColor: "#ffebee",
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: COLORS.secondary,
    },
    demoButtonText: {
        color: COLORS.warning,
        fontWeight: "600",
        fontSize: 13,
        textAlign: "center",
    },
    statsContainer: {
        flexDirection: "row",
        gap: 12,
    },
    measurementControls: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
    },
    measurementButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    measurementButtonDisabled: {
        opacity: 0.4,
    },
    measurementButtonText: {
        color: COLORS.background,
        fontSize: 13,
        fontWeight: "bold",
    },
});