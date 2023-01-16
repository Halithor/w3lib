"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sound = void 0;
const handle_1 = require("./handle");
class Sound extends handle_1.Handle {
    constructor(fileName, looping, is3D, stopWhenOutOfRange, fadeInRate, fadeOutRate, eaxSetting) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateSound(fileName, looping, is3D, stopWhenOutOfRange, fadeInRate, fadeOutRate, eaxSetting));
        }
    }
    get dialogueSpeakerNameKey() {
        return GetDialogueSpeakerNameKey(this.handle);
    }
    set dialogueSpeakerNameKey(speakerName) {
        SetDialogueSpeakerNameKey(this.handle, speakerName);
    }
    get dialogueTextKey() {
        return GetDialogueTextKey(this.handle);
    }
    set dialogueTextKey(dialogueText) {
        SetDialogueTextKey(this.handle, dialogueText);
    }
    get duration() {
        return GetSoundDuration(this.handle);
    }
    set duration(duration) {
        SetSoundDuration(this.handle, duration);
    }
    get loading() {
        return GetSoundIsLoading(this.handle);
    }
    get playing() {
        return GetSoundIsPlaying(this.handle);
    }
    killWhenDone() {
        KillSoundWhenDone(this.handle);
    }
    registerStacked(byPosition, rectWidth, rectHeight) {
        RegisterStackedSound(this.handle, byPosition, rectWidth, rectHeight);
    }
    setChannel(channel) {
        SetSoundChannel(this.handle, channel);
    }
    setConeAngles(inside, outside, outsideVolume) {
        SetSoundConeAngles(this.handle, inside, outside, outsideVolume);
    }
    setConeOrientation(x, y, z) {
        SetSoundConeOrientation(this.handle, x, y, z);
    }
    setDistanceCutoff(cutoff) {
        SetSoundDistanceCutoff(this.handle, cutoff);
    }
    setDistances(minDist, maxDist) {
        SetSoundDistances(this.handle, minDist, maxDist);
    }
    setFacialAnimationFilepath(animationSetFilepath) {
        SetSoundFacialAnimationSetFilepath(this.handle, animationSetFilepath);
    }
    setFacialAnimationGroupLabel(groupLabel) {
        SetSoundFacialAnimationGroupLabel(this.handle, groupLabel);
    }
    setFacialAnimationLabel(animationLabel) {
        SetSoundFacialAnimationLabel(this.handle, animationLabel);
    }
    setParamsFromLabel(soundLabel) {
        SetSoundParamsFromLabel(this.handle, soundLabel);
    }
    setPitch(pitch) {
        SetSoundPitch(this.handle, pitch);
    }
    /**
     * Must be called immediately after starting the sound
     * @param millisecs
     */
    setPlayPosition(millisecs) {
        SetSoundPlayPosition(this.handle, millisecs);
    }
    setPosition(pos) {
        SetSoundPosition(this.handle, pos.x, pos.y, pos.z);
    }
    setVelocity(vel) {
        SetSoundVelocity(this.handle, vel.x, vel.y, vel.z);
    }
    setVolume(volume) {
        SetSoundVolume(this.handle, volume);
    }
    start() {
        StartSound(this.handle);
    }
    stop(killWhenDone, fadeOut) {
        StopSound(this.handle, killWhenDone, fadeOut);
    }
    unregisterStacked(byPosition, rectWidth, rectHeight) {
        UnregisterStackedSound(this.handle, byPosition, rectWidth, rectHeight);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    static getFileDuration(fileName) {
        return GetSoundFileDuration(fileName);
    }
}
exports.Sound = Sound;
//# sourceMappingURL=sound.js.map