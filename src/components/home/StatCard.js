import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Card from "../cards/Card";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

export default function StatCard({ title, value, subtitle, color = COLORS.text }) {
    return (
        <Card style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <Text style={[styles.value, { color }]}>{value}</Text>

            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 95,
        padding: SPACING.medium,
    },
    title: {
        ...TYPOGRAPHY.h4,
        color: COLORS.textSecondary,
        marginBottom: SPACING.small,
    },
    value: {
        ...TYPOGRAPHY.h4,
        marginBottom: SPACING.small,
    },
    subtitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
        marginTop: SPACING.xsmall,
    },
});