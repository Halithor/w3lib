/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
import { MapPlayer } from './player';
export declare class Leaderboard extends Handle<leaderboard> {
    constructor();
    addItem(label: string, value: number, p: MapPlayer): void;
    clear(): void;
    destroy(): void;
    display(flag?: boolean): void;
    get displayed(): boolean;
    get itemCount(): number;
    set itemCount(count: number);
    getPlayerIndex(p: MapPlayer): number;
    hasPlayerItem(p: MapPlayer): void;
    removeItem(index: number): void;
    removePlayerItem(p: MapPlayer): void;
    setItemLabel(item: number, label: string): void;
    setItemLabelColor(item: number, red: number, green: number, blue: number, alpha: number): void;
    setItemStyle(item: number, showLabel?: boolean, showValues?: boolean, showIcons?: boolean): void;
    setItemValue(item: number, value: number): void;
    setItemValueColor(item: number, red: number, green: number, blue: number, alpha: number): void;
    setLabelColor(red: number, green: number, blue: number, alpha: number): void;
    setPlayerBoard(p: MapPlayer): void;
    setStyle(showLabel?: boolean, showNames?: boolean, showValues?: boolean, showIcons?: boolean): void;
    setValueColor(red: number, green: number, blue: number, alpha: number): void;
    sortByLabel(asc?: boolean): void;
    sortByPlayer(asc?: boolean): void;
    sortByValue(asc?: boolean): void;
    set label(value: string);
    get label(): string;
    static fromHandle(handle: leaderboard): Leaderboard;
    static fromPlayer(p: MapPlayer): Leaderboard;
}
