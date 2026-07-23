import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable, } from "react-native";
import { Feather } from "@expo/vector-icons";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

export default function WidgetPermissionModal({ visible, onAllow, onSkip, }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onSkip}
    >
      <Pressable style={styles.overlay} onPress={onSkip}>
        <Pressable style={styles.modal} onPress={() => {}}>
          <View style={styles.iconContainer}>
            <Feather
              name="grid"
              size={28}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.title}>
            Widget hinzufügen?
          </Text>

          <Text style={styles.description}>
            Möchtest du den aktuellen Lautstärkestatus direkt
            auf deinem Home-Bildschirm sehen?
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onSkip}
            >
              <Text style={styles.secondaryButtonText}>
                Nicht jetzt
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onAllow}
            >
              <Text style={styles.primaryButtonText}>
                Weiter
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.transparent,
    justifyContent: "center",
    paddingHorizontal: SPACING.large,
  },

  modal: {
    backgroundColor: COLORS.background,
    borderRadius: 24,
    padding: SPACING.large,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: SPACING.medium,
  },

  title: {
    ...TYPOGRAPHY.h2,
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

  buttonRow: {
    flexDirection: "row",
    gap: SPACING.small,
    marginTop: SPACING.large,
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical: SPACING.medium,
    alignItems: "center",
  },

  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.medium,
    alignItems: "center",
  },

  secondaryButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: "bold",
    color: COLORS.text,
  },

  primaryButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: "bold",
    color: COLORS.background,
  },
});