import { system } from "@minecraft/server";
import { PLAYERS } from "./players";
import { countArmor } from "./armors";

import { giveVerylliumBonus } from "../veryllium/misc";

function* processPlayers() {
    for (const player of PLAYERS) {
        if (!player.isValid()) {
            continue;
        }
        giveVerylliumBonus(player);
        yield;

        countArmor(player);
        yield;
    }
}

system.runInterval(() => {
    system.runJob(processPlayers());
}, 1);