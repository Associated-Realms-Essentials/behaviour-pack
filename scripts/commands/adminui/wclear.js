import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandAdminUiWClear(chatMessage, adminTag) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            chatMessage.sender.dimension.runCommand(`tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r${chatMessage.sender.name} EXECUTED WCLEAR COMMAND"}]}`);
            chatMessage.sender.dimension.runCommand(`weather clear`);
            chatMessage.sender.dimension.runCommand(`
                tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully set the weather to clear.§r"}]}
            `);
            return;
        }
        chatMessage.sender.dimension.runCommand(`tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r${chatMessage.sender.name} EXECUTED WCLEAR COMMAND"}]}`);
        chatMessage.sender.dimension.runCommand(`tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r${chatMessage.sender.name} EXECUTED WCLEAR COMMAND"}]}`);
        chatMessage.sender.dimension.runCommand(`
            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cInsufficient Permissions.§r"}]}
        `);
        chatMessage.sender.dimension.runCommand(`
            tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cInsufficient Permissions.§r"}]}
        `);
    });
}
export default runCommandAdminUiWClear;
