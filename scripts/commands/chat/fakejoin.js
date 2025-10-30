import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatFakejoin(chatMessage, adminTag, messageHideTag, prefix) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            chatMessage.sender.dimension.runCommand(`
                tellraw @a {"rawtext":[{"text":"§e${chatMessage.sender.name} joined the Realm§r"}]}
            `);
            if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:joinMessages:enabled').getParticipants()[0].displayName != "true")
                return;
            if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:joinMessages:text').getParticipants()[0].displayName == "") {
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a {"rawtext":[{"text":"\n§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§lEveryone Welcome ${chatMessage.sender.name}!§r"}]}
                `);
                return;
            }
            var joinMessage = ms.world.scoreboard.getObjective('associatedRealmsEssentials:joinMessages:text').getParticipants()[0].displayName;
            var joinMessageEdited = joinMessage.replaceAll('[player]', chatMessage.sender.name);
            chatMessage.sender.dimension.runCommand(`
                tellraw @a {"rawtext":[{"text":"\n§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r${joinMessageEdited}§r"}]}
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
export default runCommandChatFakejoin;
