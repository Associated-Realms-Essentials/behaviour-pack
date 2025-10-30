import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runEventBeforePlayerBreakBlock(block, adminTag, messageHideTag) {
    let beforeBlock = block;
    if (beforeBlock.player.hasTag("areinternal:standingOverSuperDeny")) {
        block.cancel = true;
    }
    if (block.player.hasTag("areinternal:standingOverUltraDeny")) {
        block.cancel = true;
    }
    if (block.player.hasTag("areinternal:standingOverHyperDeny")) {
        block.cancel = true;
    }
    if (beforeBlock.block.typeId.includes('chest')) {
        ms.world.scoreboard.getObjective('dirtletsEssentials:save:lockchest').getParticipants().forEach(dbItem => {
            let array = dbItem.displayName.split('#@##@&*£$strsplit#@##@&*£$');
            if (Math.floor(beforeBlock.block.location.x) == parseInt(array[0])) {
                if (Math.floor(beforeBlock.block.location.y) == parseInt(array[1])) {
                    if (Math.floor(beforeBlock.block.location.z) == parseInt(array[2])) {
                        block.cancel = true;
                    }
                }
            }
        });
    }
    if (ms.world.scoreboard.getObjective('dirtletsEssentials:save:buildAll').getParticipants()[0].displayName == "false") {
        block.cancel = true;
        return;
    }
    ms.world.scoreboard.getObjective('dirtletsEssentials:save:buildPeople').getParticipants().forEach(user => {
        if (user.displayName == beforeBlock.player.name) {
            block.cancel = true;
            return;
        }
    });
    if (beforeBlock.block.typeId.includes("jukebox")) {
        ms.system.run(() => {
            block.player.runCommand(`
                    stopsound @a[r=64, x=${beforeBlock.block.location.x}, y=${beforeBlock.block.location.y}, z=${beforeBlock.block.location.z}]
                `);
        });
    }
    if (beforeBlock.itemStack) {
        if (beforeBlock.itemStack.typeId.includes('wooden_axe')) {
            if (beforeBlock.itemStack.nameTag) {
                if (beforeBlock.itemStack.nameTag == "arefillwand") {
                    block.cancel = true;
                    if (!beforeBlock.player.hasTag(adminTag))
                        return;
                    let playerStillExists = false;
                    ms.system.run(() => {
                        ms.world.getAllPlayers().forEach((player) => {
                            if (ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:player').getParticipants()[0].displayName !== "") {
                                if (ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:player').getParticipants()[0].displayName === player.name) {
                                    playerStillExists = true;
                                }
                            }
                            else {
                                playerStillExists = true;
                            }
                        });
                        if (playerStillExists == false) {
                            ms.world.scoreboard.removeObjective('dirtletsEssentials:fillWand:block');
                            ms.world.scoreboard.addObjective('dirtletsEssentials:fillWand:block', 'dirtletsEssentials:fillWand:block');
                            beforeBlock.player.dimension.runCommand(`scoreboard players set "" "dirtletsEssentials:fillWand:block" 0`);
                            ms.world.scoreboard.removeObjective('dirtletsEssentials:fillWand:coordsSet1');
                            ms.world.scoreboard.addObjective('dirtletsEssentials:fillWand:coordsSet1', 'dirtletsEssentials:fillWand:coordsSet1');
                            beforeBlock.player.dimension.runCommand(`scoreboard players set "" "dirtletsEssentials:fillWand:coordsSet1" 0`);
                            ms.world.scoreboard.removeObjective('dirtletsEssentials:fillWand:coordsSet2');
                            ms.world.scoreboard.addObjective('dirtletsEssentials:fillWand:coordsSet2', 'dirtletsEssentials:fillWand:coordsSet2');
                            beforeBlock.player.dimension.runCommand(`scoreboard players set "" "dirtletsEssentials:fillWand:coordsSet2" 0`);
                            ms.world.scoreboard.removeObjective('dirtletsEssentials:fillWand:player');
                            ms.world.scoreboard.addObjective('dirtletsEssentials:fillWand:player', 'dirtletsEssentials:fillWand:player');
                            beforeBlock.player.dimension.runCommand(`scoreboard players set "" "dirtletsEssentials:fillWand:player" 0`);
                        }
                        if (ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:coordsSet1').getParticipants()[0].displayName == "") {
                            if (ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:player').getParticipants()[0].displayName == "") {
                                ms.world.scoreboard.removeObjective('dirtletsEssentials:fillWand:player');
                                ms.world.scoreboard.addObjective('dirtletsEssentials:fillWand:player', 'dirtletsEssentials:fillWand:player');
                                beforeBlock.player.dimension.runCommand(`scoreboard players set "${beforeBlock.player.name}" "dirtletsEssentials:fillWand:player" 0`);
                            }
                            ms.world.scoreboard.removeObjective('dirtletsEssentials:fillWand:coordsSet1');
                            ms.world.scoreboard.addObjective('dirtletsEssentials:fillWand:coordsSet1', 'dirtletsEssentials:fillWand:coordsSet1');
                            beforeBlock.player.dimension.runCommand(`scoreboard players set "${beforeBlock.block.location.x} ${beforeBlock.block.location.y} ${beforeBlock.block.location.z}" "dirtletsEssentials:fillWand:coordsSet1" 0`);
                            ms.world.scoreboard.removeObjective('dirtletsEssentials:fillWand:block');
                            ms.world.scoreboard.addObjective('dirtletsEssentials:fillWand:block', 'dirtletsEssentials:fillWand:block');
                            beforeBlock.player.dimension.runCommand(`scoreboard players set "minecraft:air" "dirtletsEssentials:fillWand:block" 0`);
                            // xyz1 Selection
                            beforeBlock.player.dimension.runCommand(`
                                            tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${beforeBlock.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${beforeBlock.player.name} > §eSucessfully set coords '${ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:coordsSet1').getParticipants()[0].displayName}' for set 1.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                        `);
                            beforeBlock.player.dimension.runCommand(`
                                            tellraw "${beforeBlock.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§eSucessfully set coords '${ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:coordsSet1').getParticipants()[0].displayName}' for set 1.§r"}]}
                                        `);
                            beforeBlock.player.runCommand(`
                                            playsound random.orb @a ~~~ 1 0.75
                                        `);
                        }
                        else {
                            if (ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:coordsSet2').getParticipants()[0].displayName == "") {
                                ms.system.run(() => {
                                    if (beforeBlock.player.name !== ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:player').getParticipants()[0].displayName) {
                                        beforeBlock.player.dimension.runCommand(`
                                            tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${beforeBlock.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${beforeBlock.player.name} > §cYou must let ${ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:player').getParticipants()[0].displayName} finish up with the fill wand in order for you to start using it.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                        `);
                                        beforeBlock.player.dimension.runCommand(`
                                            tellraw "${beforeBlock.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§cYou must let ${ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:player').getParticipants()[0].displayName} finish up with the fill wand in order for you to start using it.§r"}]}
                                        `);
                                        return;
                                    }
                                    ms.world.scoreboard.removeObjective('dirtletsEssentials:fillWand:coordsSet2');
                                    ms.world.scoreboard.addObjective('dirtletsEssentials:fillWand:coordsSet2', 'dirtletsEssentials:fillWand:coordsSet2');
                                    beforeBlock.player.dimension.runCommand(`scoreboard players set "${beforeBlock.block.location.x} ${beforeBlock.block.location.y} ${beforeBlock.block.location.z}" "dirtletsEssentials:fillWand:coordsSet2" 0`);
                                });
                                ms.system.run(() => {
                                    let result = beforeBlock.player.dimension.runCommand(`fill ${ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:coordsSet1').getParticipants()[0].displayName} ${ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:coordsSet2').getParticipants()[0].displayName} ${ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:block').getParticipants()[0].displayName}`);
                                    if (result.successCount == 0) {
                                        //xyz2 Selection and filled and error
                                        beforeBlock.player.dimension.runCommand(`
                                                    tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${beforeBlock.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${beforeBlock.player.name} > §cCould not fill the selected area, the area you selected was too big to fill or the fill block was identical to the selected blocks.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                                `);
                                        beforeBlock.player.dimension.runCommand(`
                                                    tellraw "${beforeBlock.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cCould not fill the selected area, the area you selected was too big to fill or the fill block was identical to the selected blocks.§r"}]}
                                                `);
                                        beforeBlock.player.runCommand(`
                                                    playsound random.orb @a ~~~ 1 0.5
                                                `);
                                    }
                                    else {
                                        //xyz2 Selection and filled
                                        beforeBlock.player.dimension.runCommand(`
                                                    tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${beforeBlock.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${beforeBlock.player.name} > §eSucessfully set coords '${ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:coordsSet2').getParticipants()[0].displayName}' for set 2 and filled.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                                `);
                                        beforeBlock.player.dimension.runCommand(`
                                                    tellraw "${beforeBlock.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§eSucessfully set coords '${ms.world.scoreboard.getObjective('dirtletsEssentials:fillWand:coordsSet2').getParticipants()[0].displayName}' for set 2 and filled.§r"}]}
                                                `);
                                        beforeBlock.player.runCommand(`
                                                    playsound random.orb @a ~~~ 1 1
                                                `);
                                    }
                                });
                                ms.system.run(() => {
                                    ms.world.scoreboard.removeObjective('dirtletsEssentials:fillWand:block');
                                    ms.world.scoreboard.addObjective('dirtletsEssentials:fillWand:block', 'dirtletsEssentials:fillWand:block');
                                    beforeBlock.player.dimension.runCommand(`scoreboard players set "" "dirtletsEssentials:fillWand:block" 0`);
                                    ms.world.scoreboard.removeObjective('dirtletsEssentials:fillWand:coordsSet1');
                                    ms.world.scoreboard.addObjective('dirtletsEssentials:fillWand:coordsSet1', 'dirtletsEssentials:fillWand:coordsSet1');
                                    beforeBlock.player.dimension.runCommand(`scoreboard players set "" "dirtletsEssentials:fillWand:coordsSet1" 0`);
                                    ms.world.scoreboard.removeObjective('dirtletsEssentials:fillWand:coordsSet2');
                                    ms.world.scoreboard.addObjective('dirtletsEssentials:fillWand:coordsSet2', 'dirtletsEssentials:fillWand:coordsSet2');
                                    beforeBlock.player.dimension.runCommand(`scoreboard players set "" "dirtletsEssentials:fillWand:coordsSet2" 0`);
                                    ms.world.scoreboard.removeObjective('dirtletsEssentials:fillWand:player');
                                    ms.world.scoreboard.addObjective('dirtletsEssentials:fillWand:player', 'dirtletsEssentials:fillWand:player');
                                    beforeBlock.player.dimension.runCommand(`scoreboard players set "" "dirtletsEssentials:fillWand:player" 0`);
                                });
                            }
                        }
                    });
                }
            }
        }
    }
}
export default runEventBeforePlayerBreakBlock;
