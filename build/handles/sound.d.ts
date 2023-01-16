/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Vec3 } from '../math/index';
import { Handle } from './handle';
export declare class Sound extends Handle<sound> {
    constructor(fileName: string, looping: boolean, is3D: boolean, stopWhenOutOfRange: boolean, fadeInRate: number, fadeOutRate: number, eaxSetting: string);
    get dialogueSpeakerNameKey(): string;
    set dialogueSpeakerNameKey(speakerName: string);
    get dialogueTextKey(): string;
    set dialogueTextKey(dialogueText: string);
    get duration(): number;
    set duration(duration: number);
    get loading(): boolean;
    get playing(): boolean;
    killWhenDone(): void;
    registerStacked(byPosition: boolean, rectWidth: number, rectHeight: number): void;
    setChannel(channel: number): void;
    setConeAngles(inside: number, outside: number, outsideVolume: number): void;
    setConeOrientation(x: number, y: number, z: number): void;
    setDistanceCutoff(cutoff: number): void;
    setDistances(minDist: number, maxDist: number): void;
    setFacialAnimationFilepath(animationSetFilepath: string): void;
    setFacialAnimationGroupLabel(groupLabel: string): void;
    setFacialAnimationLabel(animationLabel: string): void;
    setParamsFromLabel(soundLabel: string): void;
    setPitch(pitch: number): void;
    /**
     * Must be called immediately after starting the sound
     * @param millisecs
     */
    setPlayPosition(millisecs: number): void;
    setPosition(pos: Vec3): void;
    setVelocity(vel: Vec3): void;
    setVolume(volume: number): void;
    start(): void;
    stop(killWhenDone: boolean, fadeOut: boolean): void;
    unregisterStacked(byPosition: boolean, rectWidth: number, rectHeight: number): void;
    static fromHandle(handle: sound): Sound;
    static getFileDuration(fileName: string): number;
}
