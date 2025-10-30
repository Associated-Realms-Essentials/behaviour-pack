import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatResetWand(chatMessage, adminTag, messageHideTag, prefix) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:block');
            ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:block', 'associatedRealmsEssentials:fillWand:block');
            chatMessage.sender.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:block" 0`);
            ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:coordsSet1');
            ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:coordsSet1', 'associatedRealmsEssentials:fillWand:coordsSet1');
            chatMessage.sender.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:coordsSet1" 0`);
            ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:coordsSet2');
            ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:coordsSet2', 'associatedRealmsEssentials:fillWand:coordsSet2');
            chatMessage.sender.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:coordsSet2" 0`);
            ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:player');
            ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:player', 'associatedRealmsEssentials:fillWand:player');
            chatMessage.sender.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:player" 0`);
            chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully reset the fill wand database.§r"}]}
                `);
            chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully reset the fill wand database.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
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
export default runCommandChatResetWand;
