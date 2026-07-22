import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { NotificationService } from '../services/notification';
import { COLORS } from '../constants/colors';

export default function NotificationScreen({ onBack }) {
    return (
        <SafeAreaView style={styles.notificationScreen}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={onBack}
            >
                <Feather
                    name="arrow-left"
                    size={24}
                    color={COLORS.text || '#1e293b'}
                />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.title}>Gehörschutz aktiv</Text>
                <Text style={styles.subtitle}>Der Bildschirm bleibt an, um dich durchgehend zu warnen.</Text>

                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: COLORS.warning || '#e13b3f' }]}
                    onPress={() => NotificationService.triggerVolumeAlert(85)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.actionButtonText}>Simuliere Lärm-Warnung</Text>
                </TouchableOpacity> 

                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: COLORS.green || '#41b670' }]}
                    onPress={() => NotificationService.cancelAlert()}
                    activeOpacity={0.8}
                >
                    <Text style={styles.actionButtonText}>Stoppe Lärm-Warnung</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    notificationScreen: {
        flex: 1,
        backgroundColor: '#Colors.background' || '#fdfdfd',
        padding: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F1F4F4",
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#colors.text' || '#151b27',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#colors.textSecondary' || '#6e7a8a',
        textAlign: 'center',  
        marginBottom: 32,
        lineHeight: 20,
    },
    actionButton: {
        width: '100%',
        backgroundColor: COLORS.warning || '#e13b3f',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 16,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    actionButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});