import { MapPlayer } from '../handles/index';
import { Event } from './event';
export declare const eventPlayerChat: Event<{
    player: MapPlayer;
    message: string;
}>;
export declare const eventPlayerLeaves: Event<{
    player: MapPlayer;
}>;
