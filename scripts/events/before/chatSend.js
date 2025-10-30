import * as ms from "@minecraft/server";
import runCommandChatHelp from "../../commands/chat/help";
import runCommandChatDay from "../../commands/chat/day";
import runCommandChatNight from "../../commands/chat/night";
import runCommandChatKillMobs from "../../commands/chat/killmobs";
import runCommandChatAdminUi from "../../commands/chat/adminui";
import runCommandChatNuke from "../../commands/chat/nuke";
import runCommandChatWClear from "../../commands/chat/wclear";
import runCommandChatWRain from "../../commands/chat/wrain";
import runCommandChatWThunder from "../../commands/chat/wthunder";
import runCommandChatChatlogs from "../../commands/chat/chatlogs";
import runCommandChatInvview from "../../commands/chat/invview";
import runCommandChatTp from "../../commands/chat/tp";
import runCommandChatInvload from "../../commands/chat/invload";
import runCommandChatHome from "../../commands/chat/home";
import runCommandChatHomeA from "../../commands/chat/homea";
import runCommandChatHomeP from "../../commands/chat/homep";
import runCommandChatSpawn from "../../commands/chat/spawn";
import runCommandChatSpawnA from "../../commands/chat/spawna";
import runCommandChatSpawnP from "../../commands/chat/spawnp";
import runCommandChatToggleBuild from "../../commands/chat/togglebuild";
import runCommandChatListBuild from "../../commands/chat/listbuild";
import runCommandChatLawn from "../../commands/chat/lawn";
import runCommandChatLockChest from "../../commands/chat/lockchest";
import runCommandChatListChest from "../../commands/chat/listchest";
import runCommandChatNether from "../../commands/chat/nether";
import runCommandChatOverworld from "../../commands/chat/overworld";
import runCommandChatBlockLogs from "../../commands/chat/blocklogs";
import runCommandChatJail from "../../commands/chat/jail";
import runCommandChatEnd from "../../commands/chat/end";
import runCommandChatFakejoin from "../../commands/chat/fakejoin";
import runCommandChatFakeleave from "../../commands/chat/fakeleave";
import runCommandChatAfk from "../../commands/chat/afk";
import runCommandChatRegen from "../../commands/chat/regen";
import runCommandChatDupe from "../../commands/chat/dupe";
import runCommandChatWand from "../../commands/chat/wand";
import runCommandChatResetWand from "../../commands/chat/resetwand";
import runCommandChatRenameItem from "../../commands/chat/renameitem";
import runCommandChatMute from "../../commands/chat/mute";
import runCommandChatListMute from "../../commands/chat/listmute";
import runCommandChatLore from "../../commands/chat/lore";
import runCommandChatEval from "../../commands/chat/eval";
import runCommandChatRepeatCmd from "../../commands/chat/repeatcmd";
import runCommandChatResetThreads from "../../commands/chat/resetthreads";
import runCommandChatClear from "../../commands/chat/clear";
import runCommandChatReportP from "../../commands/chat/reportp";
import runCommandChatStats from "../../commands/chat/stats";
import runCommandChatRedeem from "../../commands/chat/redeem";
import runCommandChatAccessLogs from "../../commands/chat/accesslogs";
// import runCommandChatInvsave from "../../commands/chat/invsave";
let cancelableThreads = [];
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runEventBeforeChatSend(chatMessage, adminTag, prefix, playerArray, messageHideTag, blockedTag) {
    const args = chatMessage.message.split(' ');
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
    function escapePercentage(str) {
        return str.replace(/%/g, '%%');
    }
    ms.system.run(() => {
        var associatedIndex = 0;
        ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:chat').getParticipants().forEach(msgs => {
            associatedIndex += 1;
        });
        chatMessage.sender.dimension.runCommand(`scoreboard players set "${sanitizeStringForMessage(chatMessage.message)}#@##@&*£$strsplit#@##@&*£$${sanitizeStringForUsername(chatMessage.sender.name)}#@##@&*£$strsplit#@##@&*£$${associatedIndex + 1}" "associatedRealmsEssentials:save:chat" 0`);
    });
    let memberRank = "§bMember";
    let memberRankNumInternal = 0;
    chatMessage.sender.getTags().forEach((tag) => {
        if (tag.includes('arerank:')) {
            if (tag.replace('arerank:', '') !== "") {
                if (memberRankNumInternal == 0) {
                    memberRank = tag.replace('arerank:', '');
                }
                else {
                    memberRank = memberRank + "§r§7§l] [§r" + tag.replace('arerank:', '') + "§r";
                }
                memberRankNumInternal += 1;
            }
        }
    });
    memberRank = memberRank.replaceAll("{operator_plain}", "\uE110");
    memberRank = memberRank.replaceAll("{owner}", "\uE111");
    memberRank = memberRank.replaceAll("{regulations}", "\uE112");
    memberRank = memberRank.replaceAll("{operator}", "\uE113");
    memberRank = memberRank.replaceAll("{smiley}", "\uE114");
    memberRank = memberRank.replaceAll("{major}", "\uE115");
    function sendChatMessageWhenCommandRun(senderName, theChatMessage, theChatRank = null) {
        ms.world.getAllPlayers().forEach(player => {
            if (player.name == senderName) {
                if (theChatRank !== null) {
                    memberRank = theChatRank?.length ? theChatRank.join("§r§7§l] [§r") : theChatRank;
                }
                if (theChatRank?.length == 0) {
                    memberRank = "§bMember";
                }
                memberRank = memberRank.replaceAll("{operator_plain}", "\uE110");
                memberRank = memberRank.replaceAll("{owner}", "\uE111");
                memberRank = memberRank.replaceAll("{regulations}", "\uE112");
                memberRank = memberRank.replaceAll("{operator}", "\uE113");
                memberRank = memberRank.replaceAll("{smiley}", "\uE114");
                memberRank = memberRank.replaceAll("{major}", "\uE115");
                player.sendMessage(`§7§l[§r${memberRank}§7§l]§r ${senderName}:§r §7${theChatMessage}§r`);
            }
        });
        ms.world.getAllPlayers().forEach(player => {
            if (player.hasTag(adminTag)) {
                if (!player.hasTag(messageHideTag)) {
                    if (player.name !== senderName) {
                        if (theChatRank !== null) {
                            memberRank = theChatRank?.length ? theChatRank.join("§r§7§l] [§r") : theChatRank;
                        }
                        if (theChatRank?.length == 0) {
                            memberRank = "§bMember";
                        }
                        memberRank = memberRank.replaceAll("{operator_plain}", "\uE110");
                        memberRank = memberRank.replaceAll("{owner}", "\uE111");
                        memberRank = memberRank.replaceAll("{regulations}", "\uE112");
                        memberRank = memberRank.replaceAll("{operator}", "\uE113");
                        memberRank = memberRank.replaceAll("{smiley}", "\uE114");
                        memberRank = memberRank.replaceAll("{major}", "\uE115");
                        player.sendMessage(`§7§l[§r${memberRank}§7§l]§r ${senderName}:§r §7${theChatMessage}§r`);
                    }
                }
            }
        });
    }
    function sendChatMessage(senderName, theChatMessage, theChatRank = null) {
        if (theChatRank !== null) {
            memberRank = theChatRank?.length ? theChatRank.join("§r§7§l] [§r") : theChatRank;
        }
        if (theChatRank?.length == 0) {
            memberRank = "§bMember";
        }
        memberRank = memberRank.replaceAll("{operator_plain}", "\uE110");
        memberRank = memberRank.replaceAll("{owner}", "\uE111");
        memberRank = memberRank.replaceAll("{regulations}", "\uE112");
        memberRank = memberRank.replaceAll("{operator}", "\uE113");
        memberRank = memberRank.replaceAll("{smiley}", "\uE114");
        memberRank = memberRank.replaceAll("{major}", "\uE115");
        ms.world.sendMessage(`§7§l[§r${memberRank}§7§l]§r ${senderName}:§r §7${theChatMessage}§r`);
    }
    // if(chatMessage.message.startsWith('-') && chatMessage.sender.hasTag(adminTag)){
    //     chatMessage.cancel = true;
    //     sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
    //     // ADMIN MINECRAFT COMMANDS
    //     chatMessage.sender.runCommand(chatMessage.message.replace('-', '')).catch((reason: ms.CommandError) => {
    //         ms.world.getAllPlayers().forEach(player => {
    //             if(player.name == chatMessage.sender.name){
    //                 player.sendMessage(`§c${reason.message}§r`);
    //             }
    //         })
    //         ms.world.getAllPlayers().forEach(player => {
    //             if(player.hasTag(adminTag)){
    //                 if(!player.hasTag(messageHideTag)){
    //                     if(player.name !== chatMessage.sender.name){
    //                         player.sendMessage(`§c${reason.message}§r`)
    //                     } 
    //                 }
    //             }
    //         })
    //     })
    // return}
    let isMuted = false;
    ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:mutedPeople').getParticipants().forEach(mutedDbItem => {
        if (mutedDbItem.displayName == chatMessage.sender.name) {
            isMuted = true;
        }
    });
    if (isMuted) {
        chatMessage.cancel = true;
        if (chatMessage.message.startsWith(prefix + "mute")) {
        }
        else if (chatMessage.message.startsWith(prefix + "listmute")) {
        }
        else {
            ms.system.run(() => {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6You are muted, you cannot chat at this point.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > You are muted, you cannot chat at this point.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
            });
        }
    }
    switch (args[0]) {
        // addon commands
        case `${prefix}help`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatHelp(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}day`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatDay(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}night`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatNight(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}killmobs`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatKillMobs(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}adminui`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatAdminUi(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}nuke`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatNuke(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}wclear`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatWClear(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}wrain`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatWRain(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}wthunder`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatWThunder(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}chatlogs`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatChatlogs(chatMessage, adminTag, args, messageHideTag, prefix);
            break;
        }
        case `${prefix}invview`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatInvview(chatMessage, adminTag, args, messageHideTag, prefix);
            break;
        }
        case `${prefix}invload`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatInvload(chatMessage, adminTag, args, messageHideTag, prefix);
            break;
        }
        case `${prefix}tp`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatTp(chatMessage, adminTag, args, playerArray, messageHideTag, prefix, blockedTag);
            break;
        }
        case `${prefix}home`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatHome(chatMessage, adminTag, messageHideTag, prefix, blockedTag);
            break;
        }
        case `${prefix}homea`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatHomeA(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}homep`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatHomeP(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}spawn`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatSpawn(chatMessage, adminTag, messageHideTag, prefix, blockedTag);
            break;
        }
        case `${prefix}spawna`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatSpawnA(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}spawnp`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatSpawnP(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}togglebuild`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatToggleBuild(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}listbuild`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatListBuild(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}lawn`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatLawn(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}lockchest`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatLockChest(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}listchest`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatListChest(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}nether`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatNether(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}overworld`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatOverworld(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}end`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatEnd(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}blocklogs`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatBlockLogs(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}jail`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatJail(chatMessage, adminTag, messageHideTag, prefix, args, blockedTag);
            break;
        }
        case `${prefix}fakejoin`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatFakejoin(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}fakeleave`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatFakeleave(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}afk`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatAfk(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}regen`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatRegen(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}dupe`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatDupe(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}wand`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatWand(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}resetwand`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatResetWand(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}renameitem`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatRenameItem(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}mute`: {
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatMute(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}listmute`: {
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatListMute(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}lore`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatLore(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}eval`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatEval(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}repeatcmd`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatRepeatCmd(chatMessage, adminTag, args, messageHideTag, prefix, cancelableThreads);
            break;
        }
        case `${prefix}resetthreads`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatResetThreads(chatMessage, adminTag, messageHideTag, prefix, cancelableThreads);
            break;
        }
        case `${prefix}clear`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatClear(chatMessage, adminTag, messageHideTag, prefix);
            break;
        }
        case `${prefix}reportp`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatReportP(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}stats`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatStats(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        case `${prefix}redeem`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatRedeem(chatMessage, adminTag, messageHideTag, prefix, args, blockedTag);
            break;
        }
        case `${prefix}accesslogs`: {
            if (isMuted)
                return;
            chatMessage.cancel = true;
            sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
            runCommandChatAccessLogs(chatMessage, adminTag, messageHideTag, prefix, args);
            break;
        }
        default: {
            if (!chatMessage.message.startsWith(prefix)) {
                ms.world.getPlayers().forEach(player => {
                    player.getTags().forEach(tag => {
                        //console.warn(tag)
                        if (tag.startsWith("areEvalOnChat:")) {
                            ms.system.run(() => {
                                let developers = ['MajorRage3367'];
                                if (player.hasTag("developers1") && player.hasTag(adminTag) && developers.includes(player.name)) {
                                    try {
                                        let tagContent = tag;
                                        eval(tagContent.replace("areEvalOnChat:", ""));
                                    }
                                    catch (error) {
                                        player.sendMessage(error.message);
                                        player.sendMessage(error.stack);
                                    }
                                }
                                player.removeTag(tag);
                            });
                        }
                    });
                });
                if (isMuted)
                    return;
                // Is not a command
                chatMessage.cancel = true;
                ms.world.sendMessage(`§7§l[§r${memberRank}§7§l]§r ${chatMessage.sender.name}:§r §7` + escapePercentage(chatMessage.message) + `§r`);
            }
            else {
                if (isMuted)
                    return;
                // Is a invalid command
                chatMessage.cancel = true;
                sendChatMessageWhenCommandRun(chatMessage.sender.name, chatMessage.message);
                ms.system.run(() => {
                    if (chatMessage.sender.hasTag(adminTag)) {
                        chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§4Invalid command.§r"}]}
                        `);
                        chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§4${chatMessage.sender.name} > Invalid Command.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                        return;
                    }
                    chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§4Invalid command.§r"}]}
                    `);
                    chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§4${chatMessage.sender.name} > Invalid command.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                });
            }
            break;
        }
    }
}
export default runEventBeforeChatSend;
