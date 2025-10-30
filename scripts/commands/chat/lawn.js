import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatLawn(chatMessage, adminTag, messageHideTag, prefix) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            // This Commands data is also at the top in the setInterval for 10 ticks because it has to repeat filling with grass.
            // Nuke Off
            if (ms.world.scoreboard.getObjective('dirtletsEssentials:command:lawn').getParticipants()[0].displayName == chatMessage.sender.name) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§eLawn has been §cdisabled.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§e${chatMessage.sender.name} > Lawn has been §cdisabled.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                ms.world.scoreboard.removeObjective('dirtletsEssentials:command:lawn');
                ms.world.scoreboard.addObjective('dirtletsEssentials:command:lawn', 'dirtletsEssentials:command:lawn');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "" "dirtletsEssentials:command:lawn" 0`);
                return;
            }
            // Nuke On
            chatMessage.sender.dimension.runCommand(`
                tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§eLawn has been §aenabled.§r"}]}
            `);
            chatMessage.sender.dimension.runCommand(`
                tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§e${chatMessage.sender.name} > Lawn has been §aenabled.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
            `);
            ms.world.scoreboard.removeObjective('dirtletsEssentials:command:lawn');
            ms.world.scoreboard.addObjective('dirtletsEssentials:command:lawn', 'dirtletsEssentials:command:lawn');
            chatMessage.sender.dimension.runCommand(`scoreboard players set "${chatMessage.sender.name}" "dirtletsEssentials:command:lawn" 0`);
            return;
        }
        chatMessage.sender.dimension.runCommand(`
            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cInsufficient Permissions.§r"}]}
        `);
        chatMessage.sender.dimension.runCommand(`
            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Insufficient Permissions.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
        `);
    });
}
export default runCommandChatLawn;
