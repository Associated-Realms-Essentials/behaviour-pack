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
                ms.world.scoreboard.removeObjective('dirtletsEssentials:joinMessages:enabled');
                ms.world.scoreboard.addObjective('dirtletsEssentials:joinMessages:enabled', 'dirtletsEssentials:joinMessages:enabled');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesJoinMessagesFormData.formValues[0]}" "dirtletsEssentials:joinMessages:enabled" 0`);
                ms.world.scoreboard.removeObjective('dirtletsEssentials:joinMessages:text');
                ms.world.scoreboard.addObjective('dirtletsEssentials:joinMessages:text', 'dirtletsEssentials:joinMessages:text');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesJoinMessagesFormData.formValues[1]}" "dirtletsEssentials:joinMessages:text" 0`);
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
                ms.world.scoreboard.removeObjective('dirtletsEssentials:jukeboxPlus:enabled');
                ms.world.scoreboard.addObjective('dirtletsEssentials:jukeboxPlus:enabled', 'dirtletsEssentials:jukeboxPlus:enabled');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesJukeboxPlusFormData.formValues[0]}" "dirtletsEssentials:jukeboxPlus:enabled" 0`);
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
                ms.world.scoreboard.removeObjective('dirtletsEssentials:bottomBedrock:overworld');
                ms.world.scoreboard.addObjective('dirtletsEssentials:bottomBedrock:overworld', 'dirtletsEssentials:bottomBedrock:overworld');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesBottomBedrockFormData.formValues[0]}" "dirtletsEssentials:bottomBedrock:overworld" 0`);
                ms.world.scoreboard.removeObjective('dirtletsEssentials:bottomBedrock:nether');
                ms.world.scoreboard.addObjective('dirtletsEssentials:bottomBedrock:nether', 'dirtletsEssentials:bottomBedrock:nether');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesBottomBedrockFormData.formValues[1]}" "dirtletsEssentials:bottomBedrock:nether" 0`);
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
                ms.world.scoreboard.removeObjective('dirtletsEssentials:closeRealm:enabled');
                ms.world.scoreboard.addObjective('dirtletsEssentials:closeRealm:enabled', 'dirtletsEssentials:closeRealm:enabled');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesCloseRealmFormData.formValues[0]}" "dirtletsEssentials:closeRealm:enabled" 0`);
                ms.world.scoreboard.removeObjective('dirtletsEssentials:closeRealm:reason');
                ms.world.scoreboard.addObjective('dirtletsEssentials:closeRealm:reason', 'dirtletsEssentials:closeRealm:reason');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesCloseRealmFormData.formValues[1]}" "dirtletsEssentials:closeRealm:reason" 0`);
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
                ms.world.scoreboard.removeObjective('dirtletsEssentials:save:blocklogsenabled');
                ms.world.scoreboard.addObjective('dirtletsEssentials:save:blocklogsenabled', 'dirtletsEssentials:save:blocklogsenabled');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${configureFeaturesBlockLogsFormData.formValues[0]}" "dirtletsEssentials:save:blocklogsenabled" 0`);
            });
            return;
        }
    });
}
export default showConfigureFeaturesFormInternal;
