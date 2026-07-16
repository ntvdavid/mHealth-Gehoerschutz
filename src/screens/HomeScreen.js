import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/header/Header";
import BottomNavigation from "../components/navigation/BottomNavigation";
import SideMenu from "../components/navigation/SideMenu";
import NoiseCircle from "../components/home/NoiseCircle";
import StatCard from "../components/home/StatCard";
import WeekStats from "../components/home/WeekStats";

import NoiseAlertModal from "../components/layout/NoiseAlertModal";
import {NotificationService} from "../services/notification";

import { audioMeteringEmitter } from "../audio/useAudioMeteringService";


import { COLORS } from "../constants/colors";
import NoiseAlertModal from "../components/layout/NoiseAlertModal";


export default function HomeScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [noiseLevel, setNoiseLevel] = useState(69); // Beispielwert, danach API

    useEffect(() => {
        NotificationService.init();
        
        const unsubscribe = audioMeteringEmitter.on((sample) => {
            // Hole kalibrierten Wert. Falls noch nicht kalibriert, nutze dBFS-Rohwert positiviert.
            let currentDb = sample.calibratedDb;
            if (currentDb === null || currentDb === undefined) {
                currentDb = Math.abs(sample.rawDbfs); 
            }

            const roundedDb = Math.round(currentDb);
            setNoiseLevel(roundedDb);

            // 3. Wenn die Lautstärke >= 85 dB steigt und der Alarm noch nicht aktiv ist
            if (roundedDb >= 85 && !alertVisible) {
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
                    noiseLevel={noiseLevel}  
                />

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

            <NoiseAlertModal
                visible={alertVisible}
                currentDb={noiseLevel}
                onClose={handleCloseAlert}
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
});