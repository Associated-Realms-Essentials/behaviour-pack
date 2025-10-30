import * as ms from "@minecraft/server";
import * as msui from "@minecraft/server-ui";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
let playersNearbyWhenSongStarted = [];
let passed = false;
let recordInPlayer = null;
function runEventBeforePlayerInteractWithBlock(block, adminTag, messageHideTag) {
    let bannedBlocksToChangeForSuperDeny = [
        "grass_block",
        "dirt",
        "_planks",
        "_wood",
        "_log",
        "path",
        "sand",
        "gravel",
        "fire",
        "tnt"
    ];
    if (block.player.hasTag("areinternal:standingOverSuperDeny")) {
        let blockFound = false;
        bannedBlocksToChangeForSuperDeny.forEach(potentialBlock => {
            if (block.block.typeId.includes(potentialBlock)) {
                blockFound = true;
            }
        });
        if (blockFound == true) {
            block.cancel = true;
        }
    }
    if (block.player.hasTag("areinternal:standingOverUltraDeny")) {
        block.cancel = true;
    }
    if (block.player.hasTag("areinternal:standingOverHyperDeny")) {
        block.cancel = true;
    }
    if (block?.itemStack?.typeId?.includes('floating_text')) {
        block.cancel = true;
        ms.system.run(() => {
            if (!(block.player instanceof ms.Player))
                return;
            if (passed == false) {
                passed = true;
                let form = new msui.ModalFormData();
                if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:floatingtextguidata').getParticipants()[0].displayName != "") {
                    let array = ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:floatingtextguidata').getParticipants()[0].displayName.split('#@##@&*£$strsplit#@##@&*£$');
                    form = new msui.ModalFormData()
                        .title('Create Some Floating Text')
                        .textField('Text', 'Enter Text...', { defaultValue: array[0] })
                        .textField('Coordinates', 'Enter Coordinates...', { defaultValue: array[1] });
                }
                else {
                    form = new msui.ModalFormData()
                        .title('Create Some Floating Text')
                        .textField('Text', 'Enter Text...')
                        .textField('Coordinates', 'Enter Coordinates...');
                }
                form.show(block.player).then(formRes => {
                    if (formRes.canceled == true)
                        return passed = false;
                    passed = false;
                    ms.world.scoreboard.removeObjective('associatedRealmsEssentials:save:floatingtextguidata');
                    ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:floatingtextguidata', 'associatedRealmsEssentials:save:floatingtextguidata');
                    ms.world.getDimension('overworld').runCommand(`scoreboard players set "${formRes.formValues[0]}#@##@&*£$strsplit#@##@&*£$${formRes.formValues[1]}" "associatedRealmsEssentials:save:floatingtextguidata" 0`);
                    if (formRes.formValues[0] == "") {
                        block.player.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${block.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${block.player.name} > §cThe floating text has not been created because you havent given any text.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                            `);
                        block.player.dimension.runCommand(`
                            tellraw "${block.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§cThe floating text has not been created because you havent given any text.§r"}]}
                            `);
                        return;
                    }
                    if (formRes.formValues[1] == "") {
                        block.player.dimension.runCommand(`
                            tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${block.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${block.player.name} > §cThe floating text has not been created because you havent specifyed coordinates.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                            `);
                        block.player.dimension.runCommand(`
                            tellraw "${block.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§cThe floating text has not been created because you havent specifyed coordinates.§r"}]}
                            `);
                        return;
                    }
                    let isNumber = false;
                    let isNumberIndex = 0;
                    let chords = formRes.formValues[1].toString().split(" ");
                    if (chords[2] == "") {
                        block.player.dimension.runCommand(`
                                tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${block.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${block.player.name} > §cNot valid coordinates.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                            `);
                        block.player.dimension.runCommand(`
                                tellraw "${block.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§cNot valid coordinates.§r"}]}
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
                        block.player.dimension.runCommand(`
                                tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${block.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${block.player.name} > §cNot valid coordinates.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                            `);
                        block.player.dimension.runCommand(`
                                tellraw "${block.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§cNot valid coordinates.§r"}]}
                            `);
                        return;
                    }
                    if (isNumber) {
                        if (isTilde) {
                            chords[0] = chords[0] != "~" ? (parseFloat(Math.floor(block.player.location.x).toString()) + parseFloat(chords[0].replace("~", "") == "" ? "0" : chords[0].replace("~", ""))).toString() : block.player.location.x.toString();
                            chords[1] = chords[1] != "~" ? (parseFloat(Math.floor(block.player.location.y).toString()) + parseFloat(chords[1].replace("~", "") == "" ? "0" : chords[1].replace("~", ""))).toString() : block.player.location.y.toString();
                            chords[2] = chords[2] != "~" ? (parseFloat(Math.floor(block.player.location.z).toString()) + parseFloat(chords[2].replace("~", "") == "" ? "0" : chords[2].replace("~", ""))).toString() : block.player.location.z.toString();
                        }
                        try {
                            let newFT = block.player.dimension.spawnEntity("are:floating_text", { x: parseFloat(chords[0]), y: parseFloat(chords[1]), z: parseFloat(chords[2]) });
                            newFT.nameTag = `${formRes.formValues[0]}`;
                        }
                        catch (err) {
                            block.player.dimension.runCommand(`
                                    tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${block.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${block.player.name} > §c${err} ${err.stack}\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                `);
                            block.player.dimension.runCommand(`
                                    tellraw "${block.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§c${err} ${err.stack}§r"}]}
                                `);
                        }
                    }
                });
            }
        });
    }
    if (block?.itemStack?.typeId?.includes('custom_painting')) {
        block.cancel = true;
        ms.system.run(() => {
            if (block.player.hasTag(adminTag)) {
                if (block.blockFace == ms.Direction.North) {
                    let paintingAlreadyExists = false;
                    block.player.dimension.getEntitiesAtBlockLocation({ x: block.block.location.x, y: block.block.location.y, z: block.block.location.z - 1 }).forEach((entity) => {
                        if (entity.typeId == "minecraft:painting") {
                            paintingAlreadyExists = true;
                        }
                    });
                    if (paintingAlreadyExists == false) {
                        ms.world.structureManager.place("customPaintingN", block.player.dimension, { x: block.block.location.x, y: block.block.location.y, z: block.block.location.z - 1 });
                        block.player.dimension.playSound('block.itemframe.add_item', { x: block.block.location.x, y: block.block.location.y, z: block.block.location.z - 1 });
                    }
                }
                if (block.blockFace == ms.Direction.East) {
                    let paintingAlreadyExists = false;
                    block.player.dimension.getEntitiesAtBlockLocation({ x: block.block.location.x + 1, y: block.block.location.y, z: block.block.location.z }).forEach((entity) => {
                        if (entity.typeId == "minecraft:painting") {
                            paintingAlreadyExists = true;
                        }
                    });
                    if (paintingAlreadyExists == false) {
                        ms.world.structureManager.place("customPaintingE", block.player.dimension, { x: block.block.location.x + 1, y: block.block.location.y, z: block.block.location.z });
                        block.player.dimension.playSound('block.itemframe.add_item', { x: block.block.location.x + 1, y: block.block.location.y, z: block.block.location.z });
                    }
                }
                if (block.blockFace == ms.Direction.South) {
                    let paintingAlreadyExists = false;
                    block.player.dimension.getEntitiesAtBlockLocation({ x: block.block.location.x, y: block.block.location.y, z: block.block.location.z + 1 }).forEach((entity) => {
                        if (entity.typeId == "minecraft:painting") {
                            paintingAlreadyExists = true;
                        }
                    });
                    if (paintingAlreadyExists == false) {
                        ms.world.structureManager.place("customPaintingS", block.player.dimension, { x: block.block.location.x, y: block.block.location.y, z: block.block.location.z + 1 });
                        block.player.dimension.playSound('block.itemframe.add_item', { x: block.block.location.x, y: block.block.location.y, z: block.block.location.z + 1 });
                    }
                }
                if (block.blockFace == ms.Direction.West) {
                    let paintingAlreadyExists = false;
                    block.player.dimension.getEntitiesAtBlockLocation({ x: block.block.location.x - 1, y: block.block.location.y, z: block.block.location.z }).forEach((entity) => {
                        if (entity.typeId == "minecraft:painting") {
                            paintingAlreadyExists = true;
                        }
                    });
                    if (paintingAlreadyExists == false) {
                        ms.world.structureManager.place("customPaintingW", block.player.dimension, { x: block.block.location.x - 1, y: block.block.location.y, z: block.block.location.z });
                        block.player.dimension.playSound('block.itemframe.add_item', { x: block.block.location.x - 1, y: block.block.location.y, z: block.block.location.z });
                    }
                }
            }
        });
    }
    if (block?.block?.typeId?.includes('jukebox')) {
        if (!ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:jukeboxPlus:enabled')?.getParticipants()[0]?.displayName)
            return;
        if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:jukeboxPlus:enabled').getParticipants()[0].displayName != "true")
            return;
        if (block.block.getRedstonePower() == 0) {
            if (block.player.getComponent('inventory').container?.getSlot(block.player.selectedSlotIndex).getItem().typeId.includes("music_disc_")) {
                recordInPlayer = block.player.getComponent('inventory').container?.getSlot(block.player.selectedSlotIndex).getItem().typeId;
                function runCustomPlayDisc() {
                    // check for speakers and play.
                    let theSpeakers = [];
                    let radius = 32;
                    ms.system.run(() => {
                        let speakers = block.player.dimension.getBlocks(new ms.BlockVolume({ x: block.block.location.x - radius, y: block.block.location.y - radius, z: block.block.location.z - radius }, { x: block.block.location.x + radius, y: block.block.location.y + radius, z: block.block.location.z + radius }), { includeTypes: ["f:altavoz1"] }, true);
                        let speaker = speakers.getBlockLocationIterator();
                        var i1 = 0, len1 = speakers.getCapacity();
                        console.warn(len1);
                        while (i1 < len1) {
                            let speakerContent = speaker.next();
                            console.warn(speakerContent.value.x + " | " + speakerContent.value.y + " | " + speakerContent.value.z);
                            theSpeakers.push({ x: speakerContent.value.x, y: speakerContent.value.y, z: speakerContent.value.z });
                            i1++;
                        }
                        console.warn(JSON.stringify(theSpeakers));
                        let speakerFound = false;
                        var i2 = 0, len2 = theSpeakers.length;
                        while (i2 < len2) {
                            speakerFound = true;
                            console.warn(`speaker at ${theSpeakers[i2].x} ${theSpeakers[i2].y} ${theSpeakers[i2].z}`);
                            block.player.runCommand(`
                                        playsound record.${block.block.getComponent('record_player').getRecord().typeId.split('music_disc_')[1]} @a[r=64, x=${theSpeakers[i2].x}, y=${theSpeakers[i2].y}, z=${theSpeakers[i2].z}] ${theSpeakers[i2].x} ${theSpeakers[i2].y} ${theSpeakers[i2].z} 0.5 1
                                    `);
                            i2++;
                        }
                        if (speakerFound == false) {
                            console.warn(`jukebox at ${block.block.location.x} ${block.block.location.y} ${block.block.location.z}`);
                            block.player.runCommand(`
                                        playsound record.${block.block.getComponent('record_player').getRecord().typeId.split('music_disc_')[1]} @a[r=64, x=${block.block.location.x}, y=${block.block.location.y}, z=${block.block.location.z}] ${block.block.location.x} ${block.block.location.y} ${block.block.location.z}
                                    `);
                        }
                    });
                }
                let ticks = 0;
                let theIntervalToCancel = null;
                theIntervalToCancel = ms.system.runInterval(() => {
                    if (block.block.getComponent('record_player').getRecord()?.typeId) {
                        let commandResult = block.player.runCommand(`
                                    stopsound @a[r=64, x=${block.block.location.x}, y=${block.block.location.y}, z=${block.block.location.z}] record.${block.block.getComponent('record_player').getRecord().typeId.split('music_disc_')[1]}
                                `);
                        console.warn("SC: " + commandResult.successCount);
                        if (ticks == 8) {
                            ticks = 0;
                            runCustomPlayDisc();
                            ms.system.clearRun(theIntervalToCancel);
                        }
                        else {
                            ticks += 1;
                        }
                    }
                }, 1);
                ms.system.run(() => {
                    block.player.runCommand('music stop 1'); //Stop the game music
                    block.player.dimension.setWeather(ms.WeatherType.Clear); //Make it sunny
                });
                if (block.player.hasTag(adminTag)) {
                    ms.system.run(() => {
                        block.player.dimension.runCommand(`
                                    tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§aEnjoy the music §2${block.player.name}!§r"}]}
                                `);
                    });
                    return;
                }
                ms.system.run(() => {
                    block.player.dimension.runCommand(`
                                tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§aEnjoy the music §2${block.player.name}!§r"}]}
                            `);
                    block.player.dimension.runCommand(`
                                tellraw "${block.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§aEnjoy the music §2${block.player.name}!§r"}]}
                            `);
                });
            }
            return;
        }
        ms.system.run(() => {
            block.player.runCommand(`
                        stopsound @a[r=64, x=${block.block.location.x}, y=${block.block.location.y}, z=${block.block.location.z}] record.${recordInPlayer.split('music_disc_')[1]}
                    `);
        });
    }
    if (block?.block?.typeId?.includes('chest')) {
        ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:lockchest').getParticipants().forEach(dbItem => {
            let array = dbItem.displayName.split('#@##@&*£$strsplit#@##@&*£$');
            if (Math.floor(block.block.location.x) == parseInt(array[0])) {
                if (Math.floor(block.block.location.y) == parseInt(array[1])) {
                    if (Math.floor(block.block.location.z) == parseInt(array[2])) {
                        block.cancel = true;
                        ms.system.run(() => {
                            block.player.dimension.runCommand(`
                                    tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${block.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${block.player.name} > §eThis chest has been §clocked§e by a admin.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                `);
                            block.player.dimension.runCommand(`
                                    tellraw "${block.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§eThis chest has been §clocked§e by a admin.§r"}]}
                                `);
                        });
                    }
                }
            }
        });
    }
    if (block?.itemStack?.typeId?.includes('wooden_axe')) {
        if (block.itemStack.nameTag) {
            if (block.itemStack.nameTag == "arefillwand") {
                block.cancel = true;
                if (!block.player.hasTag(adminTag))
                    return;
                if (!block.isFirstEvent)
                    return;
                let playerStillExists = false;
                ms.system.run(() => {
                    ms.world.getAllPlayers().forEach((player) => {
                        if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:player').getParticipants()[0].displayName !== "") {
                            if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:player').getParticipants()[0].displayName === player.name) {
                                playerStillExists = true;
                            }
                        }
                        else {
                            playerStillExists = true;
                        }
                    });
                    if (playerStillExists == false) {
                        ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:block');
                        ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:block', 'associatedRealmsEssentials:fillWand:block');
                        block.player.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:block" 0`);
                        ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:coordsSet1');
                        ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:coordsSet1', 'associatedRealmsEssentials:fillWand:coordsSet1');
                        block.player.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:coordsSet1" 0`);
                        ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:coordsSet2');
                        ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:coordsSet2', 'associatedRealmsEssentials:fillWand:coordsSet2');
                        block.player.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:coordsSet2" 0`);
                        ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:player');
                        ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:player', 'associatedRealmsEssentials:fillWand:player');
                        block.player.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:player" 0`);
                    }
                    if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:coordsSet1').getParticipants()[0].displayName == "") {
                        if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:player').getParticipants()[0].displayName == "") {
                            ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:player');
                            ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:player', 'associatedRealmsEssentials:fillWand:player');
                            block.player.dimension.runCommand(`scoreboard players set "${block.player.name}" "associatedRealmsEssentials:fillWand:player" 0`);
                        }
                        ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:coordsSet1');
                        ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:coordsSet1', 'associatedRealmsEssentials:fillWand:coordsSet1');
                        block.player.dimension.runCommand(`scoreboard players set "${block.block.location.x} ${block.block.location.y} ${block.block.location.z}" "associatedRealmsEssentials:fillWand:coordsSet1" 0`);
                        ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:block');
                        ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:block', 'associatedRealmsEssentials:fillWand:block');
                        block.player.dimension.runCommand(`scoreboard players set "${block.block.typeId}" "associatedRealmsEssentials:fillWand:block" 0`);
                        block.player.dimension.runCommand(`
                                        tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${block.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${block.player.name} > §eSucessfully set coords '${ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:coordsSet1').getParticipants()[0].displayName}' for set 1.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                    `);
                        block.player.dimension.runCommand(`
                                        tellraw "${block.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§eSucessfully set coords '${ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:coordsSet1').getParticipants()[0].displayName}' for set 1.§r"}]}
                                    `);
                    }
                    else {
                        if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:coordsSet2').getParticipants()[0].displayName == "") {
                            if (block.player.name !== ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:player').getParticipants()[0].displayName) {
                                block.player.dimension.runCommand(`
                                        tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${block.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${block.player.name} > §cYou must let ${ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:player').getParticipants()[0].displayName} finish up with the fill wand in order for you to start using it.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                    `);
                                block.player.dimension.runCommand(`
                                        tellraw "${block.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§cYou must let ${ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:player').getParticipants()[0].displayName} finish up with the fill wand in order for you to start using it.§r"}]}
                                    `);
                                return;
                            }
                            ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:coordsSet2');
                            ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:coordsSet2', 'associatedRealmsEssentials:fillWand:coordsSet2');
                            block.player.dimension.runCommand(`scoreboard players set "${block.block.location.x} ${block.block.location.y} ${block.block.location.z}" "associatedRealmsEssentials:fillWand:coordsSet2" 0`);
                            let result = block.player.dimension.runCommand(`fill ${ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:coordsSet1').getParticipants()[0].displayName} ${ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:coordsSet2').getParticipants()[0].displayName} ${ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:block').getParticipants()[0].displayName}`);
                            if (result.successCount == 0) {
                                block.player.dimension.runCommand(`
                                                tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${block.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${block.player.name} > §cCould not fill the selected area, the area you selected was too big to fill or the fill block was identical to the selected blocks.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                            `);
                                block.player.dimension.runCommand(`
                                                tellraw "${block.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cCould not fill the selected area, the area you selected was too big to fill or the fill block was identical to the selected blocks.§r"}]}
                                            `);
                            }
                            else {
                                block.player.dimension.runCommand(`
                                                tellraw @a[tag="${adminTag}", tag=!"${messageHideTag}", name=!"${block.player.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${block.player.name} > §eSucessfully set coords '${ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:coordsSet2').getParticipants()[0].displayName}' for set 2 and filled.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                                            `);
                                block.player.dimension.runCommand(`
                                                tellraw "${block.player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§a§eSucessfully set coords '${ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:coordsSet2').getParticipants()[0].displayName}' for set 2 and filled.§r"}]}
                                            `);
                            }
                            ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:block');
                            ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:block', 'associatedRealmsEssentials:fillWand:block');
                            block.player.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:block" 0`);
                            ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:coordsSet1');
                            ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:coordsSet1', 'associatedRealmsEssentials:fillWand:coordsSet1');
                            block.player.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:coordsSet1" 0`);
                            ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:coordsSet2');
                            ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:coordsSet2', 'associatedRealmsEssentials:fillWand:coordsSet2');
                            block.player.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:coordsSet2" 0`);
                            ms.world.scoreboard.removeObjective('associatedRealmsEssentials:fillWand:player');
                            ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:player', 'associatedRealmsEssentials:fillWand:player');
                            block.player.dimension.runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:player" 0`);
                        }
                    }
                });
            }
        }
    }
}
export default runEventBeforePlayerInteractWithBlock;
