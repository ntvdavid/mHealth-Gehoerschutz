import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

import { getGreeting } from "../../utils/greeting";

export default function Header({  onMenuPress, onInfoPress }) {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onMenuPress}>
                <Feather name="menu" size={26} color={COLORS.text} />
            </TouchableOpacity>

            <Text style={styles.title}>{getGreeting()}</Text>

            <TouchableOpacity onPress={onInfoPress}>
                <Feather name="info" size={26} color={COLORS.text} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SPACING.medium,
        paddingTop: SPACING.xxlarge,
        paddingBottom: SPACING.medium,
        backgroundColor: COLORS.background,
    },
    title: {
        ...TYPOGRAPHY.h2,
        color: COLORS.text,
    },
});