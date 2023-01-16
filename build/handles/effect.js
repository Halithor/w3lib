"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashEffectUnit = exports.flashEffectDuration = exports.flashEffect = exports.Effect = void 0;
const timer_1 = require("../handles/timer");
const index_1 = require("../math/index");
const handle_1 = require("./handle");
const widget_1 = require("./widget");
class Effect extends handle_1.Handle {
    constructor(modelName, a, b) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else if (a instanceof index_1.Vec2) {
            super(AddSpecialEffect(modelName, a.x, a.y));
        }
        else if (a instanceof widget_1.Widget && b) {
            super(AddSpecialEffectTarget(modelName, a.handle, b));
        }
    }
    get scale() {
        return BlzGetSpecialEffectScale(this.handle);
    }
    set scale(scale) {
        BlzSetSpecialEffectScale(this.handle, scale);
    }
    /**
     * Warning: Asynchronous. Can cause desyncs
     */
    get pos() {
        return index_1.vec3(BlzGetLocalSpecialEffectX(this.handle), BlzGetLocalSpecialEffectY(this.handle), BlzGetLocalSpecialEffectZ(this.handle));
    }
    set pos(val) {
        BlzSetSpecialEffectX(this.handle, val.x);
        BlzSetSpecialEffectY(this.handle, val.y);
        BlzSetSpecialEffectZ(this.handle, val.z);
    }
    addSubAnimation(subAnim) {
        BlzSpecialEffectAddSubAnimation(this.handle, subAnim);
    }
    clearSubAnimations() {
        BlzSpecialEffectClearSubAnimations(this.handle);
    }
    destroy() {
        DestroyEffect(this.handle);
    }
    playAnimation(animType) {
        BlzPlaySpecialEffect(this.handle, animType);
    }
    playWithTimeScale(animType, timeScale) {
        BlzPlaySpecialEffectWithTimeScale(this.handle, animType, timeScale);
    }
    removeSubAnimation(subAnim) {
        BlzSpecialEffectRemoveSubAnimation(this.handle, subAnim);
    }
    resetScaleMatrix() {
        BlzResetSpecialEffectMatrix(this.handle);
    }
    setAlpha(alpha) {
        BlzSetSpecialEffectAlpha(this.handle, alpha);
    }
    setColor(red, green, blue) {
        BlzSetSpecialEffectColor(this.handle, red, green, blue);
    }
    setColorByPlayer(whichPlayer) {
        BlzSetSpecialEffectColorByPlayer(this.handle, whichPlayer.handle);
    }
    setHeight(height) {
        BlzSetSpecialEffectHeight(this.handle, height);
    }
    setOrientation(yaw, pitch, roll) {
        BlzSetSpecialEffectOrientation(this.handle, yaw, pitch, roll);
    }
    setPitch(pitch) {
        BlzSetSpecialEffectPitch(this.handle, pitch);
    }
    setPoint(p) {
        BlzSetSpecialEffectPositionLoc(this.handle, p.handle);
    }
    setRoll(roll) {
        BlzSetSpecialEffectRoll(this.handle, roll);
    }
    setScaleMatrix(x, y, z) {
        BlzSetSpecialEffectMatrixScale(this.handle, x, y, z);
    }
    setTime(value) {
        BlzSetSpecialEffectTime(this.handle, value);
    }
    setTimeScale(timeScale) {
        BlzSetSpecialEffectTimeScale(this.handle, timeScale);
    }
    setYaw(y) {
        BlzSetSpecialEffectYaw(this.handle, y);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
}
exports.Effect = Effect;
function flashEffect(path, pos, scale, angle) {
    let e = AddSpecialEffect(path, pos.x, pos.y);
    if (scale) {
        BlzSetSpecialEffectScale(e, scale);
    }
    if (angle) {
        BlzSetSpecialEffectYaw(e, angle.radians);
    }
    DestroyEffect(e);
}
exports.flashEffect = flashEffect;
function flashEffectDuration(path, pos, duration, scale, angle) {
    let e = AddSpecialEffect(path, pos.x, pos.y);
    if (scale) {
        BlzSetSpecialEffectScale(e, scale);
    }
    if (angle) {
        BlzSetSpecialEffectYaw(e, angle.radians);
    }
    timer_1.doAfter(duration, () => DestroyEffect(e));
}
exports.flashEffectDuration = flashEffectDuration;
function flashEffectUnit(path, target, attachmentPoint = 'origin', scale, angle) {
    const e = new Effect(path, target, attachmentPoint);
    if (scale) {
        e.scale = scale;
    }
    if (angle) {
        e.setYaw(angle.radians);
    }
    e.destroy();
}
exports.flashEffectUnit = flashEffectUnit;
//# sourceMappingURL=effect.js.map