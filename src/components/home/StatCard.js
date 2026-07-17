import React from "react";
import {  Text, StyleSheet, TouchableOpacity } from "react-native";

import Card from "../cards/Card";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

export default function StatCard({ title, value, subtitle, color = COLORS.text, onPress }) {
    return (
        <TouchableOpacity
            style={styles.touchable}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <Card style={styles.container}>
                <Text style={styles.title}>{title}</Text>

                <Text style={[styles.value, { color }]}>
                    {value}
                </Text>

                {subtitle && (
                    <Text style={styles.subtitle}>
                        {subtitle}
                    </Text>
                )}
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchable: {
        flex: 1,
    },
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