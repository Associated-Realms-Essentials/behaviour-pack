import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
async function runEventBeforePlayerPlaceBlock(block) {
    if ((block.permutationToPlace.getItemStack().typeId.includes("are:super_deny") ||
        block.permutationToPlace.getItemStack().typeId.includes("are:ultra_deny") ||
        block.permutationToPlace.getItemStack().typeId.includes("are:hyper_deny")) &&
        (block?.player?.getGameMode() !== ms.GameMode.Creative ||
            block?.player?.playerPermissionLevel !== ms.PlayerPermissionLevel.Operator)) {
        block.cancel = true;
        block.player.sendMessage("§cYou need Creative + Operator to place this block.§r");
        return;
    }
    if (block.player.hasTag("areinternal:standingOverSuperDeny")) {
        block.cancel = true;
    }
    if (block.player.hasTag("areinternal:standingOverUltraDeny")) {
        block.cancel = true;
    }
    if (block.player.hasTag("areinternal:standingOverHyperDeny")) {
        block.cancel = true;
    }
    if (ms.world.scoreboard.getObjective('dirtletsEssentials:save:buildAll').getParticipants()[0].displayName == "false") {
        block.cancel = true;
        return;
    }
    ms.world.scoreboard.getObjective('dirtletsEssentials:save:buildPeople').getParticipants().forEach(user => {
        if (user.displayName == block.player.name) {
            block.cancel = true;
            return;
        }
    });
}
export default runEventBeforePlayerPlaceBlock;
