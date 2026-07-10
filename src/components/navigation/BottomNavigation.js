import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

export default function BottomNavigation({
    activeTab, 
    onHomePressed,
    onHistoryPressed, 
    onTippsPressed
})  {
    return (
        <View style={styles.container}>
            <NavItem
                icon="bar-chart-2"
                label="Verlauf"
                active={activeTab === "history"}
                onPressed={onHistoryPressed}
            />

            <NavItem
                icon="home"
                label="Home"
                active={activeTab === "home"}
                onPressed={onHomePressed}
            />

            <NavItem
                icon="book-open"
                label="Tipps"
                active={activeTab === "tips"}
                onPressed={onTippsPressed}
            />

        </View>
    );
}

function NavItem({ icon, label, active, onPressed }){
    return  (
        <TouchableOpacity
            style={styles.item}
            onPress={onPressed}
        >
            <Feather
                name={icon}
                size={24}
                color={active ? COLORS.primary : COLORS.textSecondary}
            />

            <Text
                style={[
                    styles.label,
                    active && styles.activeLabel
                ]}
            >
                {label}
            </Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:  {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        paddingVertical: 12,

        borderTopWidth: 1,
        borderColor: "#E8ECEF",

        backgroundColor: COLORS.background,
    },
    item: {
        alignItems: "center",
        gap: SPACING.xsmall,
    },
    label:  {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
    },
    activeLabel:    {
        color: COLORS.primary,
        fontWeight: "600",
    },
});