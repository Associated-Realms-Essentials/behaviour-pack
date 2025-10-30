import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatResetThreads(chatMessage, adminTag, messageHideTag, prefix, cancelableThreads) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            cancelableThreads.forEach(threads => {
                ms.system.clearRun(threads);
                ms.system.clearJob(threads);
            });
            chatMessage.sender.dimension.runCommand(`
                tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully terminated all threads.§r"}]}
            `);
            chatMessage.sender.dimension.runCommand(`
                tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully terminated all threads.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
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
export default runCommandChatResetThreads;
