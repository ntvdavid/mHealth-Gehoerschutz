import { COLORS } from "../constants/colors";

export function getNoiseStatus(noiseLevel) {
    if (noiseLevel < 70) {
        return {
            text: "Sicher",
            color: COLORS.green
        };
    } else if (noiseLevel < 85) {
        return {
            text: "Okay",
            color: COLORS.yellow
        };
    } else {
        return {
            text: "Kritisch",
            color: COLORS.warning
        };
    }
}