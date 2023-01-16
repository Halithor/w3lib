/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
export declare class QuestItem extends Handle<questitem> {
    constructor(whichQuest: Quest);
    setDescription(description: string): void;
    get completed(): boolean;
    set completed(completed: boolean);
}
export declare class Quest extends Handle<quest> {
    constructor();
    get completed(): boolean;
    set completed(completed: boolean);
    get discovered(): boolean;
    set discovered(discovered: boolean);
    get enabled(): boolean;
    set enabled(enabled: boolean);
    get failed(): boolean;
    set failed(failed: boolean);
    get required(): boolean;
    set required(required: boolean);
    addItem(description: string): QuestItem;
    destroy(): void;
    setDescription(description: string): void;
    setIcon(iconPath: string): void;
    setTitle(title: string): void;
    static flashQuestDialogButton(): void;
    static forceQuestDialogUpdate(): void;
    static fromHandle(handle: quest): Quest;
}
