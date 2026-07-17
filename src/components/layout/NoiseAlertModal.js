import React from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity, SafeAreaView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import { COLORS} from '../../constants/colors';
import { SPACING}from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

// calculation exposition time based on dB value, source: https://www.bgrci.de/praxishandbuch-baustoffindustrie/a-grundlagen/a-1-allgemeines/a-18-laerm
    const calculateExpositionTime = (db) => {
        if (db < 85) return "unbegrenzt";

        const minutes = 480 * Math.pow(2, (85 - db) / 3);

        if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            return `${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
        } else if (minutes >= 1) {
            return `${Math.round(minutes)} Minuten`;
        } else {
            const seconds = Math.round(minutes * 60);
            return `${seconds} ${seconds === 1 ? 'Sekunde' : 'Sekunden'}`;
        }
    };

export default function NoiseAlertModal({visible, currentDb, onClose, onGoToRecommendations}) {

    const handleAction = () => {
        if (onGoToRecommendations) { 
            onGoToRecommendations(); // Navigate to the recommendations screen
        }
        onClose(); // Close the modal
    }

    return (
        <Modal
        visible={visible}
        animationType="slide"
        transparent={false}
        >
            <SafeAreaView style={styles.alarmContainer}>

                {/* Header with close button */}     
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={28} color={COLORS.background} />
                    </TouchableOpacity>
                </View>

                {/*Main content */}
                <View style={styles.content}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="warning-outline" size={50} color={COLORS.background} />
                    </View>

                    <Text style={styles.alarmTitle}>
                        Kritische Lautstärke{'\n'}erkannt
                    </Text>

                    {/* Decibel map */}
                     <View style={styles.dbCard}>
                        <Text style={styles.dbCardSub}>Aktuell</Text>
                        <Text style={styles.dbCardValue}>{currentDb} dB</Text>
                    </View>

                    {/* Description */}
                    <Text style={styles.description}>
                        Bei dieser Lautstärke können bereits nach kurzer Zeit dauerhafte Hörschäden entstehen. Schütze dein Gehör jetzt!
                    </Text>

                    {/* dynamic Time-Warning, Source: https://www.bgrci.de/praxishandbuch-baustoffindustrie/a-grundlagen/a-1-allgemeines/a-18-laerm */} 
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}> 
                           📋 Bei {currentDb} dB liegt die empfohlene Expositionszeit bei etwa{' '}
                           <Text style={{fontWeight: 'bold'}}>
                            {calculateExpositionTime(currentDb)}
                           </Text>.
                        </Text>
                    </View>
                </View>

                {/* Action button */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleAction}>
                        <Text style={styles.actionButtonText}>Empfehlungen anzeigen</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    alarmContainer: {
        flex: 1,
        backgroundColor: COLORS.warning,
    },
    header: {
        height: 50,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: SPACING.large,
    },
    closeButton: {
        backgroundColor: COLORS.transparent,
        padding: SPACING.small,
        borderRadius: 20,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.xlarge,
    },
    iconCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: COLORS.transparent,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.large,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    alarmTitle: {
        ...TYPOGRAPHY.h1,
        color: COLORS.background,
        textAlign: 'center',
        marginBottom: SPACING.large,
    },
    dbCard: {
        backgroundColor: COLORS.background,
        width: '100%',
        borderRadius: 24,
        paddingVertical: SPACING.large,
        alignItems: 'center',
        marginBottom: SPACING.large,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    dbCardSub: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: SPACING.xsmall,
    },
    dbCardValue: {
        color: COLORS.warning,
        fontSize: 54,
        fontWeight: '900',
    },
    description: {
        ...TYPOGRAPHY.body,
        color: COLORS.background,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: SPACING.large,
        opacity: 0.9,
    },
    infoBox: {
        backgroundColor: COLORS.transparent,
        borderRadius: SPACING.medium,
        padding: SPACING.medium,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    infoText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.background,
        textAlign: 'center',
        lineHeight: 18,
    },
    boldText: {
        fontWeight: 'bold',
    },
    footer: {
        paddingHorizontal: SPACING.large,
        paddingBottom: SPACING.large,
    },
    actionButton: {
        backgroundColor: COLORS.background,
        width: '100%',
        paddingVertical: SPACING.medium,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        ...TYPOGRAPHY.h3,
        color: COLORS.warning,
    },
});


