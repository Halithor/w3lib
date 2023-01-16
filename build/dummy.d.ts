import { AbilId } from './common';
import { MapPlayer, Widget } from './handles/index';
import { Vec2 } from './math/index';
export declare class Dummy {
    static freeDummies: Dummy[];
    private unit;
    private freed;
    private ability?;
    private constructor();
    static get(owner: MapPlayer, pos: Vec2): Dummy;
    release(): void;
    private setAbility;
    /**
     * Cast an instant ability at the target point for the given player.
     */
    static castImmediate(player: MapPlayer, pos: Vec2, ability: AbilId, order: string | number, level?: number): void;
    static castTarget(player: MapPlayer, pos: Vec2, target: Vec2 | Widget, ability: AbilId, order: string | number, level?: number): boolean;
    static castTargetChannel(player: MapPlayer, pos: Vec2, target: Vec2 | Widget, channelDuration: number, ability: AbilId, order: string | number, level?: number): void;
}
