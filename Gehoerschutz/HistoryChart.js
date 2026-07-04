/**
 * HistoryChart.js
 * -----------------------------------------------------------------------
 * Zeigt den dB-Verlauf als einfaches Liniendiagramm.
 * Nutzt react-native-svg (in Expo Go bereits enthalten, kein `expo install`
 * für zusätzliche Chart-Bibliotheken nötig).
 * -----------------------------------------------------------------------
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Svg, { Polyline, Line, Text as SvgText, Circle } from 'react-native-svg';
import { getReadings } from './storage';

const CHART_HEIGHT = 220;
const CHART_PADDING = { top: 16, right: 16, bottom: 28, left: 40 };

const RANGES = {
  '15m': 15 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
};

// Gleichmäßiges Downsampling, damit der Graph auch bei langen Zeiträumen
// mit vielen Messpunkten flüssig bleibt (storage.js liefert ungefiltert
// alle Werte im Zeitraum zurück).
function downsample(rows, limit) {
  if (rows.length <= limit) return rows;
  const step = rows.length / limit;
  const sampled = [];
  for (let i = 0; i < limit; i++) {
    sampled.push(rows[Math.floor(i * step)]);
  }
  return sampled;
}

export default function HistoryChart({ width = 340 }) {
  const [rangeKey, setRangeKey] = useState('15m');
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const now = Date.now();
    const from = now - RANGES[rangeKey];
    const rows = await getReadings(from, now);
    setReadings(downsample(rows, 200));
    setLoading(false);
  }, [rangeKey]);

  useEffect(() => {
    load();
    // Alle 5s aktualisieren, solange die Ansicht offen ist
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [load]);

  const innerWidth = width - CHART_PADDING.left - CHART_PADDING.right;
  const innerHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;

  let content = null;

  if (loading && readings.length === 0) {
    content = <ActivityIndicator style={{ height: CHART_HEIGHT }} />;
  } else if (readings.length === 0) {
    content = (
      <View style={[styles.emptyState, { height: CHART_HEIGHT }]}>
        <Text style={styles.emptyText}>
          Noch keine Messwerte in diesem Zeitraum.
        </Text>
      </View>
    );
  } else {
    const values = readings.map((r) => r.db);
    const minVal = Math.floor(Math.min(...values) - 2);
    const maxVal = Math.ceil(Math.max(...values) + 2);
    const range = Math.max(maxVal - minVal, 1);

    const times = readings.map((r) => r.timestamp);
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    const timeRange = Math.max(maxTime - minTime, 1);

    const xFor = (t) =>
      CHART_PADDING.left + ((t - minTime) / timeRange) * innerWidth;
    const yFor = (v) =>
      CHART_PADDING.top + innerHeight - ((v - minVal) / range) * innerHeight;

    const points = readings
      .map((r) => `${xFor(r.timestamp)},${yFor(r.db)}`)
      .join(' ');

    // Horizontale Gitterlinien (5 Stufen)
    const gridSteps = 4;
    const gridLines = Array.from({ length: gridSteps + 1 }, (_, i) => {
      const v = minVal + (range / gridSteps) * i;
      return { value: v, y: yFor(v) };
    });

    const last = readings[readings.length - 1];

    content = (
      <Svg width={width} height={CHART_HEIGHT}>
        {gridLines.map((g, idx) => (
          <React.Fragment key={idx}>
            <Line
              x1={CHART_PADDING.left}
              x2={width - CHART_PADDING.right}
              y1={g.y}
              y2={g.y}
              stroke="#ddd"
              strokeWidth={1}
            />
            <SvgText
              x={CHART_PADDING.left - 6}
              y={g.y + 4}
              fontSize={10}
              fill="#666"
              textAnchor="end"
            >
              {g.value.toFixed(0)}
            </SvgText>
          </React.Fragment>
        ))}

        <Polyline
          points={points}
          fill="none"
          stroke="#2563eb"
          strokeWidth={2}
        />

        <Circle
          cx={xFor(last.timestamp)}
          cy={yFor(last.db)}
          r={4}
          fill="#2563eb"
        />
      </Svg>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {Object.keys(RANGES).map((key) => (
          <Text
            key={key}
            onPress={() => setRangeKey(key)}
            style={[styles.tab, rangeKey === key && styles.tabActive]}
          >
            {key}
          </Text>
        ))}
      </View>
      {content}
      <Text style={styles.axisLabel}>dB (kalibriert) über Zeit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  tabRow: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  tab: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    color: '#666',
    fontSize: 13,
  },
  tabActive: { backgroundColor: '#2563eb', color: '#fff', fontWeight: '600' },
  emptyState: { justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888', fontSize: 13 },
  axisLabel: { fontSize: 11, color: '#888', marginTop: 4 },
});
