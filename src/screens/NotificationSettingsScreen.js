import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import Card from "../components/cards/Card";

import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";
import { TYPOGRAPHY } from "../constants/typography";

export default function NotificationSettingsScreen({ onBack }) {
    const [criticalWarnings, setCriticalWarnings] = useState(true);
    const [vibration, setVibration] = useState(true);
    const [dailySummary, setDailySummary] = useState(false);
    const [hearingTips, setHearingTips] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                    activeOpacity={0.7}
                >
                    <Feather
                        name="arrow-left"
                        size={24}
                        color={COLORS.text}
                    />
                </TouchableOpacity>

                <View style={styles.headerText}>
                    <Text style={styles.title}>
                        Benachrichtigungen
                    </Text>

                    <Text style={styles.subtitle}>
                        Warnungen und Hinweise verwalten
                    </Text>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionTitle}>
                    Warnungen
                </Text>

                <Card style={styles.settingsCard}>
                    <SettingItem
                        icon="alert-triangle"
                        title="Kritische Lautstärke"
                        description="Warnung, wenn dein eingestellter Grenzwert überschritten wird."
                        value={criticalWarnings}
                        onValueChange={setCriticalWarnings}
                    />

                    <View style={styles.divider} />

                    <SettingItem
                        icon="smartphone"
                        title="Vibration"
                        description="Zusätzliches haptisches Feedback bei einer Warnung."
                        value={vibration}
                        onValueChange={setVibration}
                        disabled={!criticalWarnings}
                    />
                </Card>

                <Text style={styles.sectionTitle}>
                    Erinnerungen
                </Text>

                <Card style={styles.settingsCard}>
                    <SettingItem
                        icon="calendar"
                        title="Tägliche Zusammenfassung"
                        description="Erhalte am Abend eine Übersicht deiner Tagesbelastung."
                        value={dailySummary}
                        onValueChange={setDailySummary}
                    />

                    <View style={styles.divider} />

                    <SettingItem
                        icon="shield"
                        title="Tipps zum Gehörschutz"
                        description="Gelegentliche Hinweise zu Pausen und Gehörschutz."
                        value={hearingTips}
                        onValueChange={setHearingTips}
                    />
                </Card>

                <Card style={styles.infoCard}>
                    <Feather
                        name="info"
                        size={20}
                        color={COLORS.primary}
                    />

                    <Text style={styles.infoText}>
                        Warnungen funktionieren nur, wenn Benachrichtigungen
                        für die App in den Systemeinstellungen erlaubt sind.
                    </Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

function SettingItem({ icon, title, description, value, onValueChange, disabled = false }) {
    return (
        <View
            style={[
                styles.settingItem,
                disabled && styles.disabledItem,
            ]}
        >
            <View style={styles.iconContainer}>
                <Feather
                    name={icon}
                    size={21}
                    color={disabled ? COLORS.textSecondary : COLORS.primary}
                />
            </View>

            <View style={styles.settingText}>
                <Text style={styles.settingTitle}>
                    {title}
                </Text>

                <Text style={styles.settingDescription}>
                    {description}
                </Text>
            </View>

            <Switch
                value={value}
                onValueChange={onValueChange}
                disabled={disabled}
                trackColor={{
                    false: "#D9DEDF",
                    true: COLORS.primary,
                }}
                thumbColor={COLORS.background}
            />
        </View>
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
        marginBottom: SPACING.small,
        marginTop: SPACING.medium,
    },
    settingsCard: {
        paddingVertical: SPACING.small,
        paddingHorizontal: SPACING.medium,
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SPACING.medium,
    },
    disabledItem: {
        opacity: 0.45,
    },
    iconContainer: {
        width: 38,
        height: 38,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EAF7F6",
        marginRight: SPACING.medium,
    },
    settingText: {
        flex: 1,
        paddingRight: SPACING.small,
    },
    settingTitle: {
        ...TYPOGRAPHY.h4,
        color: COLORS.text,
        marginBottom: SPACING.xsmall,
    },
    settingDescription: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        lineHeight: 17,
    },
    divider: {
        height: 1,
        backgroundColor: "#E8ECEF",
        marginLeft: 54,
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