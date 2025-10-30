import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatRedeem(chatMessage, adminTag, messageHideTag, prefix, args, blockedTag) {
    ms.system.run(() => {
        if (!args[1]) {
            chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Please do '${prefix}redeem 'code'' to get a special item.§r"}]}
                `);
            chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Please do '${prefix}redeem 'code'' to get a special item.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
            return;
        }
        if (!args[1].startsWith("'")) {
            chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid code. Eg. '${prefix}redeem >'code''.§r"}]}
                `);
            chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid code. Eg. '${prefix}redeem >'code''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
            return;
        }
        if (chatMessage.message.split("'")[2] == null) {
            chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid code. Eg. '${prefix}redeem >'code''.§r"}]}
                `);
            chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > Please enter a valid code. Eg. '${prefix}redeem >'code''.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
            return;
        }
        switch (chatMessage.message.split("'")[1]) {
            case 'secretdiamond': {
                if (!chatMessage.sender.hasTag("areRedeemed:secretdiamond")) {
                    chatMessage.sender.addTag("areRedeemed:secretdiamond");
                    let codePaper = new ms.ItemStack("minecraft:diamond", 1);
                    codePaper.nameTag = "Secret Diamond";
                    chatMessage.sender.dimension.spawnItem(codePaper, chatMessage.sender.location);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Sucessfully redeemed 'secretdiamond'.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Sucessfully redeemed 'secretdiamond'.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                else {
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cYou already redeemed this code.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > You already redeemed this code.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                break;
            }
            case 'code': {
                if (!chatMessage.sender.hasTag("areRedeemed:code")) {
                    chatMessage.sender.addTag("areRedeemed:code");
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§d${chatMessage.sender.name} typed 'code' in the redeem system.§r"}]}
                        `);
                }
                else {
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cYou already redeemed this code.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > You already redeemed this code.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                break;
            }
            case 'ohwerehalfwaythereohlivinonaprayer': {
                if (!chatMessage.sender.hasTag("areRedeemed:ohwerehalfwaythereohlivinonaprayer")) {
                    chatMessage.sender.addTag("areRedeemed:ohwerehalfwaythereohlivinonaprayer");
                    chatMessage.sender.runCommand(`tp @s ~~100000~`);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Sucessfully redeemed 'ohwerehalfwaythereohlivinonaprayer'.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Sucessfully redeemed 'ohwerehalfwaythereohlivinonaprayer'.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                else {
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cYou already redeemed this code.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > You already redeemed this code.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                break;
            }
            case 'vegandonut': {
                if (!chatMessage.sender.hasTag("areRedeemed:vegandonut")) {
                    chatMessage.sender.addTag("areRedeemed:vegandonut");
                    chatMessage.sender.runCommand(`summon lightning_bolt ~~~`);
                    chatMessage.sender.runCommand(`kill @s`);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Sucessfully redeemed 'vegandonut'.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Sucessfully redeemed 'vegandonut'.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                else {
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cYou already redeemed this code.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > You already redeemed this code.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                break;
            }
            case 'snail': {
                if (!chatMessage.sender.hasTag("areRedeemed:snail")) {
                    chatMessage.sender.addTag("areRedeemed:snail");
                    chatMessage.sender.runCommand(`effect @s slowness 60 10`);
                    chatMessage.sender.runCommand(`effect @s saturation 60 10`);
                    chatMessage.sender.runCommand(`effect @s blindness 60 10`);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Sucessfully redeemed 'snail'.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Sucessfully redeemed 'snail'.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                else {
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cYou already redeemed this code.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > You already redeemed this code.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                break;
            }
            case 'johnny': {
                if (!chatMessage.sender.hasTag("areRedeemed:jhonny")) {
                    chatMessage.sender.addTag("areRedeemed:jhonny");
                    chatMessage.sender.dimension.spawnEntity("minecraft:vindicator", chatMessage.sender.location).nameTag = "johnny";
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Sucessfully redeemed 'jhonny'.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Sucessfully redeemed 'jhonny'.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                else {
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cYou already redeemed this code.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > You already redeemed this code.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                break;
            }
            case 'bee': {
                if (!chatMessage.sender.hasTag("areRedeemed:bee")) {
                    chatMessage.sender.addTag("areRedeemed:bee");
                    for (let index = 0; index < 10; index++) {
                        chatMessage.sender.dimension.spawnEntity("minecraft:bee", chatMessage.sender.location).applyDamage(0, { damagingEntity: chatMessage.sender, cause: ms.EntityDamageCause.entityAttack });
                    }
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Sucessfully redeemed 'bee'.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Sucessfully redeemed 'bee'.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                else {
                    chatMessage.sender.dimension.runCommand(`
                            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cYou already redeemed this code.§r"}]}
                        `);
                    chatMessage.sender.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > You already redeemed this code.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                }
                break;
            }
        }
    });
}
export default runCommandChatRedeem;
