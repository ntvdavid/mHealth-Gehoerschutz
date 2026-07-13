import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createAudioPlayer, setAudioModeAsync } from "expo-audio";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/header/Header";
import BottomNavigation from "../components/navigation/BottomNavigation";
import SideMenu from "../components/navigation/SideMenu";
import NoiseCircle from "../components/home/NoiseCircle";
import StatCard from "../components/home/StatCard";
import WeekStats from "../components/home/WeekStats";

import { COLORS } from "../constants/colors";

const REFERENCE_TONE = require("../../assets/calibration-tone.wav");

export default function HomeScreen({ audioMeter }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [referenceTonePlaying, setReferenceTonePlaying] = useState(false);
    const referencePlayerRef = useRef(null);

    const {
        currentCalibratedDb,
        isRecording,
        startRecording,
        stopRecording,
        runCalibration,
        confirmToneReady,
        isCalibrating,
        calibrationProgress,
        calibration,
    } = audioMeter;

    useEffect(() => {
        return () => {
            referencePlayerRef.current?.remove();
        };
    }, []);

    const handleStartCalibration = async () => {
        try {
            const result = await runCalibration({
                toneSource: "external",
            });

            if (result.lowSignalWarning) {
                Alert.alert(
                    "Kalibrierung abgeschlossen",
                    "Der Referenzton war zu schwach. Die Kalibrierung wurde gespeichert, könnte aber etwas ungenau sein.");
                    return;
            }

            Alert.alert(
                "Kalibrierung abgeschlossen",
                "Die Messung wurde erfolgreich kalibriert."
            );
        } catch (error) {
            Alert.alert(
                "Kalibrierung fehlgeschlagen",
                error.message
            );
        }
    };

    const handlePlayReferenceTone = async () => {
        if (referencePlayerRef.current) return;

        await setAudioModeAsync({
            allowsRecording: false,
            playsInSilentMode: true,
        });

        const player = createAudioPlayer(REFERENCE_TONE);

        player.loop = true;
        player.volume = 1;
        player.play();

        referencePlayerRef.current = player;
        setReferenceTonePlaying(true);
    };

    const handleStopReferenceTone = async () => {
        referencePlayerRef.current?.pause();
        referencePlayerRef.current?.remove();
        referencePlayerRef.current = null;

        await setAudioModeAsync({
            allowsRecording: true,
            playsInSilentMode: true,
        });

        setReferenceTonePlaying(false);
    };

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
                />

                <View style={styles.audioControls}>
                    <View style={styles.audioButtonRow}>
                        <TouchableOpacity
                            style={[
                                styles.audioButton,
                                isRecording && styles.audioButtonDisabled,
                            ]}
                            onPress={startRecording}
                            disabled={isRecording || isCalibrating}
                        >
                            <Text style={styles.audioButtonText}>Messung starten</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.audioButton,
                                !isRecording && styles.audioButtonDisabled,
                            ]}
                            onPress={stopRecording}
                            disabled={!isRecording || isCalibrating}
                        >
                            <Text style={styles.audioButtonText}>Messung stoppen</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.calibrationButton,
                            isCalibrating && styles.audioButtonDisabled,
                        ]}
                        onPress={handleStartCalibration}
                        disabled={isCalibrating}
                    >
                        <Text style={styles.calibrationButtonText}>
                            {calibration
                                ? "Neu kalibrieren"
                                : "Kalibrierung starten"}
                        </Text>
                    </TouchableOpacity>

                    {isCalibrating && calibrationProgress?.phase === "silence" && (
                        <Text style={styles.calibrationStatus}>
                            Ruhige Umgebung wird gemessen:{" "}
                            {calibrationProgress.percent} %
                        </Text>
                    )}

                    {isCalibrating && calibrationProgress?.phase === "tone" && (
                        <Text style={styles.calibrationStatus}>
                            Referenzton wird gemessen:{" "}
                            {calibrationProgress.percent} %
                        </Text>
                    )}

                    {isCalibrating &&
                        calibrationProgress?.phase === "awaiting-tone-ready" && (
                            <View style={styles.confirmationBox}>
                                <Text style={styles.calibrationStatus}>
                                    Starte jetzt den Referenzton auf dem zweiten Gerät.
                                </Text>

                                <TouchableOpacity
                                    style={styles.calibrationButton}
                                    onPress={confirmToneReady}
                                >
                                    <Text style={styles.calibrationButtonText}>
                                        Referenzton läuft - bestätigen
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <Text style={styles.referenceTitle}>
                            Zweites Gerät als Referenzton
                        </Text>

                        <View style={styles.audioButtonRow}>
                            <TouchableOpacity
                                style={[
                                    styles.audioButton,
                                    referenceTonePlaying && styles.audioButtonDisabled,
                                ]}
                                onPress={handlePlayReferenceTone}
                                disabled={referenceTonePlaying}
                            >
                                <Text style={styles.audioButtonText}>
                                    Ton abspielen
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.audioButton,
                                    !referenceTonePlaying && styles.audioButtonDisabled,
                                ]}
                                onPress={handleStopReferenceTone}
                                disabled={!referenceTonePlaying}
                            >
                                <Text style={styles.audioButtonText}>
                                    Ton stoppen
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                <View style={styles.statsContainer}>
                    <StatCard 
                        title="Tagesbelastung"
                        value="63%"
                    />

                    <StatCard 
                        title="Sichere Zeit"
                        value="1h 30min"
                        subtitle="verbleibend"
                    />

                    <StatCard 
                        title="Peak heute"
                        value="85 dB"
                        color={COLORS.warning}
                    />
                </View>
                <WeekStats/>
            </ScrollView>

            <BottomNavigation
                activeTab="home"
                onHomePress={() => {}}
                onHistoryPress={() => {}}
                onTipsPress={() => {}}
            />

            <SideMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
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

    audioControls: {
    gap: 10,
    alignItems: "center",
    },
    audioButtonRow: {
        flexDirection: "row",
        gap: 10,
    },
    audioButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    audioButtonDisabled: {
        opacity: 0.4,
    },
    audioButtonText: {
        color: COLORS.background,
        fontSize: 13,
        fontWeight: "bold",
    },
    calibrationButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingVertical: 11,
    },
    calibrationButtonText: {
        color: COLORS.background,
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
    },
    calibrationStatus: {
        color: COLORS.textSecondary,
        fontSize: 13,
        textAlign: "center",
    },
    confirmationBox: {
        gap: 10,
        alignItems: "center",
    },
    referenceTitle: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginTop: 6,
    },
});