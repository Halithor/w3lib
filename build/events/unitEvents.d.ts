import { UnitId } from '../common';
import { Unit } from '../handles/index';
import { Event } from './event';
export declare function whenUnitComesInRange(u: Unit, range: number): Event<{
    entered: Unit;
}>;
export declare function whenUnitBuildButtonPressed(builtId: UnitId): Event<{
    builder: Unit;
}>;
