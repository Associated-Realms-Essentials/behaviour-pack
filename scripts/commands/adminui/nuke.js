import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandAdminUiNuke(chatMessage, adminTag) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            chatMessage.sender.dimension.runCommand(`tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r${chatMessage.sender.name} EXECUTED NUKE COMMAND"}]}`);
            // This Commands data is also at the top in the setInterval for 10 ticks becuase it has to repeat the tnt summoning.
            // Nuke Off
            if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:command:nuke').getParticipants()[0].displayName == chatMessage.sender.name) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§eNuke has been §cdisabled.§r"}]}
                `);
                ms.world.scoreboard.removeObjective('associatedRealmsEssentials:command:nuke');
                ms.world.scoreboard.addObjective('associatedRealmsEssentials:command:nuke', 'associatedRealmsEssentials:command:nuke');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:command:nuke" 0`);
                return;
            }
            // Nuke On
            chatMessage.sender.dimension.runCommand(`
                tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§eNuke has been §aenabled.§r"}]}
            `);
            ms.world.scoreboard.removeObjective('associatedRealmsEssentials:command:nuke');
            ms.world.scoreboard.addObjective('associatedRealmsEssentials:command:nuke', 'associatedRealmsEssentials:command:nuke');
            chatMessage.sender.dimension.runCommand(`scoreboard players set "${chatMessage.sender.name}" "associatedRealmsEssentials:command:nuke" 0`);
            return;
        }
        chatMessage.sender.dimension.runCommand(`tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r${chatMessage.sender.name} EXECUTED NUKE COMMAND"}]}`);
        chatMessage.sender.dimension.runCommand(`tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r${chatMessage.sender.name} EXECUTED NUKE COMMAND"}]}`);
        chatMessage.sender.dimension.runCommand(`
            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cInsufficient Permissions.§r"}]}
        `);
        chatMessage.sender.dimension.runCommand(`
            tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cInsufficient Permissions.§r"}]}
        `);
    });
}
export default runCommandAdminUiNuke;
