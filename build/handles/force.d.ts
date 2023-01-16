/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
import { MapPlayer } from './player';
export declare class Force extends Handle<force> {
    constructor();
    addPlayer(whichPlayer: MapPlayer): void;
    clear(): void;
    destroy(): void;
    enumAllies(whichPlayer: MapPlayer, filter: boolexpr): void;
    enumEnemies(whichPlayer: MapPlayer, filter: boolexpr): void;
    enumPlayers(filter: boolexpr): void;
    enumPlayersCounted(filter: boolexpr, countLimit: number): void;
    for(callback: () => void): void;
    forEach(callback: (p: MapPlayer, index: number) => void): void;
    hasPlayer(whichPlayer: MapPlayer): boolean;
    removePlayer(whichPlayer: MapPlayer): void;
    get size(): number;
    static fromHandle(handle: force): Force;
    static get allPlayers(): Force;
}
