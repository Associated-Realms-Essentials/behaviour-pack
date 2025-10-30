import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
let block1Event = null;
function runEventAfterEntityHitBlock(block, adminTag, messageHideTag) {
    // ms.system.run(() => {
    //     ms.world.getPlayers().forEach(plr => {
    //         if (block.damagingEntity == plr) {
    //             if(block1Event !== null){
    //                 ms.world.beforeEvents.playerBreakBlock.unsubscribe(block1Event);
    //             }
    //             block1Event = ms.world.beforeEvents.playerBreakBlock.subscribe((block1) => {
    //                 ms.system.run(() => {
    //                     console.warn("A")
    //                     if(block.hitBlock.typeId == block1.block.typeId){
    //                         // Check what's currently being mined
    //                         if (block1.block.typeId.includes("minecraft:air")) {
    //                             console.warn("C")
    //                             // Block is broken
    //                             console.warn("Block broken detected");
    //                             let res = (block: ms.EntityHitBlockAfterEvent) => {
    //                                 ms.system.run(() => {
    //                                     block.damagingEntity.dimension.runCommand(`
    //                                         tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§e${block.hitBlock.typeId.split(":")[1]} has been broken by ${plr.name} at §c${block.hitBlock.location.x} ${block.hitBlock.location.y} ${block.hitBlock.location.z}§e.§r"}]}
    //                                     `)
    //                                     block.damagingEntity.dimension.runCommand(`scoreboard players set "${block.hitBlock.typeId}#@##@&*£$strsplit#@##@&*£$${plr.name}#@##@&*£$strsplit#@##@&*£$${block.hitBlock.location.x}#@##@&*£$strsplit#@##@&*£$${block.hitBlock.location.y}#@##@&*£$strsplit#@##@&*£$${block.hitBlock.location.z}#@##@&*£$strsplit#@##@&*£$break" "dirtletsEssentials:save:blocklogs" 0`)
    //                                 });
    //                             };
    //                             // Only log if block logging is enabled
    //                             if (ms?.world?.scoreboard?.getObjective('dirtletsEssentials:save:blocklogsenabled')?.getParticipants()[0]?.displayName == "true") {
    //                                 console.warn("D")
    //                                 if (!block.damagingEntity.hasTag(adminTag)) {
    //                                     console.warn("E")
    //                                     let blocks = ["ore"];
    //                                     blocks.forEach(blockInList => {
    //                                         if (block.hitBlock.typeId.includes(blockInList)) {
    //                                             console.warn("F")
    //                                             res(block);
    //                                         }
    //                                     });
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 })
    //             })
    //         }
    //     });
    // })
}
export default runEventAfterEntityHitBlock;
