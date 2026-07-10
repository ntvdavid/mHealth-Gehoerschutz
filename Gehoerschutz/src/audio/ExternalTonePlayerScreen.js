/**
 * ExternalTonePlayerScreen.js
 * -----------------------------------------------------------------------
 * Wird auf dem ZWEITEN Gerät geöffnet (z.B. Zweithandy, Tablet, Gerät
 * eines Kollegen - Hauptsache dieselbe App ist installiert).
 *
 * Ablauf:
 *  1. Gerät A (misst): Kalibrierung starten, "Externe Tonquelle" wählen
 *  2. Gerät B (spielt ab): diesen Screen öffnen, "Ton abspielen" tippen
 *  3. Gerät B neben/gegenüber Gerät A platzieren (~1-2m Abstand)
 *  4. Auf Gerät A "Ton läuft jetzt" bestätigen -> Messung startet automatisch
 *  5. Auf Gerät B "Ton stoppen" tippen, sobald Gerät A fertig gemessen hat
 *
 * Nutzt denselben Ton wie die interne Kalibrierung (calibration-tone.wav,
 * 3s mit Fade-in/-out) - hier einfach dauerhaft geloopt, damit kein
 * Zeitdruck entsteht und der Nutzer selbst steuert, wann der Ton endet.
 * -----------------------------------------------------------------------
 */

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';

const TONE_ASSET = require('../assets/calibration-tone.wav');

export default function ExternalTonePlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    // Reines Abspielgerät - kein Recording nötig, daher hier keine
    // allowsRecording-Option und somit auch kein iOS-Earpiece-Problem.
    setAudioModeAsync({ playsInSilentMode: true });

    return () => {
      playerRef.current?.remove();
    };
  }, []);

  const play = useCallback(() => {
    const player = createAudioPlayer(TONE_ASSET);
    player.loop = true;
    player.volume = 1.0;
    player.play();
    playerRef.current = player;
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    playerRef.current?.pause();
    playerRef.current?.remove();
    playerRef.current = null;
    setIsPlaying(false);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Referenzton für externe Kalibrierung</Text>
      <Text style={styles.hint}>
        Dieses Gerät neben das zu kalibrierende Gerät legen (~1-2m Abstand),
        Lautstärke auf Maximum stellen, dann abspielen.
      </Text>

      <View style={styles.statusDot}>
        <View style={[styles.dot, isPlaying && styles.dotActive]} />
        <Text style={styles.statusText}>
          {isPlaying ? 'Ton läuft …' : 'Bereit'}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Button title="Ton abspielen" onPress={play} disabled={isPlaying} />
        <Button title="Ton stoppen" onPress={stop} disabled={!isPlaying} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', gap: 16 },
  title: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  hint: { fontSize: 13, color: '#666', textAlign: 'center' },
  statusDot: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ccc' },
  dotActive: { backgroundColor: '#22c55e' },
  statusText: { fontSize: 14, color: '#444' },
  buttonRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
});
