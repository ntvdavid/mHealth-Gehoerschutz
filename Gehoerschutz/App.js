import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect } from 'react';
import { NotificationService } from './services/notification';
import { useKeepAwake } from 'expo-keep-awake';


export default function App() {
  useKeepAwake();
  useEffect(() => {
    NotificationService.init();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gehörschutz aktiv</Text>
      <Text style={styles.subtitle}>Der Bildschirm bleibt an, um dich durchgehend zu warnen.</Text>
      
      <View style={styles.buttonContainer}>
        <Button
        title="SImuliere Lärm (85 dB)"
        onPress={() => NotificationService.triggerVolumeAlert(85)}
        color="#d9534f"
      />
      </View>

      <View style={styles.buttonContainer}>
        <Button
        title="Stoppe Lärm-Warnung"
        onPress={() => NotificationService.cancelAlert()}
        color="#5cb85c"
      />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 15,
    width: '80%',
  },
});
