"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraSetup = exports.Camera = void 0;
const handle_1 = require("./handle");
const point_1 = require("./point");
class Camera {
    constructor() { }
    static set visible(flag) {
        DisplayCineFilter(flag);
    }
    static get visible() {
        return IsCineFilterDisplayed();
    }
    static get boundMinX() {
        return GetCameraBoundMinX();
    }
    static get boundMinY() {
        return GetCameraBoundMinY();
    }
    static get boundMaxX() {
        return GetCameraBoundMaxX();
    }
    static get boundMaxY() {
        return GetCameraBoundMaxY();
    }
    static get targetX() {
        return GetCameraTargetPositionX();
    }
    static get targetY() {
        return GetCameraTargetPositionY();
    }
    static get targetZ() {
        return GetCameraTargetPositionZ();
    }
    static get eyeX() {
        return GetCameraEyePositionX();
    }
    static get eyeY() {
        return GetCameraEyePositionY();
    }
    static get eyeZ() {
        return GetCameraEyePositionZ();
    }
    static get eyePoint() {
        return GetCameraEyePositionLoc();
    }
    static get targetPoint() {
        return point_1.Point.fromHandle(GetCameraTargetPositionLoc());
    }
    static adjustField(whichField, offset, duration) {
        AdjustCameraField(whichField, offset, duration);
    }
    static endCinematicScene() {
        EndCinematicScene();
    }
    static forceCinematicSubtitles(flag) {
        ForceCinematicSubtitles(flag);
    }
    static getMargin(whichMargin) {
        return GetCameraMargin(whichMargin);
    }
    static pan(x, y, zOffsetDest) {
        if (!zOffsetDest) {
            PanCameraTo(x, y);
        }
        else {
            PanCameraToWithZ(x, y, zOffsetDest);
        }
    }
    static panTimed(x, y, duration, zOffsetDest) {
        if (!zOffsetDest) {
            PanCameraToTimed(x, y, duration);
        }
        else {
            PanCameraToTimedWithZ(x, y, zOffsetDest, duration);
        }
    }
    static reset(duration) {
        ResetToGameCamera(duration);
    }
    static setBounds(x1, y1, x2, y2, x3, y3, x4, y4) {
        SetCameraBounds(x1, y1, x2, y2, x3, y3, x4, y4);
    }
    static setCameraOrientController(whichUnit, xOffset, yOffset) {
        SetCameraOrientController(whichUnit, xOffset, yOffset);
    }
    static setCineFilterBlendMode(whichMode) {
        SetCineFilterBlendMode(whichMode);
    }
    static setCineFilterDuration(duration) {
        SetCineFilterDuration(duration);
    }
    static setCineFilterEndColor(red, green, blue, alpha) {
        SetCineFilterEndColor(red, green, blue, alpha);
    }
    static setCineFilterEndUV(minU, minV, maxU, maxV) {
        SetCineFilterEndUV(minU, minV, maxU, maxV);
    }
    static setCineFilterStartColor(red, green, blue, alpha) {
        SetCineFilterStartColor(red, green, blue, alpha);
    }
    static setCineFilterStartUV(minU, minV, maxU, maxV) {
        SetCineFilterStartUV(minU, minV, maxU, maxV);
    }
    static setCineFilterTexMapFlags(whichFlags) {
        SetCineFilterTexMapFlags(whichFlags);
    }
    static setCineFilterTexture(fileName) {
        SetCineFilterTexture(fileName);
    }
    static setCinematicAudio(cinematicAudio) {
        SetCinematicAudio(cinematicAudio);
    }
    static setCinematicCamera(cameraModelFile) {
        SetCinematicCamera(cameraModelFile);
    }
    static SetCinematicScene(portraitUnitId, color, speakerTitle, text, sceneDuration, voiceoverDuration) {
        SetCinematicScene(portraitUnitId, color, speakerTitle, text, sceneDuration, voiceoverDuration);
    }
    static setDepthOfFieldScale(scale) {
        CameraSetDepthOfFieldScale(scale);
    }
    static setField(whichField, value, duration) {
        SetCameraField(whichField, value, duration);
    }
    static setFocalDistance(distance) {
        CameraSetFocalDistance(distance);
    }
    static setPos(x, y) {
        SetCameraPosition(x, y);
    }
    static setRotateMode(x, y, radiansToSweep, duration) {
        SetCameraRotateMode(x, y, radiansToSweep, duration);
    }
    static setSmoothingFactor(factor) {
        CameraSetSmoothingFactor(factor);
    }
    static setSourceNoise(mag, velocity, vertOnly = false) {
        CameraSetSourceNoiseEx(mag, velocity, vertOnly);
    }
    static setTargetController(whichUnit, xOffset, yOffset, inheritOrientation) {
        SetCameraTargetController(whichUnit, xOffset, yOffset, inheritOrientation);
    }
    static setTargetNoise(mag, velocity, vertOnly = false) {
        CameraSetTargetNoiseEx(mag, velocity, vertOnly);
    }
    static stop() {
        StopCamera();
    }
}
exports.Camera = Camera;
class CameraSetup extends handle_1.Handle {
    constructor() {
        super(handle_1.Handle.initFromHandle() ? undefined : CreateCameraSetup());
    }
    get destPoint() {
        return CameraSetupGetDestPositionLoc(this.handle);
    }
    get destX() {
        return CameraSetupGetDestPositionX(this.handle);
    }
    set destX(x) {
        CameraSetupSetDestPosition(this.handle, x, this.destY, 0);
    }
    get destY() {
        return CameraSetupGetDestPositionY(this.handle);
    }
    set destY(y) {
        CameraSetupSetDestPosition(this.handle, this.destX, y, 0);
    }
    set label(label) {
        BlzCameraSetupSetLabel(this.handle, label);
    }
    get label() {
        return BlzCameraSetupGetLabel(this.handle);
    }
    apply(doPan, panTimed) {
        CameraSetupApply(this.handle, doPan, panTimed);
    }
    applyForceDuration(doPan, forceDuration) {
        CameraSetupApplyForceDuration(this.handle, doPan, forceDuration);
    }
    applyForceDurationSmooth(doPan, forcedDuration, easeInDuration, easeOutDuration, smoothFactor) {
        BlzCameraSetupApplyForceDurationSmooth(this.handle, doPan, forcedDuration, easeInDuration, easeOutDuration, smoothFactor);
    }
    applyForceDurationZ(zDestOffset, forceDuration) {
        CameraSetupApplyForceDurationWithZ(this.handle, zDestOffset, forceDuration);
    }
    applyZ(zDestOffset) {
        CameraSetupApplyWithZ(this.handle, zDestOffset);
    }
    getField(whichField) {
        return CameraSetupGetField(this.handle, whichField);
    }
    setDestPos(x, y, duration) {
        CameraSetupSetDestPosition(this.handle, x, y, duration);
    }
    setField(whichField, value, duration) {
        CameraSetupSetField(this.handle, whichField, value, duration);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
}
exports.CameraSetup = CameraSetup;
//# sourceMappingURL=camera.js.map