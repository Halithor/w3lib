/** @noSelfInFile **/

import { Vec3 } from "../math/index";
import { Handle } from "./handle";

export class Sound extends Handle<sound> {
  constructor(
    fileName: string,
    looping: boolean,
    is3D: boolean,
    stopWhenOutOfRange: boolean,
    fadeInRate: number,
    fadeOutRate: number,
    eaxSetting: string,
  ) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(
        CreateSound(
          fileName,
          looping,
          is3D,
          stopWhenOutOfRange,
          fadeInRate,
          fadeOutRate,
          eaxSetting,
        ),
      );
    }
  }

  public get dialogueSpeakerNameKey() {
    return GetDialogueSpeakerNameKey(this.handle);
  }

  public set dialogueSpeakerNameKey(speakerName: string) {
    SetDialogueSpeakerNameKey(this.handle, speakerName);
  }

  public get dialogueTextKey() {
    return GetDialogueTextKey(this.handle);
  }

  public set dialogueTextKey(dialogueText: string) {
    SetDialogueTextKey(this.handle, dialogueText);
  }

  public get duration() {
    return GetSoundDuration(this.handle);
  }

  public set duration(duration: number) {
    SetSoundDuration(this.handle, duration);
  }

  public get loading() {
    return GetSoundIsLoading(this.handle);
  }

  public get playing() {
    return GetSoundIsPlaying(this.handle);
  }

  public killWhenDone() {
    KillSoundWhenDone(this.handle);
  }

  public registerStacked(
    byPosition: boolean,
    rectWidth: number,
    rectHeight: number,
  ) {
    RegisterStackedSound(this.handle, byPosition, rectWidth, rectHeight);
  }

  public setChannel(channel: number) {
    SetSoundChannel(this.handle, channel);
  }

  public setConeAngles(inside: number, outside: number, outsideVolume: number) {
    SetSoundConeAngles(this.handle, inside, outside, outsideVolume);
  }

  public setConeOrientation(x: number, y: number, z: number) {
    SetSoundConeOrientation(this.handle, x, y, z);
  }

  public setDistanceCutoff(cutoff: number) {
    SetSoundDistanceCutoff(this.handle, cutoff);
  }

  public setDistances(minDist: number, maxDist: number) {
    SetSoundDistances(this.handle, minDist, maxDist);
  }

  public setFacialAnimationFilepath(animationSetFilepath: string) {
    SetSoundFacialAnimationSetFilepath(this.handle, animationSetFilepath);
  }

  public setFacialAnimationGroupLabel(groupLabel: string) {
    SetSoundFacialAnimationGroupLabel(this.handle, groupLabel);
  }

  public setFacialAnimationLabel(animationLabel: string) {
    SetSoundFacialAnimationLabel(this.handle, animationLabel);
  }

  public setParamsFromLabel(soundLabel: string) {
    SetSoundParamsFromLabel(this.handle, soundLabel);
  }

  public setPitch(pitch: number) {
    SetSoundPitch(this.handle, pitch);
  }

  /**
   * Must be called immediately after starting the sound
   * @param millisecs
   */
  public setPlayPosition(millisecs: number) {
    SetSoundPlayPosition(this.handle, millisecs);
  }

  public setPosition(pos: Vec3) {
    SetSoundPosition(this.handle, pos.x, pos.y, pos.z);
  }

  public setVelocity(vel: Vec3) {
    SetSoundVelocity(this.handle, vel.x, vel.y, vel.z);
  }

  public setVolume(volume: number) {
    SetSoundVolume(this.handle, volume);
  }

  public start() {
    StartSound(this.handle);
  }

  public stop(killWhenDone: boolean, fadeOut: boolean) {
    StopSound(this.handle, killWhenDone, fadeOut);
  }

  public unregisterStacked(
    byPosition: boolean,
    rectWidth: number,
    rectHeight: number,
  ) {
    UnregisterStackedSound(this.handle, byPosition, rectWidth, rectHeight);
  }

  public static fromHandle(handle: sound): Sound {
    return this.getObject(handle) as Sound;
  }

  public static getFileDuration(fileName: string) {
    return GetSoundFileDuration(fileName);
  }
}
