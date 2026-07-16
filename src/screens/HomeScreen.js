import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/header/Header";
import BottomNavigation from "../components/navigation/BottomNavigation";
import SideMenu from "../components/navigation/SideMenu";
import NoiseCircle from "../components/home/NoiseCircle";
import StatCard from "../components/home/StatCard";
import WeekStats from "../components/home/WeekStats";

import { COLORS } from "../constants/colors";

export default function HomeScreen({ audioMeter, onOpenCalibration, }) {
    const [menuVisible, setMenuVisible] = useState(false);

    const { 
        currentCalibratedDb,
        isRecording,
        isCalibrating,
        startRecording,
        stopRecording,
    } = audioMeter;

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
                onCalibrationPress={() => {
                    setMenuVisible(false);
                    onOpenCalibration();
                }}
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