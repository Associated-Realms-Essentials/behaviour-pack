// import * as ms from "@minecraft/server";
// import * as msui from "@minecraft/server-ui";
// const sleep = (n: number) => new Promise<void>(acc => ms.system.runTimeout(acc, n));
// function runCommandChatInvsave(chatMessage: any, adminTag: any, args: any){
//     if(chatMessage.sender.hasTag(adminTag)){
//         chatMessage.sender.dimension.runCommand(`tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"<${chatMessage.sender.name}> ${chatMessage.message}"}]}`);
//         if(!args[1]){
//             chatMessage.sender.dimension.runCommand(`
//                 tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Do 'invsave 'username' 'association name'' to save the users inventory and load it at any time using 'invload 'association name''.§r"}]}
//             `)
//         return}
//         if(!args[1].startsWith("'")){
//             chatMessage.sender.dimension.runCommand(`
//                 tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid search term. Eg. 'invsave >'username' 'association name''.§r"}]}
//             `)
//         return}
//         if((chatMessage.message as string).split("'")[2] == null){
//             chatMessage.sender.dimension.runCommand(`
//                 tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid search term. Eg. 'invsave 'username>' 'association name''.§r"}]}
//             `)
//         return}
//         if((chatMessage.message as string).split("'")[4] == null){
//             chatMessage.sender.dimension.runCommand(`
//                 tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid search term. Eg. 'invsave 'hacker' 'association name>''.§r"}]}
//             `)
//         return}
//         var playerExists = false;
//         ms.world.getPlayers().forEach(player => {
//             if((chatMessage.message as string).split("'")[1] == player.name){
//                 playerExists = true;
//             }
//         })
//         if(!playerExists){
//             chatMessage.sender.dimension.runCommand(`
//                 tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cPlease enter a valid player within the world currently.§r"}]}
//             `)
//         return}
//         ms.system.run(async () => {
//             var playersInv: ms.ItemStack[] = [];
//             ms.world.getPlayers().forEach(player => {
//                 if((chatMessage.message as string).split("'")[1] == player.name){
//                 const inv = player.getComponent("inventory").container;
//                     for (let index = 0; index < inv.size; index++) {
//                         playersInv.push(inv.getItem(index))
//                     }
//                 }
//             })
//             ms.world.getDimension('overworld').runCommand(`scoreboard players set "${}" "associatedRealmsEssentials:save:inventorys" 0`)
//             chatMessage.sender.dimension.runCommand(`
//                 tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§eYou have 30 seconds before your inventory gets reverted.\nChanges to your inventory within the 30 second period will not be saved.§r"}]}
//             `)
//         })
//         // else{
//         //     chatMessage.sender.dimension.runCommand(`
//         //         tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§4Invalid command.§r"}]}
//         //     `)
//         // }
//     } else{
//         chatMessage.sender.dimension.runCommand(`tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"<${chatMessage.sender.name}> ${chatMessage.message}"}]}`);
//         chatMessage.sender.dimension.runCommand(`tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"<${chatMessage.sender.name}> ${chatMessage.message}"}]}`);
//         chatMessage.sender.dimension.runCommand(`
//             tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cInsufficient Permissions.§r"}]}
//         `)
//         chatMessage.sender.dimension.runCommand(`
//             tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cInsufficient Permissions.§r"}]}
//         `)
//     }
// }
// export default runCommandChatInvsave;
