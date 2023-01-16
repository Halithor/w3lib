/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Vec2 } from '../math/index';
import { Handle } from './handle';
import { MapPlayer } from './player';
import { Rectangle } from './rect';
import { Unit } from './unit';
import { Widget } from './widget';
export declare class Group extends Handle<group> {
    constructor();
    addGroupFast(addGroup: Group): number;
    addUnit(whichUnit: Unit): boolean;
    clear(): void;
    destroy(): void;
    enumUnitsInRange(pos: Vec2, radius: number, filter: (() => boolean) | null): void;
    enumUnitsInRangeCounted(pos: Vec2, radius: number, filter: (() => boolean) | null, countLimit: number): void;
    enumUnitsInRect(r: Rectangle, filter?: (() => boolean) | null): void;
    enumUnitsInRectCounted(r: Rectangle, filter: (() => boolean) | null, countLimit: number): void;
    enumUnitsOfPlayer(whichPlayer: MapPlayer, filter?: () => boolean): void;
    enumUnitsOfType(unitName: string, filter: (() => boolean) | null): void;
    enumUnitsOfTypeCounted(unitName: string, filter: (() => boolean) | null, countLimit: number): void;
    enumUnitsSelected(whichPlayer: MapPlayer, filter: (() => boolean) | null): void;
    for(callback: () => void): void;
    forEach(callback: (u: Unit) => void): void;
    map<R>(callback: (u: Unit) => R): R[];
    get first(): Unit;
    get size(): number;
    random(): Unit;
    getUnitAt(index: number): Unit;
    hasUnit(whichUnit: Unit): boolean;
    orderCoords(order: string | number, pos: Vec2): void;
    orderImmediate(order: string | number): void;
    orderTarget(order: string | number, targetWidget: Widget | Unit): void;
    removeGroupFast(removeGroup: Group): number;
    removeUnit(whichUnit: Unit): boolean;
    static fromHandle(handle: group): Group;
    static getEnumUnit(): Unit;
    static getFilterUnit(): Unit;
}
/**
 * Construct a group of the provided units.
 */
export declare function groupOf(...units: Unit[]): Group;
export declare function getUnitsInRange(pos: Vec2, radius: number, filter: ((u: Unit) => boolean) | null, collisionSizeFiltering?: boolean): Group;
export declare function forUnitsInRange(pos: Vec2, radius: number, callback: (u: Unit) => void, collisionSizeFiltering?: boolean): void;
export declare function getRandomUnitInRange(pos: Vec2, radius: number, filter: (u: Unit) => boolean, collisionSizeFiltering?: boolean): Unit;
export declare function findNearestUnit(pos: Vec2, range: number, filter: ((u: Unit) => boolean) | null): Unit | null;
export declare function getUnitsInRect(rct: Rectangle, filter?: ((u: Unit) => boolean) | null): Group;
export declare function forUnitsInRect(rct: Rectangle, callback: (u: Unit) => void): void;
export declare function countUnitsInRect(rct: Rectangle): number;
export declare function countUnitsInRange(pos: Vec2, radius: number, collisionSizeFiltering?: boolean): number;
export declare function forUnitsOfPlayer(whichPlayer: MapPlayer, callback: (u: Unit) => void): void;
