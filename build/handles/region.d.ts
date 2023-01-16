/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Vec2 } from '../math/index';
import { Handle } from './handle';
import { Rectangle } from './rect';
import { Unit } from './unit';
export declare class Region extends Handle<region> {
    constructor();
    addCell(pos: Vec2): void;
    addRect(r: Rectangle): void;
    clearCell(pos: Vec2): void;
    clearRect(r: Rectangle): void;
    containsCoords(pos: Vec2): boolean;
    containsUnit(whichUnit: Unit): boolean;
    destroy(): void;
    static fromHandle(handle: region): Region;
    static fromRect(rect: rect): Region;
}
