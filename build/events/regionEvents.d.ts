import { Region, Unit } from '../handles/index';
import { Event } from './event';
export declare function whenAnyUnitEntersRegion(region: Region): Event<{
    entered: Unit;
}>;
export declare function whenAnyUnitLeavesRegion(region: Region): Event<{
    leaving: Unit;
}>;
