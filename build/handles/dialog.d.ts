/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
import { MapPlayer } from './player';
export declare class DialogButton extends Handle<button> {
    constructor(whichDialog: Dialog, text: string, hotkey?: number, quit?: boolean, score?: boolean);
    static fromHandle(handle: button): DialogButton;
}
export declare class Dialog extends Handle<dialog> {
    constructor();
    addButton(text: string, hotkey?: number, quit?: boolean, score?: boolean): DialogButton;
    clear(): void;
    destroy(): void;
    display(whichPlayer: MapPlayer, flag: boolean): void;
    setMessage(whichMessage: string): void;
    static fromHandle(handle: dialog): Dialog;
}
