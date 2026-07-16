import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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

import { COLORS } from "../constants/colors";


export default function HomeScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const [activeSettingsPage, setActiveSettingsPage] = useState(null);

    const noiseLevel = 69; // Beispielwert, danach API

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
                    noiseLevel={noiseLevel}  
                    onInfoPress={() => setInfoVisible(true)}
                />

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

            <BottomNavigation
                activeTab="home"
                onHomePress={() => {}}
                onHistoryPress={() => {}}
                onTipsPress={() => {}}
            />

            <SideMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
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