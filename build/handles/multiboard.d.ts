/// <reference types="war3-types/core/common" />
import { Color } from '../helper/index';
import { Handle } from './handle';
export declare class MultiboardItem extends Handle<multiboarditem> {
    constructor(multiboard: Multiboard, row: number, col: number);
    destroy(): void;
    set icon(val: string);
    set text(val: string);
    set textColor(val: Color);
    set width(val: number);
    setStyle(showText: boolean, showIcon: boolean): void;
    static fromHandle(handle: multiboarditem): MultiboardItem;
}
export declare class Multiboard extends Handle<multiboard> {
    private items;
    constructor();
    item(row: number, col: number): MultiboardItem;
    get cols(): number;
    set cols(val: number);
    get rows(): number;
    set rows(val: number);
    get displayed(): boolean;
    set displayed(val: boolean);
    get title(): string;
    set title(val: string);
    set titleColor(val: Color);
    clear(): void;
    destroy(): void;
    minimize(flag: boolean): void;
    minimizedForLocalPlayer(): boolean;
    setAllItemsIcon(iconPath: string): void;
    setAllItemsStyle(showText: boolean, showIcons: boolean): void;
    setAllItemsText(val: string): void;
    setAllItemsTextColor(val: Color): void;
    setAllItemsTextWidth(val: number): void;
    setColWidth(col: number, width: number): void;
    /** Get all items in a column, top to bottom */
    column(col: number): MultiboardItem[];
    private cleanupItems;
    /** Suspend the display of all existing and future multiboards. */
    static supressDisplay(flag: boolean): void;
}
