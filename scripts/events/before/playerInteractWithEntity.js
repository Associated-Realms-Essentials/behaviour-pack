import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runEventBeforePlayerInteractWithEntity(entity, adminTag, messageHideTag) {
    let bannedBlocksToChangeForSuperDeny = [
        "painting"
    ];
    if (entity.player.hasTag("areinternal:standingOverSuperDeny")) {
        let entityFound = false;
        bannedBlocksToChangeForSuperDeny.forEach(potentialEntity => {
            if (entity.target.typeId.includes(potentialEntity)) {
                entityFound = true;
            }
        });
        if (entityFound == true) {
            entity.cancel = true;
        }
    }
    if (entity.player.hasTag("areinternal:standingOverUltraDeny")) {
        entity.cancel = true;
    }
    if (entity.player.hasTag("areinternal:standingOverHyperDeny")) {
        entity.cancel = true;
    }
}
export default runEventBeforePlayerInteractWithEntity;
