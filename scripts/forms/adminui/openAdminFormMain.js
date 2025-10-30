import * as ms from "@minecraft/server";
import * as msui from "@minecraft/server-ui";
import showConfigureFeaturesFormInternal from "./showConfigureFeaturesFormInternal";
import showPackSettingsFormInternal from "./showPackSettingsFormInternal";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function openAdminFormMain(chatMessage, adminTag, messageHideTag, prefix) {
    ms.system.run(() => {
        var mainForm = new msui.ActionFormData()
            .title('Admin UI')
            .body('Click the approprite button below to go to a new section.')
            .button('Pack Settings')
            .button('Configure Features');
        // .button('Configure Commands');
        // .button('Configure Chat');
        var packSettingsForm = new msui.ActionFormData()
            .title('Pack Settings')
            .body('Click the approprite button below to go to a new section.')
            .button('Reset Pack')
            .button('Rename Association');
        var packSettingsResetPackForm = new msui.MessageFormData()
            .title('Reset Pack')
            .body('Are you sure you want to reset the pack?')
            .button1('NO')
            .button2('YES');
        var packSettingsRenameAssociationForm = new msui.ModalFormData()
            .title('Rename Association')
            .textField('Rename Association', '(Required)', { defaultValue: ms.world.scoreboard.getObjective('dirtletsEssentials:save:association').getParticipants()[0].displayName });
        var configureFeaturesForm = new msui.ActionFormData()
            .title('Configure Features')
            .body('Click the approprite button below to configure the feature that is linked to the button.')
            .button('Join Messages')
            .button('Jukebox+')
            .button('Bottom Bedrock')
            .button('Close Realm (Operators Exempt)')
            .button('Block Logs');
        // .button('Configure Commands');
        var configureFeaturesJoinMessagesForm = new msui.ModalFormData()
            .title('Join Messages')
            .toggle('Enabled', { defaultValue: JSON.parse(ms.world.scoreboard.getObjective('dirtletsEssentials:joinMessages:enabled').getParticipants()[0].displayName) })
            .textField('Enter Message', '(Optional)', { defaultValue: ms.world.scoreboard.getObjective('dirtletsEssentials:joinMessages:text').getParticipants()[0].displayName });
        var configureFeaturesJukeboxPlusForm = new msui.ModalFormData()
            .title('Jukebox+')
            .toggle('Enabled', { defaultValue: JSON.parse(ms.world.scoreboard.getObjective('dirtletsEssentials:jukeboxPlus:enabled').getParticipants()[0].displayName) });
        var configureFeaturesBottomBedrockForm = new msui.ModalFormData()
            .title('Bottom Bedrock')
            .toggle('Overworld', { defaultValue: JSON.parse(ms.world.scoreboard.getObjective('dirtletsEssentials:bottomBedrock:overworld').getParticipants()[0].displayName) })
            .toggle('Nether', { defaultValue: JSON.parse(ms.world.scoreboard.getObjective('dirtletsEssentials:bottomBedrock:nether').getParticipants()[0].displayName) });
        var configureFeaturesCloseRealmForm = new msui.ModalFormData()
            .title('Close Realm (Operators Exempt)')
            .toggle('Enabled', { defaultValue: JSON.parse(ms.world.scoreboard.getObjective('dirtletsEssentials:closeRealm:enabled').getParticipants()[0].displayName) })
            .textField('Enter Reason', '(Optional)', { defaultValue: ms.world.scoreboard.getObjective('dirtletsEssentials:closeRealm:reason').getParticipants()[0].displayName });
        var configureFeaturesBlockLogsForm = new msui.ModalFormData()
            .title('Block Logs')
            .toggle('Enabled', { defaultValue: JSON.parse(ms.world.scoreboard.getObjective('dirtletsEssentials:save:blocklogsenabled').getParticipants()[0].displayName) });
        mainForm.show(chatMessage.sender).then(async (mainFormData) => {
            while (mainFormData && mainFormData.cancelationReason === msui.FormCancelationReason.UserBusy) {
                mainFormData = await mainForm.show(chatMessage.sender);
                await sleep(10);
            }
            if (mainFormData.selection == 0) {
                showPackSettingsFormInternal(chatMessage, packSettingsForm, packSettingsResetPackForm, packSettingsRenameAssociationForm, adminTag, messageHideTag, prefix);
                return;
            }
            if (mainFormData.selection == 1) {
                showConfigureFeaturesFormInternal(chatMessage, configureFeaturesForm, configureFeaturesJoinMessagesForm, configureFeaturesJukeboxPlusForm, configureFeaturesBottomBedrockForm, configureFeaturesCloseRealmForm, configureFeaturesBlockLogsForm, adminTag, messageHideTag, prefix);
                return;
            }
        });
    });
}
export default openAdminFormMain;
