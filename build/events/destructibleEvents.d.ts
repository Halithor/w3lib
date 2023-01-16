import { Destructable, Unit } from '../handles/index';
import { Event } from './event';
export declare function whenDestructibleDies(destructable: Destructable): Event<{
    killer?: Unit;
}>;
