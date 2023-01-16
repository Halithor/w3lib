/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
export declare class Ubersplat extends Handle<ubersplat> {
    constructor(x: number, y: number, name: string, red: number, green: number, blue: number, alpha: number, forcePaused: boolean, noBirthTime: boolean);
    destroy(): void;
    finish(): void;
    render(flag: boolean, always?: boolean): void;
    reset(): void;
    show(flag: boolean): void;
    static fromHandle(handle: ubersplat): Ubersplat;
}
