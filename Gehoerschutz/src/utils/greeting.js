export function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Guten Morgen!";
    if (hour < 18) return "Guten Tag!";
    if (hour < 22) return "Guten Abend!";

    return "Gute Nacht!";
}