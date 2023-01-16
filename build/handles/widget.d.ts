/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
export declare class Widget extends Handle<widget> {
    get life(): number;
    set life(value: number);
    get x(): number;
    get y(): number;
    static fromEvent(): Widget;
    static fromHandle(handle: widget): Widget;
    static get eventTriggering(): Widget;
    static get eventOrderTarget(): Widget;
}
