import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatLockChest(chatMessage, adminTag, messageHideTag, prefix, args) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            if (!args[1]) {
                let isInDBAlready = false;
                ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:lockchest').getParticipants().forEach(dbItem => {
                    let array = dbItem.displayName.split('#@##@&*£$strsplit#@##@&*£$');
                    if (Math.floor(chatMessage.sender.location.x) == parseInt(array[0])) {
                        if (Math.floor(chatMessage.sender.location.y) == parseInt(array[1])) {
                            if (Math.floor(chatMessage.sender.location.z) == parseInt(array[2])) {
                                isInDBAlready = true;
                            }
                        }
                    }
                });
                if (!isInDBAlready) {
                    // not in db
                    let state = chatMessage.sender.dimension.runCommand(`testforblock ${Math.floor(chatMessage.sender.location.x)} ${Math.floor(chatMessage.sender.location.y)} ${Math.floor(chatMessage.sender.location.z)} chest`);
                    if (state.successCount == 1) {
                        chatMessage.sender.dimension.runCommand(`scoreboard players set "${Math.floor(chatMessage.sender.location.x)}#@##@&*£$strsplit#@##@&*£$${Math.floor(chatMessage.sender.location.y)}#@##@&*£$strsplit#@##@&*£$${Math.floor(chatMessage.sender.location.z)}" "associatedRealmsEssentials:save:lockchest" 0`);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully §clocked §6the chest.§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully §clocked §6the chest.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                    }
                    else {
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Please stand on a chest.§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Please stand on a chest.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                    }
                }
                if (isInDBAlready) {
                    // is in db
                    let state = chatMessage.sender.dimension.runCommand(`testforblock ${Math.floor(chatMessage.sender.location.x)} ${Math.floor(chatMessage.sender.location.y)} ${Math.floor(chatMessage.sender.location.z)} chest`);
                    if (state.successCount == 1) {
                        ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:lockchest').removeParticipant(`${Math.floor(chatMessage.sender.location.x)}#@##@&*£$strsplit#@##@&*£$${Math.floor(chatMessage.sender.location.y)}#@##@&*£$strsplit#@##@&*£$${Math.floor(chatMessage.sender.location.z)}`);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully §aunlocked §6the chest.§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully §aunlocked §6the chest.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                    }
                    else {
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Please stand on a chest.§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Please stand on a chest.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                    }
                }
                return;
            }
            if (!args[2]) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter the Y Coordinate.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter the Y Coordinate.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (!args[3]) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter the Z Coordinate.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter the Z Coordinate.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (isNaN(args[1])) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Coordinate X is not a number.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Coordinate X is not a number.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (isNaN(args[2])) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Coordinate Y is not a number.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Coordinate Y is not a number.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (isNaN(args[3])) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Coordinate Z is not a number.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Coordinate Z is not a number.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            let isInDBAlready = false;
            ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:lockchest').getParticipants().forEach(dbItem => {
                let array = dbItem.displayName.split('#@##@&*£$strsplit#@##@&*£$');
                if (Math.floor(args[1]) == parseInt(array[0])) {
                    if (Math.floor(args[2]) == parseInt(array[1])) {
                        if (Math.floor(args[3]) == parseInt(array[2])) {
                            isInDBAlready = true;
                        }
                    }
                }
            });
            if (!isInDBAlready) {
                // not in db
                let state = chatMessage.sender.dimension.runCommand(`testforblock ${Math.floor(args[1])} ${Math.floor(args[2])} ${Math.floor(args[3])} chest`);
                if (state.successCount == 1) {
                    chatMessage.sender.dimension.runCommand(`scoreboard players set "${Math.floor(args[1])}#@##@&*£$strsplit#@##@&*£$${Math.floor(args[2])}#@##@&*£$strsplit#@##@&*£$${Math.floor(args[3])}" "associatedRealmsEssentials:save:lockchest" 0`);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully §clocked §6the chest.§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully §clocked §6the chest.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                }
                else {
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6No chest found.§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > No chest found.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                }
            }
            if (isInDBAlready) {
                // is in db
                let state = chatMessage.sender.dimension.runCommand(`testforblock ${Math.floor(args[1])} ${Math.floor(args[2])} ${Math.floor(args[3])} chest`);
                if (state.successCount == 1) {
                    ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:lockchest').removeParticipant(`${Math.floor(args[1])}#@##@&*£$strsplit#@##@&*£$${Math.floor(args[2])}#@##@&*£$strsplit#@##@&*£$${Math.floor(args[3])}`);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully §aunlocked §6the chest.§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully §aunlocked §6the chest.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                }
                else {
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6No chest found.§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > No chest found.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                }
            }
            return;
        }
        chatMessage.sender.dimension.runCommand(`
            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cInsufficient Permissions.§r"}]}
        `);
        chatMessage.sender.dimension.runCommand(`
            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Insufficient Permissions.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
        `);
    });
}
export default runCommandChatLockChest;
