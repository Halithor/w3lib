import {Trigger, Unit} from '../handles';
import {Event} from './event';

export function whenUnitComesInRange(
  u: Unit,
  range: number
): Event<{entered: Unit}> {
  return new Event(emit => {
    const trg = new Trigger().registerUnitInRange(u, range);
    trg.addAction(() => emit({entered: Unit.eventTriggering}));

    return () => trg.destroy();
  });
}
