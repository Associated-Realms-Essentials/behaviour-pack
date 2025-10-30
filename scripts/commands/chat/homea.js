import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatHomeA(chatMessage, adminTag, messageHideTag, prefix) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            ms.world.getAllPlayers().forEach(player => {
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
            });
            chatMessage.sender.dimension.runCommand(`
                tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully teleported everyone to their home.§r"}]}
            `);
            chatMessage.sender.dimension.runCommand(`
                tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully teleported everyone to their home.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
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
export default runCommandChatHomeA;
