// this script is responsible for keeping an updated list of players once imported by main.js

// imports world class from server module
import { world } from '@minecraft/server'
export let PLAYERS = world.getAllPlayers();

/* function to update player array, sets to var name PLAYERS 
(caps means this var should not be altered elsewhere, only returned by this function */
function updatePlayers() {
	PLAYERS = world.getAllPlayers();
}

// subscribes to player join event, runs updatePlayers function when this is detected
world.afterEvents.playerJoin.subscribe(() => {
	updatePlayers();
});

/* subscribes to entity remove event, uses arrow function to be concise. checks typeId and if this is not a player,
return ends the function. else runs updatePlayers. */
world.afterEvents.entityRemove.subscribe(({ typeId }) => {
	if (typeId !== "minecraft:player") return;
	updatePlayers();
});

// subscribes to player spawn event, runs updatePlayers function when this is detected
world.afterEvents.playerSpawn.subscribe(() => {
	updatePlayers();
});
