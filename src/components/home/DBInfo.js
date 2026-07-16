import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

const DECIBEL_EXAMPLES = [
    {
        label: "Flüstern",
        value: "30 dB",
        color: COLORS.primary,
    },
    {
        label: "Gespräch",
        value: "60 dB",
        color: COLORS.primary,
    },
    {
        label: "Stadtverkehr",
        value: "80 dB",
        color: COLORS.yellow,
    },
    {
        label: "Konzert",
        value: "100 dB",
        color: COLORS.warning,
    },
    {
        label: "Düsenjet",
        value: "140 dB",
        color: COLORS.warning,
    },
];

export default function DecibelInfoModal({ visible, onClose }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Pressable
                    style={styles.backdrop}
                    onPress={onClose}
                />

                <View style={styles.panel}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Was ist ein Dezibel (dB)?
                        </Text>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                            activeOpacity={0.7}
                        >
                            <Feather
                                name="x"
                                size={22}
                                color={COLORS.text}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.description}>
                        Dezibel (dB) ist die Maßeinheit für Lautstärke.
                        Die Skala ist{" "}
                        <Text style={styles.bold}>logarithmisch</Text>
                        {" "}– das bedeutet: 10 dB mehr werden ungefähr als{" "}
                        <Text style={styles.bold}>doppelt</Text>
                        {" "} so laut wahrgenommen.
                    </Text>

                    <View style={styles.examples}>
                        {DECIBEL_EXAMPLES.map((example) => (
                            <View
                                key={example.label}
                                style={styles.exampleRow}
                            >
                                <Text style={styles.exampleLabel}>
                                    {example.label}
                                </Text>

                                <Text
                                    style={[
                                        styles.exampleValue,
                                        { color: example.color },
                                    ]}
                                >
                                    {example.value}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.warningBox}>
                        <Feather
                            name="alert-triangle"
                            size={20}
                            color={COLORS.orange}
                        />

                        <Text style={styles.warningText}>
                            Ab 85 dB kann dauerhafter Lärm das Gehör
                            schädigen. Je höher die Lautstärke, desto
                            kürzer sollte die Belastungszeit sein.
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS.transparent,
    },
    panel: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: SPACING.large,
        paddingTop: SPACING.large,
        paddingBottom: SPACING.xlarge,
        maxHeight: "82%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: SPACING.medium,
    },
    title: {
        ...TYPOGRAPHY.h3,
        color: COLORS.text,
        flex: 1,
        marginRight: SPACING.medium,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
    },
    description: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
        lineHeight: 22,
        marginBottom: SPACING.large,
    },
    bold: {
        fontWeight: "700",
        color: COLORS.text,
    },
    examples: {
        marginBottom: SPACING.large,
    },
    exampleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E8ECEF",
    },
    exampleLabel: {
        ...TYPOGRAPHY.body,
        color: COLORS.text,
    },
    exampleValue: {
        ...TYPOGRAPHY.body,
        fontWeight: "700",
    },
    warningBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: SPACING.small,
        backgroundColor: "#FFF7E8",
        borderRadius: 14,
        padding: SPACING.medium,
    },
    warningText: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
        lineHeight: 20,
        flex: 1,
    },
});