import {AbilId} from '../common';
import {Destructable, Item, Region, Trigger, Unit} from '../handles/index';
import {addScriptHook, W3TS_HOOK} from '../hooks/index';
import {vec2, Vec2} from '../math/index';

// EventHandler is a generic class that facilitates the definition of well
// typed event handlers and allows their cancelation. It uses a object to
// store the handlers, instead of an array, to facilitate easy removal of
// registered handlers.
export class EventHandler<T extends any[]> {
  handlers: {[key: number]: (...input: T) => void} = {};
  count: number = 0;

  constructor(readonly extractor: () => T) {}

  handle() {
    const extracted = this.extractor();
    for (let key in this.handlers) {
      this.handlers[key](...extracted);
    }
  }

  addHandler(handler: (...input: T) => void) {
    this.count++;
    const index = this.count;
    this.handlers[index] = handler;
    return {
      cancel: () => {
        this.removeHandler(index);
      },
    };
  }

  removeHandler(index: number) {
    delete this.handlers[index];
  }
}

// teh AKA TriggerEventHandler creates an event handler and registers it for a
// provided trigger
function teh<T extends any[]>(trg: Trigger, extractor: () => T) {
  const handler = new EventHandler(extractor);
  trg.addAction(() => handler.handle());
  return handler;
}

// Declare all the event handlers here, to be initialized in the pre-main.
let pua: EventHandler<[u: Unit, target: Unit]>;
let puse: EventHandler<
  [caster: Unit, abilityId: AbilId, target: Unit | Item | Destructable | Vec2]
>;

export type DamageInfo = {
  damage: number;
  attackType: attacktype;
  damageType: damagetype;
  weaponType: weapontype;
};
let pudamaged: EventHandler<[target: Unit, attacker: Unit, info: DamageInfo]>;

addScriptHook(W3TS_HOOK.MAIN_BEFORE, () => {
  pua = teh<[u: Unit, target: Unit]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED),
    () => {
      return [
        Unit.fromHandle(GetTriggerUnit()),
        Unit.fromHandle(GetAttacker()),
      ];
    }
  );
  puse = teh<
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

  pudamaged = teh<[target: Unit, attacker: Unit, info: DamageInfo]>(
    new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_DAMAGED),
    () => {
      const damage = GetEventDamage();
      const target = Unit.fromHandle(BlzGetEventDamageTarget());
      const attacker = Unit.fromHandle(GetEventDamageSource());
      const damageType = BlzGetEventDamageType();
      const attackType = BlzGetEventAttackType();
      const weaponType = BlzGetEventWeaponType();

      return [target, attacker, {damage, damageType, attackType, weaponType}];
    }
  );
});

export function onAnyUnitAttacked(
  callback: (u: Unit, attacker: Unit) => void
): {cancel: () => void} {
  return pua.addHandler(callback);
}

export function onAnyUnitSpellEffect(
  cb: (
    caster: Unit,
    abilityId: AbilId,
    target: Unit | Item | Destructable | Vec2
  ) => void
) {
  return puse.addHandler(cb);
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
  return handler.addHandler(callback);
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
  pudamaged.addHandler((target, attacker, info) => {
    const updated = cb(target, attacker, info);
    if (updated) {
      BlzSetEventDamage(updated.damage);
      BlzSetEventAttackType(updated.attackType);
      BlzSetEventDamageType(updated.damageType);
      BlzSetEventWeaponType(updated.weaponType);
    }
  });
}
