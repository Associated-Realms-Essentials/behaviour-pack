import * as ms from "@minecraft/server";
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
import openAdminFormMain from './forms/adminui/openAdminFormMain';
export default openAdminFormMain;
