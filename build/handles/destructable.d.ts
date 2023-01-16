/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Rectangle } from './rect';
import { DestId } from '../common';
import { Angle, Vec2, Vec3 } from '../math/index';
import { Widget } from './widget';
export declare class Destructable extends Widget {
    readonly handle: destructable;
    constructor(destId: DestId, pos: Vec3, face: Angle, scale: number, varation: number);
    set invulnerable(flag: boolean);
    get invulnerable(): boolean;
    get life(): number;
    set life(value: number);
    get maxLife(): number;
    set maxLife(value: number);
    get name(): string;
    get occluderHeight(): number;
    set occluderHeight(value: number);
    get typeId(): DestId;
    get pos(): Vec2;
    destroy(): void;
    heal(life: number, showBirth: boolean): void;
    kill(): void;
    queueAnim(whichAnimation: string): void;
    setAnim(whichAnimation: string): void;
    setAnimSpeed(speedFactor: number): void;
    show(flag: boolean): void;
    gateOpen(): void;
    gateClose(): void;
    gateDestroy(): void;
    static fromEvent(): Destructable;
    static fromHandle(handle: destructable): Destructable;
}
export declare function forDestructablesInRect(rect: Rectangle, callback: (d: Destructable) => void): void;
export declare function forDestructablesInCircle(pos: Vec2, radius: number, callback: (d: Destructable) => void): void;
export declare function killDestructablesInCircle(pos: Vec2, radius: number, callback?: (d: Destructable) => void): void;
export declare function getRandomDestructableInRange(pos: Vec2, radius: number, filter?: (d: Destructable) => boolean): Destructable | undefined;
