/// <reference types="war3-types/core/common" />
import { Color } from '../helper/index';
import { Vec2, Vec3 } from '../math/index';
import { Handle } from './handle';
import { MapPlayer } from './player';
import { Unit } from './unit';
export declare class TextTag extends Handle<texttag> {
    private _text;
    private _size;
    constructor(message: string, pos: Vec3, size: number, color: Color);
    set age(value: number);
    set color(value: Color);
    set fadepoint(value: number);
    set lifespan(value: number);
    set permanent(value: boolean);
    set pos(pos: Vec3);
    set size(value: number);
    set suspended(value: boolean);
    set text(message: string);
    get text(): string;
    set velocity(value: Vec2);
    set visible(value: boolean);
    setVisibleForPlayer(p: MapPlayer, value: boolean): void;
    destroy(): void;
}
export declare function standardTextTagForPlayer(pos: Vec2, text: string, player: MapPlayer): TextTag;
export declare function standardTextTag(pos: Vec2, text: string): TextTag;
export declare function createCriticalStrikeTextTag(u: Unit, damage: number): TextTag;
export declare function createGoldBountyTextTag(pos: Vec2, bounty: number, receiver?: MapPlayer): TextTag;
export declare function createLumberBountyTextTag(pos: Vec2, bounty: number, receiver?: MapPlayer): TextTag;
export declare function createManaBurnTextTag(pos: Vec2, damage: number): void;
export declare function createManaGainTextTag(pos: Vec2, damage: number): void;
export declare function createMissTextTag(origin: Unit | Vec2): TextTag;
