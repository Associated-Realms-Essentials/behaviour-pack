// import * as ms from "@minecraft/server";
// import * as msui from "@minecraft/server-ui";
// const sleep = (n: number) => new Promise<void>(acc => ms.system.runTimeout(acc, n));
// function runEventAfterEntitySpawn(entity: ms.EntitySpawnAfterEvent){
//     ms.system.run(() => {
//         if(entity.entity.typeId.includes("painting")){
//             console.warn("are:savedPainting_"+entity.entity.location.x.toFixed(2)+"_"+entity.entity.location.y.toFixed(2)+"_"+entity.entity.location.z.toFixed(2)+"_"+entity.entity.dimension.id)
//             if(entity.entity.dimension.getBlockFromRay({ x: entity.entity.location.x, y: entity.entity.location.y, z: entity.entity.location.z }, { x: 0, y: -1, z: 0 }, { "includeLiquidBlocks": true, "maxDistance": 999999, "includeTypes": ["are:super_deny"] })?.block){
//                 ms.world.structureManager.createFromWorld("are:savedPainting_"+entity.entity.location.x.toFixed(2)+"_"+entity.entity.location.y.toFixed(2)+"_"+entity.entity.location.z.toFixed(2)+"_"+entity.entity.dimension.id.replace("minecraft:", ""), entity.entity.dimension, { x: entity.entity.location.x, y: entity.entity.location.y, z: entity.entity.location.z }, { x: entity.entity.location.x, y: entity.entity.location.y, z: entity.entity.location.z }, { includeEntities: true, includeBlocks: false })
//             }
//             if(entity.entity.dimension.getBlockFromRay({ x: entity.entity.location.x, y: entity.entity.location.y, z: entity.entity.location.z }, { x: 0, y: -1, z: 0 }, { "includeLiquidBlocks": true, "maxDistance": 999999, "includeTypes": ["are:ultra_deny"] })?.block){
//                 ms.world.structureManager.createFromWorld("are:savedPainting_"+entity.entity.location.x.toFixed(2)+"_"+entity.entity.location.y.toFixed(2)+"_"+entity.entity.location.z.toFixed(2)+"_"+entity.entity.dimension.id.replace("minecraft:", ""), entity.entity.dimension, { x: entity.entity.location.x, y: entity.entity.location.y, z: entity.entity.location.z }, { x: entity.entity.location.x, y: entity.entity.location.y, z: entity.entity.location.z }, { includeEntities: true, includeBlocks: false })
//             }
//             if(entity.entity.dimension.getBlockFromRay({ x: entity.entity.location.x, y: entity.entity.location.y, z: entity.entity.location.z }, { x: 0, y: -1, z: 0 }, { "includeLiquidBlocks": true, "maxDistance": 999999, "includeTypes": ["are:hyper_deny"] })?.block){
//                 ms.world.structureManager.createFromWorld("are:savedPainting_"+entity.entity.location.x.toFixed(2)+"_"+entity.entity.location.y.toFixed(2)+"_"+entity.entity.location.z.toFixed(2)+"_"+entity.entity.dimension.id.replace("minecraft:", ""), entity.entity.dimension, { x: entity.entity.location.x, y: entity.entity.location.y, z: entity.entity.location.z }, { x: entity.entity.location.x, y: entity.entity.location.y, z: entity.entity.location.z }, { includeEntities: true, includeBlocks: false })
//             }
//         }
//     })
// }
// export default runEventAfterEntitySpawn;
