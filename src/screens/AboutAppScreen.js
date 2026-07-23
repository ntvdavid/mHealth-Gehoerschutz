import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Card from "../components/cards/Card";

import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";
import { TYPOGRAPHY } from "../constants/typography";

export default function AboutAppScreen({ onBack }) {
    function handleContact() {
        Linking.openURL(
            "mailto:gehoer@example.com?subject=Kontakt%20zur%20Gehoerschutz-App"
        );
    }

    function handleOpenImprint() {
        // Später eigene Seite oder externe URL öffnen
        console.log("Impressum öffnen");
    }

    function handleOpenLicenses() {
        // Später eigene Seite oder externe URL öffnen
        console.log("Lizenzen öffnen");
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
                    <Text style={styles.title}>
                        Über die App
                    </Text>

                    <Text style={styles.subtitle}>
                        Version, Team und Kontakt
                    </Text>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.appIntro}>
                    <View style={styles.logoContainer}>
                        <FontAwesome 
                            name="hard-of-hearing" 
                            size={24} 
                            color="black" 
                        />
                    </View>

                    <Text style={styles.appName}>
                        Gehörschutz
                    </Text>

                    <Text style={styles.version}>
                        Version 1.0.0
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>
                    Unsere Mission
                </Text>

                <Card style={styles.missionCard}>
                    <Text style={styles.missionText}>
                        Gehörschutz hilft Menschen, die regelmäßig lauten
                        Umgebungen ausgesetzt sind, ein Bewusstsein für
                        Lautstärke und ihre möglichen Risiken zu entwickeln.
                    </Text>

                    <Text style={styles.missionText}>
                        Die App misst und visualisiert Lautstärke direkt über
                        das Smartphone, damit Belastungen frühzeitig erkannt
                        und langfristige Hörschäden vermieden werden können.
                    </Text>
                </Card>

                <Text style={styles.sectionTitle}>
                    Entwickelt von
                </Text>

                <Card style={styles.teamCard}>
                    <TeamMember name="Lorenz Vincent Gerau" />
                    <View style={styles.divider} />

                    <TeamMember name="Emily Krüger" />
                    <View style={styles.divider} />

                    <TeamMember name="Thien Vu David Nguyen" />
                    <View style={styles.divider} />

                    <TeamMember name="Alicia Nordmann" />
                    <View style={styles.divider} />

                    <TeamMember name="Bahram Qasemalizadeh" />
                    <View style={styles.divider} />

                    <TeamMember name="Gordian Matteo Reinhold" />
                </Card>

                <Text style={styles.sectionTitle}>
                    Informationen
                </Text>

                <Card style={styles.actionCard}>
                    <ActionItem
                        icon="mail"
                        title="Kontakt"
                        description="Fragen, Feedback oder Probleme melden"
                        onPress={handleContact}
                    />

                    <View style={styles.divider} />

                    <ActionItem
                        icon="file-text"
                        title="Impressum"
                        description="Rechtliche Angaben zur App"
                        onPress={handleOpenImprint}
                    />

                    <View style={styles.divider} />

                    <ActionItem
                        icon="code"
                        title="Open-Source-Lizenzen"
                        description="Verwendete Bibliotheken und Lizenzen"
                        onPress={handleOpenLicenses}
                    />
                </Card>

                <Card style={styles.thankYouCard}>
                    <Feather
                        name="heart"
                        size={21}
                        color={COLORS.primary}
                    />

                    <Text style={styles.thankYouText}>
                        Danke, dass du dabei hilfst, Gehörschutz zu testen und
                        weiterzuentwickeln.
                    </Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

function TeamMember({ name }) {
    return (
        <View style={styles.teamMember}>
            <View style={styles.avatar}>
                <Feather
                    name="user"
                    size={18}
                    color={COLORS.primary}
                />
            </View>

            <Text style={styles.teamMemberName}>
                {name}
            </Text>
        </View>
    );
}

function ActionItem({ icon, title, description, onPress }) {
    return (
        <TouchableOpacity
            style={styles.actionItem}
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

            <View style={styles.actionText}>
                <Text style={styles.actionTitle}>
                    {title}
                </Text>

                <Text style={styles.actionDescription}>
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
    appIntro: {
        alignItems: "center",
        marginBottom: SPACING.large,
    },
    logoContainer: {
        width: 78,
        height: 78,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EAF7F6",
        marginBottom: SPACING.medium,
    },
    appName: {
        ...TYPOGRAPHY.h1,
        color: COLORS.text,
        marginBottom: SPACING.xsmall,
    },
    version: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
    },
    sectionTitle: {
        ...TYPOGRAPHY.h4,
        color: COLORS.text,
        marginTop: SPACING.medium,
        marginBottom: SPACING.small,
    },
    missionCard: {
        gap: SPACING.medium,
    },
    missionText: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
        lineHeight: 22,
    },
    teamCard: {
        paddingVertical: SPACING.small,
        paddingHorizontal: SPACING.medium,
    },
    teamMember: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SPACING.medium,
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EAF7F6",
        marginRight: SPACING.medium,
    },
    teamMemberName: {
        ...TYPOGRAPHY.body,
        color: COLORS.text,
        fontWeight: "600",
    },
    actionCard: {
        paddingVertical: SPACING.small,
        paddingHorizontal: SPACING.medium,
    },
    actionItem: {
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
    actionText: {
        flex: 1,
        paddingRight: SPACING.small,
    },
    actionTitle: {
        ...TYPOGRAPHY.h4,
        color: COLORS.text,
        marginBottom: SPACING.xsmall,
    },
    actionDescription: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        lineHeight: 17,
    },
    divider: {
        height: 1,
        backgroundColor: "#E8ECEF",
        marginLeft: 54,
    },
    thankYouCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: SPACING.small,
        marginTop: SPACING.large,
        backgroundColor: "#EAF7F6",
    },
    thankYouText: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
        lineHeight: 20,
        flex: 1,
    },
});