import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";
import { TYPOGRAPHY } from "../constants/typography";

export default function WidgetScreen({ onSkip, onAddWidget, }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Lautstärke immer im Blick
        </Text>

        <Text style={styles.description}>
          Füge das Gehörschutz-Widget zu deinem Home-Bildschirm
          hinzu und sieh deinen aktuellen Status auf einen Blick.
        </Text>

        <View style={styles.phonePreview}>
          <View style={styles.phoneTop} />

          <View style={styles.widgetCard}>
            <Feather
              name="volume-2"
              size={48}
              color="#2ECC71"
            />

            <View>
              <Text style={styles.dbValue}>84 dB</Text>
              <Text style={styles.safeText}>Sicher</Text>
            </View>
          </View>

          <View style={styles.appGrid}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <View key={item} style={styles.fakeApp} />
            ))}
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={onSkip}
          >
            <Text style={styles.skipButtonText}>
              Überspringen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddWidget}
          >
            <Text style={styles.addButtonText}>
              Widget hinzufügen
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.xxlarge,
    paddingBottom: SPACING.large,
  },

  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    textAlign: "center",
  },

  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.medium,
    lineHeight: 22,
  },

  phonePreview: {
    flex: 1,
    backgroundColor: "#315A73",
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    marginTop: SPACING.xlarge,
    padding: SPACING.large,
  },

  phoneTop: {
    width: 120,
    height: 24,
    borderRadius: 14,
    backgroundColor: "#24465C",
    alignSelf: "center",
    marginBottom: SPACING.large,
  },

  widgetCard: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: SPACING.large,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.large,
  },

  dbValue: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
  },

  safeText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.green,
  },

  appGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: SPACING.large,
    gap: SPACING.medium,
  },

  fakeApp: {
    width: "20%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  buttonRow: {
    flexDirection: "row",
    gap: SPACING.small,
    marginTop: SPACING.large,
  },

  skipButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical: SPACING.medium,
    alignItems: "center",
  },

  addButton: {
    flex: 1.4,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.medium,
    alignItems: "center",
  },

  skipButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: "bold",
    color: COLORS.text,
  },

  addButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: "bold",
    color: COLORS.background,
  },
});