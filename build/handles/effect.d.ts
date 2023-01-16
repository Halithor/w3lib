/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Unit } from './unit';
import { Angle, Vec2, Vec3 } from '../math/index';
import { Handle } from './handle';
import { MapPlayer } from './player';
import { Point } from './point';
import { Widget } from './widget';
export declare class Effect extends Handle<effect> {
    constructor(modelName: string, pos: Vec2);
    constructor(modelName: string, targetWidget: Widget, attachPointName: string);
    get scale(): number;
    set scale(scale: number);
    /**
     * Warning: Asynchronous. Can cause desyncs
     */
    get pos(): Vec3;
    set pos(val: Vec3);
    addSubAnimation(subAnim: subanimtype): void;
    clearSubAnimations(): void;
    destroy(): void;
    playAnimation(animType: animtype): void;
    playWithTimeScale(animType: animtype, timeScale: number): void;
    removeSubAnimation(subAnim: subanimtype): void;
    resetScaleMatrix(): void;
    setAlpha(alpha: number): void;
    setColor(red: number, green: number, blue: number): void;
    setColorByPlayer(whichPlayer: MapPlayer): void;
    setHeight(height: number): void;
    setOrientation(yaw: number, pitch: number, roll: number): void;
    setPitch(pitch: number): void;
    setPoint(p: Point): void;
    setRoll(roll: number): void;
    setScaleMatrix(x: number, y: number, z: number): void;
    setTime(value: number): void;
    setTimeScale(timeScale: number): void;
    setYaw(y: number): void;
    static fromHandle(handle: effect): Effect;
}
export declare function flashEffect(path: string, pos: Vec2, scale?: number, angle?: Angle): void;
export declare function flashEffectDuration(path: string, pos: Vec2, duration: number, scale?: number, angle?: Angle): void;
export declare function flashEffectUnit(path: string, target: Unit, attachmentPoint?: string, scale?: number, angle?: Angle): void;
