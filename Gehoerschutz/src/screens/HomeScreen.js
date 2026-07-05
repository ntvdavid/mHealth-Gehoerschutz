import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/header/Header";
import NoiseCircle from "../components/home/NoiseCircle";

import { COLORS } from "../constants/colors";


export default function HomeScreen() {
    // Dummy Werte
    const noiseLevel =69; // Beispielwert, danach API

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            
            <ScrollView 
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <NoiseCircle 
                    noiseLevel={noiseLevel}  
                />
            </ScrollView>
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
});