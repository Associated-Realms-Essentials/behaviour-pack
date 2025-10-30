import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
function runEventBeforeWatchdogTerminate(res) {
    ms.system.run(() => {
        console.warn(`Watchdog attempted to close the world; Reason: ${res.terminateReason}`);
        res.cancel = true;
    });
}
export default runEventBeforeWatchdogTerminate;
