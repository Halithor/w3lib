"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.FogModifier = void 0;
const handle_1 = require("./handle");
class FogModifier extends handle_1.Handle {
    constructor(forWhichPlayer, whichState, centerX, centerY, radius, useSharedVision, afterUnits) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateFogModifierRadius(forWhichPlayer.handle, whichState, centerX, centerY, radius, useSharedVision, afterUnits));
        }
    }
    destroy() {
        DestroyFogModifier(this.handle);
    }
    start() {
        FogModifierStart(this.handle);
    }
    stop() {
        FogModifierStop(this.handle);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    static fromRect(forWhichPlayer, whichState, where, useSharedVision, afterUnits) {
        return this.fromHandle(CreateFogModifierRect(forWhichPlayer.handle, whichState, where.handle, useSharedVision, afterUnits));
    }
}
exports.FogModifier = FogModifier;
//# sourceMappingURL=fogmodifier.js.map