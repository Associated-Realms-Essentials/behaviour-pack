import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatHelp(chatMessage, adminTag, messageHideTag, prefix) {
    ms.system.run(() => {
        if (chatMessage.sender.hasTag(adminTag)) {
            // Is Admin
            chatMessage.sender.dimension.runCommand(`
                tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"
§l§6${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName} §eHelp§r
§cYou can see Member and Admin Commands.§r
>help - Shows this helpful command.
>day - sets the time to day.
>night - sets the time to night.
>killmobs - Kill all mobs.
>adminui - Shows the Admin UI were you can configure the dirtlets essentials.
>nuke - summons TNT on you every 10 ticks if enabled.
>wclear - Sets the weather to clear.
>wrain - Sets the weather to rain.
>wthunder - Sets the weather to thunder.
>chatlogs - clears/gets/searches through chatlogs.
>invview - Views a selected players inventory for 30 seconds.
>invload - Views a selected players inventory without reverting.
>tp - Asks a player if you can tp to them.
>home - teleports you to your spawn point.
>homea - teleports everyone to their spawn points.
>homep - teleports the selected player to their spawn point.
>spawn - teleports you to the world spawn.
>spawna - teleports everyone to the world spawn.
>spawnp - teleports the selected player to the world spawn.
>listbuild - lists the players that have build disabled.
>togglebuild - allows you to toggle build globally or on a player.
>lawn - trims tall grass and grass at the players location.
>lockchest [x] [y] [z] - locks or unlocks a chest at the optional coordinates.
>lockchest - locks or unlocks a chest at the players feet.
>listchest - lists all the chests that are locked.
>nether - teleports to the nether.
>overworld - teleports to the overworld.
>end - teleports to the end.
>blocklogs - clears/gets/searches through blocklogs.
>jail - tps a player in and out of jail.
>fakejoin - sends a fake join message in your name.
>fakeleave - sends a fake leaving message in your name.
>afk - toggle a mode that allows you to be immortal to other players.
>regen - regenerates your health and hunger bar.
>dupe - duplicates the item you are holding.
>wand - Gives you a wand that allows you to fill areas easyly with it.
>resetwand - Resets the fill wand database.
>renameitem - Renames the item you are holding to the name specified in the command.
>mute - Mutes the specified player, if you run it again it unmutes them.
>listmute - Lists all muted players.
>lore - sets the lore of the item you are holding.
>repeatcmd - repeats a command for the number of times you choose.
>resetthreads - Resets all currently running threads from commands.
>reportp - reports a specified player for a specified reason.
>stats - displays stats about a specified player.
>redeem - allows you to redeem things via a code.
>clear - clears chat.
>accesslogs - clears/gets/searches through logs of people who joined and leaved and at what time.
                "}]}
            `);
            chatMessage.sender.dimension.runCommand(`
                tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"
§l§6${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName} §eHelp§r
§cYou can see Member and Admin Commands.§r
>help - Shows this helpful command.
>day - sets the time to day.
>night - sets the time to night.
>killmobs - Kill all mobs.
>adminui - Shows the Admin UI were you can configure the dirtlets essentials.
>nuke - summons TNT on you every 10 ticks if enabled.
>wclear - Sets the weather to clear.
>wrain - Sets the weather to rain.
>wthunder - Sets the weather to thunder.
>chatlogs - clears/gets/searches through chatlogs.
>invview - Views a selected players inventory for 30 seconds.
>invload - Views a selected players inventory without reverting.
>tp - Asks a player if you can tp to them.
>home - teleports you to your spawn point.
>homea - teleports everyone to their spawn points.
>homep - teleports the selected player to their spawn point.
>spawn - teleports you to the world spawn.
>spawna - teleports everyone to the world spawn.
>spawnp - teleports the selected player to the world spawn.
>listbuild - lists the players that have build disabled.
>togglebuild - allows you to toggle build globally or on a player.
>lawn - trims tall grass and grass at the players location.
>lockchest [x] [y] [z] - locks or unlocks a chest at the optional coordinates.
>lockchest - locks or unlocks a chest at the players feet.
>listchest - lists all the chests that are locked.
>nether - teleports to the nether.
>overworld - teleports to the overworld.
>end - teleports to the end.
>blocklogs - clears/gets/searches through blocklogs.
>jail - tps a player in and out of jail.
>fakejoin - sends a fake join message in your name.
>fakeleave - sends a fake leaving message in your name.
>afk - toggle a mode that allows you to be immortal to other players.
>regen - regenerates your health and hunger bar.
>dupe - duplicates the item you are holding.
>wand - Gives you a wand that allows you to fill areas easyly with it.
>resetwand - Resets the fill wand database.
>renameitem - Renames the item you are holding to the name specified in the command.
>mute - Mutes the specified player, if you run it again it unmutes them.
>listmute - Lists all muted players.
>lore - sets the lore of the item you are holding.
>repeatcmd - repeats a command for the number of times you choose.
>resetthreads - Resets all currently running threads from commands.
>reportp - reports a specified player for a specified reason.
>stats - displays stats about a specified player.
>redeem - allows you to redeem things via a code.
>clear - clears chat.
>accesslogs - clears/gets/searches through logs of people who joined and leaved and at what time.
                "}]}
            `);
            return;
        }
        chatMessage.sender.dimension.runCommand(`
            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"
§l§6${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName} §eHelp§r
§cYou can only see Member Commands.§r
>help - Shows this helpful command.
>tp - Asks a player if you can tp to them.
>home - teleports you to your spawn point.
>spawn - teleports you to the world spawn.
>afk - toggle a mode that allows you to be immortal to other players.
>lore - sets the lore of the item you are holding.
>redeem - allows you to redeem things via a code.
            "}]}
        `);
        chatMessage.sender.dimension.runCommand(`
            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"
§l§6${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName} §eHelp§r
§cYou can only see Member Commands.§r
>help - Shows this helpful command.
>tp - Asks a player if you can tp to them.
>home - teleports you to your spawn point.
>spawn - teleports you to the world spawn.
>afk - toggle a mode that allows you to be immortal to other players.
>lore - sets the lore of the item you are holding.
>redeem - allows you to redeem things via a code.
            "}]}
        `);
    });
}
export default runCommandChatHelp;
