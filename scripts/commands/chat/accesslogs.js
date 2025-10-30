import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatAccessLogs(chatMessage, adminTag, messageHideTag, prefix, args) {
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
                sendCommandMessageForInitiatorAndAdmins("§6", `You can do '${prefix}accesslogs clear' to clear the accesslogs,§r\n§l§6Do '${prefix}accesslogs get' to get all the joinlogs and leavelogs,§r\n§l§6Do '${prefix}accesslogs search 'word'' to get all the logs that include the 'word' in them.`, true, true);
            }
            else if (args[1] == "search") {
                if (!args[2]) {
                    sendCommandMessageForInitiatorAndAdmins("§c", `Please enter a valid search term. Eg. '${prefix}accesslogs search >('thing**thing')'.`, true, true);
                    return;
                }
                if (!args[2].startsWith("'")) {
                    sendCommandMessageForInitiatorAndAdmins("§c", `Please enter a valid search term. Eg. '${prefix}accesslogs search >'thing**thing''.`, true, true);
                    return;
                }
                if (chatMessage.message.split("'")[2] == null) {
                    sendCommandMessageForInitiatorAndAdmins("§c", `Please enter a valid search term. Eg. '${prefix}accesslogs search >'thing**thing''.`, true, true);
                    return;
                }
                var accessLogsArray = [];
                var isArrayEmpty = true;
                ms.world.scoreboard.getObjective('dirtletsEssentials:save:accesslogs').getParticipants().forEach(accessLogs => {
                    if (!accessLogs.displayName.includes('#@##@&*£$strsplit#@##@&*£$'))
                        return;
                    var array = accessLogs.displayName.split('#@##@&*£$strsplit#@##@&*£$');
                    var arg2Unstringed = chatMessage.message.split("'")[1]?.replace(/'/g, '');
                    if (arg2Unstringed) {
                        var searchTerms = arg2Unstringed.split("**");
                        let isSearched = searchTerms.every(searchTerm => {
                            let foundInAnyPart = array.some(part => part.includes(searchTerm));
                            return foundInAnyPart;
                        });
                        if (isSearched) {
                            isArrayEmpty = false;
                            accessLogsArray.push(array);
                        }
                    }
                });
                if (isArrayEmpty) {
                    sendCommandMessageForInitiatorAndAdmins("§c", `No access logs have been found.`, true, true);
                }
                if (!isArrayEmpty) {
                    sendCommandMessageForInitiatorAndAdmins("§6", `Here are the access logs:`, true, true);
                    function parseCustomDate(str) {
                        const datePart = str.slice(0, 8);
                        const timePart = str.slice(9, 15);
                        const year = datePart.slice(0, 4);
                        const month = datePart.slice(4, 6);
                        const day = datePart.slice(6, 8);
                        const hours = timePart.slice(0, 2);
                        const minutes = timePart.slice(2, 4);
                        const seconds = timePart.slice(4, 6);
                        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
                    }
                    accessLogsArray.sort((a, b) => {
                        if (!a[1] || !b[1])
                            return 0;
                        const dateA = new Date(parseCustomDate(a[1]));
                        const dateB = new Date(parseCustomDate(b[1]));
                        return dateB - dateA;
                    });
                    accessLogsArray.forEach(arrayInner => {
                        if (!arrayInner[1])
                            return;
                        switch (arrayInner[2]) {
                            case 'join': {
                                const isoString = parseCustomDate(arrayInner[1]);
                                const date = new Date(isoString);
                                sendCommandMessageForInitiatorAndAdmins("§e", `${arrayInner[0]} joined at ${date.toLocaleString()}`, true, true, true);
                                break;
                            }
                            case 'leave': {
                                const isoString = parseCustomDate(arrayInner[1]);
                                const date = new Date(isoString);
                                sendCommandMessageForInitiatorAndAdmins("§e", `${arrayInner[0]} left at ${date.toLocaleString()}`, true, true, true);
                                break;
                            }
                        }
                    });
                }
            }
            else if (args[1] == "get") {
                var accessLogsArray = [];
                var isArrayEmpty = true;
                var findIndex = 0;
                // Get chat messages from database.
                ms.world.scoreboard.getObjective('dirtletsEssentials:save:accesslogs').getParticipants().forEach(accessLogs => {
                    if (!accessLogs.displayName.includes('#@##@&*£$strsplit#@##@&*£$'))
                        return;
                    var array = accessLogs.displayName.split('#@##@&*£$strsplit#@##@&*£$');
                    accessLogsArray.push(array);
                    findIndex += 1;
                    isArrayEmpty = false;
                });
                if (args[1]) {
                    if (isArrayEmpty) {
                        sendCommandMessageForInitiatorAndAdmins("§c", `No access logs have been found.`, true, true);
                    }
                    if (!isArrayEmpty) {
                        sendCommandMessageForInitiatorAndAdmins("§6", `Here are the access logs:`, true, true);
                        function parseCustomDate(str) {
                            const datePart = str.slice(0, 8);
                            const timePart = str.slice(9, 15);
                            const year = datePart.slice(0, 4);
                            const month = datePart.slice(4, 6);
                            const day = datePart.slice(6, 8);
                            const hours = timePart.slice(0, 2);
                            const minutes = timePart.slice(2, 4);
                            const seconds = timePart.slice(4, 6);
                            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
                        }
                        accessLogsArray.sort((a, b) => {
                            if (!a[1] || !b[1])
                                return 0;
                            const dateA = new Date(parseCustomDate(a[1]));
                            const dateB = new Date(parseCustomDate(b[1]));
                            return dateB - dateA;
                        });
                        accessLogsArray.forEach(arrayInner => {
                            if (!arrayInner[1])
                                return;
                            switch (arrayInner[2]) {
                                case 'join': {
                                    const isoString = parseCustomDate(arrayInner[1]);
                                    const date = new Date(isoString);
                                    sendCommandMessageForInitiatorAndAdmins("§e", `${arrayInner[0]} joined at ${date.toLocaleString()}`, true, true, true);
                                    break;
                                }
                                case 'leave': {
                                    const isoString = parseCustomDate(arrayInner[1]);
                                    const date = new Date(isoString);
                                    sendCommandMessageForInitiatorAndAdmins("§e", `${arrayInner[0]} left at ${date.toLocaleString()}`, true, true, true);
                                    break;
                                }
                            }
                        });
                    }
                }
            }
            else if (args[1] == "clear") {
                ms.system.run(() => {
                    ms.world.scoreboard.removeObjective('dirtletsEssentials:save:accesslogs');
                    sendCommandMessageForInitiatorAndAdmins("§6", `Sucessfully cleared the access logs.`, true, true);
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
export default runCommandChatAccessLogs;
