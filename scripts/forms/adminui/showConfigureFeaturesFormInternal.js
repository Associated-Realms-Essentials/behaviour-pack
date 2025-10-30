import * as ms from "@minecraft/server";
import * as msui from "@minecraft/server-ui";
import openAdminFormMain from "../../forms";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
async function showConfigureFeaturesFormInternal(chatMessage, configureFeaturesForm, configureFeaturesJoinMessagesForm, configureFeaturesJukeboxPlusForm, configureFeaturesBottomBedrockForm, configureFeaturesCloseRealmForm, configureFeaturesBlockLogsForm, adminTag, messageHideTag, prefix) {
    configureFeaturesForm.show(chatMessage.sender).then(async (configureFeaturesFormData) => {
        while (configureFeaturesFormData && configureFeaturesFormData.cancelationReason === msui.FormCancelationReason.UserBusy) {
            configureFeaturesFormData = await configureFeaturesForm.show(chatMessage.sender);
            await sleep(10);
        }
        if (configureFeaturesFormData.canceled == true) {
            openAdminFormMain(chatMessage, adminTag, messageHideTag, prefix);
            return;
        }
        if (configureFeaturesFormData.selection == 0) {
            configureFeaturesJoinMessagesForm.show(chatMessage.sender).then(async (configureFeaturesJoinMessagesFormData) => {
                while (configureFeaturesJoinMessagesFormData && configureFeaturesJoinMessagesFormData.cancelationReason === msui.FormCancelationReason.UserBusy) {
                    configureFeaturesJoinMessagesFormData = await configureFeaturesJoinMessagesForm.show(chatMessage.sender);
                    await sleep(10);
                }
                if (configureFeaturesJoinMessagesFormData.canceled == true) {
                    showConfigureFeaturesFormInternal(chatMessage, configureFeaturesForm, configureFeaturesJoinMessagesForm, configureFeaturesJukeboxPlusForm, configureFeaturesBottomBedrockForm, configureFeaturesCloseRealmForm, configureFeaturesBlockLogsForm, adminTag, messageHideTag, prefix);
                    return;
                }
                ms.world.scoreboard.removeObjective('associatedRealmsEssentials:joinMessages:enabled');
                ms.world.scoreboard.addObjective('associatedRealmsEssentials:joinMessages:enabled', 'associatedRealmsEssentials:joinMessages:enabled');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesJoinMessagesFormData.formValues[0]}" "associatedRealmsEssentials:joinMessages:enabled" 0`);
                ms.world.scoreboard.removeObjective('associatedRealmsEssentials:joinMessages:text');
                ms.world.scoreboard.addObjective('associatedRealmsEssentials:joinMessages:text', 'associatedRealmsEssentials:joinMessages:text');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesJoinMessagesFormData.formValues[1]}" "associatedRealmsEssentials:joinMessages:text" 0`);
            });
            return;
        }
        if (configureFeaturesFormData.selection == 1) {
            configureFeaturesJukeboxPlusForm.show(chatMessage.sender).then(async (configureFeaturesJukeboxPlusFormData) => {
                while (configureFeaturesJukeboxPlusFormData && configureFeaturesJukeboxPlusFormData.cancelationReason === msui.FormCancelationReason.UserBusy) {
                    configureFeaturesJukeboxPlusFormData = await configureFeaturesJukeboxPlusForm.show(chatMessage.sender);
                    await sleep(10);
                }
                if (configureFeaturesJukeboxPlusFormData.canceled == true) {
                    showConfigureFeaturesFormInternal(chatMessage, configureFeaturesForm, configureFeaturesJoinMessagesForm, configureFeaturesJukeboxPlusForm, configureFeaturesBottomBedrockForm, configureFeaturesCloseRealmForm, configureFeaturesBlockLogsForm, adminTag, messageHideTag, prefix);
                    return;
                }
                ms.world.scoreboard.removeObjective('associatedRealmsEssentials:jukeboxPlus:enabled');
                ms.world.scoreboard.addObjective('associatedRealmsEssentials:jukeboxPlus:enabled', 'associatedRealmsEssentials:jukeboxPlus:enabled');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesJukeboxPlusFormData.formValues[0]}" "associatedRealmsEssentials:jukeboxPlus:enabled" 0`);
            });
            return;
        }
        if (configureFeaturesFormData.selection == 2) {
            configureFeaturesBottomBedrockForm.show(chatMessage.sender).then(async (configureFeaturesBottomBedrockFormData) => {
                while (configureFeaturesBottomBedrockFormData && configureFeaturesBottomBedrockFormData.cancelationReason === msui.FormCancelationReason.UserBusy) {
                    configureFeaturesBottomBedrockFormData = await configureFeaturesBottomBedrockForm.show(chatMessage.sender);
                    await sleep(10);
                }
                if (configureFeaturesBottomBedrockFormData.canceled == true) {
                    showConfigureFeaturesFormInternal(chatMessage, configureFeaturesForm, configureFeaturesJoinMessagesForm, configureFeaturesJukeboxPlusForm, configureFeaturesBottomBedrockForm, configureFeaturesCloseRealmForm, configureFeaturesBlockLogsForm, adminTag, messageHideTag, prefix);
                    return;
                }
                ms.world.scoreboard.removeObjective('associatedRealmsEssentials:bottomBedrock:overworld');
                ms.world.scoreboard.addObjective('associatedRealmsEssentials:bottomBedrock:overworld', 'associatedRealmsEssentials:bottomBedrock:overworld');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesBottomBedrockFormData.formValues[0]}" "associatedRealmsEssentials:bottomBedrock:overworld" 0`);
                ms.world.scoreboard.removeObjective('associatedRealmsEssentials:bottomBedrock:nether');
                ms.world.scoreboard.addObjective('associatedRealmsEssentials:bottomBedrock:nether', 'associatedRealmsEssentials:bottomBedrock:nether');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesBottomBedrockFormData.formValues[1]}" "associatedRealmsEssentials:bottomBedrock:nether" 0`);
            });
            return;
        }
        if (configureFeaturesFormData.selection == 3) {
            configureFeaturesCloseRealmForm.show(chatMessage.sender).then(async (configureFeaturesCloseRealmFormData) => {
                while (configureFeaturesCloseRealmFormData && configureFeaturesCloseRealmFormData.cancelationReason === msui.FormCancelationReason.UserBusy) {
                    configureFeaturesCloseRealmFormData = await configureFeaturesCloseRealmForm.show(chatMessage.sender);
                    await sleep(10);
                }
                if (configureFeaturesCloseRealmFormData.canceled == true) {
                    showConfigureFeaturesFormInternal(chatMessage, configureFeaturesForm, configureFeaturesJoinMessagesForm, configureFeaturesJukeboxPlusForm, configureFeaturesBottomBedrockForm, configureFeaturesCloseRealmForm, configureFeaturesBlockLogsForm, adminTag, messageHideTag, prefix);
                    return;
                }
                ms.world.scoreboard.removeObjective('associatedRealmsEssentials:closeRealm:enabled');
                ms.world.scoreboard.addObjective('associatedRealmsEssentials:closeRealm:enabled', 'associatedRealmsEssentials:closeRealm:enabled');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesCloseRealmFormData.formValues[0]}" "associatedRealmsEssentials:closeRealm:enabled" 0`);
                ms.world.scoreboard.removeObjective('associatedRealmsEssentials:closeRealm:reason');
                ms.world.scoreboard.addObjective('associatedRealmsEssentials:closeRealm:reason', 'associatedRealmsEssentials:closeRealm:reason');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesCloseRealmFormData.formValues[1]}" "associatedRealmsEssentials:closeRealm:reason" 0`);
            });
            return;
        }
        if (configureFeaturesFormData.selection == 4) {
            configureFeaturesBlockLogsForm.show(chatMessage.sender).then(async (configureFeaturesBlockLogsFormData) => {
                while (configureFeaturesBlockLogsFormData && configureFeaturesBlockLogsFormData.cancelationReason === msui.FormCancelationReason.UserBusy) {
                    configureFeaturesBlockLogsFormData = await configureFeaturesCloseRealmForm.show(chatMessage.sender);
                    await sleep(10);
                }
                if (configureFeaturesBlockLogsFormData.canceled == true) {
                    showConfigureFeaturesFormInternal(chatMessage, configureFeaturesForm, configureFeaturesJoinMessagesForm, configureFeaturesJukeboxPlusForm, configureFeaturesBottomBedrockForm, configureFeaturesCloseRealmForm, configureFeaturesBlockLogsForm, adminTag, messageHideTag, prefix);
                    return;
                }
                ms.world.scoreboard.removeObjective('associatedRealmsEssentials:save:blocklogsenabled');
                ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:blocklogsenabled', 'associatedRealmsEssentials:save:blocklogsenabled');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesBlockLogsFormData.formValues[0]}" "associatedRealmsEssentials:save:blocklogsenabled" 0`);
            });
            return;
        }
    });
}
export default showConfigureFeaturesFormInternal;
