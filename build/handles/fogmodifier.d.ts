/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
import { MapPlayer } from './player';
import { Rectangle } from './rect';
export declare class FogModifier extends Handle<fogmodifier> {
    constructor(forWhichPlayer: MapPlayer, whichState: fogstate, centerX: number, centerY: number, radius: number, useSharedVision: boolean, afterUnits: boolean);
    destroy(): void;
    start(): void;
    stop(): void;
    static fromHandle(handle: fogmodifier): FogModifier;
    static fromRect(forWhichPlayer: MapPlayer, whichState: fogstate, where: Rectangle, useSharedVision: boolean, afterUnits: boolean): FogModifier;
}
