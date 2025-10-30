import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatHomeP(chatMessage, adminTag, messageHideTag, prefix, args) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            if (!args[1]) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Please do '${prefix}homep 'player'' to send the player that you put in the apostrophes to their home.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Please do '${prefix}homep 'player'' to teleport the player that you put in the apostrophes to their home.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (!args[1].startsWith("'")) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player name. Eg. '${prefix}homep >'player''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player name. Eg. '${prefix}homep >'player''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (chatMessage.message.split("'")[2] == null) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player name. Eg. '${prefix}homep >'player''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player name. Eg. '${prefix}homep >'player''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
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
            ms.world.getAllPlayers().forEach(player => {
                if (player.name == chatMessage.message.split("'")[1]) {
                    if (!player.getSpawnPoint()) {
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${player.name} does not have a spawn point set, ask them to sleep in a bed.§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${player.name} > ${player.name} does not have a spawn point set, ask them to sleep in a bed.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                        return;
                    }
                    ms.system.run(() => {
                        player.teleport(player.getSpawnPoint(), { dimension: ms.world.getDimension('overworld') });
                        player.runCommand('particle minecraft:crop_growth_area_emitter ~~2~');
                        player.runCommand('playsound random.orb @a ~~~');
                    });
                    if (!player.hasTag(adminTag)) {
                        player.runCommand('gamemode s');
                    }
                    player.dimension.runCommand(`
                        tellraw "${player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6A admin teleported you to your Home!§r"}]}
                    `);
                    player.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${player.name} > A admin teleported you to your Home!\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                }
            });
            chatMessage.sender.dimension.runCommand(`
                tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully teleported ${chatMessage.message.split("'")[1]} to their home.§r"}]}
            `);
            chatMessage.sender.dimension.runCommand(`
                tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully teleported ${chatMessage.message.split("'")[1]} to their home.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
            `);
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
export default runCommandChatHomeP;
