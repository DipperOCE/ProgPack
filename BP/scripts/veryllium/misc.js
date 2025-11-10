export function giveVerylliumBonus(player) {
    const verylliumProperty = player.getDynamicProperty("progpack:veryllium");
    if (verylliumProperty > 0 && player.isInWater) {
        if (verylliumProperty == 4) {
            player.addEffect("conduit_power", 300);
        }
        player.addEffect("health_boost", 20, { amplifier: verylliumProperty });
    }
}