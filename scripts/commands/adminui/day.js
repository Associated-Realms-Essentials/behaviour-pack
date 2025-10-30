import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandAdminUiDay(chatMessage, adminTag) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            chatMessage.sender.dimension.runCommand(`tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r${chatMessage.sender.name} EXECUTED DAY COMMAND"}]}`);
            chatMessage.sender.dimension.runCommand(`time set day`);
            chatMessage.sender.dimension.runCommand(`
                tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully set the time to day.§r"}]}
            `);
            return;
        }
        chatMessage.sender.dimension.runCommand(`tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r${chatMessage.sender.name} EXECUTED DAY COMMAND"}]}`);
        chatMessage.sender.dimension.runCommand(`tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r${chatMessage.sender.name} EXECUTED DAY COMMAND"}]}`);
        chatMessage.sender.dimension.runCommand(`
            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cInsufficient Permissions.§r"}]}
        `);
        chatMessage.sender.dimension.runCommand(`
            tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cInsufficient Permissions.§r"}]}
        `);
    });
}
export default runCommandAdminUiDay;
