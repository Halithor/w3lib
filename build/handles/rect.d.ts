/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Vec2 } from '../math/index';
import { Handle } from './handle';
export declare class Rectangle extends Handle<rect> {
    constructor(min: Vec2, max: Vec2);
    get centerX(): number;
    get centerY(): number;
    get center(): Vec2;
    get maxX(): number;
    get maxY(): number;
    get minX(): number;
    get minY(): number;
    get min(): Vec2;
    get max(): Vec2;
    destroy(): void;
    contains(pos: Vec2): boolean;
    enumDestructables(filter: boolexpr | (() => boolean) | null, actionFunc: () => void): void;
    enumItems(filter: boolexpr | (() => boolean) | null, actionFunc: () => void): void;
    move(newCenter: Vec2): void;
    setRect(min: Vec2, max: Vec2): void;
    randomPos(): Vec2;
    static fromHandle(handle: rect): Rectangle;
    static getWorldBounds(): Rectangle;
    static getPlayableArea(): Rectangle;
}
