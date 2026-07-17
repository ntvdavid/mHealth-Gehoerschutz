import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./Card"

export default function TrendBanner({ data }) {
    const sampleData = [
        { value: 65, label: 'Mo' },
        { value: 72, label: 'Di' },
        { value: 85, label: 'Mi' },
        { value: 60, label: 'Do' },
        { value: 78, label: 'Fr' },
        { value: 90, label: 'Sa' },
        { value: 55, label: 'So' },
    ];

    return (
        <Card style={styles.card}>
            <CardHeader>
                <CardTitle>Lautstärkeverlauf</CardTitle>
            </CardHeader>
            <CardContent>
                <View style={styles.cardContent}>
                    <LineChart
                        data={data ?? sampleData}
                        color="#007a7a"
                        thickness={2}
                        dataPointsColor="#007a7a"
                        yAxisSuffix=" dB"
                        width={260}
                        height={120}
                        spacing={35}
                        initialSpacing={10}
                        showReferenceLine1={true}
                        referenceLine1Position={85}
                        hideRules
                        cruved
                        isAnimated
                        animationDuration={1200}
                        stepValue={20}
                        maxValue={100}
                        noOfSections={5}


                        pointerConfig={{
                            pointerStripHeight: 110,
                            pointerStripColor: '#cbd5e1',
                            pointerStripWidth: 2,
                            pointerColor: '#007a7a',
                            radius: 6,
                            pointerLabelWidth: 70,
                            pointerLabelHeight: 36,
                            shiftPointerLabelX: -100,
                            shiftPointerLabelY: -100,
                            autoAdjustPointerLabelPosition: true,

                            pointerLabelComponent: (items) => {
                                return (
                                    <View style={styles.pointerView}>
                                        <Text style={styles.pointerText}>
                                            {items[0].value} dB
                                        </Text>
                                    </View>
                                );
                            },
                        }}
                    />
                </View>
            </CardContent>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        elevation: 4,
    },
    cardContent: {
        height: 180,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 20,
    },

    card: {
        marginBottom: 20,
    },

    pointerView: {
        height: 36,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e293b',
        borderRadius: 8,
    },
    pointerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    },
});

