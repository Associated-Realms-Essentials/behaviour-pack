import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runEventAfterPlayerInteractWithBlock(block, adminTag, messageHideTag, alertHideTag) {
    ms.system.run(() => {
        let res = (block) => {
            block.player.dimension.runCommand(`
                tellraw @a[tag="${adminTag}", tag=!"${alertHideTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§e${block.block.typeId.split(":")[1]} has been interacted with by ${block.player.name} at §c${block.block.location.x} ${block.block.location.y} ${block.block.location.z}§e.§r"}]}
            `);
            block.player.dimension.runCommand(`scoreboard players set "${block.block.typeId}#@##@&*£$strsplit#@##@&*£$${block.player.name}#@##@&*£$strsplit#@##@&*£$${block.block.location.x}#@##@&*£$strsplit#@##@&*£$${block.block.location.y}#@##@&*£$strsplit#@##@&*£$${block.block.location.z}#@##@&*£$strsplit#@##@&*£$interact" "dirtletsEssentials:save:blocklogs" 0`);
        };
        let res2 = (block) => {
            block.player.dimension.runCommand(`
                tellraw @a[tag="${adminTag}", tag=!"${alertHideTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§e${block.itemStack.typeId.split(":")[1]} has been used by ${block.player.name} at §c${block.block.location.x} ${block.block.location.y} ${block.block.location.z}§e.§r"}]}
            `);
            block.player.dimension.runCommand(`scoreboard players set "${block.itemStack.typeId}#@##@&*£$strsplit#@##@&*£$${block.player.name}#@##@&*£$strsplit#@##@&*£$${block.block.location.x}#@##@&*£$strsplit#@##@&*£$${block.block.location.y}#@##@&*£$strsplit#@##@&*£$${block.block.location.z}#@##@&*£$strsplit#@##@&*£$use" "dirtletsEssentials:save:blocklogs" 0`);
        };
        if (!ms?.world?.scoreboard?.getObjective('dirtletsEssentials:save:blocklogsenabled')?.getParticipants()[0]?.displayName)
            return;
        if (block.player.hasTag(adminTag))
            return;
        if (ms.world.scoreboard.getObjective('dirtletsEssentials:save:blocklogsenabled').getParticipants()[0].displayName == "true") {
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
                "fire",
                "axe"
            ];
            blocks.forEach(itemInList => {
                if (block?.block?.typeId.includes(itemInList)) {
                    res(block);
                }
            });
            blocks.forEach(itemInList => {
                if (block?.itemStack?.typeId.includes(itemInList)) {
                    res2(block);
                }
            });
        }
    });
}
export default runEventAfterPlayerInteractWithBlock;
