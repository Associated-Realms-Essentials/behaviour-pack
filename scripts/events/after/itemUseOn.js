import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
async function runEventAfterItemUseOn(item, adminTag, messageHideTag) {
    let res = (block) => {
        item.source.dimension.runCommand(`
            tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§e${block.itemStack.typeId.split(":")[1]} has been used by ${block.source.name} at §c${block.block.location.x} ${block.block.location.y} ${block.block.location.z}§e.§r"}]}
        `);
        item.source.dimension.runCommand(`scoreboard players set "${block.itemStack.typeId}#@##@&*£$strsplit#@##@&*£$${block.source.name}#@##@&*£$strsplit#@##@&*£$${block.block.location.x}#@##@&*£$strsplit#@##@&*£$${block.block.location.y}#@##@&*£$strsplit#@##@&*£$${block.block.location.z}#@##@&*£$strsplit#@##@&*£$use" "associatedRealmsEssentials:save:blocklogs" 0`);
    };
    if (!ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:save:blocklogsenabled')?.getParticipants()[0]?.displayName)
        return;
    if (item.source.hasTag(adminTag))
        return;
    if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:blocklogsenabled').getParticipants()[0].displayName == "true") {
        let blocks = [
            "sign",
            "shulker",
            "comparator",
            "redstone",
            "barrier",
            "bubble_column",
            "piston",
            "beehive",
            "moving_block",
            "lava",
            "fire",
            "structure_void",
            "sculk_catalyst",
            "crafter",
            "observer",
            "allow",
            "deny",
            "netherreactor",
            "glowingobsidian",
            "cryingobsidian",
            "farmland",
            "netherite_block",
            "command",
            "respawn_anchor",
            "ender_chest",
            "custom_painting",
            "water",
            "lava",
            "flint_and_steel",
            "fire"
        ];
        blocks.forEach(itemInList => {
            if (item.itemStack.typeId.includes(itemInList)) {
                res(item);
            }
        });
    }
}
export default runEventAfterItemUseOn;
