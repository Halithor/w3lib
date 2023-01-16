/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
export declare class Point extends Handle<location> {
    constructor(x: number, y: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    /**
     * This function is asynchronous. The values it returns are not guaranteed synchronous between each player.
     * If you attempt to use it in a synchronous manner, it may cause a desync.
     */
    get z(): number;
    destroy(): void;
    setPosition(x: number, y: number): void;
    static fromHandle(handle: location): Point;
}
