import React, { useState, useEffect } from "react";
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

import NoiseAlertModal from "../components/layout/NoiseAlertModal";
import {NotificationService} from "../services/notification";

import { audioMeteringEmitter } from "../audio/useAudioMeteringService";


import { COLORS } from "../constants/colors";

export default function HomeScreen({ audioMeter, onOpenCalibration, onNavigateToRecommendations }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [noiseLevel, setNoiseLevel] = useState(null);

    const [activeSettingsPage, setActiveSettingsPage] = useState(null);

    useEffect(() => {
        NotificationService.init();
        
        const unsubscribe = audioMeteringEmitter.on((sample) => {
            if (!Number.isFinite(sample.calibratedDb)) {
                return;
            }

            const roundedDb = Math.round(sample.calibratedDb);
            setNoiseLevel(roundedDb);

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

    const handleCloseAlert = () => {
        setAlertVisible(false);
        NotificationService.cancelAlert(); // Stoppt die Vibration sofort
    };

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
                        value="85 dB"
                        color={COLORS.warning}
                        onPress={() =>
                            setSelectedCard({
                                title: "Peak heute",
                                description:
                                    "Dies ist der höchste heute gemessene Lautstärkewert.",
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
        paddingTop: 12,
        paddingBottom: 30,
        gap: 16,
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