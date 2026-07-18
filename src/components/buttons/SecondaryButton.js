import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';

export default function SecondaryButton({ title, onPress, iconLeft }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.content}>
                {iconLeft}
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ffffff',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.primary,
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    buttonText: {
        color: COLORS.primary,
        ...TYPOGRAPHY.h4,
    },
});