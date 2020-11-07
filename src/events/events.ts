import {Destructable, Item, Trigger, Unit, Widget} from '../handles';
import {vec2, Vec2} from '../math';

// EventHandler is a generic class that facilitates the definition of well
// typed event handlers and allows their cancelation. It uses a object to
// store the handlers, instead of an array, to facilitate easy removal of
// registered handlers.
class EventHandler<T extends any[]> {
  handlers: {[key: number]: (...input: T) => void} = {};
  count: number = 0;

  constructor(readonly trg: Trigger, readonly extractor: () => T) {
    trg.addAction(() => this.handle());
  }

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

const pua = new EventHandler<[u: Unit, target: Unit]>(
  new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED),
  () => {
    return [Unit.fromHandle(GetTriggerUnit()), Unit.fromHandle(GetAttacker())];
  }
);
export function onPlayerUnitAttacked(
  callback: (u: Unit, attacker: Unit) => void
): {cancel: () => void} {
  return pua.addHandler(callback);
}

const puse = new EventHandler<
  [caster: Unit, abilityId: number, target: Unit | Item | Destructable | Vec2]
>(new Trigger().registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT), () => {
  const caster = Unit.fromHandle(GetSpellAbilityUnit());
  const abilityId = GetSpellAbilityId();

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
export const onAnyUnitSpellEffect = puse.addHandler;
