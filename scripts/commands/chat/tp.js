import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
async function runCommandChatTp(chatMessage, adminTag, args, playerArray, messageHideTag, prefix, blockedTag) {
    ms.system.run(async () => {
        if (!chatMessage.sender.hasTag(blockedTag)) {
            if (!args[1]) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Please do '${prefix}tp 'player'' to send a tp request to the player name you put in the apostrophes.\n'${prefix}tp accept' is to accept a tp invite from a player.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Please do '${prefix}tp 'player'' to send a tp request to the player name you put in the apostrophes.\n'${prefix}tp accept' is to accept a tp invite from a player.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (args[1] == "accept") {
                let playerFound = false;
                playerArray.forEach((innerObjects) => {
                    if (innerObjects.tpTo == chatMessage.sender.name) {
                        playerFound = true;
                    }
                });
                if (!playerFound) {
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cYou do not have any valid invites.§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > You do not have any valid invites.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                    return;
                }
                ms.system.run(() => {
                    let player1NotFound = true;
                    let player2NotFound = true;
                    playerArray.forEach((innerObjects, indexOfObject) => {
                        console.warn(indexOfObject);
                        if (innerObjects.tpTo != chatMessage.sender.name)
                            return;
                        ms.world.getPlayers().forEach(player1 => {
                            if (player1.name != innerObjects.sender)
                                return;
                            player1NotFound = false;
                            ms.world.getPlayers().forEach(player2 => {
                                if (player2.name != innerObjects.tpTo)
                                    return;
                                player2NotFound = false;
                                if (player1.hasTag(blockedTag)) {
                                    chatMessage.sender.dimension.runCommand(`
                                        tellraw "${player1.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Sucessfully Teleported t... Attempting to escape the matrix ${player1.name}? well they cant tp you out while you are blocked.§r"}]}
                                    `);
                                    chatMessage.sender.dimension.runCommand(`
                                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${player1.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${player1.name} > Sucessfully Teleported t... Attempting to escape the matrix ${player1.name}? well they cant tp you out while you are blocked.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                    `);
                                    chatMessage.sender.dimension.runCommand(`
                                        tellraw "${player2.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${player1.name} sucessfully T... It appears ${player1.name} is blocked, what a sticky predicament? well you cant tp them out!§r"}]}
                                    `);
                                    chatMessage.sender.dimension.runCommand(`
                                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${player2.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${player2.name} > ${player1.name} sucessfully T... It appears ${player1.name} is blocked, what a sticky predicament? well you cant tp them out!\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                    `);
                                    return;
                                }
                                player1.runCommand(`tp @s "${player2.name}"`);
                                if (!player1.hasTag(adminTag)) {
                                    player1.runCommand('gamemode s');
                                }
                                player1.runCommand('particle minecraft:crop_growth_area_emitter ~~2~');
                                player1.runCommand('playsound random.orb @a ~~~');
                                chatMessage.sender.dimension.runCommand(`
                                    tellraw "${player1.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Sucessfully Teleported to ${player2.name}.§r"}]}
                                `);
                                chatMessage.sender.dimension.runCommand(`
                                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${player1.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${player1.name} > Sucessfully Teleported to ${player2.name}.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                `);
                                player2.runCommand('particle minecraft:crop_growth_area_emitter ~~2~');
                                player2.runCommand('playsound random.orb @a ~~~');
                                chatMessage.sender.dimension.runCommand(`
                                    tellraw "${player2.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${player1.name} sucessfully Teleported to you.§r"}]}
                                `);
                                chatMessage.sender.dimension.runCommand(`
                                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${player2.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${player2.name} > ${player1.name} sucessfully Teleported to you.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                `);
                                playerArray.splice(indexOfObject, 1);
                            });
                        });
                    });
                    if (player1NotFound) {
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cThe sender was not found.§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > The sender was not found.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                    }
                    if (player2NotFound) {
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cThe tpTo was not found.§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > The tpTo was not found.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                    }
                });
                return;
            }
            if (!args[1].startsWith("'")) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player name. Eg. '${prefix}tp >'player''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player name. Eg. '${prefix}tp >'player''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (chatMessage.message.split("'")[2] == null) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player name. Eg. '${prefix}tp >'player''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player name. Eg. '${prefix}tp >'player''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            let playerFound = false;
            ms.world.getPlayers().forEach(player => {
                if (player.name == chatMessage.message.split("'")[1]) {
                    playerFound = true;
                }
            });
            if (!playerFound) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player within the world currently.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player within the world currently.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            chatMessage.sender.dimension.runCommand(`
                tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Your TP request to '${chatMessage.message.split("'")[1]}' has been sent.§r"}]}
            `);
            chatMessage.sender.dimension.runCommand(`
                tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Your TP request to '${chatMessage.message.split("'")[1]}' has been sent.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
            `);
            chatMessage.sender.dimension.runCommand(`tellraw "${chatMessage.message.split("'")[1]}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6You recieved a TP request from '${chatMessage.sender.name}'.\nType '${prefix}tp accept' to accept the request,\nOr wait 30 seconds for the request to be declined.§r"}]}`);
            chatMessage.sender.dimension.runCommand(`tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.message.split("'")[1]} recieved a TP request from '${chatMessage.sender.name}'.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}`);
            playerArray.push({ "time": Date.now() + 30000, "sender": chatMessage.sender.name, "tpTo": chatMessage.message.split("'")[1] });
            await sleep(300);
            playerArray.forEach((innerObjects, indexOfObject) => {
                if (innerObjects.time < Date.now()) {
                    chatMessage.sender.dimension.runCommand(`tellraw "${chatMessage.message.split("'")[1]}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6The TP request from '${chatMessage.sender.name}' has been declined.§r"}]}`);
                    chatMessage.sender.dimension.runCommand(`tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.message.split("'")[1]}'s TP request from '${chatMessage.sender.name}' has been declined.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}`);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Your TP request to '${chatMessage.message.split("'")[1]}' has been declined.§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name}'s TP request to '${chatMessage.message.split("'")[1]}' has been declined.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                    playerArray.splice(indexOfObject, 1);
                }
            });
            return;
        }
        chatMessage.sender.dimension.runCommand(`
            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§4You have been blocked from using ${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}.§r"}]}
        `);
        chatMessage.sender.dimension.runCommand(`
            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§4${chatMessage.sender.name} > You have been blocked from using ${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
        `);
    });
}
export default runCommandChatTp;
