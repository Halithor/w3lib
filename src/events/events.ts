/** @noSelfInFile **/
import {AbilId, ItemId} from '../common';
import {
  Destructable,
  doAfter,
  Item,
  MapPlayer,
  Players,
  Rectangle,
  Region,
  Trigger,
  Unit,
  Widget,
} from '../handles/index';
import {addScriptHook, W3TS_HOOK} from '../hooks/index';
import {vec2, Vec2} from '../math/index';

export interface Subscription {
  unsubscribe(): void;
}

export abstract class Event<T extends any[]> {
  abstract subscribe(handler: (...input: T) => void): Subscription;

  delay(seconds: number): Event<T> {
    const subject = new Subject<T>();
    this.subscribe((...input) => {
      doAfter(seconds, () => subject.emit(...input));
    });
    return subject;
  }

  filter(check: (...input: T) => boolean): Event<T> {
    const subject = new Subject<T>();
    this.subscribe((...input) => {
      if (check(...input)) {
        subject.emit(...input);
      }
    });
    return subject;
  }

  map<V extends any[]>(transformation: (...input: T) => V): Event<V> {
    const subject = new Subject<V>();
    this.subscribe((...input) => {
      subject.emit(...transformation(...input));
    });
    return subject;
  }
}

// Subject is a class that represents an event. The event is fired using the
// `fire` method, which will notify all of the listeners of the event.
export class Subject<T extends any[]> extends Event<T> {
  handlers: {[key: number]: (...input: T) => void} = {};
  count: number = 0;

  emit(...input: T) {
    for (let key in this.handlers) {
      this.handlers[key](...input);
    }
  }

  subscribe(handler: (...input: T) => void): Subscription {
    this.count++;
    const index = this.count;
    this.handlers[index] = handler;
    return {
      unsubscribe: () => {
        this.removeHandler(index);
      },
    };
  }

  private removeHandler(index: number) {
    delete this.handlers[index];
  }
}

// GlobalSubject is a subject that can extract all of the information it needs to
// fire.
export class GlobalSubject<T extends any[]> extends Event<T> {
  private event: Subject<T> = new Subject<T>();
  constructor(readonly extractor: () => T) {
    super();
  }

  emit() {
    const extracted = this.extractor();
    this.event.emit(...extracted);
  }

  subscribe(handler: (...input: T) => void): Subscription {
    return this.event.subscribe(handler);
  }
}

// teh AKA TriggerEventHandler creates an event handler and registers it for a
// provided trigger
function teh<T extends any[]>(trg: Trigger, extractor: () => T) {
  const ge = new GlobalSubject<T>(extractor);
  trg.addAction(() => ge.emit());
  return ge;
}

function setupAnyUnitSubject<T extends any[]>(
  event: playerunitevent,
  handler: GlobalSubject<T>
) {
  const trg = new Trigger().registerAnyUnitEvent(event);
  trg.addAction(() => handler.emit());
}

// Declare all the event handlers here, to be initialized in the pre-main.
const subjectUnitAttacked = new GlobalSubject<[target: Unit, attacker: Unit]>(
  () => {
    return [Unit.fromHandle(GetTriggerUnit()), Unit.fromHandle(GetAttacker())];
  }
);
export const eventUnitAttacked: Event<
  [target: Unit, attacker: Unit]
> = subjectUnitAttacked;

let eventUnitSpellEffect: GlobalSubject<
  [caster: Unit, abilityId: AbilId, target: Unit | Item | Destructable | Vec2]
>;

// Items
const subjectUnitUsesItem = new GlobalSubject<[u: Unit, i: Item]>(() => {
  const u = Unit.fromHandle(GetManipulatingUnit());
  const i = Item.fromHandle(GetManipulatedItem());
  return [u, i];
});
export const eventUnitUsesItem: Event<[u: Unit, i: Item]> = subjectUnitUsesItem;

const subjectUnitAcquiresItem = new GlobalSubject<[u: Unit, i: Item]>(() => {
  return [
    Unit.fromHandle(GetManipulatingUnit()),
    Item.fromHandle(GetManipulatedItem()),
  ];
});
export const eventUnitAcquiresItem: Event<
  [u: Unit, i: Item]
> = subjectUnitAcquiresItem;

const subjectUnitLosesItem = new GlobalSubject<[u: Unit, i: Item]>(() => {
  return [
    Unit.fromHandle(GetManipulatingUnit()),
    Item.fromHandle(GetManipulatedItem()),
  ];
});
export const eventUnitLosesItem: Event<
  [u: Unit, i: Item]
> = subjectUnitLosesItem;

const subjectUnitPawnsItemToShop = new GlobalSubject<
  [seller: Unit, shop: Unit, item: Item]
>(() => {
  return [
    Unit.fromHandle(GetSellingUnit()),
    Unit.fromHandle(GetBuyingUnit()),
    Item.fromHandle(GetSoldItem()),
  ];
});
export const eventUnitPawnsItemToShop: Event<
  [seller: Unit, shop: Unit, item: Item]
> = subjectUnitPawnsItemToShop;

const subjectUnitSellsItemFromShop = new GlobalSubject<
  [shop: Unit, purchaser: Unit, item: Item]
>(() => {
  return [
    Unit.fromHandle(GetSellingUnit()),
    Unit.fromHandle(GetBuyingUnit()),
    Item.fromHandle(GetSoldItem()),
  ];
});
export const eventUnitSellsItemFromShop: Event<
  [shop: Unit, purchaser: Unit, item: Item]
> = subjectUnitSellsItemFromShop;

const subjectUnitItemStacks = new GlobalSubject<
  [u: Unit, source: Item, target: Item, targetPreviousCharges: number]
>(() => {
  return [
    Unit.fromHandle(GetTriggerUnit()),
    Item.fromHandle(BlzGetStackingItemSource()),
    Item.fromHandle(BlzGetStackingItemTarget()),
    BlzGetStackingItemTargetPreviousCharges(),
  ];
});
export const eventUnitItemStacks: Event<
  [u: Unit, source: Item, target: Item, targetPreviousCharges: number]
> = subjectUnitItemStacks;

// Construction
const subjectUnitConstructionStart = new GlobalSubject<[constructing: Unit]>(
  () => {
    return [Unit.fromHandle(GetConstructingStructure())];
  }
);
export const eventUnitConstructionStart: Event<
  [constructing: Unit]
> = subjectUnitConstructionStart;
const subjectUnitConstructionCanceled = new GlobalSubject<[canceled: Unit]>(
  () => {
    return [Unit.fromHandle(GetCancelledStructure())];
  }
);
export const eventUnitConstructionCancel: Event<
  [canceled: Unit]
> = subjectUnitConstructionCanceled;
const subjectUnitConstructionFinish = new GlobalSubject<[constructed: Unit]>(
  () => {
    return [Unit.fromHandle(GetConstructedStructure())];
  }
);
export const eventUnitConstructionFinish: Event<
  [constructed: Unit]
> = subjectUnitConstructionFinish;
let eventUnitUpgradeStart: GlobalSubject<[upgrading: Unit]>;
let eventUnitUpgradeCancel: GlobalSubject<[upgrading: Unit]>;
let eventUnitUpgradeFinish: GlobalSubject<[upgrading: Unit]>;

let eventUnitTrainingFinish: GlobalSubject<[trained: Unit, trainer: Unit]>;

export type DamageInfo = {
  damage: number;
  attackType: attacktype;
  damageType: damagetype;
  weaponType: weapontype;
  isSpell: boolean;
  isMeleeAttack: boolean;
  isRangedAttack: boolean;
};

const subjectAnyUnitDamaged = new GlobalSubject<
  [target: Unit, attacker: Unit, info: DamageInfo]
>(() => {
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
});
export const eventAnyUnitDamaged: Event<
  [target: Unit, attacker: Unit, info: DamageInfo]
> = subjectAnyUnitDamaged;

const subjectAnyUnitDamaging = new GlobalSubject<
  [target: Unit, attacker: Unit, info: DamageInfo]
>(() => {
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
});
export const eventAnyUnitDamaging: Event<
  [target: Unit, attacker: Unit, info: DamageInfo]
> = subjectAnyUnitDamaging;

export const eventAnyUnitDeath = new GlobalSubject<
  [dying: Unit, killer: Unit | undefined]
>(() => {
  const dying = Unit.fromHandle(GetDyingUnit());
  GetKillingUnit();
  const killer = GetKillingUnit()
    ? Unit.fromHandle(GetKillingUnit())
    : undefined;
  return [dying, killer];
});

const eventAnyUnitDecay = new GlobalSubject<[decaying: Unit]>(() => {
  const decaying = Unit.fromHandle(GetDecayingUnit());
  return [decaying];
});

const eventAnyUnitSold = new GlobalSubject<[sold: Unit, seller: Unit]>(() => {
  const sold = Unit.fromHandle(GetSoldUnit());
  const seller = Unit.fromHandle(GetSellingUnit());
  return [sold, seller];
});

// PLAYER EVENTS
let eventAnyPlayerLeaves = new Subject<[p: MapPlayer]>();
const subjectAnyPlayerChat = new GlobalSubject<
  [player: MapPlayer, message: string]
>(() => {
  return [MapPlayer.fromHandle(GetTriggerPlayer()), GetEventPlayerChatString()];
});
export const eventAnyPlayerChat: Event<
  [player: MapPlayer, message: string]
> = subjectAnyPlayerChat;

addScriptHook(W3TS_HOOK.MAIN_BEFORE, () => {
  setupAnyUnitSubject(EVENT_PLAYER_UNIT_ATTACKED, subjectUnitAttacked);

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

  // Item events
  setupAnyUnitSubject(EVENT_PLAYER_UNIT_USE_ITEM, subjectUnitUsesItem);
  setupAnyUnitSubject(EVENT_PLAYER_UNIT_DROP_ITEM, subjectUnitLosesItem);
  setupAnyUnitSubject(EVENT_PLAYER_UNIT_PICKUP_ITEM, subjectUnitAcquiresItem);
  setupAnyUnitSubject(EVENT_PLAYER_UNIT_PAWN_ITEM, subjectUnitPawnsItemToShop);
  setupAnyUnitSubject(
    EVENT_PLAYER_UNIT_SELL_ITEM,
    subjectUnitSellsItemFromShop
  );
  setupAnyUnitSubject(EVENT_PLAYER_UNIT_STACK_ITEM, subjectUnitItemStacks);

  // Construction
  setupAnyUnitSubject(
    EVENT_PLAYER_UNIT_CONSTRUCT_START,
    subjectUnitConstructionStart
  );
  setupAnyUnitSubject(
    EVENT_PLAYER_UNIT_CONSTRUCT_CANCEL,
    subjectUnitConstructionCanceled
  );
  setupAnyUnitSubject(
    EVENT_PLAYER_UNIT_CONSTRUCT_FINISH,
    subjectUnitConstructionFinish
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

  setupAnyUnitSubject(EVENT_PLAYER_UNIT_DAMAGED, subjectAnyUnitDamaged);
  setupAnyUnitSubject(EVENT_PLAYER_UNIT_DAMAGING, subjectAnyUnitDamaging);

  setupAnyUnitSubject(EVENT_PLAYER_UNIT_DEATH, eventAnyUnitDeath);
  setupAnyUnitSubject(EVENT_PLAYER_UNIT_DECAY, eventAnyUnitDecay);
  setupAnyUnitSubject(EVENT_PLAYER_UNIT_SELL, eventAnyUnitSold);

  for (let i = 0; i < bj_MAX_PLAYERS; i++) {
    const p = Players[i];
    const leave = new Trigger();
    leave.registerPlayerEvent(p, EVENT_PLAYER_LEAVE);
    leave.addAction(() => eventAnyPlayerLeaves.emit(p));

    const chat = new Trigger();
    chat.registerPlayerChatEvent(p, '', false);
    chat.addAction(() => subjectAnyPlayerChat.emit());
  }
});

export function onAnyUnitAttacked(
  callback: (target: Unit, attacker: Unit) => void
): Subscription {
  return eventUnitAttacked.subscribe(callback);
}

export function onAnyUnitSpellEffect(
  cb: (
    caster: Unit,
    abilityId: AbilId,
    target: Unit | Item | Destructable | Vec2
  ) => void
) {
  return eventUnitSpellEffect.subscribe(cb);
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
  return handler.subscribe(callback);
}

export function onAnyUnitLeavesRegion(
  region: Region,
  callback: (u: Unit) => void
) {
  const trg = new Trigger().registerLeaveRegion(region.handle, null);
  const handler = teh<[leaving: Unit]>(trg, () => {
    return [Unit.fromHandle(GetLeavingUnit())];
  });
  return handler.subscribe(callback);
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
  eventAnyUnitDamaged.subscribe((target, attacker, info) => {
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
  eventAnyUnitDamaging.subscribe((target, attacker, info) => {
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
  return eventUnitUsesItem.subscribe(cb);
}

export function onAnyUnitConstructionStart(cb: (constructing: Unit) => void) {
  return eventUnitConstructionStart.subscribe(cb);
}

export function onAnyUnitConstructionCancel(cb: (canceled: Unit) => void) {
  return eventUnitConstructionCancel.subscribe(cb);
}

export function onAnyUnitConstructionFinish(cb: (constructed: Unit) => void) {
  return eventUnitConstructionFinish.subscribe(cb);
}

export function onAnyUnitUpgradeStart(cb: (upgrading: Unit) => void) {
  return eventUnitUpgradeStart.subscribe(cb);
}

export function onAnyUnitUpgradeCancel(cb: (upgrading: Unit) => void) {
  return eventUnitUpgradeCancel.subscribe(cb);
}

export function onAnyUnitUpgradeFinish(cb: (upgrading: Unit) => void) {
  return eventUnitUpgradeFinish.subscribe(cb);
}

export function onAnyUnitTrainingFinish(
  cb: (trained: Unit, trainer: Unit) => void
) {
  return eventUnitTrainingFinish.subscribe(cb);
}

export function onAnyUnitDeath(cb: (dying: Unit) => void) {
  return eventAnyUnitDeath.subscribe(cb);
}

export function onAnyUnitDecay(cb: (decaying: Unit) => void) {
  return eventAnyUnitDecay.subscribe(cb);
}

export function onDeath(d: Widget, cb: () => void) {
  const trg = new Trigger().registerDeathEvent(d);
  const handler = teh<[]>(trg, () => {
    return [];
  });
  return handler.subscribe(cb);
}

export function onAnyUnitSellUnit(cb: (sold: Unit, seller: Unit) => void) {
  return eventAnyUnitSold.subscribe(cb);
}

export function onAnyPlayerLeaves(cb: (leaving: MapPlayer) => void) {
  return eventAnyPlayerLeaves.subscribe(cb);
}
