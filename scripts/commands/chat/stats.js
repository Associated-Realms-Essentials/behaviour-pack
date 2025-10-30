import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatStats(chatMessage, adminTag, messageHideTag, prefix, args) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            if (!args[1]) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Please do '${prefix}stats 'player'' to see the players statistics.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Please do '${prefix}stats 'player'' to see the players statistics.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (!args[1].startsWith("'")) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player name. Eg. '${prefix}stats >'player''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player name. Eg. '${prefix}stats >'player''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (chatMessage.message.split("'")[2] == null) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player name. Eg. '${prefix}stats >'player''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player name. Eg. '${prefix}stats >'player''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            let playerFound = false;
            var blockLogsArray = [];
            var reportsArray = [];
            // Get block placement data from database.
            ms.world.scoreboard.getObjective('dirtletsEssentials:save:blocklogs').getParticipants().forEach(blockLogs => {
                if (!blockLogs.displayName.includes('#@##@&*£$strsplit#@##@&*£$'))
                    return;
                var array = blockLogs.displayName.split('#@##@&*£$strsplit#@##@&*£$');
                var arg2Unstringed = ((chatMessage.message.split("'")[1]).replace("'", "")).replace("'", '');
                var succCount = 0;
                if (array[1] == arg2Unstringed)
                    succCount += 1;
                if (arg2Unstringed == "")
                    succCount = 0;
                if (succCount == 1) {
                    playerFound = true;
                    blockLogsArray.push(array);
                }
            });
            ms.world.scoreboard.getObjective('dirtletsEssentials:save:playerReports').getParticipants().forEach(playerReports => {
                if (!playerReports.displayName.includes('#@##@&*£$strsplit#@##@&*£$'))
                    return;
                var array = playerReports.displayName.split('#@##@&*£$strsplit#@##@&*£$');
                var arg2Unstringed = ((chatMessage.message.split("'")[1]).replace("'", "")).replace("'", '');
                var succCount = 0;
                if (array[0] == arg2Unstringed)
                    succCount += 1;
                if (arg2Unstringed == "")
                    succCount = 0;
                if (succCount == 1) {
                    playerFound = true;
                    reportsArray.push(array);
                }
            });
            if (!playerFound) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cThis player wasn't found in the database.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > This player wasn't found in the database.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            // Calculate trust level
            let trustLevel = 10.9;
            const trustLevelWordsInReport = ["xray", "hack", "abuse", "bad", "sus", "strange", "kill", "grief", "break", "ban", "warn"];
            const susBlocks = ['diamond_ore', 'ancient_debris', 'lapis_ore', 'emerald_ore', 'flint_and_steel'];
            const addUpAgain = ['sign'];
            reportsArray.forEach((report) => {
                trustLevelWordsInReport.forEach(triggerWord => {
                    if (report[1].includes(triggerWord)) {
                        trustLevel -= 0.1;
                    }
                });
            });
            blockLogsArray.forEach((block) => {
                susBlocks.forEach(triggerBlock => {
                    if (block[0].includes(triggerBlock)) {
                        trustLevel -= 0.1;
                    }
                });
            });
            blockLogsArray.forEach((block) => {
                addUpAgain.forEach(triggerBlock => {
                    if (block[0].includes(triggerBlock)) {
                        trustLevel += 0.1;
                    }
                });
            });
            trustLevel = trustLevel.toFixed(1);
            if (parseFloat(trustLevel) > 10.9) {
                trustLevel = "10.9";
            }
            // Calculate amount's of block logs and restrict to the top 10 in descending order
            function getOccurrence(array, value, index) {
                var count = 0;
                array.forEach((v) => (v[index] === value && count++));
                return count;
            }
            let blockLogsInDisplay = [];
            let itemsParsed = false;
            blockLogsArray.forEach(blocklogs => {
                let doesItemAlreadyExist = false;
                blockLogsInDisplay.forEach(blocklogs2 => {
                    if (blocklogs2[1] == blocklogs[0]) {
                        doesItemAlreadyExist = true;
                    }
                });
                if (doesItemAlreadyExist == false) {
                    blockLogsInDisplay.push([getOccurrence(blockLogsArray, blocklogs[0], 0), blocklogs[0]]);
                    itemsParsed = true;
                }
                if (itemsParsed == false) {
                    blockLogsInDisplay.push([getOccurrence(blockLogsArray, blocklogs[0], 0), blocklogs[0]]);
                }
            });
            blockLogsInDisplay.sort((a, b) => b[0] - a[0]);
            blockLogsInDisplay = blockLogsInDisplay.slice(0, 10);
            // get 10 reports and display them (randomized).
            reportsArray.sort(() => 0.5 - Math.random());
            reportsArray = reportsArray.slice(0, 10);
            chatMessage.sender.dimension.runCommand(`
                tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"
§l§6${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName} §e${((chatMessage.message.split("'")[1]).replace("'", "")).replace("'", '')} Stats§r
Trust Level: ${trustLevel}
---
Top 10 Blocklogs:
${blockLogsInDisplay.length == 0 ? "No BlockLogs Found." : blockLogsInDisplay.map((blocklog) => { return "x" + blocklog[0] + " " + blocklog[1]; }).join("\n")}
---
10 Random Reports:
${reportsArray.length == 0 ? "No Reports Found." : reportsArray.map((report) => { return report[1] + " - " + report[2]; }).join("\n")}
                "}]}
            `);
            chatMessage.sender.dimension.runCommand(`
                tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"
§l§6${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName} §e${((chatMessage.message.split("'")[1]).replace("'", "")).replace("'", '')} Stats§r
Trust Level: ${trustLevel}
---
Top 10 Blocklogs:
${blockLogsInDisplay.length == 0 ? "No BlockLogs Found." : blockLogsInDisplay.map((blocklog) => { return "x" + blocklog[0] + " " + blocklog[1]; }).join("\n")}
---
10 Random Reports:
${reportsArray.length == 0 ? "No Reports Found." : reportsArray.map((report) => { return report[1] + " - " + report[2]; }).join("\n")}
                "}]}
            `);
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
export default runCommandChatStats;
