import {Destructable, Trigger, Unit} from '../handles/index';
import {Event} from './event';

export function whenDestructibleDies(
  destructable: Destructable
): Event<{killer?: Unit}> {
  return new Event(emit => {
    const trg = new Trigger().registerDeathEvent(destructable);
    trg.addAction(() => emit({killer: Unit.eventKilling}));

    return () => trg.destroy();
  });
}
