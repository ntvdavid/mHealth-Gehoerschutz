import * as Notifications from 'expo-notifications';
import { Vibration, Platform } from 'react-native';

const NOISE_CHANNEL_ID = 'noise-alerts-v2';

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
            const result =
                await Notifications.requestPermissionsAsync({
                    ios: {
                        allowAlert: true,
                        allowSound: true,
                        allowBadge: false,
                    },
                });
                finalStatus = result.status;
        }

        if (finalStatus !== 'granted') {
            console.log("Notification permissions not granted");
            return false;
        }

        if (Platform.OS === 'android') { 
            await Notifications.setNotificationChannelAsync(
                NOISE_CHANNEL_ID,
                {
                    name: 'Lärm-Warnung',
                    description: 'Warnungen bei einer zu hohen Lautstärke.',
                    importance: Notifications.AndroidImportance.MAX,
                    sound: 'default',
                    enableVibrate: true,
                    lightColor: '#FF231F7C',
                    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
                }
            );
        }

        console.log("Notification successfully initialized");
        return true;
    },

    // Trigger Noise warning
    async triggerVolumeAlert(currentDb) {
        const roundedDb = Math.round(currentDb);

        if (!Number.isFinite(roundedDb)) {
            return false;
        }

        this.cancelAlert(); 

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Lärm-Warnung",
                body: `Achtung! Der aktuelle Lärmpegel beträgt ${roundedDb} dB.`,
                data: { 
                    type: 'noise-alert',
                    noiseLevel: roundedDb 
                },
                sound: 'default',

                ...(Platform.OS == 'ios' && {
                    interruptionLevel: 'timeSensitive',
                }),

                ...(Platform.OS == 'android' && {
                    priority:
                        Notifications.AndroidNotificationPriority.MAX,
                        color: '#FF0000',
                }),
            },
            trigger:
                Platform.OS === 'android'
                    ? {
                        channelId: NOISE_CHANNEL_ID,
                      }
                    : null,
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
        } else if (Platform.OS === 'ios') {
            const intervalTime = 1000; // Vibrate every second
            Vibration.vibrate(); // Initial vibration for iOS

            vibrationInterval = setInterval(() => {
                Vibration.vibrate(); // Vibrate every second for iOS
                durationCounter += intervalTime;
                if (durationCounter >= 10000) { // Stop after 10 seconds
                    this.cancelAlert();
                }
            }, intervalTime);
        }
        return true;
    },

    addNoiseAlertResponseListener(callback) {
        const subscription =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    const data =
                        response.notification.request.content.data;

                    if (data?.type !== "noise-alert") {
                        return;
                    }

                    const noiseLevel = Number(data.noiseLevel);

                    if (Number.isFinite(noiseLevel)) {
                        callback(noiseLevel);
                    }
                }
            );
        
        return () => subscription.remove();
    },

    async getLastNoiseAlertResponse() {
        const response =
            await Notifications.getLastNotificationResponseAsync();

        const data =
            response?.notification?.request?.content?.data;

        if (data?.type !== "noise.alert") {
            return null;
        }

        await Notifications.clearLastNotificationResponseAsync();

        const noiseLevel = Number(data.noiseLevel);

        return Number.isFinite(noiseLevel)
            ? noiseLevel
            : null;
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