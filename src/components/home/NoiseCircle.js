import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import Card from "../cards/Card";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";
import { getNoiseStatus } from "../../utils/getNoiseStatus";

export default function NoiseCircle({ noiseLevel }) {
    const hasNoiseLevel = Number.isFinite(noiseLevel);

    const status = hasNoiseLevel
        ? getNoiseStatus(noiseLevel)
        : { text: "Nicht kalibriert", color: COLORS.textSecondary };

    const displayNoiseLevel = hasNoiseLevel
        ? Math.round(noiseLevel)
        : "--";

    return (
        <Card style={styles.container}>
            <View style={[styles.circle, { borderColor: status.color }]}>
                <View style={styles.dbContainer}>
                    <Text style={styles.db}>{displayNoiseLevel}</Text>
                    <Text style={styles.unit}>dB</Text>

                    <TouchableOpacity
                        style={styles.infoButton}
                        onPress={() => {
                            // Hier später Modal öffnen
                        }}
                    >
                        <Feather
                            name="info"
                            size={18}
                            color={COLORS.textSecondary}
                        />
                    </TouchableOpacity>

                </View>

                <Text style={[styles.status, { color: status.color }]}>
                    {status.text}
                </Text>
                {status.exposure && (
                  <Text style={styles.exposure}>
                    Max. Expositionsdauer:{"\n"}
                    {status.exposure}
                  </Text>
                )}
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: SPACING.small,
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 10,
        
        justifyContent: "center",
        alignItems: "center",

        marginBottom: SPACING.medium,
    },
    dbContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 4,
    },
    infoButton: {
        position: "absolute",
        right: -20,
        top: 4,
    },
    db: {
        ...TYPOGRAPHY.h1,
        color: COLORS.text,
    },
    unit: {
        ...TYPOGRAPHY.h3,
        color: COLORS.text,
    },
    status: {
        ...TYPOGRAPHY.h2,
        marginBottom: SPACING.small,
    },
    subtitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
    },
    exposure: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        marginBottom: 15,
    }
});