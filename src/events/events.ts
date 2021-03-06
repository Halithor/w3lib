/** @noSelfInFile **/
import {AbilId} from '../common';
import {
  Destructable,
  Item,
  Rectangle,
  Region,
  Trigger,
  Unit,
  Widget,
} from '../handles/index';
import {addScriptHook, W3TS_HOOK} from '../hooks/index';
import {vec2, Vec2} from '../math/index';

// Event is a class that represents an event. The event is fired using the
// `fire` method, which will notify all of the listeners of the event.
export class Event<T extends any[]> {
  handlers: {[key: number]: (...input: T) => void} = {};
  count: number = 0;

  fire(...input: T) {
    for (let key in this.handlers) {
      this.handlers[key](...input);
    }
  }

  listen(handler: (...input: T) => void) {
    this.count++;
    const index = this.count;
    this.handlers[index] = handler;
    return {
      stop: () => {
        this.removeHandler(index);
      },
    };
  }

  private removeHandler(index: number) {
    delete this.handlers[index];
  }
}

// Global Event is an event that can extract all of the information it needs to
// fire.
export class GlobalEvent<T extends any[]> {
  private event: Event<T> = new Event<T>();
  constructor(readonly extractor: () => T) {}

  fire() {
    const extracted = this.extractor();
    this.event.fire(...extracted);
  }

  listen(handler: (...input: T) => void) {
    return this.event.listen(handler);
  }
}

// teh AKA TriggerEventHandler creates an event handler and registers it for a
// provided trigger
function teh<T extends any[]>(trg: Trigger, extractor: () => T) {
  const ge = new GlobalEvent<T>(extractor);
  trg.addAction(() => ge.fire());
  return ge;
}

function triggerPUEvent<T extends any[]>(
  event: playerunitevent,
  handler: GlobalEvent<T>
) {
  const trg = new Trigger().registerAnyUnitEvent(event);
  trg.addAction(() => handler.fire());
}

// Declare all the event handlers here, to be initialized in the pre-main.
let eventUnitAttacked: GlobalEvent<[u: Unit, target: Unit]>;
let eventUnitDeath: GlobalEvent<[dying: Unit, kiler: Unit]>;
let eventUnitSpellEffect: GlobalEvent<
  [caster: Unit, abilityId: AbilId, target: Unit | Item | Destructable | Vec2]
>;
let eventUnitUsesItem: GlobalEvent<[u: Unit, i: Item]>;
let eventUnitConstructionStart: GlobalEvent<[constructing: Unit]>;
let eventUnitConstructionCancel: GlobalEvent<[canceled: Unit]>;
let eventUnitConstructionFinish: GlobalEvent<[constructed: Unit]>;
let eventUnitUpgradeStart: GlobalEvent<[upgrading: Unit]>;
let eventUnitUpgradeCancel: GlobalEvent<[upgrading: Unit]>;
let eventUnitUpgradeFinish: GlobalEvent<[upgrading: Unit]>;

let eventUnitTrainingFinish: GlobalEvent<[trained: Unit, trainer: Unit]>;

export type DamageInfo = {
  damage: number;
  attackType: attacktype;
  damageType: damagetype;
  weaponType: weapontype;
  isSpell: boolean;
  isMeleeAttack: boolean;
  isRangedAttack: boolean;
};
export let eventAnyUnitDamaged: GlobalEvent<
  [target: Unit, attacker: Unit, info: DamageInfo]
>;
export let eventAnyUnitDamaging: GlobalEvent<
  [target: Unit, attacker: Unit, info: DamageInfo]
>;

export const eventAnyUnitDies = new GlobalEvent<[dying: Unit]>(() => {
  const dying = Unit.fromHandle(GetDyingUnit());
  return [dying];
});

addScriptHook(W3TS_HOOK.MAIN_BEFORE, () => {
  eventUnitAttacked = teh<[u: Unit, target: Unit]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED),
    () => {
      return [
        Unit.fromHandle(GetTriggerUnit()),
        Unit.fromHandle(GetAttacker()),
      ];
    }
  );
  eventUnitSpellEffect = teh<
    [caster: Unit, abilityId: AbilId, target: Unit | Item | Destructable | Vec2]
  >(new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT), () => {
    const caster = Unit.fromHandle(GetSpellAbilityUnit());
    const abilityId = new AbilId(GetSpellAbilityId());

    const u = GetSpellTargetUnit();
    if (u) {
      return [caster, abilityId, Unit.fromHandle(u)];
    }
    const d = GetSpellTargetDestructable();
    if (d) {
      return [caster, abilityId, Destructable.fromHandle(d)];
    }
    const i = GetSpellTargetItem();
    if (i) {
      return [caster, abilityId, Item.fromHandle(i)];
    }
    return [caster, abilityId, vec2(GetSpellTargetX(), GetSpellTargetY())];
  });

  eventUnitUsesItem = teh<[u: Unit, i: Item]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_USE_ITEM),
    () => {
      const u = Unit.fromHandle(GetManipulatingUnit());
      const i = Item.fromHandle(GetManipulatedItem());
      return [u, i];
    }
  );

  eventUnitConstructionStart = teh<[constructing: Unit]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_START),
    () => {
      const constructing = Unit.fromHandle(GetConstructingStructure());
      return [constructing];
    }
  );
  eventUnitConstructionCancel = teh<[canceled: Unit]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_CANCEL),
    () => {
      const canceled = Unit.fromHandle(GetCancelledStructure());
      return [canceled];
    }
  );
  eventUnitConstructionFinish = teh<[constructed: Unit]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_FINISH),
    () => {
      const constructed = Unit.fromHandle(GetConstructedStructure());
      return [constructed];
    }
  );

  eventUnitUpgradeStart = teh<[upgrading: Unit]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_UPGRADE_START),
    () => {
      const upgrading = Unit.fromHandle(GetTriggerUnit());
      return [upgrading];
    }
  );
  eventUnitUpgradeCancel = teh<[upgrading: Unit]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_UPGRADE_CANCEL),
    () => {
      const upgrading = Unit.fromHandle(GetTriggerUnit());
      return [upgrading];
    }
  );
  eventUnitUpgradeFinish = teh<[upgrading: Unit]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_UPGRADE_FINISH),
    () => {
      const upgrading = Unit.fromHandle(GetTriggerUnit());
      return [upgrading];
    }
  );

  eventUnitTrainingFinish = teh<[trained: Unit, trainer: Unit]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_TRAIN_FINISH),
    () => {
      const trained = Unit.fromHandle(GetTrainedUnit());
      const trainer = Unit.fromHandle(GetTriggerUnit());
      return [trained, trainer];
    }
  );

  eventAnyUnitDamaged = teh<[target: Unit, attacker: Unit, info: DamageInfo]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_DAMAGED),
    () => {
      const damage = GetEventDamage();
      const target = Unit.fromHandle(BlzGetEventDamageTarget());
      const attacker = Unit.fromHandle(GetEventDamageSource());
      const damageType = BlzGetEventDamageType();
      const attackType = BlzGetEventAttackType();
      const weaponType = BlzGetEventWeaponType();
      let isSpell = attackType == ATTACK_TYPE_NORMAL;
      let isMeleeAttack = false;
      let isRangedAttack = false;
      // Need to use the damage type and attacker unit types to determine the
      // characteristics of the damage.
      if (damageType == DAMAGE_TYPE_NORMAL && !isSpell) {
        isMeleeAttack = attacker.isUnitType(UNIT_TYPE_MELEE_ATTACKER);
        isRangedAttack = attacker.isUnitType(UNIT_TYPE_RANGED_ATTACKER);
        if (isMeleeAttack && isRangedAttack) {
          isMeleeAttack = weaponType != WEAPON_TYPE_WHOKNOWS;
          isRangedAttack = !isMeleeAttack;
        }
      }
      return [
        target,
        attacker,
        {
          damage,
          damageType,
          attackType,
          weaponType,
          isMeleeAttack,
          isSpell,
          isRangedAttack,
        },
      ];
    }
  );
  eventAnyUnitDamaging = teh<[target: Unit, attacker: Unit, info: DamageInfo]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_DAMAGING),
    () => {
      const damage = GetEventDamage();
      const target = Unit.fromHandle(BlzGetEventDamageTarget());
      const attacker = Unit.fromHandle(GetEventDamageSource());
      const damageType = BlzGetEventDamageType();
      const attackType = BlzGetEventAttackType();
      const weaponType = BlzGetEventWeaponType();
      let isSpell = attackType == ATTACK_TYPE_NORMAL;
      let isMeleeAttack = false;
      let isRangedAttack = false;
      // Need to use the damage type and attacker unit types to determine the
      // characteristics of the damage.
      if (damageType == DAMAGE_TYPE_NORMAL && !isSpell) {
        isMeleeAttack = attacker.isUnitType(UNIT_TYPE_MELEE_ATTACKER);
        isRangedAttack = attacker.isUnitType(UNIT_TYPE_RANGED_ATTACKER);
        if (isMeleeAttack && isRangedAttack) {
          isMeleeAttack = weaponType != WEAPON_TYPE_WHOKNOWS;
          isRangedAttack = !isMeleeAttack;
        }
      }
      return [
        target,
        attacker,
        {
          damage,
          damageType,
          attackType,
          weaponType,
          isMeleeAttack,
          isSpell,
          isRangedAttack,
        },
      ];
    }
  );

  triggerPUEvent(EVENT_PLAYER_UNIT_DEATH, eventAnyUnitDies);
});

export function onAnyUnitAttacked(
  callback: (u: Unit, attacker: Unit) => void
): {stop: () => void} {
  return eventUnitAttacked.listen(callback);
}

export function onAnyUnitSpellEffect(
  cb: (
    caster: Unit,
    abilityId: AbilId,
    target: Unit | Item | Destructable | Vec2
  ) => void
) {
  return eventUnitSpellEffect.listen(cb);
}

export function onAnyUnitEntersRegion(
  region: Region,
  callback: (u: Unit) => void
) {
  // TODO cleanup after cancelation; reuse for the same region
  const trg = new Trigger().registerEnterRegion(region.handle, null);
  const handler = teh<[entered: Unit]>(trg, () => {
    return [Unit.fromHandle(GetEnteringUnit())];
  });
  return handler.listen(callback);
}

export function onAnyUnitLeavesRegion(
  region: Region,
  callback: (u: Unit) => void
) {
  const trg = new Trigger().registerLeaveRegion(region.handle, null);
  const handler = teh<[leaving: Unit]>(trg, () => {
    return [Unit.fromHandle(GetLeavingUnit())];
  });
  return handler.listen(callback);
}

// onAnyUnitDamage registers a callback for whenever a unit recieves damage.
// The callback can optionally return a DamageInfo object, which will be used
// to change the event.
export function onAnyUnitDamaged(
  cb: (
    target: Unit,
    attacker: Unit,
    DamageInfo: DamageInfo
  ) => DamageInfo | void
) {
  eventAnyUnitDamaged.listen((target, attacker, info) => {
    const updated = cb(target, attacker, info);
    if (updated) {
      BlzSetEventDamage(updated.damage);
      BlzSetEventAttackType(updated.attackType);
      BlzSetEventDamageType(updated.damageType);
      BlzSetEventWeaponType(updated.weaponType);
    }
  });
}

export function onAnyUnitDamaging(
  cb: (
    target: Unit,
    attacker: Unit,
    DamageInfo: DamageInfo
  ) => DamageInfo | void
) {
  eventAnyUnitDamaging.listen((target, attacker, info) => {
    const updated = cb(target, attacker, info);
    if (updated) {
      BlzSetEventDamage(updated.damage);
      BlzSetEventAttackType(updated.attackType);
      BlzSetEventDamageType(updated.damageType);
      BlzSetEventWeaponType(updated.weaponType);
    }
  });
}

export function onAnyUnitUseItem(cb: (user: Unit, item: Item) => void) {
  return eventUnitUsesItem.listen(cb);
}

export function onAnyUnitConstructionStart(cb: (constructing: Unit) => void) {
  return eventUnitConstructionStart.listen(cb);
}

export function onAnyUnitConstructionCancel(cb: (canceled: Unit) => void) {
  return eventUnitConstructionCancel.listen(cb);
}

export function onAnyUnitConstructionFinish(cb: (constructed: Unit) => void) {
  return eventUnitConstructionFinish.listen(cb);
}

export function onAnyUnitUpgradeStart(cb: (upgrading: Unit) => void) {
  return eventUnitUpgradeStart.listen(cb);
}

export function onAnyUnitUpgradeCancel(cb: (upgrading: Unit) => void) {
  return eventUnitUpgradeCancel.listen(cb);
}

export function onAnyUnitUpgradeFinish(cb: (upgrading: Unit) => void) {
  return eventUnitUpgradeFinish.listen(cb);
}

export function onAnyUnitTrainingFinish(
  cb: (trained: Unit, trainer: Unit) => void
) {
  return eventUnitTrainingFinish.listen(cb);
}

export function onDeath(d: Widget, cb: () => void) {
  const trg = new Trigger().registerDeathEvent(d);
  const handler = teh<[]>(trg, () => {
    return [];
  });
  return handler.listen(cb);
}
