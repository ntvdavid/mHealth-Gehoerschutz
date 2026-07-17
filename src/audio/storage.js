import AsyncStorage from '@react-native-async-storage/async-storage';

const CALIBRATION_KEY = '@audio-meter/calibration';
const READINGS_PREFIX = '@audio-meter/readings/';
const CALIBRATION_PROMPT_SEEN_KEY = '@audio-meter/calibration-prompt-seen';
const RETENTION_MS = 7 * 24 * 60 * 60 * 1000; // 7 Tage

let writeQueue = Promise.resolve();

const getHourlyKey = (timestamp) => {
    const hour = new Date(timestamp).toISOString().slice(0, 13); 
    return `${READINGS_PREFIX}${hour}`;
};

const isValidReading = (reading) => 
    Boolean(
        reading &&
            Number.isFinite(reading.timestamp) &&
            Number.isFinite(reading.db)
    );

export const initStorage = async () => {
    const keys = await AsyncStorage.getAllKeys();

    const readingKeys = keys.filter((key) => key.startsWith(READINGS_PREFIX));

    const oldestAllowedTimestamp = Date.now() - RETENTION_MS;

    const keysToDelete = readingKeys.filter((key) => {
        const hourString = key.slice(READINGS_PREFIX.length);
        const hourTimestamp = new Date(`${hourString}:00:00Z`).getTime();

        return (
            Number.isFinite(hourTimestamp) && hourTimestamp < oldestAllowedTimestamp
        );
    });

    if (keysToDelete.length > 0) {
        await AsyncStorage.multiRemove(keysToDelete);
    }   
};

export const appendReading = async (reading) => {
    if (!isValidReading(reading)) {
        return Promise.reject(
            new Error("Ungültiger Messwert: timestamp und db müssen Zahlen sein.")   
        );
    }

    const operation = writeQueue.then(async () => {
        const key = getHourlyKey(reading.timestamp);
        const storedValue = await AsyncStorage.getItem(key);

        let readings = [];

        if (storedValue) {
            try {
                const parsed = JSON.parse(storedValue);
                readings = Array.isArray(parsed) ? parsed : [];
            } catch {
                readings = [];
            }
        }

        readings.push({
            timestamp: reading.timestamp,
            db: reading.db,
        });

        await AsyncStorage.setItem(key, JSON.stringify(readings));
    });

    writeQueue = operation.catch(() => {});
    return operation;
};

export const getReadings = async (fromTimestamp, toTimestamp) => {
    if (
        !Number.isFinite(fromTimestamp) ||
        !Number.isFinite(toTimestamp) ||
        fromTimestamp > toTimestamp
    ) {
        throw new Error('Ungültiger Zeitraum für getReadings().');
    }

    const keys = await AsyncStorage.getAllKeys();

    const readingKeys = keys.filter((key) =>
        key.startsWith(READINGS_PREFIX)
    );

    if (readingKeys.length === 0) {
        return [];
    }

    const storedBlocks = await AsyncStorage.multiGet(readingKeys);
    const result = [];

    storedBlocks.forEach(([, storedValue]) => {
        if (!storedValue) return;

        try {
            const readings = JSON.parse(storedValue);

            if (!Array.isArray(readings)) return;

            readings.forEach((reading) => {
                const isInSelectedRange =
                    isValidReading(reading) &&
                    reading.timestamp >= fromTimestamp &&
                    reading.timestamp <= toTimestamp;

                if (isInSelectedRange) {
                    result.push(reading);
                }
            });
        } catch (error) {
            console.warn(
                '[storage] Messwertblock konnte nicht gelesen werden:',
                error
            );
        }
    });

    return result.sort((a, b) => a.timestamp - b.timestamp);
};

export const saveCalibration = async (calibration) => {
    if (!calibration || !Number.isFinite(calibration.offsetDb)) {
        throw new Error("Ungültige Kalibrierungdaten.");
    }

    await AsyncStorage.setItem(CALIBRATION_KEY, JSON.stringify(calibration));
};

export const getLatestCalibration = async () => {
    const storedValue = await AsyncStorage.getItem(CALIBRATION_KEY);
    if (!storedValue) { return null; }

    try {
        const calibration = JSON.parse(storedValue);

        if (!calibration || !Number.isFinite(calibration.offsetDb)) {
            return null;
        }

        return calibration;
    } catch (error) {
        console.warn('[storage] Kalibrierung konnte nicht gelesen werden:', error);
        return null;
    }
};

export const clearCalibration = async () => {
    await AsyncStorage.removeItem(CALIBRATION_KEY);
};

export const clearReadings = async () => {
    const keys = await AsyncStorage.getAllKeys();

    const readingKeys = keys.filter((key) => key.startsWith(READINGS_PREFIX));

    if (readingKeys.length > 0) {
        await AsyncStorage.multiRemove(readingKeys);
    }
};

export const hasSeenCalibrationPrompt = async () => {
    const storedValue = await AsyncStorage.getItem(
        CALIBRATION_PROMPT_SEEN_KEY
    );
    return storedValue === 'true';
};

export const markCalibrationPromptSeen = async () => {
    await AsyncStorage.setItem(
        CALIBRATION_PROMPT_SEEN_KEY,
        'true'
    );
};
