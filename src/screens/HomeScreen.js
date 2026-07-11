import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/header/Header";
import BottomNavigation from "../components/navigation/BottomNavigation";
import SideMenu from "../components/navigation/SideMenu";
import NoiseCircle from "../components/home/NoiseCircle";
import StatCard from "../components/home/StatCard";
import WeekStats from "../components/home/WeekStats";

import { COLORS } from "../constants/colors";


export default function HomeScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    const noiseLevel = 69; // Beispielwert, danach API

    return (
        <View style={styles.container}>
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

            <SideMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
            />
        </View>
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