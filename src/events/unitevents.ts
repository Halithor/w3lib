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

export enum UnitState {
  LIFE,
  MANA,
  MAX_LIFE,
  MAX_MANA,
}

export enum Op {
  EQUAL,
  NOT_EQUAL,
  LESS_THAN,
  LESS_THAN_OR_EQUAL,
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL,
}

export function whenUnitState(
  u: Unit,
  unitState: UnitState,
  operation: Op,
  value: number,
): Event<{ u: Unit }> {
  return new Event((emit) => {
    const trg = new Trigger().registerUnitStateEvent(
      u,
      unitStateConvert(unitState),
      opConvert(operation),
      value,
    );
    trg.addAction(() => emit({ u }));

    return () => trg.destroy();
  });
}

function unitStateConvert(us: UnitState): unitstate {
  switch (us) {
    case UnitState.LIFE:
      return UNIT_STATE_LIFE;
    case UnitState.MANA:
      return UNIT_STATE_MANA;
    case UnitState.MAX_LIFE:
      return UNIT_STATE_MAX_LIFE;
    case UnitState.MAX_MANA:
      return UNIT_STATE_MAX_MANA;
  }
}

function opConvert(operation: Op): limitop {
  switch (operation) {
    case Op.EQUAL:
      return EQUAL;
    case Op.NOT_EQUAL:
      return NOT_EQUAL;
    case Op.LESS_THAN:
      return LESS_THAN;
    case Op.LESS_THAN_OR_EQUAL:
      return LESS_THAN_OR_EQUAL;
    case Op.GREATER_THAN:
      return GREATER_THAN;
    case Op.GREATER_THAN_OR_EQUAL:
      return GREATER_THAN_OR_EQUAL;
  }
}
