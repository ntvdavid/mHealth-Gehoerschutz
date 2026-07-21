import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg"; // <-- Der sichere Expo-Import

import Card from "../cards/Card";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

export default function ScoreChart({ score }) {
    const size = 200;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    const progress = score / 100;
    const strokeDashoffset = circumference - (progress * circumference);

    return (
        <Card style={styles.container}>
            <View style={{ width: size, height: size }}>
                <Svg width={size} height={size}>
                    {/* Der graue Hintergrund-Ring */}
                    <Circle
                        stroke="#e2e8f0"
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />
                    {/* Der farbige Fortschritts-Ring */}
                    <Circle
                        stroke={score >= 65 ? "#007a7a" : "#ff6b6b"}
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        rotation="-90"
                        originX={size / 2}
                        originY={size / 2}
                    />
                </Svg>
                <View style={styles.textContainer}>
                    <View style={styles.dbContainer}>
                        <Text style={styles.db}>{score}</Text>
                        <Text style={styles.unit}>/100</Text>
                    </View>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: SPACING.small,
        marginBottom: SPACING.medium,
    },
    textContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    dbContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 4,
    },
    db: {
        ...TYPOGRAPHY.h1,
        color: COLORS.text,
    },
    unit: {
        ...TYPOGRAPHY.h3,
        color: COLORS.text,
        marginBottom: 4,
    }
});