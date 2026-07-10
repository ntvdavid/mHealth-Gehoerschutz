import * as Notifications from 'expo-notifications';
import { Vibration, Platform } from 'react-native';

let vibrationInterval = null;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


export const NotificationService = {
    async init(){
        console.log("NotificationService initialized");

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log("Notification permissions not granted");
            return false;
        }

        if (Platform.OS === 'android') { 
            await Notifications.setNotificationChannelAsync('noise-alerts', {
                name: 'Lärm-Warnungen',
                importance: Notifications.AndroidImportance.MAX,
                vibrate: false,
                lightColor: '#FF231F7C',
                // bypassDnd: true, // Benachrichtigungen auch bei aktiviertem "Nicht stören"-Modus anzeigen
            });
        }
        console.log("Notification successfully initialized");
        return true;
    },

    // Trigger Noise warning
    async triggerVolumeAlert(currentDb) {

        if(vibrationInterval) {
            clearInterval(vibrationInterval);
            vibrationInterval = null;
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Lärm-Warnung",
                body: `Achtung! Der aktuelle Lärmpegel beträgt ${currentDb} dB.`,
                data: { noiseLevel: currentDb },
                sound: true,
                android: {
                    channelId: 'noise-alerts',
                    color: '#FF0000',
                },
            },
            trigger: null, // Sofortige Benachrichtigung
        });

        let durationCounter = 0;
        const intervalTime = Platform.OS === 'ios' ? 500 : 400; 
        vibrationInterval = setInterval(() => {
            if (Platform.OS === 'ios') {
                Vibration.vibrate(); 
            } else {
                Vibration.vibrate(500); // Vibrationsmuster für Android
            }

            durationCounter += intervalTime;
            if (durationCounter >= 10000) { // Stop after 10 seconds
                if (vibrationInterval) {
                    clearInterval(vibrationInterval);
                    vibrationInterval = null;
                }
                Vibration.cancel();
                console.log("Vibration stopped after 10 seconds");
            }
        }, intervalTime);
    },

    cancelAlert() {
        if (vibrationInterval) {
            clearInterval(vibrationInterval);
            vibrationInterval = null;
        }
        Vibration.cancel();
        console.log("Alert canceled");
    }
};

