import React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

export default function StatCardModal({
    visible,
    title,
    description,
    onClose,
}) {
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

                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {title}
                        </Text>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                            activeOpacity={0.7}
                            accessibilityRole="button"
                            accessibilityLabel="Popup schließen"
                        >
                            <Feather
                                name="x"
                                size={22}
                                color={COLORS.text}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.description}>
                        {description}
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={onClose}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>
                            Verstanden
                        </Text>
                    </TouchableOpacity>
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
    modalContainer: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: SPACING.large,
        paddingTop: SPACING.large,
        paddingBottom: SPACING.xlarge,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: SPACING.medium,
    },
    title: {
        ...TYPOGRAPHY.h2,
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
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        ...TYPOGRAPHY.h4,
        color: COLORS.background,
    },
});