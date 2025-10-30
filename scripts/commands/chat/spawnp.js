import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatSpawnP(chatMessage, adminTag, messageHideTag, prefix, args) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            if (!args[1]) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Please do '${prefix}spawnp 'player'' to send the player that you put in the apostrophes to world spawn.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Please do '${prefix}spawnp 'player'' to teleport the player that you put in the apostrophes to world spawn.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (!args[1].startsWith("'")) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player name. Eg. '${prefix}spawnp >'player''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player name. Eg. '${prefix}spawnp >'player''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (chatMessage.message.split("'")[2] == null) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player name. Eg. '${prefix}spawnp >'player''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player name. Eg. '${prefix}spawnp >'player''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
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
                    ms.system.run(() => {
                        player.teleport({ x: ms.world.getDefaultSpawnLocation().x + 0.50, y: ms.world.getDefaultSpawnLocation().y, z: ms.world.getDefaultSpawnLocation().z + 0.50 }, { dimension: chatMessage.sender.dimension });
                        player.runCommand('particle minecraft:crop_growth_area_emitter ~~2~');
                        player.runCommand('playsound random.orb @a ~~~');
                    });
                }
            });
            chatMessage.sender.dimension.runCommand(`
                tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully teleported ${chatMessage.message.split("'")[1]} to world spawn.§r"}]}
            `);
            chatMessage.sender.dimension.runCommand(`
                tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully teleported ${chatMessage.message.split("'")[1]} to world spawn.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
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
export default runCommandChatSpawnP;
