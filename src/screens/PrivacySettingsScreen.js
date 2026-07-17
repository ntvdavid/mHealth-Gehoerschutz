import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import Card from "../components/cards/Card";

import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";
import { TYPOGRAPHY } from "../constants/typography";

export default function PrivacySettingsScreen({ onBack }) {
    function handleDeleteData() {
        Alert.alert(
            "Messdaten löschen?",
            "Alle lokal gespeicherten Messdaten werden dauerhaft entfernt. Diese Aktion kann nicht rückgängig gemacht werden.",
            [
                {
                    text: "Abbrechen",
                    style: "cancel",
                },
                {
                    text: "Daten löschen",
                    style: "destructive",
                    onPress: () => {
                        // Später hier AsyncStorage oder Datenbank leeren
                        console.log("Messdaten wurden gelöscht");
                    },
                },
            ]
        );
    }

    function handleOpenSettings() {
        Linking.openSettings();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel="Zurück"
                >
                    <Feather
                        name="arrow-left"
                        size={24}
                        color={COLORS.text}
                    />
                </TouchableOpacity>

                <View style={styles.headerText}>
                    <Text style={styles.title}>Datenschutz</Text>

                    <Text style={styles.subtitle}>
                        Daten und Berechtigungen verwalten
                    </Text>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionTitle}>
                    Deine Daten
                </Text>

                <Card style={styles.settingsCard}>
                    <PrivacyInfoItem
                        icon="mic"
                        title="Mikrofon"
                        description="Wird benötigt, um die aktuelle Lautstärke zu messen. Audioaufnahmen werden nicht gespeichert."
                    />

                    <View style={styles.divider} />

                    <PrivacyInfoItem
                        icon="map-pin"
                        title="Standort"
                        description="Für die Lautstärkemessung ist kein Standortzugriff erforderlich."
                    />

                    <View style={styles.divider} />

                    <PrivacyInfoItem
                        icon="database"
                        title="Speicherung"
                        description="Deine Messwerte werden ausschließlich lokal auf deinem Gerät gespeichert."
                    />
                </Card>

                <Text style={styles.sectionTitle}>
                    Einstellungen
                </Text>

                <Card style={styles.actionCard}>
                    <ActionItem
                        icon="settings"
                        title="App-Berechtigungen"
                        description="Mikrofon- und Benachrichtigungsrechte verwalten"
                        onPress={handleOpenSettings}
                    />

                    <View style={styles.divider} />

                    <ActionItem
                        icon="file-text"
                        title="Datenschutzerklärung"
                        description="Informationen zur Verarbeitung deiner Daten"
                        onPress={() => {
                            // Später eigene Seite oder externen Link öffnen
                            console.log("Datenschutzerklärung öffnen");
                        }}
                    />
                </Card>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeleteData}
                    activeOpacity={0.8}
                >
                    <Feather
                        name="trash-2"
                        size={20}
                        color={COLORS.warning}
                    />

                    <View style={styles.deleteTextContainer}>
                        <Text style={styles.deleteTitle}>
                            Messdaten löschen
                        </Text>

                        <Text style={styles.deleteDescription}>
                            Alle lokal gespeicherten Verläufe entfernen
                        </Text>
                    </View>
                </TouchableOpacity>

                <Card style={styles.infoCard}>
                    <Feather
                        name="shield"
                        size={21}
                        color={COLORS.primary}
                    />

                    <Text style={styles.infoText}>
                        Die App analysiert nur die gemessene Lautstärke.
                        Gespräche und andere Audioinhalte werden weder
                        aufgezeichnet noch gespeichert.
                    </Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

function PrivacyInfoItem({ icon, title, description }) {
    return (
        <View style={styles.item}>
            <View style={styles.iconContainer}>
                <Feather
                    name={icon}
                    size={21}
                    color={COLORS.primary}
                />
            </View>

            <View style={styles.itemText}>
                <Text style={styles.itemTitle}>
                    {title}
                </Text>

                <Text style={styles.itemDescription}>
                    {description}
                </Text>
            </View>
        </View>
    );
}

function ActionItem({ icon, title, description, onPress }) {
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={onPress}
            activeOpacity={0.7}
            accessibilityRole="button"
        >
            <View style={styles.iconContainer}>
                <Feather
                    name={icon}
                    size={21}
                    color={COLORS.primary}
                />
            </View>

            <View style={styles.itemText}>
                <Text style={styles.itemTitle}>
                    {title}
                </Text>

                <Text style={styles.itemDescription}>
                    {description}
                </Text>
            </View>

            <Feather
                name="chevron-right"
                size={21}
                color={COLORS.textSecondary}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingHorizontal: SPACING.large,
        paddingTop: SPACING.medium,
        paddingBottom: SPACING.large,
    },
    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        marginRight: SPACING.medium,
    },
    headerText: {
        flex: 1,
    },
    title: {
        ...TYPOGRAPHY.h2,
        color: COLORS.text,
        marginBottom: SPACING.xsmall,
    },
    subtitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
    },
    content: {
        paddingHorizontal: SPACING.large,
        paddingBottom: SPACING.xlarge,
    },
    sectionTitle: {
        ...TYPOGRAPHY.h4,
        color: COLORS.text,
        marginTop: SPACING.medium,
        marginBottom: SPACING.small,
    },
    settingsCard: {
        paddingVertical: SPACING.small,
        paddingHorizontal: SPACING.medium,
    },
    actionCard: {
        paddingVertical: SPACING.small,
        paddingHorizontal: SPACING.medium,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SPACING.medium,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EAF7F6",
        marginRight: SPACING.medium,
    },
    itemText: {
        flex: 1,
        paddingRight: SPACING.small,
    },
    itemTitle: {
        ...TYPOGRAPHY.h4,
        color: COLORS.text,
        marginBottom: SPACING.xsmall,
    },
    itemDescription: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        lineHeight: 17,
    },
    divider: {
        height: 1,
        backgroundColor: "#E8ECEF",
        marginLeft: 56,
    },
    deleteButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SPACING.large,
        padding: SPACING.medium,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#F3C5C7",
        backgroundColor: "#FFF5F5",
    },
    deleteTextContainer: {
        flex: 1,
        marginLeft: SPACING.medium,
    },
    deleteTitle: {
        ...TYPOGRAPHY.h4,
        color: COLORS.warning,
        marginBottom: SPACING.xsmall,
    },
    deleteDescription: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
    },
    infoCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: SPACING.small,
        marginTop: SPACING.large,
        backgroundColor: "#EAF7F6",
    },
    infoText: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
        lineHeight: 20,
        flex: 1,
    },
});