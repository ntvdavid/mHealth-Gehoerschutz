import { COLORS } from "../constants/colors";

const NOISE_EXPOSURE_LIMITS = [
    { db: 85, exposure: '8 Stunden', category: 'Max. 8 Stunden' },
    { db: 88, exposure: '4 Stunden', category: 'Max. 4 Stunden' },
    { db: 91, exposure: '2 Stunden', category: 'Max. 2 Stunden' },
    { db: 94, exposure: '1 Stunde', category: 'Max. 1 Stunde' },
    { db: 97, exposure: '30 Minuten', category: 'Max. 30 Minuten' },
    { db: 100, exposure: '15 Minuten', category: 'Max. 15 Minuten' },
    { db: 103, exposure: '7,5 Minuten', category: 'Max. 7,5 Minuten' },
    { db: 106, exposure: '3,8 Minuten', category: 'Max. 3,8 Minuten' },
    { db: 109, exposure: '1,9 Minuten', category: 'Max. 1,9 Minuten' },
    { db: 112, exposure: '1 Minute', category: 'Max. 1 Minute' },
];

export function getNoiseStatus(noiseLevel) {
    if (noiseLevel == null || !Number.isFinite(noiseLevel)) {
        return {
            text: 'Nicht kalibriert',
            color: COLORS.textSecondary,
            exposure: null,
        };
    }

    const limit = NOISE_EXPOSURE_LIMITS.reduce((selected, entry) => {
        if (noiseLevel >= entry.db) {
            return entry;
        }
        return selected;
    }, NOISE_EXPOSURE_LIMITS[0]);

    const color = noiseLevel < 91
        ? COLORS.green
        : noiseLevel < 100
        ? COLORS.yellow
        : COLORS.warning;

    const text = noiseLevel < 91
        ? 'Sicher'
        : noiseLevel < 100
        ? 'Achtung'
        : 'Warnung!';

    if (noiseLevel < 85) {
        return {
            text: 'Sicher',
            color: COLORS.green,
            exposure: 'kein Limit',
        };
    }

    return {
        text,
        color,
        exposure: limit.exposure,
    };
}
