import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatInvload(chatMessage, adminTag, args, messageHideTag, prefix) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            if (!args[1]) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Do '${prefix}invload 'username'' to replicate the users inventory.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Do '${prefix}invload 'username'' to replicate the users inventory.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (!args[1].startsWith("'")) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter the user in apostrophes. Eg. '${prefix}invload >'herobrine''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter the user in apostrophes. Eg. '${prefix}invload >'herobrine''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            if (chatMessage.message.split("'")[2] == null) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter the user in apostrophes. Eg. '${prefix}invload 'herobrine>''.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter the user in apostrophes. Eg. '${prefix}invload 'herobrine>''.§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            var playerExists = false;
            ms.world.getPlayers().forEach(player => {
                if (chatMessage.message.split("'")[1] == player.name) {
                    playerExists = true;
                }
            });
            if (!playerExists) {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player within the world currently.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid player within the world currently.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            ms.system.run(async () => {
                var playersInv = [];
                var playersEquipment = [];
                var selectedSlot;
                ms.world.getPlayers().forEach(player => {
                    if (chatMessage.message.split("'")[1] != player.name)
                        return;
                    const inv = player.getComponent("inventory").container;
                    playersEquipment.push(player.getComponent("equippable").getEquipment(ms.EquipmentSlot.Head));
                    playersEquipment.push(player.getComponent("equippable").getEquipment(ms.EquipmentSlot.Chest));
                    playersEquipment.push(player.getComponent("equippable").getEquipment(ms.EquipmentSlot.Legs));
                    playersEquipment.push(player.getComponent("equippable").getEquipment(ms.EquipmentSlot.Feet));
                    playersEquipment.push(player.getComponent("equippable").getEquipment(ms.EquipmentSlot.Offhand));
                    for (let index = 0; index < inv.size; index++) {
                        playersInv.push(inv.getItem(index));
                    }
                });
                chatMessage.sender.getComponent('inventory').container.clearAll();
                playersInv.forEach((itemStack, index) => {
                    chatMessage.sender.getComponent('inventory').container.setItem(index, itemStack);
                });
                chatMessage.sender.getComponent('equippable').setEquipment(ms.EquipmentSlot.Head, playersEquipment[0]);
                chatMessage.sender.getComponent('equippable').setEquipment(ms.EquipmentSlot.Chest, playersEquipment[1]);
                chatMessage.sender.getComponent('equippable').setEquipment(ms.EquipmentSlot.Legs, playersEquipment[2]);
                chatMessage.sender.getComponent('equippable').setEquipment(ms.EquipmentSlot.Feet, playersEquipment[3]);
                chatMessage.sender.getComponent('equippable').setEquipment(ms.EquipmentSlot.Offhand, playersEquipment[4]);
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§eYour inventory has been replicated.§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§e${chatMessage.sender.name} > Your inventory has been replicated.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
            });
            // else{
            //     chatMessage.sender.dimension.runCommand(`
            //         tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§4Invalid command.§r"}]}
            //     `)
            // }
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
export default runCommandChatInvload;
