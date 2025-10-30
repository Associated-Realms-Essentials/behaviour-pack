import * as ms from "@minecraft/server";
import * as msui from "@minecraft/server-ui";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
let passed = false;
function runEventBeforeItemUseOn(item, adminTag, messageHideTag) {
    if (item.itemStack.typeId.includes('floating_text')) {
        item.cancel = true;
        ms.system.run(() => {
            if (!(item.source instanceof ms.Player))
                return;
            if (passed == false) {
                passed = true;
                let form = new msui.ModalFormData();
                if (ms.world.scoreboard.getObjective('dirtletsEssentials:save:floatingtextguidata').getParticipants()[0].displayName != "") {
                    let array = ms.world.scoreboard.getObjective('dirtletsEssentials:save:floatingtextguidata').getParticipants()[0].displayName.split('#@##@&*£$strsplit#@##@&*£$');
                    form = new msui.ModalFormData()
                        .title('Create Some Floating Text')
                        .textField('Text', 'Enter Text...', array[0])
                        .textField('Coordinates', 'Enter Coordinates...', array[1]);
                }
                else {
                    form = new msui.ModalFormData()
                        .title('Create Some Floating Text')
                        .textField('Text', 'Enter Text...')
                        .textField('Coordinates', 'Enter Coordinates...');
                }
                form.show(item.source).then(formRes => {
                    if (formRes.canceled == true)
                        return passed = false;
                    passed = false;
                    ms.world.scoreboard.removeObjective('dirtletsEssentials:save:floatingtextguidata');
                    ms.world.scoreboard.addObjective('dirtletsEssentials:save:floatingtextguidata', 'dirtletsEssentials:save:floatingtextguidata');
                    ms.world.getDimension('overworld').runCommand(`scoreboard players set "${formRes.formValues[0]}#@##@&*£$strsplit#@##@&*£$${formRes.formValues[1]}" "dirtletsEssentials:save:floatingtextguidata" 0`);
                    if (formRes.formValues[0] == "") {
                        item.source.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${item.source.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${item.source.name} > §cThe floating text has not been created because you havent given any text.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                        item.source.dimension.runCommand(`
                        tellraw "${item.source.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§cThe floating text has not been created because you havent given any text.§r"}]}
                        `);
                        return;
                    }
                    if (formRes.formValues[1] == "") {
                        item.source.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${item.source.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${item.source.name} > §cThe floating text has not been created because you havent specifyed coordinates.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                        item.source.dimension.runCommand(`
                        tellraw "${item.source.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§cThe floating text has not been created because you havent specifyed coordinates.§r"}]}
                        `);
                        return;
                    }
                    let isNumber = false;
                    let isNumberIndex = 0;
                    let chords = formRes.formValues[1].toString().split(" ");
                    if (chords[2] == "") {
                        item.source.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${item.source.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${item.source.name} > §cNot valid coordinates.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                        item.source.dimension.runCommand(`
                            tellraw "${item.source.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§cNot valid coordinates.§r"}]}
                        `);
                        return;
                    }
                    // need to convert ~ ~ ~ into playerposition add whats after the tilde :(
                    let isTilde = false;
                    chords.forEach((chord) => {
                        if (!isNaN(chord)) {
                            isNumberIndex += 1;
                            return;
                        }
                        if (chord.includes('~')) {
                            isNumberIndex += 1;
                            isTilde = true;
                        }
                    });
                    if (isNumberIndex == 3) {
                        isNumber = true;
                    }
                    if (!isNumber) {
                        item.source.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${item.source.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${item.source.name} > §cNot valid coordinates.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                        `);
                        item.source.dimension.runCommand(`
                            tellraw "${item.source.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§cNot valid coordinates.§r"}]}
                        `);
                        return;
                    }
                    if (isNumber) {
                        if (isTilde) {
                            chords[0] = chords[0] != "~" ? (parseFloat(Math.floor(item.source.location.x).toString()) + parseFloat(chords[0].replace("~", "") == "" ? "0" : chords[0].replace("~", ""))).toString() : item.source.location.x.toString();
                            chords[1] = chords[1] != "~" ? (parseFloat(Math.floor(item.source.location.y).toString()) + parseFloat(chords[1].replace("~", "") == "" ? "0" : chords[1].replace("~", ""))).toString() : item.source.location.y.toString();
                            chords[2] = chords[2] != "~" ? (parseFloat(Math.floor(item.source.location.z).toString()) + parseFloat(chords[2].replace("~", "") == "" ? "0" : chords[2].replace("~", ""))).toString() : item.source.location.z.toString();
                        }
                        try {
                            let newFT = item.source.dimension.spawnEntity('are:floating_text', { x: parseFloat(chords[0]), y: parseFloat(chords[1]), z: parseFloat(chords[2]) });
                            newFT.nameTag = `${formRes.formValues[0]}`;
                        }
                        catch (err) {
                            item.source.dimension.runCommand(`
                                tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${item.source.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${item.source.name} > §c${err} ${err.stack}\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                            `);
                            item.source.dimension.runCommand(`
                                tellraw "${item.source.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§c${err} ${err.stack}§r"}]}
                            `);
                        }
                    }
                });
            }
        });
    }
    if (item.itemStack.typeId.includes('custom_painting')) {
        item.cancel = true;
        ms.system.run(() => {
            if (item.source.hasTag(adminTag)) {
                if (item.blockFace == ms.Direction.North) {
                    let paintingAlreadyExists = false;
                    item.source.dimension.getEntitiesAtBlockLocation({ x: item.block.location.x, y: item.block.location.y, z: item.block.location.z - 1 }).forEach((entity) => {
                        if (entity.typeId == "minecraft:painting") {
                            paintingAlreadyExists = true;
                        }
                    });
                    if (paintingAlreadyExists == false) {
                        ms.world.structureManager.place("customPaintingN", item.source.dimension, { x: item.block.location.x, y: item.block.location.y, z: item.block.location.z - 1 });
                        ms.world.playSound('block.itemframe.add_item', { x: item.block.location.x, y: item.block.location.y, z: item.block.location.z - 1 });
                    }
                }
                if (item.blockFace == ms.Direction.East) {
                    let paintingAlreadyExists = false;
                    item.source.dimension.getEntitiesAtBlockLocation({ x: item.block.location.x + 1, y: item.block.location.y, z: item.block.location.z }).forEach((entity) => {
                        if (entity.typeId == "minecraft:painting") {
                            paintingAlreadyExists = true;
                        }
                    });
                    if (paintingAlreadyExists == false) {
                        ms.world.structureManager.place("customPaintingE", item.source.dimension, { x: item.block.location.x + 1, y: item.block.location.y, z: item.block.location.z });
                        ms.world.playSound('block.itemframe.add_item', { x: item.block.location.x + 1, y: item.block.location.y, z: item.block.location.z });
                    }
                }
                if (item.blockFace == ms.Direction.South) {
                    let paintingAlreadyExists = false;
                    item.source.dimension.getEntitiesAtBlockLocation({ x: item.block.location.x, y: item.block.location.y, z: item.block.location.z + 1 }).forEach((entity) => {
                        if (entity.typeId == "minecraft:painting") {
                            paintingAlreadyExists = true;
                        }
                    });
                    if (paintingAlreadyExists == false) {
                        ms.world.structureManager.place("customPaintingS", item.source.dimension, { x: item.block.location.x, y: item.block.location.y, z: item.block.location.z + 1 });
                        ms.world.playSound('block.itemframe.add_item', { x: item.block.location.x, y: item.block.location.y, z: item.block.location.z + 1 });
                    }
                }
                if (item.blockFace == ms.Direction.West) {
                    let paintingAlreadyExists = false;
                    item.source.dimension.getEntitiesAtBlockLocation({ x: item.block.location.x - 1, y: item.block.location.y, z: item.block.location.z }).forEach((entity) => {
                        if (entity.typeId == "minecraft:painting") {
                            paintingAlreadyExists = true;
                        }
                    });
                    if (paintingAlreadyExists == false) {
                        ms.world.structureManager.place("customPaintingW", item.source.dimension, { x: item.block.location.x - 1, y: item.block.location.y, z: item.block.location.z });
                        ms.world.playSound('block.itemframe.add_item', { x: item.block.location.x - 1, y: item.block.location.y, z: item.block.location.z });
                    }
                }
            }
        });
    }
}
export default runEventBeforeItemUseOn;
