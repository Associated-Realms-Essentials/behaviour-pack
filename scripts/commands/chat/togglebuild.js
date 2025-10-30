import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatToggleBuild(chatMessage, adminTag, messageHideTag, prefix, args) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            if (!args[1]) {
                chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Please do '${prefix}togglebuild global' to toggle building for everyone.\nYou can also do '${prefix}togglebuild 'player'' to toggle building for that selected player,\nYou can use '${prefix}listbuild' to see what players have building disabled,\nsimply run '${prefix}togglebuild 'player'' on the player to allow them to build again.§r"}]}
                    `);
                chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Please do '${prefix}togglebuild global' to toggle building for everyone.\nYou can also do '${prefix}togglebuild 'player'' to toggle building for that selected player,\nYou can use '${prefix}listbuild' to see what players have building disabled,\nsimply run '${prefix}togglebuild 'player'' on the player to allow them to build again.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                return;
            }
            if (args[1].toLowerCase() == "global") {
                if (ms.world.scoreboard.getObjective('dirtletsEssentials:save:buildAll').getParticipants()[0].displayName == "true") {
                    ms.world.scoreboard.removeObjective('dirtletsEssentials:save:buildAll');
                    ms.world.scoreboard.addObjective('dirtletsEssentials:save:buildAll', 'dirtletsEssentials:save:buildAll');
                    chatMessage.sender.dimension.runCommand(`scoreboard players set "false" "dirtletsEssentials:save:buildAll" 0`);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§eGlobal Build is now §cDisabled.§r"}]}
                        `);
                    return;
                }
                if (ms.world.scoreboard.getObjective('dirtletsEssentials:save:buildAll').getParticipants()[0].displayName == "false") {
                    ms.world.scoreboard.removeObjective('dirtletsEssentials:save:buildAll');
                    ms.world.scoreboard.addObjective('dirtletsEssentials:save:buildAll', 'dirtletsEssentials:save:buildAll');
                    chatMessage.sender.dimension.runCommand(`scoreboard players set "true" "dirtletsEssentials:save:buildAll" 0`);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§eGlobal Build is now §aEnabled.§r"}]}
                        `);
                    return;
                }
                return;
            }
            if (!args[1].startsWith("'")) {
                chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player name. Eg. '${prefix}togglebuild >'player''.§r"}]}
                    `);
                chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player name. Eg. '${prefix}togglebuild >'player''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                return;
            }
            if (chatMessage.message.split("'")[2] == null) {
                chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player name. Eg. '${prefix}togglebuild >'player''.§r"}]}
                    `);
                chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player name. Eg. '${prefix}togglebuild >'player''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                return;
            }
            let playerFound2 = false;
            ms.world.scoreboard.getObjective('dirtletsEssentials:save:buildPeople').getParticipants().forEach(player => {
                if (player.displayName == chatMessage.message.split("'")[1]) {
                    ms.world.scoreboard.getObjective('dirtletsEssentials:save:buildPeople').removeParticipant(player);
                    playerFound2 = true;
                }
            });
            if (playerFound2) {
                chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully §aEnabled§6 building for '${chatMessage.message.split("'")[1]}'.§r"}]}
                    `);
                chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully §aEnabled§6 building for '${chatMessage.message.split("'")[1]}'.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                chatMessage.sender.dimension.runCommand(`tellraw "${chatMessage.message.split("'")[1]}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6A Admin §aenabled§6 your privilage to build.§r"}]}`);
                chatMessage.sender.dimension.runCommand(`tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6A Admin §aenabled§6 your privilage to build.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}`);
                return;
            }
            if (!playerFound2) {
                chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully §cDisabled§6 building for '${chatMessage.message.split("'")[1]}'.§r"}]}
                    `);
                chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully §cDisabled§6 building for '${chatMessage.message.split("'")[1]}'.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
                chatMessage.sender.dimension.runCommand(`tellraw "${chatMessage.message.split("'")[1]}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6A Admin §cdisabled§6 your privilage to build.§r"}]}`);
                chatMessage.sender.dimension.runCommand(`tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6A Admin §cdisabled§6 your privilage to build.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}`);
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${chatMessage.message.split("'")[1]}" "dirtletsEssentials:save:buildPeople" 0`);
                return;
            }
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
export default runCommandChatToggleBuild;
