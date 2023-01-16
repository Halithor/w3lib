/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
import { Timer } from './timer';
export declare class TimerDialog extends Handle<timerdialog> {
    constructor(t: Timer);
    get display(): boolean;
    set display(display: boolean);
    destroy(): void;
    setSpeed(speedMultFactor: number): void;
    setTimeRemaining(value: number): void;
    setTitle(title: string): void;
    static fromHandle(handle: timerdialog): TimerDialog;
}
