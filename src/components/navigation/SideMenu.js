import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

export default function SideMenu({ visible, onClose, onCalibrationPress, onNotificationsPress, onPrivacyPress, onAboutPress, onNotificationTestPress }) { 
    return(
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.menu}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Einstellungen</Text>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <Feather
                                name="x"
                                size={26}
                                color={COLORS.text}
                            />
                        </TouchableOpacity>
                    </View>

                    <MenuItem
                        title="Benachrichtigungen"
                        subtitle="Warnung & Hinweise verwalten"
                        onPress={onNotificationsPress}
                    />

                    <MenuItem
                        title="Grenzwert anpassen"
                        subtitle="Mikrofon kalibrieren und Grenzwerte einstellen"
                        onPress={onCalibrationPress}
                    />
                    <MenuItem
                        title="Notification testen"
                        subtitle="Vibration und Benachrichtigung testen"
                        onPress={onNotificationTestPress}
                    />
                    <MenuItem
                        title="Datenschutz"
                        subtitle="Daten & Berechtigung"
                        onPress={onPrivacyPress}
                    />

                    <MenuItem
                        title="Über die App"
                        subtitle="Version, Impressum & Kontakt"
                        onPress={onAboutPress}
                    />
                </View>

                <Pressable
                    style={styles.backdrop}
                    onPress={onClose}
                />
            </View>

        </Modal>
    );
}   

function MenuItem({ title, subtitle, onPress }){
    return(
        <TouchableOpacity
            style={styles.menuItem}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    overlay:{
        flex: 1,
        flexDirection: "row",
        backgroundColor: COLORS.transparent,
    },
    menu:{
        width: "76%",
        height: "100%",
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.large,
        paddingTop: 10,
        borderTopRightRadius: 28,
        borderBottomRightRadius: 28,
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 40,
    },
    title:{
        ...TYPOGRAPHY.h1,
        color:COLORS.text,
        marginTop: 60,
    },
    closeButton:{
        width: 30,
        height: 30,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F1F4F4",
    },
    backdrop:{
        flex: 1,
    },
    menuItem:{
        marginBottom: 34,
    },
    itemTitle:{
        ...TYPOGRAPHY.h3,
        color:COLORS.text,
        marginBottom: 4,
    },
    itemSubtitle:{
        ...TYPOGRAPHY.body,
        color:COLORS.textSecondary,
    },
});