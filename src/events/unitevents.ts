import { UnitId } from "../common";
import { Trigger, Unit } from "../handles/index";
import { Event } from "./event";

export function whenUnitComesInRange(
  u: Unit,
  range: number,
): Event<{ entered: Unit }> {
  return new Event((emit) => {
    const trg = new Trigger().registerUnitInRange(u, range);
    trg.addAction(() => emit({ entered: Unit.eventTriggering }));

    return () => trg.destroy();
  });
}

export function whenUnitBuildButtonPressed(
  builtId: UnitId,
): Event<{ builder: Unit }> {
  return new Event((emit) => {
    const trg = new Trigger().registerBuildCommandEvent(builtId);
    trg.addAction(() => emit({ builder: Unit.eventTriggering }));

    return () => trg.destroy();
  });
}
