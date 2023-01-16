"use strict";
/** @noSelfInFile */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addScriptHook = exports.W3TS_HOOK = exports.hookedConfig = exports.executeHooksConfigAfter = exports.executeHooksConfigBefore = exports.hookedMain = exports.executeHooksMainAfter = exports.executeHooksMainBefore = void 0;
const oldMain = main;
const oldConfig = config;
const hooksMainBefore = [];
const hooksMainAfter = [];
const hooksConfigBefore = [];
const hooksConfigAfter = [];
const executeHooksMainBefore = () => hooksMainBefore.forEach(func => func());
exports.executeHooksMainBefore = executeHooksMainBefore;
const executeHooksMainAfter = () => hooksMainAfter.forEach(func => func());
exports.executeHooksMainAfter = executeHooksMainAfter;
function hookedMain() {
    exports.executeHooksMainBefore();
    oldMain();
    exports.executeHooksMainAfter();
}
exports.hookedMain = hookedMain;
const executeHooksConfigBefore = () => hooksConfigBefore.forEach(func => func());
exports.executeHooksConfigBefore = executeHooksConfigBefore;
const executeHooksConfigAfter = () => hooksConfigAfter.forEach(func => func());
exports.executeHooksConfigAfter = executeHooksConfigAfter;
function hookedConfig() {
    exports.executeHooksConfigBefore();
    oldConfig();
    exports.executeHooksConfigAfter();
}
exports.hookedConfig = hookedConfig;
main = hookedMain;
config = hookedConfig;
var W3TS_HOOK;
(function (W3TS_HOOK) {
    W3TS_HOOK["MAIN_BEFORE"] = "main::before";
    W3TS_HOOK["MAIN_AFTER"] = "main::after";
    W3TS_HOOK["CONFIG_BEFORE"] = "config::before";
    W3TS_HOOK["CONFIG_AFTER"] = "config::after";
})(W3TS_HOOK = exports.W3TS_HOOK || (exports.W3TS_HOOK = {}));
const entryPoints = {
    [W3TS_HOOK.MAIN_BEFORE]: hooksMainBefore,
    [W3TS_HOOK.MAIN_AFTER]: hooksMainAfter,
    [W3TS_HOOK.CONFIG_BEFORE]: hooksConfigBefore,
    [W3TS_HOOK.CONFIG_AFTER]: hooksConfigAfter,
};
function addScriptHook(entryPoint, hook) {
    if (!(entryPoint in entryPoints)) {
        return false;
    }
    entryPoints[entryPoint].push(hook);
    return true;
}
exports.addScriptHook = addScriptHook;
//# sourceMappingURL=index.js.map