// import * as ms from "@minecraft/server";
// import * as msui from "@minecraft/server-ui";
// const sleep = (n: number) => new Promise<void>(acc => ms.system.runTimeout(acc, n));
// function runEventBeforeEntityRemove(entity: ms.EntityRemoveBeforeEvent){
//     ms.system.run(() => {
//         if(entity.removedEntity.typeId.includes("painting")){
//             ms.world.structureManager.getWorldStructureIds().forEach((structure: any) => {
//                 if(structure.startsWith("are:savedPainting_")){
//                     ms.world.structureManager.place(structure, ms.world.getDimension("minecraft:"+structure.split("_")[4] as any), { x: parseFloat(structure.split("_")[1]), y: parseFloat(structure.split("_")[2]), z: parseFloat(structure.split("_")[3]) })
//                 }
//             })
//         }
//     })
// }
// export default runEventBeforeEntityRemove;
