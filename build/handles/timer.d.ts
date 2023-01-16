/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
export declare function doAfter(timeout: number, callback: () => void): {
    cancel: () => void;
    timer: Timer;
};
export declare function doPeriodically(interval: number, callback: (cancel: () => void) => void, final?: () => void): {
    cancel: () => void;
    timer: Timer;
};
export declare function doPeriodicallyCounted(interval: number, count: number, callback: (cancel: () => void, index: number) => void, final?: () => void): {
    cancel: () => void;
    timer: Timer;
};
export declare class Timer extends Handle<timer> {
    private static freeTimers;
    private static freeTimersCount;
    private freed;
    static get(): Timer;
    release(): void;
    constructor();
    get elapsed(): number;
    get remaining(): number;
    get timeout(): number;
    destroy(): this;
    pause(): this;
    resume(): this;
    start(timeout: number, handlerFunc: () => void): this;
    startPeriodic(timeout: number, handlerFunc: () => void): this;
    static fromExpired(): Timer;
    static fromHandle(handle: timer): Timer;
}
