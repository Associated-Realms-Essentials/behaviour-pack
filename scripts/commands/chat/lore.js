import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatLore(chatMessage, adminTag, messageHideTag, prefix, args) {
    ms.system.run(() => {
        if (!args[1]) {
            chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Please do '${prefix}lore 'hello'' to set the lore of the item you are holding to a lore of your choise,\nyou can do '${prefix}lore 'hello(backslash)nworld!'' to go to use new lines.§r"}]}
                `);
            chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Please do '${prefix}lore 'hello'' to set the lore of the item you are holding to a lore of your choise,\nyou can do '${prefix}lore 'hello(backslash)nworld!'' to go to use new lines.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
            return;
        }
        if (!args[1].startsWith("'")) {
            chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease format the lore of your item correctly. Eg. '${prefix}lore >'hello''.§r"}]}
                `);
            chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please format the lore of your item correctly. Eg. '${prefix}lore >'hello''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
            return;
        }
        if (chatMessage.message.split("'")[2] == null) {
            chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease format the lore of your item correctly. Eg. '${prefix}lore >'hello''.§r"}]}
                `);
            chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please format the lore of your item correctly. Eg. '${prefix}lore >'hello''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
            return;
        }
        if (chatMessage.sender.getComponent('inventory').container) {
            if (chatMessage.sender.getComponent('inventory').container.getSlot(chatMessage.sender.selectedSlotIndex).getItem()) {
                let theItem = chatMessage.sender.getComponent('inventory').container.getSlot(chatMessage.sender.selectedSlotIndex).getItem().clone();
                try {
                    theItem.setLore((chatMessage.message.split("'")[1]).split("\\n"));
                    chatMessage.sender.getComponent('inventory').container.getSlot(chatMessage.sender.selectedSlotIndex).setItem(theItem);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Successfully set the lore of the item you were holding.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Successfully set the lore of the item you were holding.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                catch {
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cFailed to set lore on the item, try decreasing the amount of text or use more new lines.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Failed to set lore on the item, try decreasing the amount of text or use more new lines.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
            }
            else {
                chatMessage.sender.dimension.runCommand(`
                        tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease hold a item in your inventory to set lore on it, not a empty slot.§r"}]}
                    `);
                chatMessage.sender.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please hold a item in your inventory to set lore on it, not a empty slot.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                    `);
            }
        }
        else {
            chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cYour inventorys container doesnt exist, please rejoin.§r"}]}
                `);
            chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Your inventorys container doesnt exist, please rejoin.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
        }
    });
}
export default runCommandChatLore;
