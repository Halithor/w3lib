import { Region, Trigger, Unit } from "../handles/index";
import { Event } from "./event";

export function whenAnyUnitEntersRegion(
  region: Region,
): Event<{ entered: Unit }> {
  return new Event((emit) => {
    const trg = new Trigger().registerEnterRegion(region.handle, null);
    trg.addAction(() => emit({ entered: Unit.eventEnteringRegion }));

    return () => trg.destroy();
  });
}

export function whenAnyUnitLeavesRegion(
  region: Region,
): Event<{ leaving: Unit }> {
  return new Event((emit) => {
    const trg = new Trigger().registerEnterRegion(region.handle, null);
    trg.addAction(() => emit({ leaving: Unit.eventLeavingRegion }));

    return () => trg.destroy();
  });
}
