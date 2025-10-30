import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatListBuild(chatMessage, adminTag, messageHideTag, prefix, args) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Heres a list:§r"}]}
                `);
            chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Heres a list:§r"}]}
                `);
            let dbBuildGlobalOn = true;
            ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:buildAll').getParticipants().forEach(buildGlobalState => {
                if (buildGlobalState.displayName == "false") {
                    dbBuildGlobalOn = false;
                }
            });
            if (!dbBuildGlobalOn) {
                chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§eBuild is disabled globaly.§r"}]}
                    `);
                chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§eBuild is disabled globaly.§r"}]}
                    `);
                return;
            }
            let dbNotEmptyAll = false;
            ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:buildPeople').getParticipants().forEach(buildDbItem => {
                chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§e${buildDbItem.displayName} - §cDisabled§r"}]}
                    `);
                chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§e${buildDbItem.displayName} - §cDisabled§r"}]}
                    `);
                dbNotEmptyAll = true;
            });
            if (dbNotEmptyAll == false) {
                chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§cThe list is empty.§r"}]}
                    `);
                chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§cThe list is empty.§r"}]}
                    `);
            }
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
export default runCommandChatListBuild;
