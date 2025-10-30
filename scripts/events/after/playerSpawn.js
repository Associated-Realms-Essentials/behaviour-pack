import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runEventAfterPlayerSpawn(player, developers) {
    ms.system.run(() => {
        if (player.initialSpawn) {
            // if(developers.includes(player.player.name)){
            //     player.player.dimension.runCommand(`
            //         tellraw "${player.player.name}" {"rawtext":[{"text":"\n§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6§l§2OPERATIONAL.§r"}]}
            //     `)
            // }
            const now = new Date();
            const year = now.getUTCFullYear(); // e.g., 2024
            const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // 01-12
            const day = String(now.getUTCDate()).padStart(2, '0'); // 01-31
            const hours = String(now.getUTCHours()).padStart(2, '0'); // 00-23
            const minutes = String(now.getUTCMinutes()).padStart(2, '0'); // 00-59
            const seconds = String(now.getUTCSeconds()).padStart(2, '0'); // 00-59
            const isoBasicFormat = `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
            player.player.dimension.runCommand(`scoreboard players set "${player.player.name}#@##@&*£$strsplit#@##@&*£$${isoBasicFormat}#@##@&*£$strsplit#@##@&*£$join" "associatedRealmsEssentials:save:accesslogs" 0`);
            if (!ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:joinMessages:enabled')?.getParticipants()[0]?.displayName)
                return;
            if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:joinMessages:enabled').getParticipants()[0].displayName != "true")
                return;
            if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:joinMessages:text').getParticipants()[0].displayName == "") {
                player.player.dimension.runCommand(`
                    tellraw @a {"rawtext":[{"text":"\n§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§lEveryone Welcome ${player.player.name}!§r"}]}
                `);
                return;
            }
            var joinMessage = ms.world.scoreboard.getObjective('associatedRealmsEssentials:joinMessages:text').getParticipants()[0].displayName;
            var joinMessageEdited = joinMessage.replaceAll('[player]', player.player.name);
            player.player.dimension.runCommand(`
                tellraw @a {"rawtext":[{"text":"\n§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r${joinMessageEdited}§r"}]}
            `);
        }
        else if (!player.initialSpawn) {
            // Do something
        }
    });
}
export default runEventAfterPlayerSpawn;
