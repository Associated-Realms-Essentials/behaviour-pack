import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runEventAfterPlayerLeave(player, developers) {
    ms.system.run(() => {
        // if(developers.includes(player.player.name)){
        //     player.player.dimension.runCommand(`
        //         tellraw "${player.player.name}" {"rawtext":[{"text":"\n§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6§l§2OPERATIONAL.§r"}]}
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
        if (ms?.world?.getDimension('overworld')) {
            ms?.world?.getDimension('overworld')?.runCommand(`scoreboard players set "${player.playerName}#@##@&*£$strsplit#@##@&*£$${isoBasicFormat}#@##@&*£$strsplit#@##@&*£$leave" "dirtletsEssentials:save:accesslogs" 0`);
        }
    });
}
export default runEventAfterPlayerLeave;
