import * as ms from "@minecraft/server";
import * as msui from "@minecraft/server-ui";
import openAdminFormMain from "../../forms";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
async function showPackSettingsFormInternal(chatMessage, packSettingsForm, packSettingsResetPackForm, packSettingsRenameAssociationForm, adminTag, messageHideTag, prefix) {
    packSettingsForm.show(chatMessage.sender).then(async (packSettingsFormData) => {
        while (packSettingsFormData && packSettingsFormData.cancelationReason === msui.FormCancelationReason.UserBusy) {
            packSettingsFormData = await packSettingsForm.show(chatMessage.sender);
            await sleep(10);
        }
        if (packSettingsFormData.canceled == true) {
            openAdminFormMain(chatMessage, adminTag, messageHideTag, prefix);
            return;
        }
        if (packSettingsFormData.selection == 0) {
            packSettingsResetPackForm.show(chatMessage.sender).then(async (packSettingsResetPackFormData) => {
                while (packSettingsResetPackFormData && packSettingsResetPackFormData.cancelationReason === msui.FormCancelationReason.UserBusy) {
                    packSettingsResetPackFormData = await packSettingsResetPackForm.show(chatMessage.sender);
                    await sleep(10);
                }
                if (packSettingsResetPackFormData.canceled == true) {
                    showPackSettingsFormInternal(chatMessage, packSettingsForm, packSettingsResetPackForm, packSettingsRenameAssociationForm, adminTag, messageHideTag, prefix);
                    return;
                }
                if (packSettingsResetPackFormData.selection == 1) {
                    ms.world.scoreboard.getObjectives().forEach(dbItem => {
                        if (dbItem.id.includes('dirtletsEssentials')) {
                            ms.world.scoreboard.removeObjective(dbItem.id);
                        }
                    });
                }
            });
            return;
        }
        if (packSettingsFormData.selection == 1) {
            packSettingsRenameAssociationForm.show(chatMessage.sender).then(async (packSettingsRenameAssociationFormData) => {
                while (packSettingsRenameAssociationFormData && packSettingsRenameAssociationFormData.cancelationReason === msui.FormCancelationReason.UserBusy) {
                    packSettingsRenameAssociationFormData = await packSettingsRenameAssociationForm.show(chatMessage.sender);
                    await sleep(10);
                }
                if (packSettingsRenameAssociationFormData.canceled == true) {
                    showPackSettingsFormInternal(chatMessage, packSettingsForm, packSettingsResetPackForm, packSettingsRenameAssociationForm, adminTag, messageHideTag, prefix);
                    return;
                }
                ms.world.scoreboard.removeObjective('dirtletsEssentials:save:association');
                ms.world.scoreboard.addObjective('dirtletsEssentials:save:association', 'dirtletsEssentials:save:association');
                chatMessage.sender.dimension.runCommand(`scoreboard players set "${packSettingsRenameAssociationFormData.formValues[0]}" "dirtletsEssentials:save:association" 0`);
            });
            return;
        }
    });
}
export default showPackSettingsFormInternal;
