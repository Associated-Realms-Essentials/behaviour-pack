import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runEventAfterEntityDie(entity) {
    console.warn("0");
    if (entity.damageSource.damagingEntity !== null) {
        console.warn("1");
        ms.world.getAllPlayers().forEach(player2 => {
            if (entity.damageSource.damagingEntity == player2) {
                console.warn("2");
                if (entity.deadEntity.typeId.includes("painting")) {
                    console.warn("3");
                    if (entity.damageSource.damagingEntity.hasTag("areinternal:standingOverSuperDeny")) {
                        ms.world.structureManager.getWorldStructureIds().forEach((structure) => {
                            if (structure.startsWith("are:savedPainting_")) {
                                ms.world.structureManager.place(structure, structure.split("_")[4], { x: structure.split("_")[1], y: structure.split("_")[2], z: structure.split("_")[3] });
                                ms.world.structureManager.delete(structure);
                            }
                        });
                    }
                    if (entity.damageSource.damagingEntity.hasTag("areinternal:standingOverUltraDeny")) {
                        ms.world.structureManager.getWorldStructureIds().forEach((structure) => {
                            if (structure.startsWith("are:savedPainting_")) {
                                ms.world.structureManager.place(structure, structure.split("_")[4], { x: structure.split("_")[1], y: structure.split("_")[2], z: structure.split("_")[3] });
                                ms.world.structureManager.delete(structure);
                            }
                        });
                    }
                    if (entity.damageSource.damagingEntity.hasTag("areinternal:standingOverHyperDeny")) {
                        ms.world.structureManager.getWorldStructureIds().forEach((structure) => {
                            if (structure.startsWith("are:savedPainting_")) {
                                ms.world.structureManager.place(structure, structure.split("_")[4], { x: structure.split("_")[1], y: structure.split("_")[2], z: structure.split("_")[3] });
                                ms.world.structureManager.delete(structure);
                            }
                        });
                    }
                }
            }
        });
    }
}
export default runEventAfterEntityDie;
