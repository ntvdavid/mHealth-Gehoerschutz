import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { getReadings } from "../audio/storage";
import { COLORS } from "../constants/colors";

const DAYS_TO_SHOW = 7;

const formatDate = (timestamp) => 
    new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(new Date(timestamp));

const formatTime = (timestamp) => 
    new Intl.DateTimeFormat('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(timestamp));

export default function MeasurementsScreen({
    onBack,
}) {
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadReadings = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const now = Date.now();

            const from =
                now -
                DAYS_TO_SHOW * 24 * 60 * 60 * 1000;
            
            const storedReadings = await getReadings(
                from, 
                now
            );

            setReadings(
                [...storedReadings].reverse()
            );
        } catch (loadError) {
            console.warn(
                '[MeasurmentsScreen] Messdaten konnten nicht geladen werden:',
                loadError 
            );

            setError(
                'Die Messdaten konnten nicht geladen werden.'
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadReadings();
    }, [loadReadings]);

    const statistics = useMemo(() => {
        if (readings.length === 0) {
            return {
                average: null,
                peak: null,
            };
        }

        const total = readings.reduce(
            (sum, reading) => sum + reading.db,
            0
        );

        const peak = readings.reduce(
            (highest, reading) => 
                Math.max(highest, reading.db),
            readings[0].db
        );

        return {
            average: total / readings.length,
            peak,
        };
    }, [readings]);

    return (
        <SafeAreaView
            style={styles.container}
            edges={['top', 'bottom']}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                >
                    <Feather
                        name="arrow-left"
                        size={24}
                        color={COLORS.text}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Messdaten
                </Text>

                <TouchableOpacity
                    style={styles.refreshButton}
                    onPress={loadReadings}
                >
                    <Text style={styles.refreshButtonText}>
                        Aktualisieren
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.period}>
                Gespeicherte Werte der letzten 7 Tage
            </Text>

            <View style={styles.statistics}>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>
                        Durchschnitt
                    </Text>

                    <Text style={styles.statValue}>
                        {statistics.average === null
                            ? '-'
                            : `${Math.round(
                                statistics.average
                            )}db`}
                    </Text>
                </View>

                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>
                        Peak
                    </Text>

                    <Text style={styles.statValue}>
                        {statistics.peak === null
                            ? '-'
                            : `${Math.round(
                                statistics.peak
                            )}db`}
                    </Text>
                </View>
            </View>

            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator
                        size="large"
                        color={COLORS.primary}
                    />
                </View>
            ) : error ? (
                <View style={styles.centered}>
                    <Text style={styles.message}>
                        {error}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={readings}
                    keyExtractor={(item, index) => 
                        `${item.timestamp}-${index}`
                    }
                    contentContainerStyle={
                        readings.length === 0
                        ? styles.emptyList
                        : styles.list
                    }
                    refreshing={loading}
                    onRefresh={loadReadings}
                    ListEmptyComponent={
                        <Text style={styles.message}>
                            Es sind noch keine Messwerte gespeichert.
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.readingRow}>
                            <View>
                                <Text style={styles.readingDate}>
                                    { formatDate(item.timestamp)}
                                </Text>

                                <Text style={styles.readingTime}>
                                    {formatTime(item.timestamp)}
                                </Text>
                            </View>

                            <Text style={styles.readingValue}>
                                {Math.round(item.db)} db    
                            </Text>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    header: {
        minHeight: 64,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: '700',
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1F4F4',
    },

    refreshButton: {
        paddingVertical: 10,
        paddingLeft: 10,
    },

    refreshButtonText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '600',
    },

    period: {
        color: COLORS.textSecondary,
        fontSize: 14,
        paddingHorizontal: 20,
        marginBottom: 16,
    },

    statistics: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        marginBottom: 16,
    },

    statCard: {
        flex: 1,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        padding: 16,
    },

    statLabel: {
        color: COLORS.textSecondary,
        fontSize: 13,
        marginBottom: 6,
    },

    statValue: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: '700',
    },

    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },

    list: {
        paddingHorizontal: 20,
        paddingBottom: 24,
    },

    emptyList: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },

    readingRow: {
        minHeight: 70,
        borderRadius: 14,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    readingDate: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '600',
    },

    readingTime: {
        color: COLORS.textSecondary,
        fontSize: 13,
        marginTop: 3,
    },

    readingValue: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '700',
    },

    message: {
        color: COLORS.textSecondary,
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
    },
});