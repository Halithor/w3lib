/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
import { MapPlayer } from './player';
export declare class GameCache extends Handle<gamecache> {
    readonly filename: string;
    constructor(campaignFile: string);
    flush(): void;
    flushBoolean(missionKey: string, key: string): void;
    flushInteger(missionKey: string, key: string): void;
    flushMission(missionKey: string): void;
    flushNumber(missionKey: string, key: string): void;
    flushString(missionKey: string, key: string): void;
    flushUnit(missionKey: string, key: string): void;
    getBoolean(missionKey: string, key: string): boolean;
    getInteger(missionKey: string, key: string): number;
    getNumber(missionKey: string, key: string): number;
    getString(missionKey: string, key: string): string;
    hasBoolean(missionKey: string, key: string): boolean;
    hasInteger(missionKey: string, key: string): boolean;
    hasNumber(missionKey: string, key: string): boolean;
    hasString(missionKey: string, key: string): boolean;
    restoreUnit(missionKey: string, key: string, forWhichPlayer: MapPlayer, x: number, y: number, face: number): unit;
    save(): boolean;
    store(missionKey: string, key: string, value: number | string | boolean | unit): void;
    syncBoolean(missionKey: string, key: string): void;
    syncInteger(missionKey: string, key: string): void;
    syncNumber(missionKey: string, key: string): void;
    syncString(missionKey: string, key: string): void;
    syncUnit(missionKey: string, key: string): void;
    static fromHandle(handle: gamecache): GameCache;
    static reloadFromDisk(): boolean;
}
