import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runCommandChatAfk(chatMessage, adminTag, messageHideTag, prefix) {
    ms.system.run(() => {
        function sendCommandMessageForInitiatorAndAdmins(colorOfText, theMessage, hideName = false, hideTip = false, hideAssociation = false, bypassAdminHide = false) {
            ms.world.getAllPlayers().forEach(player => {
                if (player.name == chatMessage.sender.name) {
                    let associationText = `§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> `;
                    if (hideAssociation == true) {
                        associationText = "";
                    }
                    player.sendMessage(`${associationText}§r§l${colorOfText}${theMessage}§r`);
                }
            });
            ms.world.getAllPlayers().forEach(player => {
                if (player.hasTag(adminTag)) {
                    if (player.hasTag(messageHideTag)) {
                        if (bypassAdminHide == true) {
                            if (player.name !== chatMessage.sender.name) {
                                let nameText = chatMessage.sender.name + " > ";
                                let associationText = `§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> `;
                                if (hideName == true) {
                                    nameText = "";
                                }
                                if (hideAssociation == true) {
                                    associationText = "";
                                }
                                player.sendMessage(`${associationText}§r§l${colorOfText}${nameText}${theMessage}§r`);
                            }
                        }
                        return;
                    }
                    if (player.name !== chatMessage.sender.name) {
                        let tipText = "\n§r(give yourself the \"" + messageHideTag + "\" tag to silence these messages.)";
                        let nameText = chatMessage.sender.name + " > ";
                        let associationText = `§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> `;
                        if (hideName == true) {
                            nameText = "";
                        }
                        if (hideTip == true) {
                            tipText = "";
                        }
                        if (hideAssociation == true) {
                            associationText = "";
                        }
                        player.sendMessage(`${associationText}§r§l${colorOfText}${nameText}${theMessage}${tipText}§r`);
                    }
                }
            });
        }
        function sendCommandMessageForAll(theMessage) {
            ms.world.sendMessage(`§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l${theMessage}§r`);
        }
        ms.system.run(() => {
            if (chatMessage.sender.hasTag('afk1')) {
                chatMessage.sender.removeTag('afk1');
                sendCommandMessageForInitiatorAndAdmins("§6", "You are §cno longer§6 AFK.");
                chatMessage.sender.runCommand('inputpermission set @s movement enabled');
            }
            else {
                chatMessage.sender.addTag('afk1');
                sendCommandMessageForInitiatorAndAdmins("§6", "You are §anow§6 AFK.");
            }
        });
    });
}
export default runCommandChatAfk;
