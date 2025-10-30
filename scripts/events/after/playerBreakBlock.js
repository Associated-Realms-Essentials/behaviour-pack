import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
let block1Event = null;
function runEventAfterPlayerBreakBlock(block, adminTag, messageHideTag, alertHideTag) {
    ms.system.run(() => {
        let res = (block) => {
            ms.system.run(() => {
                block.player.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}", tag=!"${alertHideTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§e${block.brokenBlockPermutation.type.id.split(":")[1]} has been broken by ${block.player.name} at §c${block.block.location.x} ${block.block.location.y} ${block.block.location.z}§e.§r"}]}
                `);
                block.player.dimension.runCommand(`scoreboard players set "${block.brokenBlockPermutation.type.id}#@##@&*£$strsplit#@##@&*£$${block.player.name}#@##@&*£$strsplit#@##@&*£$${block.block.location.x}#@##@&*£$strsplit#@##@&*£$${block.block.location.y}#@##@&*£$strsplit#@##@&*£$${block.block.location.z}#@##@&*£$strsplit#@##@&*£$break" "associatedRealmsEssentials:save:blocklogs" 0`);
            });
        };
        // Only log if block logging is enabled
        if (ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:save:blocklogsenabled')?.getParticipants()[0]?.displayName == "true") {
            if (!block.player.hasTag(adminTag)) {
                let blocks = ["ore", "ancient_debris"];
                blocks.forEach(blockInList => {
                    if (block.brokenBlockPermutation.type.id.includes(blockInList)) {
                        res(block);
                    }
                });
            }
        }
    });
}
export default runEventAfterPlayerBreakBlock;
