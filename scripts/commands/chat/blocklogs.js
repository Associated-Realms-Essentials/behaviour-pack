import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatBlockLogs(chatMessage, adminTag, messageHideTag, prefix, args) {
    ms.system.run(() => {
        function sendCommandMessageForInitiatorAndAdmins(colorOfText, theMessage, hideName = false, hideTip = false, hideAssociation = false, bypassAdminHide = false) {
            ms.world.getAllPlayers().forEach(player => {
                if (player.name == chatMessage.sender.name) {
                    let associationText = `§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> `;
                    if (hideAssociation == true) {
                        associationText = "";
                    }
                    player.sendMessage(`${associationText}§r§l${colorOfText}${theMessage}§r`);
                }
            });
            ms.world.getAllPlayers().forEach(player => {
                if (player.hasTag(adminTag)) {
                    if (player.hasTag(messageHideTag)) {
                        if (bypassAdminHide == true) {
                            if (player.name !== chatMessage.sender.name) {
                                let nameText = chatMessage.sender.name + " > ";
                                let associationText = `§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> `;
                                if (hideName == true) {
                                    nameText = "";
                                }
                                if (hideAssociation == true) {
                                    associationText = "";
                                }
                                player.sendMessage(`${associationText}§r§l${colorOfText}${nameText}${theMessage}§r`);
                            }
                        }
                        return;
                    }
                    if (player.name !== chatMessage.sender.name) {
                        let tipText = "\n§r(give yourself the \"" + messageHideTag + "\" tag to silence these messages.)";
                        let nameText = chatMessage.sender.name + " > ";
                        let associationText = `§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> `;
                        if (hideName == true) {
                            nameText = "";
                        }
                        if (hideTip == true) {
                            tipText = "";
                        }
                        if (hideAssociation == true) {
                            associationText = "";
                        }
                        player.sendMessage(`${associationText}§r§l${colorOfText}${nameText}${theMessage}${tipText}§r`);
                    }
                }
            });
        }
        function sendCommandMessageForAll(theMessage) {
            ms.world.sendMessage(`§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l${theMessage}§r`);
        }
        if (chatMessage.sender.hasTag(adminTag)) {
            if (!args[1]) {
                sendCommandMessageForInitiatorAndAdmins("§6", `You can do '${prefix}blocklogs clear' to clear the blocklogs,§r\n§l§6Do '${prefix}blocklogs get' to get all the block logs,§r\n§l§6Do '${prefix}blocklogs search 'word'' to get all the logs that include the 'word' in them.`, true, true);
            }
            else if (args[1] == "search") {
                if (!args[2]) {
                    sendCommandMessageForInitiatorAndAdmins("§c", `Please enter a valid search term. Eg. '${prefix}blocklogs search >('thing**thing')'.`, true, true);
                    return;
                }
                if (!args[2].startsWith("'")) {
                    sendCommandMessageForInitiatorAndAdmins("§c", `Please enter a valid search term. Eg. '${prefix}blocklogs search >'thing**thing''.`, true, true);
                    return;
                }
                if (chatMessage.message.split("'")[2] == null) {
                    sendCommandMessageForInitiatorAndAdmins("§c", `Please enter a valid search term. Eg. '${prefix}blocklogs search >'thing**thing''.`, true, true);
                    return;
                }
                var blockLogsArray = [];
                var isArrayEmpty = true;
                ms.world.scoreboard.getObjective('dirtletsEssentials:save:blocklogs').getParticipants().forEach(blockLogs => {
                    if (!blockLogs.displayName.includes('#@##@&*£$strsplit#@##@&*£$'))
                        return;
                    var array = blockLogs.displayName.split('#@##@&*£$strsplit#@##@&*£$');
                    var arg2Unstringed = chatMessage.message.split("'")[1]?.replace(/'/g, '');
                    if (arg2Unstringed) {
                        var searchTerms = arg2Unstringed.split("**");
                        let isSearched = searchTerms.every(searchTerm => {
                            let foundInAnyPart = array.some(part => part.includes(searchTerm));
                            return foundInAnyPart;
                        });
                        if (isSearched) {
                            isArrayEmpty = false;
                            blockLogsArray.push(array);
                        }
                    }
                });
                if (isArrayEmpty) {
                    sendCommandMessageForInitiatorAndAdmins("§c", `No block logs have been found.`, true, true);
                }
                if (!isArrayEmpty) {
                    sendCommandMessageForInitiatorAndAdmins("§6", `Here are the blocklogs:`, true, true);
                    blockLogsArray.map(arrayInner => {
                        if (!arrayInner[1])
                            return;
                        switch (arrayInner[5]) {
                            case 'place': {
                                sendCommandMessageForInitiatorAndAdmins("§e", `${arrayInner[0]} placed by ${arrayInner[1]} at §c${arrayInner[2]} ${arrayInner[3]} ${arrayInner[4]}`, true, true, true);
                                break;
                            }
                            case 'break': {
                                sendCommandMessageForInitiatorAndAdmins("§e", `${arrayInner[0]} mined by ${arrayInner[1]} at §c${arrayInner[2]} ${arrayInner[3]} ${arrayInner[4]}`, true, true, true);
                                break;
                            }
                            case 'use': {
                                sendCommandMessageForInitiatorAndAdmins("§e", `${arrayInner[0]} used by ${arrayInner[1]} at §c${arrayInner[2]} ${arrayInner[3]} ${arrayInner[4]}`, true, true, true);
                                break;
                            }
                            case 'interact': {
                                sendCommandMessageForInitiatorAndAdmins("§e", `${arrayInner[0]} interacted with by ${arrayInner[1]} at §c${arrayInner[2]} ${arrayInner[3]} ${arrayInner[4]}`, true, true, true);
                                break;
                            }
                        }
                    });
                }
            }
            else if (args[1] == "get") {
                var blockLogsArray = [];
                var isArrayEmpty = true;
                var findIndex = 0;
                // Get chat messages from database.
                ms.world.scoreboard.getObjective('dirtletsEssentials:save:blocklogs').getParticipants().forEach(blockLogs => {
                    if (!blockLogs.displayName.includes('#@##@&*£$strsplit#@##@&*£$'))
                        return;
                    var array = blockLogs.displayName.split('#@##@&*£$strsplit#@##@&*£$');
                    blockLogsArray.push(array);
                    findIndex += 1;
                    isArrayEmpty = false;
                });
                if (args[1]) {
                    if (isArrayEmpty) {
                        sendCommandMessageForInitiatorAndAdmins("§c", `No block logs have been found.`, true, true);
                    }
                    if (!isArrayEmpty) {
                        sendCommandMessageForInitiatorAndAdmins("§6", `Here are the blocklogs:`, true, true);
                        blockLogsArray.map(arrayInner => {
                            if (!arrayInner[1])
                                return;
                            switch (arrayInner[5]) {
                                case 'place': {
                                    sendCommandMessageForInitiatorAndAdmins("§e", `${arrayInner[0]} placed by ${arrayInner[1]} at §c${arrayInner[2]} ${arrayInner[3]} ${arrayInner[4]}`, true, true, true);
                                    break;
                                }
                                case 'break': {
                                    sendCommandMessageForInitiatorAndAdmins("§e", `${arrayInner[0]} mined by ${arrayInner[1]} at §c${arrayInner[2]} ${arrayInner[3]} ${arrayInner[4]}`, true, true, true);
                                    break;
                                }
                                case 'use': {
                                    sendCommandMessageForInitiatorAndAdmins("§e", `${arrayInner[0]} used by ${arrayInner[1]} at §c${arrayInner[2]} ${arrayInner[3]} ${arrayInner[4]}`, true, true, true);
                                    break;
                                }
                                case 'interact': {
                                    sendCommandMessageForInitiatorAndAdmins("§e", `${arrayInner[0]} interacted by ${arrayInner[1]} at §c${arrayInner[2]} ${arrayInner[3]} ${arrayInner[4]}`, true, true, true);
                                    break;
                                }
                            }
                        });
                    }
                }
            }
            else if (args[1] == "clear") {
                ms.system.run(() => {
                    ms.world.scoreboard.removeObjective('dirtletsEssentials:save:blocklogs');
                    sendCommandMessageForInitiatorAndAdmins("§6", `Sucessfully cleared the blocklogs.`, true, true);
                });
            }
            else {
                sendCommandMessageForInitiatorAndAdmins("§4", `Invalid command.`, true, true);
            }
            return;
        }
        sendCommandMessageForInitiatorAndAdmins("§c", `Insufficient Permissions.`, true, true);
    });
}
export default runCommandChatBlockLogs;
