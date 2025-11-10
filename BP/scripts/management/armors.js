import { EquipmentSlot, ItemStack } from "@minecraft/server";

const ARMOR_SETS = ["progpack:veryllium"];

const ARMOR_SLOTS = [EquipmentSlot.Head, EquipmentSlot.Chest, EquipmentSlot.Legs, EquipmentSlot.Feet];

function getArmor(player) {
    // retrieves equippable component from player and sets as const to be referenced
    const equippable = player.getComponent("minecraft:equippable");
    /* creates array 'armor' using map of ARMOR_SLOTS. populates this array with the equipment in each slot */
    const armor = ARMOR_SLOTS.map(slot => equippable.getEquipment(slot));
    return armor;
}

// counts how many pieces of armor the player is wearing of each declared armor set
function getArmorSetCounts(armor) {
    const armorSetCountMap = {};

    for (const piece of armor) {
        if (piece) {
            for (const armor_set of ARMOR_SETS) {
                if (piece.hasTag(armor_set)) {
                    armorSetCountMap[armor_set] = (armorSetCountMap[armor_set] || 0) + 1;
                }
            }
        }

    }
    return armorSetCountMap;
}

// sets armor set counts as a dynamic property on the player e.g "veryillium: 4" */
function setArmorSetCounts(player, armorSetCountMap) {
    for (const armor_set of ARMOR_SETS) {
        const count = armorSetCountMap[armor_set] ?? 0;
        if (player.getDynamicProperty(armor_set) !== count) {
            player.setDynamicProperty(armor_set, count);
        }
    }
}

export function countArmor(player) {
    const armor = getArmor(player);
    const armorSetCountMap = getArmorSetCounts(armor);
    setArmorSetCounts(player, armorSetCountMap);
}