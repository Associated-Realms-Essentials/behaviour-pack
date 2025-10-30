import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatChatlogs(chatMessage, adminTag, args, messageHideTag, prefix) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            if (!args[1]) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6You can do '${prefix}chatlogs clear' to clear the chatlogs,§r\n§l§6Do '${prefix}chatlogs get 1' to get the latest 20 messages,§r\n§l§6Do '${prefix}chatlogs get 2' to get the next 20 messages,§r\n§l§6So on and so fourth.§r\n\n§l§6Do '${prefix}chatlogs search 'word' 1' to get the latest 20 messages that include the 'word' in them.§r\n§l§6The chatlogs get cleared automaticly when it reaches 100 pages to stop your world crashing.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6You can do '${prefix}chatlogs clear' to clear the chatlogs,§r\n§l§6Do '${prefix}chatlogs get 1' to get the latest 20 messages,§r\n§l§6Do '${prefix}chatlogs get 2' to get the next 20 messages,§r\n§l§6So on and so fourth.§r\n\n§l§6Do '${prefix}chatlogs search 'word' 1' to get the latest 20 messages that include the 'word' in them.§r\n§l§6The chatlogs get cleared automaticly when it reaches 100 pages to stop your world crashing.§r"}]}
                `);
            }
            else if (args[1] == "search") {
                if (!args[2]) {
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid search term. Eg. '${prefix}chatlogs search >('hacker' 1)'.§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid search term. Eg. '${prefix}chatlogs search >('hacker' 1)'.§r"}]}
                    `);
                    return;
                }
                if (!args[2].startsWith("'")) {
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid search term. Eg. '${prefix}chatlogs search >'hacker' 1'.§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid search term. Eg. '${prefix}chatlogs search >'hacker' 1'.§r"}]}
                    `);
                    return;
                }
                if (chatMessage.message.split("'")[2] == null) {
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid search term. Eg. '${prefix}chatlogs search >'hacker' 1'.§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid search term. Eg. '${prefix}chatlogs search >'hacker' 1'.§r"}]}
                    `);
                    return;
                }
                // Default args that comes with @minecraft/server doesnt support space excludes, thats the most annoying thing, i will have to make my own one temp for getting contents inside "''".
                var chatMessagesArray = [];
                var isArrayEmpty = true;
                // Get chat messages from database.
                ms.world.scoreboard.getObjective('dirtletsEssentials:save:chat').getParticipants().forEach(chatMessages => {
                    if (!chatMessages.displayName.includes('#@##@&*£$strsplit#@##@&*£$'))
                        return;
                    var array = chatMessages.displayName.split('#@##@&*£$strsplit#@##@&*£$');
                    var arg2Unstringed = ((chatMessage.message.split("'")[1]).replace("'", "")).replace("'", '');
                    if (!array[0].includes(arg2Unstringed))
                        return;
                    isArrayEmpty = false;
                    chatMessagesArray.push(array);
                });
                if (!chatMessage.message.split("'")[2]) {
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease Enter a page number from 1 - ${Math.floor(chatMessagesArray.length / 20) + 1}§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease Enter a page number from 1 - ${Math.floor(chatMessagesArray.length / 20) + 1}§r"}]}
                    `);
                    return;
                }
                if (chatMessage.message.split("'")[2]) {
                    var chatMessagesArrayInner = [];
                    var normalCount = 0;
                    var wentOver = false;
                    var count = (chatMessage.message.split("'")[2] * 20) - 20;
                    // Get chat messages from database.
                    chatMessagesArray.forEach(msg => {
                        if (normalCount == 20)
                            return;
                        if (chatMessagesArray[count]) {
                            chatMessagesArrayInner.push(chatMessagesArray[count]);
                            count += 1;
                            normalCount += 1;
                            return;
                        }
                        if (normalCount != 0)
                            return;
                        wentOver = true;
                    });
                    if (isArrayEmpty) {
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cNo chat messages have been found.§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cNo chat messages have been found.§r"}]}
                        `);
                    }
                    if (wentOver) {
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cNo chat messages have been found.§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cNo chat messages have been found.§r"}]}
                        `);
                        return;
                    }
                    if (!isArrayEmpty) {
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Here are the chatlogs:§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Here are the chatlogs:§r"}]}
                        `);
                        chatMessagesArrayInner.map(arrayInner => {
                            if (arrayInner[1]) {
                                chatMessage.sender.dimension.runCommand(`
                                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§e${arrayInner[1]}: ${arrayInner[0]}§r"}]}
                                `);
                                chatMessage.sender.dimension.runCommand(`
                                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§e${arrayInner[1]}: ${arrayInner[0]}§r"}]}
                                `);
                            }
                        });
                    }
                }
            }
            else if (args[1] == "get") {
                var chatMessagesArray = [];
                var isArrayEmpty = true;
                var findIndex = 0;
                // Get chat messages from database.
                ms.world.scoreboard.getObjective('dirtletsEssentials:save:chat').getParticipants().forEach(chatMessages => {
                    if (!chatMessages.displayName.includes('#@##@&*£$strsplit#@##@&*£$'))
                        return;
                    ms.world.scoreboard.getObjective('dirtletsEssentials:save:chat').getParticipants().forEach(chatMessages2 => {
                        var array = chatMessages2.displayName.split('#@##@&*£$strsplit#@##@&*£$');
                        if (array[2] != (findIndex + 1))
                            return;
                        chatMessagesArray.push(array);
                        findIndex += 1;
                    });
                    isArrayEmpty = false;
                });
                chatMessagesArray.reverse();
                if (!args[2]) {
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease Enter a page number from 1 - ${Math.floor(chatMessagesArray.length / 20) + 1}§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease Enter a page number from 1 - ${Math.floor(chatMessagesArray.length / 20) + 1}§r"}]}
                    `);
                    return;
                }
                if (args[2]) {
                    var chatMessagesArrayInner = [];
                    var normalCount = 0;
                    var wentOver = false;
                    var count = (args[2] * 20) - 20;
                    // Get chat messages from database.
                    chatMessagesArray.forEach(msg => {
                        if (normalCount == 20)
                            return;
                        if (chatMessagesArray[count]) {
                            chatMessagesArrayInner.push(chatMessagesArray[count]);
                            count += 1;
                            normalCount += 1;
                            return;
                        }
                        if (normalCount != 0)
                            return;
                        wentOver = true;
                    });
                    if (isArrayEmpty) {
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cNo chat messages have been found.§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cNo chat messages have been found.§r"}]}
                        `);
                    }
                    if (wentOver) {
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cNo chat messages have been found.§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cNo chat messages have been found.§r"}]}
                        `);
                        return;
                    }
                    if (!isArrayEmpty) {
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Here are the chatlogs:§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Here are the chatlogs:§r"}]}
                        `);
                        chatMessagesArrayInner.map(arrayInner => {
                            if (!arrayInner[1])
                                return;
                            chatMessage.sender.dimension.runCommand(`
                                tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§e${arrayInner[1]}: ${arrayInner[0]}§r"}]}
                            `);
                            chatMessage.sender.dimension.runCommand(`
                                tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§e${arrayInner[1]}: ${arrayInner[0]}§r"}]}
                            `);
                        });
                    }
                }
            }
            else if (args[1] == "clear") {
                ms.system.run(() => {
                    ms.world.scoreboard.removeObjective('dirtletsEssentials:save:chat');
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Sucessfully cleared the chatlogs.§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Sucessfully cleared the chatlogs.§r"}]}
                    `);
                });
            }
            else {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§4Invalid command.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§4Invalid command.§r"}]}
                `);
            }
            return;
        }
        chatMessage.sender.dimension.runCommand(`
            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cInsufficient Permissions.§r"}]}
        `);
        chatMessage.sender.dimension.runCommand(`
            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cInsufficient Permissions.§r"}]}
        `);
    });
}
export default runCommandChatChatlogs;
