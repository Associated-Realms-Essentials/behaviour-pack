import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runEventBeforeExplosion(explosion) {
    explosion.getImpactedBlocks().forEach((block) => {
        if (block?.typeId?.includes('chest')) {
            ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:lockchest').getParticipants().forEach(dbItem => {
                let array = dbItem.displayName.split('#@##@&*£$strsplit#@##@&*£$');
                if (Math.floor(block.location.x) == parseInt(array[0])) {
                    if (Math.floor(block.location.y) == parseInt(array[1])) {
                        if (Math.floor(block.location.z) == parseInt(array[2])) {
                            explosion.cancel = true;
                        }
                    }
                }
            });
        }
    });
}
export default runEventBeforeExplosion;
