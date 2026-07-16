import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createAudioPlayer, setAudioModeAsync } from "expo-audio";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import NoiseCircle from "../components/home/NoiseCircle";

import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";
import { TYPOGRAPHY } from "../constants/typography";

const REFERENCE_TONE = require("../../assets/calibration-tone.wav");

export default function CalibrationScreen({ audioMeter, onBack }) {
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

                setAudioModeAsync({
                    allowsRecording: true,
                    playsInSilentMode: true,
                }).catch((error) => {
                    console.warn("Audiomodus konnte nicht zurückgesetzt werden:", error);
                });
            };
        }, []);

        const handleBack = () => {
            if (isCalibrating) {
                Alert.alert(
                    "Kalibrierung läuft",
                    "Bitte warte, bis die Kalibrierung abgeschlossen ist."
                );
                return;
            }
            onBack();
        };

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
        
            try {
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
            } catch (error) {
                Alert.alert(
                    "Referenzton konnte nicht abgespielt werden",
                    error.message
                );
            }
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
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBack}
                    >
                        <Feather
                            name="arrow-left"
                            size={24}
                            color={COLORS.text}
                        />
                    </TouchableOpacity>

                    <Text style={styles.title}>
                        Kalibrierung
                    </Text>

                    <View style={styles.headerPlaceholder} />
                </View>

                <ScrollView 
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <NoiseCircle 
                        noiseLevel={currentCalibratedDb}  
                    />

                    <Text style={styles.description}>
                        Kalibriere das Mikrofon
                    </Text>

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

                            <View style={styles.divider} />

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
                    </ScrollView>
            </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    ScrollView: {
        flex: 1,
        width: "100%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SPACING.large,
        paddingVertical: SPACING.medium,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F1F4F4",
    },
    title: {
        ...TYPOGRAPHY.h2,
        color: COLORS.text,
    },
    headerPlaceholder: {
        width: 40,
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        gap: 18,
        alignItems: "center",
    },
    description: {
        maxWidth: 420,
        color: COLORS.textSecondary,
        fontSize: 14,
        lineHeight: 21,
        textAlign: "center",
    },
    audioControls: {
        gap: 12,
        alignItems: "center",
        width: "100%",
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
    divider: {
        width: "80%",
        height: 1,
        marginVertical: 6,
        backgroundColor: "#D8E2E7",
    },
    referenceTitle: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "bold",
    },
    referenceDescription: {
        maxWidth: 420,
        color: COLORS.textSecondary,
        fontSize: 13,
        lineHeight: 19,
        textAlign: "center",
    },
});