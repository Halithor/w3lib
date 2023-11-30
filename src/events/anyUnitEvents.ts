import {AbilId, AttackType, DamageType, TechId, UnitId} from '../common';
import {
  Destructable,
  Item,
  MapPlayer,
  Trigger,
  Unit,
  Widget,
} from '../handles/index';
import {Vec2, vec2} from '../math/index';
import {Event} from './event';

function unitEvent<T>(event: playerunitevent, extractor: () => T): Event<T> {
  return new Event(emit => {
    const trg = new Trigger().registerAnyUnitEvent(event);

    trg.addAction(() => emit(extractor()));
    return () => {
      trg.destroy();
    };
  });
}

export const eventUnitAttacked = unitEvent(EVENT_PLAYER_UNIT_ATTACKED, () => ({
  attacked: Unit.eventTriggering,
  attacker: Unit.eventAttacker,
}));
export const eventUnitRescued = unitEvent(EVENT_PLAYER_UNIT_RESCUED, () => ({
  rescued: Unit.eventTriggering,
  rescuer: Unit.eventRescuer,
}));
export const eventUnitDeath = unitEvent(EVENT_PLAYER_UNIT_DEATH, () => ({
  dying: Unit.eventDying,
  killer: Unit.eventKilling,
}));
export const eventUnitDecay = unitEvent(EVENT_PLAYER_UNIT_DECAY, () => ({
  decaying: Unit.eventDecaying,
}));
export const eventUnitDetected = unitEvent(EVENT_PLAYER_UNIT_DETECTED, () => ({
  detected: Unit.eventDetected,
}));
export const eventUnitHidden = unitEvent(EVENT_PLAYER_UNIT_HIDDEN, () => ({
  hidden: Unit.eventTriggering,
}));
export const eventUnitSelected = unitEvent(EVENT_PLAYER_UNIT_SELECTED, () => ({
  selected: Unit.eventTriggering,
  selector: MapPlayer.fromEvent(),
}));
export const eventUnitDeselected = unitEvent(
  EVENT_PLAYER_UNIT_DESELECTED,
  () => ({
    deselected: Unit.eventTriggering,
    selector: MapPlayer.fromEvent(),
  })
);
export const eventUnitConstructionStart = unitEvent(
  EVENT_PLAYER_UNIT_CONSTRUCT_START,
  () => ({
    constructing: Unit.eventConstructingStructure,
  })
);
export const eventUnitConstructionCancel = unitEvent(
  EVENT_PLAYER_UNIT_CONSTRUCT_CANCEL,
  () => ({
    canceled: Unit.eventCanceledStructure,
  })
);
export const eventUnitConstructionFinish = unitEvent(
  EVENT_PLAYER_UNIT_CONSTRUCT_FINISH,
  () => ({
    constructed: Unit.eventConstructedStructure,
  })
);
export const eventUnitUpgradeStart = unitEvent(
  EVENT_PLAYER_UNIT_UPGRADE_START,
  () => ({
    upgrading: Unit.eventTriggering,
  })
);
export const eventUnitUpgradeCancel = unitEvent(
  EVENT_PLAYER_UNIT_UPGRADE_CANCEL,
  () => ({
    canceling: Unit.eventTriggering,
  })
);
export const eventUnitUpgradeFinish = unitEvent(
  EVENT_PLAYER_UNIT_UPGRADE_FINISH,
  () => ({
    upgraded: Unit.eventTriggering,
  })
);
export const eventUnitTrainingStart = unitEvent(
  EVENT_PLAYER_UNIT_TRAIN_START,
  () => ({
    trainer: Unit.eventTriggering,
    trainingType: UnitId.of(GetTrainedUnitType()),
  })
);
export const eventUnitTrainingCancel = unitEvent(
  EVENT_PLAYER_UNIT_TRAIN_CANCEL,
  () => ({
    trainer: Unit.eventTriggering,
    canceledType: UnitId.of(GetTrainedUnitType()),
  })
);
export const eventUnitTrainingFinish = unitEvent(
  EVENT_PLAYER_UNIT_TRAIN_FINISH,
  () => ({
    trainer: Unit.eventTriggering,
    trained: Unit.eventTrained,
  })
);
export const eventUnitResearchStart = unitEvent(
  EVENT_PLAYER_UNIT_RESEARCH_START,
  () => ({
    researcher: Unit.eventResearcher,
    research: TechId.of(GetResearched()),
  })
);
export const eventUnitResearchCancel = unitEvent(
  EVENT_PLAYER_UNIT_RESEARCH_CANCEL,
  () => ({
    researcher: Unit.eventResearcher,
    research: TechId.of(GetResearched()),
  })
);
export const eventUnitResearchFinish = unitEvent(
  EVENT_PLAYER_UNIT_RESEARCH_FINISH,
  () => ({
    researcher: Unit.eventResearcher,
    research: TechId.of(GetResearched()),
  })
);
export const eventUnitIssuedOrder = unitEvent(
  EVENT_PLAYER_UNIT_ISSUED_ORDER,
  () => ({
    ordered: Unit.eventOrdered,
    orderId: GetIssuedOrderId(),
    order: OrderId2String(GetIssuedOrderId()),
  })
);
export const eventUnitIssuedPointOrder = unitEvent(
  EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER,
  () => ({
    ordered: Unit.eventOrdered,
    orderId: GetIssuedOrderId(),
    order: OrderId2String(GetIssuedOrderId()),
    target: vec2(GetOrderPointX(), GetOrderPointY()),
  })
);
export const eventUnitIssuedTargetOrder = unitEvent(
  EVENT_PLAYER_UNIT_ISSUED_TARGET_ORDER,
  () => ({
    ordered: Unit.eventOrdered,
    orderId: GetIssuedOrderId(),
    order: OrderId2String(GetIssuedOrderId()),
    target: Widget.eventOrderTarget,
  })
);
export const eventUnitIssuedUnitOrder = unitEvent(
  EVENT_PLAYER_UNIT_ISSUED_UNIT_ORDER,
  () => ({
    ordered: Unit.eventOrdered,
    orderId: GetIssuedOrderId(),
    order: OrderId2String(GetIssuedOrderId()),
    target: Unit.eventOrderTarget,
  })
);
export const eventUnitHeroLevelUp = unitEvent(EVENT_PLAYER_HERO_LEVEL, () => ({
  hero: Unit.eventHeroLeveling,
}));
export const eventUnitHeroLearnsSkill = unitEvent(
  EVENT_PLAYER_HERO_SKILL,
  () => ({
    hero: Unit.eventHeroLearning,
    skill: AbilId.of(GetLearnedSkill()),
    skillLevel: GetLearnedSkillLevel(),
  })
);
export const eventUnitHeroBecomesRevivable = unitEvent(
  EVENT_PLAYER_HERO_REVIVABLE,
  () => ({
    hero: Unit.eventHeroRevivable,
  })
);
export const eventUnitHeroReviveStart = unitEvent(
  EVENT_PLAYER_HERO_REVIVE_START,
  () => ({
    hero: Unit.eventHeroReviving,
  })
);
export const eventUnitHeroReviveCancel = unitEvent(
  EVENT_PLAYER_HERO_REVIVE_CANCEL,
  () => ({
    hero: Unit.eventHeroReviving,
  })
);
export const eventUnitHeroReviveFinish = unitEvent(
  EVENT_PLAYER_HERO_REVIVE_FINISH,
  () => ({
    hero: Unit.eventHeroReviving,
  })
);
export const eventUnitSummonsUnit = unitEvent(EVENT_PLAYER_UNIT_SUMMON, () => ({
  summoner: Unit.eventSummoner,
  summoned: Unit.eventSummoned,
}));
export const eventUnitItemDrop = unitEvent(EVENT_PLAYER_UNIT_DROP_ITEM, () => ({
  unit: Unit.eventManipulating,
  item: Item.eventManipulated,
}));
export const eventUnitItemPickup = unitEvent(
  EVENT_PLAYER_UNIT_PICKUP_ITEM,
  () => ({
    unit: Unit.eventManipulating,
    item: Item.eventManipulated,
  })
);
export const eventUnitItemUse = unitEvent(EVENT_PLAYER_UNIT_USE_ITEM, () => ({
  unit: Unit.eventManipulating,
  item: Item.eventManipulated,
}));
export const eventUnitLoadedIntoTransport = unitEvent(
  EVENT_PLAYER_UNIT_LOADED,
  () => ({
    loaded: Unit.eventLoaded,
    transport: Unit.eventTransport,
  })
);

export type DamageInfo = {
  damage: number;
  attackType: AttackType;
  damageType: DamageType;
  weaponType: weapontype;
  isSpell: boolean;
  isMeleeAttack: boolean;
  isRangedAttack: boolean;
};

export const eventUnitDamaged = unitEvent<{
  target: Unit;
  attacker: Unit;
  info: DamageInfo;
}>(EVENT_PLAYER_UNIT_DAMAGED, () => {
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

  return {
    target,
    attacker,
    info: {
      damage,
      damageType: DamageType.fromType(damageType),
      attackType: AttackType.fromType(attackType),
      weaponType,
      isMeleeAttack,
      isSpell,
      isRangedAttack,
    },
  };
});
export const eventUnitDamaging = unitEvent<{
  target: Unit;
  attacker: Unit;
  info: DamageInfo;
}>(EVENT_PLAYER_UNIT_DAMAGING, () => {
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

  return {
    target,
    attacker,
    info: {
      damage,
      damageType: DamageType.fromType(damageType),
      attackType: AttackType.fromType(attackType),
      weaponType,
      isMeleeAttack,
      isSpell,
      isRangedAttack,
    },
  };
});

export const eventUnitSold = unitEvent(EVENT_PLAYER_UNIT_SELL, () => ({
  sold: Unit.eventSold,
  seller: Unit.eventSeller,
}));
export const eventUnitChangeOwner = unitEvent(
  EVENT_PLAYER_UNIT_CHANGE_OWNER,
  () => ({
    unit: Unit.eventOwnershipChanging,
    previousOwner: MapPlayer.eventPreviousOwner,
  })
);
export const eventUnitSellItemFromShop = unitEvent(
  EVENT_PLAYER_UNIT_SELL_ITEM,
  () => ({
    shop: Unit.eventSeller,
    buyer: Unit.eventBuyer,
    item: Item.eventSold,
  })
);
export const eventUnitPawnItem = unitEvent(EVENT_PLAYER_UNIT_PAWN_ITEM, () => ({
  shop: Unit.eventBuyer,
  seller: Unit.eventSeller,
  item: Item.eventSold,
}));
export const eventUnitStackItem = unitEvent(
  EVENT_PLAYER_UNIT_STACK_ITEM,
  () => ({
    unit: Unit.eventTriggering,
    target: Item.eventStackingTarget,
    source: Item.eventStackingSource,
    targetPrevCharges: BlzGetStackingItemTargetPreviousCharges(),
  })
);

function spellTarget(): Unit | Item | Destructable | Vec2 {
  const u = GetSpellTargetUnit();
  if (u != null) {
    return Unit.fromHandle(u);
  }
  const d = GetSpellTargetDestructable();
  if (d != null) {
    return Destructable.fromHandle(d);
  }
  const i = GetSpellTargetItem();
  if (i != null) {
    return Item.fromHandle(i);
  }
  return vec2(GetSpellTargetX(), GetSpellTargetY());
}

export const eventUnitSpellChannel = unitEvent(
  EVENT_PLAYER_UNIT_SPELL_CHANNEL,
  () => ({
    caster: Unit.eventCaster,
    abilityId: AbilId.of(GetSpellAbilityId()),
    ability: GetSpellAbility(),
    target: spellTarget(),
  })
);
export const eventUnitSpellCast = unitEvent(
  EVENT_PLAYER_UNIT_SPELL_CAST,
  () => ({
    caster: Unit.eventCaster,
    abilityId: AbilId.of(GetSpellAbilityId()),
    ability: GetSpellAbility(),
    target: spellTarget(),
  })
);
export const eventUnitSpellEffect = unitEvent(
  EVENT_PLAYER_UNIT_SPELL_EFFECT,
  () => ({
    caster: Unit.eventCaster,
    abilityId: AbilId.of(GetSpellAbilityId()),
    ability: GetSpellAbility(),
    target: spellTarget(),
  })
);
export const eventUnitSpellFinish = unitEvent(
  EVENT_PLAYER_UNIT_SPELL_FINISH,
  () => ({
    caster: Unit.eventCaster,
    abilityId: AbilId.of(GetSpellAbilityId()),
    ability: GetSpellAbility(),
    target: spellTarget(),
  })
);
export const eventUnitSpellEndCast = unitEvent(
  EVENT_PLAYER_UNIT_SPELL_ENDCAST,
  () => ({
    caster: Unit.eventCaster,
    abilityId: AbilId.of(GetSpellAbilityId()),
    ability: GetSpellAbility(),
    target: spellTarget(),
  })
);
