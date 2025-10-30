import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
let oldSong = null;
function playFromJukeboxThroughSpeakers(jukeboxCoordinates, dimension, songToPlay) {
    if (jukeboxCoordinates == null)
        return;
    let block = ms.world.getDimension(dimension).getBlock(jukeboxCoordinates);
    if (block?.typeId?.includes('jukebox')) {
        if (!ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:jukeboxPlus:enabled')?.getParticipants()[0]?.displayName)
            return;
        if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:jukeboxPlus:enabled').getParticipants()[0].displayName != "true")
            return;
        if (songToPlay) {
            if (oldSong != null) {
                block.dimension.runCommand(`
                                stopsound @a[r=64, x=${block.location.x}, y=${block.location.y}, z=${block.location.z}] record.${oldSong.split('music_disc_')[1]}
                            `);
            }
            oldSong = songToPlay;
            if (!songToPlay.startsWith("music_disc_"))
                return;
            let res = ms.world.getDimension(dimension).runCommand(`
                            replaceitem block ${jukeboxCoordinates.x} ${jukeboxCoordinates.y} ${jukeboxCoordinates.z} slot.container 0 ${songToPlay}
                        `);
            if (res.successCount != 1)
                return;
            function runCustomPlayDisc() {
                // check for speakers and play.
                let theSpeakers = [];
                let radius = 32;
                ms.system.run(() => {
                    let speakers = block.dimension.getBlocks(new ms.BlockVolume({ x: block.location.x - radius, y: block.location.y - radius, z: block.location.z - radius }, { x: block.location.x + radius, y: block.location.y + radius, z: block.location.z + radius }), { includeTypes: ["f:altavoz1"] }, true);
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
                        block.dimension.runCommand(`
                                            playsound record.${block.getComponent('record_player').getRecord().typeId.split('music_disc_')[1]} @a[r=64, x=${theSpeakers[i2].x}, y=${theSpeakers[i2].y}, z=${theSpeakers[i2].z}] ${theSpeakers[i2].x} ${theSpeakers[i2].y} ${theSpeakers[i2].z} 0.5 1
                                        `);
                        i2++;
                    }
                    if (speakerFound == false) {
                        console.warn(`jukebox at ${block.location.x} ${block.location.y} ${block.location.z}`);
                        block.dimension.runCommand(`
                                            playsound record.${block.getComponent('record_player').getRecord().typeId.split('music_disc_')[1]} @a[r=64, x=${block.location.x}, y=${block.location.y}, z=${block.location.z}] ${block.location.x} ${block.location.y} ${block.location.z}
                                        `);
                    }
                });
            }
            let ticks = 0;
            let theIntervalToCancel = null;
            theIntervalToCancel = ms.system.runInterval(() => {
                if (block.getComponent('record_player').getRecord()?.typeId) {
                    let commandResult = block.dimension.runCommand(`
                                        stopsound @a[r=64, x=${block.location.x}, y=${block.location.y}, z=${block.location.z}] record.${block.getComponent('record_player').getRecord().typeId.split('music_disc_')[1]}
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
            // ms.system.run(() => {
            //     player.runCommand('music stop 1') //Stop the game music
            //     player.dimension.setWeather(ms.WeatherType.Clear) //Make it sunny
            // })
            // if(player.hasTag(adminTag)){
            //     ms.system.run(() => {
            //         player.dimension.runCommand(`
            //             tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§aEnjoy the music §2${player.name}!§r"}]}
            //         `)
            //     })
            // return}
            // ms.system.run(() => {
            //     player.dimension.runCommand(`
            //         tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§aEnjoy the music §2${player.name}!§r"}]}
            //     `)
            //     player.dimension.runCommand(`
            //         tellraw "${player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§aEnjoy the music §2${player.name}!§r"}]}
            //     `)
            // })
        }
    }
}
function runCommandChatEval(chatMessage, adminTag, messageHideTag, prefix) {
    ms.system.run(() => {
        let developers = ['MajorRage3367', 'Mr Printer4736'];
        if (developers.includes(chatMessage.sender.name) && chatMessage.sender.hasTag(adminTag) && chatMessage.sender.hasTag("developers1")) {
            if (chatMessage.message.replace(prefix + "eval", "") == "") {
                chatMessage.sender.dimension.runCommand(`
                    tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6Please do >eval (code).§r"}]}
                `);
                chatMessage.sender.dimension.runCommand(`
                    tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§6${chatMessage.sender.name} > Please do >eval (code).\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
                `);
                return;
            }
            //let response = 
            ms.system.run(() => {
                let memberRank = "§bMember";
                let memberRankNumInternal = 0;
                chatMessage.sender.getTags().forEach((tag2) => {
                    if (tag2.includes('arerank:')) {
                        if (tag2.replace('arerank:', '') !== "") {
                            if (memberRankNumInternal == 0) {
                                memberRank = tag2.replace('arerank:', '');
                            }
                            else {
                                memberRank = memberRank + "§r§7§l] [§r" + tag2.replace('arerank:', '') + "§r";
                            }
                            memberRankNumInternal += 1;
                        }
                    }
                });
                memberRank = memberRank.replaceAll("{operator_plain}", "\uE110");
                memberRank = memberRank.replaceAll("{owner}", "\uE111");
                memberRank = memberRank.replaceAll("{regulations}", "\uE112");
                memberRank = memberRank.replaceAll("{operator}", "\uE113");
                memberRank = memberRank.replaceAll("{smiley}", "\uE114");
                memberRank = memberRank.replaceAll("{major}", "\uE115");
                function sendChatMessage(senderName, theChatMessage, theChatRank = null) {
                    if (theChatRank !== null) {
                        memberRank = theChatRank?.length ? theChatRank.join("§r§7§l] [§r") : theChatRank;
                    }
                    if (theChatRank?.length == 0) {
                        memberRank = "§bMember";
                    }
                    memberRank = memberRank.replaceAll("{operator_plain}", "\uE110");
                    memberRank = memberRank.replaceAll("{owner}", "\uE111");
                    memberRank = memberRank.replaceAll("{regulations}", "\uE112");
                    memberRank = memberRank.replaceAll("{operator}", "\uE113");
                    memberRank = memberRank.replaceAll("{smiley}", "\uE114");
                    memberRank = memberRank.replaceAll("{major}", "\uE115");
                    ms.world.sendMessage(`§7§l[§r${memberRank}§7§l]§r ${senderName}:§r §7${theChatMessage}§r`);
                }
                try {
                    eval(chatMessage.message.replace(prefix + "eval", ""));
                }
                catch (error) {
                    chatMessage.sender.sendMessage(error.message);
                    chatMessage.sender.sendMessage(error.stack);
                }
            });
            //chatMessage.sender.sendMessage(response);
            return;
        }
        chatMessage.sender.dimension.runCommand(`
            tellraw "${chatMessage.sender.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§cYou need to be a developer to use this command.§r"}]}
        `);
        chatMessage.sender.dimension.runCommand(`
            tellraw @a[tag="${adminTag}",tag=!"${messageHideTag}",name=!"${chatMessage.sender.name}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§c${chatMessage.sender.name} > You need to be a developer to use this command.\n§r(give yourself the '${messageHideTag}' tag to silence these messages.)§r"}]}
        `);
    });
}
export default runCommandChatEval;
