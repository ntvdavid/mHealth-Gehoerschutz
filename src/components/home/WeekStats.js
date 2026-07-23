import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Card from "../cards/Card";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

export default function WeekStats({ weekStats }) {
    const weekData = [
        { day: "Mo", value: 60 },
        { day: "Di", value: 78 },
        { day: "Mi", value: 92 },
        { day: "Do", value: 88 },
        { day: "Fr", value: 50 },
        { day: "Sa", value: 80 },
        { day: "So", value: 75 },
    ];

    return (
        <Card>
            <Text style={styles.title}>Wochenrückblick</Text>

            <View style={styles.chart}>
                {weekData.map((item) => (
                    <View key={item.day} style={styles.column}>
                        <View 
                            style={[
                                styles.bar, 
                                {
                                    height: item.value,
                                    backgroundColor:
                                        item.value >= 85
                                        ? COLORS.warning
                                        : item.value >= 70
                                        ? COLORS.yellow
                                        : COLORS.green,
                                },
                            ]}
                        />

                        <Text style={styles.day}>{item.day}</Text>
                    </View>
                ))}
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    title: {
        ...TYPOGRAPHY.h3,
        color: COLORS.text,
        marginBottom: SPACING.large
    },
    chart: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        height:140
    },
    column: {
        alignItems: "center",
        flex: 1
    },
    bar: {
        width: 18,
        borderRadius: 9,
        marginBottom: 8
    },
    day: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary
    }
});