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
            });
        }
        console.log("Notification successfully initialized");
        return true;
    },

    // Trigger Noise warning
    async triggerVolumeAlert(currentDb) {
        this.cancelAlert(); 

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

        if(Platform.OS === 'android') {
            const pattern = [0,400,100];
            Vibration.vibrate(pattern, true); // repeat vibration pattern for Android
            vibrationInterval = setInterval(() => {
                durationCounter += 500; // Update counter every 500ms
                if (durationCounter >= 10000) { // Stop after 10 seconds
                    this.cancelAlert();
                }
            }, 500);
        } else {
            const intervalTime = 300; // Vibrate every second
            Vibration.vibrate(); // Initial vibration for iOS

            vibrationInterval = setInterval(() => {
                Vibration.vibrate(); // Vibrate every second for iOS
                durationCounter += intervalTime;
                if (durationCounter >= 10000) { // Stop after 10 seconds
                    this.cancelAlert();
                }
            }, intervalTime);
        }
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

