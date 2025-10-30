import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function sanitizeStringForMessage(str) {
    str = str.replace(/[^a-z0-9áéíóúñü .,>\-_/\\]|\\./gim, "");
    if (str == "") {
        str = "[illegal character]";
    }
    str = str.toLowerCase();
    return str.trim();
}
function sanitizeStringForUsername(str) {
    str = str.replace(/[^a-z0-9áéíóúñü .,>\-_/\\]|\\./gim, "");
    return str.trim();
}
function runCommandChatReportP(chatMessage, adminTag, messageHideTag, prefix, args) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            if (!args[1]) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Please do '${prefix}reportp 'player' 'message'' to report a player with a message.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Please do '${prefix}reportp 'player' 'message'' to report a player with a message.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (!args[1].startsWith("'")) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player name. Eg. '${prefix}reportp >'player' 'message''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player name. Eg. '${prefix}reportp >'player' 'message''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (chatMessage.message.split("'")[2] == null) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player name. Eg. '${prefix}reportp >'player' 'message''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player name. Eg. '${prefix}reportp >'player' 'message''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (chatMessage.message.split("'")[1] == "") {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a player name.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a player name.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (chatMessage.message.split("'")[4] == null) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid message. Eg. '${prefix}reportp 'player' >'message''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid message. Eg. '${prefix}reportp 'player' >'message''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (chatMessage.message.split("'")[3] == "") {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a message.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a message.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            // put player name along with message in the database.
            chatMessage.sender.dimension.runCommand(`scoreboard players set "${sanitizeStringForUsername(chatMessage.message.split("'")[1])}#@##@&*£$strsplit#@##@&*£$${sanitizeStringForMessage(chatMessage.message.split("'")[3])}#@##@&*£$strsplit#@##@&*£$${sanitizeStringForUsername(chatMessage.sender.name)}" "associatedRealmsEssentials:save:playerReports" 0`);
            chatMessage.sender.dimension.runCommand(`
                tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully reported ${chatMessage.message.split("'")[1]} for '${chatMessage.message.split("'")[3]}'.§r"}]}
            `);
            chatMessage.sender.dimension.runCommand(`
                tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully reported ${chatMessage.message.split("'")[1]} for '${chatMessage.message.split("'")[3]}'.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
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
export default runCommandChatReportP;
