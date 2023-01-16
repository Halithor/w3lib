"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventUnitSpellEndCast = exports.eventUnitSpellFinish = exports.eventUnitSpellEffect = exports.eventUnitSpellCast = exports.eventUnitSpellChannel = exports.eventUnitStackItem = exports.eventUnitPawnItem = exports.eventUnitSellItemFromShop = exports.eventUnitChangeOwner = exports.eventUnitSold = exports.eventUnitDamaging = exports.eventUnitDamaged = exports.eventUnitLoadedIntoTransport = exports.eventUnitItemUse = exports.eventUnitItemPickup = exports.eventUnitItemDrop = exports.eventUnitSummonsUnit = exports.eventUnitHeroReviveFinish = exports.eventUnitHeroReviveCancel = exports.eventUnitHeroReviveStart = exports.eventUnitHeroBecomesRevivable = exports.eventUnitHeroLearnsSkill = exports.eventUnitHeroLevelUp = exports.eventUnitIssuedUnitOrder = exports.eventUnitIssuedTargetOrder = exports.eventUnitIssuedPointOrder = exports.eventUnitIssuedOrder = exports.eventUnitResearchFinish = exports.eventUnitResearchCancel = exports.eventUnitResearchStart = exports.eventUnitTrainingFinish = exports.eventUnitTrainingCancel = exports.eventUnitTrainingStart = exports.eventUnitUpgradeFinish = exports.eventUnitUpgradeCancel = exports.eventUnitUpgradeStart = exports.eventUnitConstructionFinish = exports.eventUnitConstructionCancel = exports.eventUnitConstructionStart = exports.eventUnitDeselected = exports.eventUnitSelected = exports.eventUnitHidden = exports.eventUnitDetected = exports.eventUnitDecay = exports.eventUnitDeath = exports.eventUnitRescued = exports.eventUnitAttacked = void 0;
const common_1 = require("../common");
const index_1 = require("../handles/index");
const index_2 = require("../math/index");
const event_1 = require("./event");
function unitEvent(event, extractor) {
    return new event_1.Event(emit => {
        const trg = new index_1.Trigger().registerAnyUnitEvent(event);
        trg.addAction(() => emit(extractor()));
        return () => {
            trg.destroy();
        };
    });
}
exports.eventUnitAttacked = unitEvent(EVENT_PLAYER_UNIT_ATTACKED, () => ({
    attacked: index_1.Unit.eventTriggering,
    attacker: index_1.Unit.eventAttacker,
}));
exports.eventUnitRescued = unitEvent(EVENT_PLAYER_UNIT_RESCUED, () => ({
    rescued: index_1.Unit.eventTriggering,
    rescuer: index_1.Unit.eventRescuer,
}));
exports.eventUnitDeath = unitEvent(EVENT_PLAYER_UNIT_DEATH, () => ({
    dying: index_1.Unit.eventDying,
    killer: index_1.Unit.eventKilling,
}));
exports.eventUnitDecay = unitEvent(EVENT_PLAYER_UNIT_DECAY, () => ({
    decaying: index_1.Unit.eventDecaying,
}));
exports.eventUnitDetected = unitEvent(EVENT_PLAYER_UNIT_DETECTED, () => ({
    detected: index_1.Unit.eventDetected,
}));
exports.eventUnitHidden = unitEvent(EVENT_PLAYER_UNIT_HIDDEN, () => ({
    hidden: index_1.Unit.eventTriggering,
}));
exports.eventUnitSelected = unitEvent(EVENT_PLAYER_UNIT_SELECTED, () => ({
    selected: index_1.Unit.eventTriggering,
    selector: index_1.MapPlayer.fromEvent(),
}));
exports.eventUnitDeselected = unitEvent(EVENT_PLAYER_UNIT_DESELECTED, () => ({
    deselected: index_1.Unit.eventTriggering,
    selector: index_1.MapPlayer.fromEvent(),
}));
exports.eventUnitConstructionStart = unitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_START, () => ({
    constructing: index_1.Unit.eventConstructingStructure,
}));
exports.eventUnitConstructionCancel = unitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_CANCEL, () => ({
    canceled: index_1.Unit.eventCanceledStructure,
}));
exports.eventUnitConstructionFinish = unitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_FINISH, () => ({
    constructed: index_1.Unit.eventConstructedStructure,
}));
exports.eventUnitUpgradeStart = unitEvent(EVENT_PLAYER_UNIT_UPGRADE_START, () => ({
    upgrading: index_1.Unit.eventTriggering,
}));
exports.eventUnitUpgradeCancel = unitEvent(EVENT_PLAYER_UNIT_UPGRADE_CANCEL, () => ({
    canceling: index_1.Unit.eventTriggering,
}));
exports.eventUnitUpgradeFinish = unitEvent(EVENT_PLAYER_UNIT_UPGRADE_FINISH, () => ({
    upgraded: index_1.Unit.eventTriggering,
}));
exports.eventUnitTrainingStart = unitEvent(EVENT_PLAYER_UNIT_TRAIN_START, () => ({
    trainer: index_1.Unit.eventTriggering,
    trainingType: common_1.UnitId.of(GetTrainedUnitType()),
}));
exports.eventUnitTrainingCancel = unitEvent(EVENT_PLAYER_UNIT_TRAIN_CANCEL, () => ({
    trainer: index_1.Unit.eventTriggering,
    canceledType: common_1.UnitId.of(GetTrainedUnitType()),
}));
exports.eventUnitTrainingFinish = unitEvent(EVENT_PLAYER_UNIT_TRAIN_FINISH, () => ({
    trainer: index_1.Unit.eventTriggering,
    trained: index_1.Unit.eventTrained,
}));
exports.eventUnitResearchStart = unitEvent(EVENT_PLAYER_UNIT_RESEARCH_START, () => ({
    researcher: index_1.Unit.eventResearcher,
    research: common_1.TechId.of(GetResearched()),
}));
exports.eventUnitResearchCancel = unitEvent(EVENT_PLAYER_UNIT_RESEARCH_CANCEL, () => ({
    researcher: index_1.Unit.eventResearcher,
    research: common_1.TechId.of(GetResearched()),
}));
exports.eventUnitResearchFinish = unitEvent(EVENT_PLAYER_UNIT_RESEARCH_FINISH, () => ({
    researcher: index_1.Unit.eventResearcher,
    research: common_1.TechId.of(GetResearched()),
}));
exports.eventUnitIssuedOrder = unitEvent(EVENT_PLAYER_UNIT_ISSUED_ORDER, () => ({
    ordered: index_1.Unit.eventOrdered,
    orderId: GetIssuedOrderId(),
    order: OrderId2String(GetIssuedOrderId()),
}));
exports.eventUnitIssuedPointOrder = unitEvent(EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER, () => ({
    ordered: index_1.Unit.eventOrdered,
    orderId: GetIssuedOrderId(),
    order: OrderId2String(GetIssuedOrderId()),
    target: index_2.vec2(GetOrderPointX(), GetOrderPointY()),
}));
exports.eventUnitIssuedTargetOrder = unitEvent(EVENT_PLAYER_UNIT_ISSUED_TARGET_ORDER, () => ({
    ordered: index_1.Unit.eventOrdered,
    orderId: GetIssuedOrderId(),
    order: OrderId2String(GetIssuedOrderId()),
    target: index_1.Widget.eventOrderTarget,
}));
exports.eventUnitIssuedUnitOrder = unitEvent(EVENT_PLAYER_UNIT_ISSUED_UNIT_ORDER, () => ({
    ordered: index_1.Unit.eventOrdered,
    orderId: GetIssuedOrderId(),
    order: OrderId2String(GetIssuedOrderId()),
    target: index_1.Unit.eventOrderTarget,
}));
exports.eventUnitHeroLevelUp = unitEvent(EVENT_PLAYER_HERO_LEVEL, () => ({
    hero: index_1.Unit.eventHeroLeveling,
}));
exports.eventUnitHeroLearnsSkill = unitEvent(EVENT_PLAYER_HERO_SKILL, () => ({
    hero: index_1.Unit.eventHeroLearning,
    skill: common_1.AbilId.of(GetLearnedSkill()),
    skillLevel: GetLearnedSkillLevel(),
}));
exports.eventUnitHeroBecomesRevivable = unitEvent(EVENT_PLAYER_HERO_REVIVABLE, () => ({
    hero: index_1.Unit.eventHeroRevivable,
}));
exports.eventUnitHeroReviveStart = unitEvent(EVENT_PLAYER_HERO_REVIVE_START, () => ({
    hero: index_1.Unit.eventHeroReviving,
}));
exports.eventUnitHeroReviveCancel = unitEvent(EVENT_PLAYER_HERO_REVIVE_CANCEL, () => ({
    hero: index_1.Unit.eventHeroReviving,
}));
exports.eventUnitHeroReviveFinish = unitEvent(EVENT_PLAYER_HERO_REVIVE_FINISH, () => ({
    hero: index_1.Unit.eventHeroReviving,
}));
exports.eventUnitSummonsUnit = unitEvent(EVENT_PLAYER_UNIT_SUMMON, () => ({
    summoner: index_1.Unit.eventSummoner,
    summoned: index_1.Unit.eventSummoned,
}));
exports.eventUnitItemDrop = unitEvent(EVENT_PLAYER_UNIT_DROP_ITEM, () => ({
    unit: index_1.Unit.eventManipulating,
    item: index_1.Item.eventManipulated,
}));
exports.eventUnitItemPickup = unitEvent(EVENT_PLAYER_UNIT_PICKUP_ITEM, () => ({
    unit: index_1.Unit.eventManipulating,
    item: index_1.Item.eventManipulated,
}));
exports.eventUnitItemUse = unitEvent(EVENT_PLAYER_UNIT_USE_ITEM, () => ({
    unit: index_1.Unit.eventManipulating,
    item: index_1.Item.eventManipulated,
}));
exports.eventUnitLoadedIntoTransport = unitEvent(EVENT_PLAYER_UNIT_LOADED, () => ({
    loaded: index_1.Unit.eventLoaded,
    transport: index_1.Unit.eventTransport,
}));
exports.eventUnitDamaged = unitEvent(EVENT_PLAYER_UNIT_DAMAGED, () => {
    const damage = GetEventDamage();
    const target = index_1.Unit.fromHandle(BlzGetEventDamageTarget());
    const attacker = index_1.Unit.fromHandle(GetEventDamageSource());
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
            damageType,
            attackType,
            weaponType,
            isMeleeAttack,
            isSpell,
            isRangedAttack,
        },
    };
});
exports.eventUnitDamaging = unitEvent(EVENT_PLAYER_UNIT_DAMAGING, () => {
    const damage = GetEventDamage();
    const target = index_1.Unit.fromHandle(BlzGetEventDamageTarget());
    const attacker = index_1.Unit.fromHandle(GetEventDamageSource());
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
            damageType,
            attackType,
            weaponType,
            isMeleeAttack,
            isSpell,
            isRangedAttack,
        },
    };
});
exports.eventUnitSold = unitEvent(EVENT_PLAYER_UNIT_SELL, () => ({
    sold: index_1.Unit.eventSold,
    seller: index_1.Unit.eventSeller,
}));
exports.eventUnitChangeOwner = unitEvent(EVENT_PLAYER_UNIT_CHANGE_OWNER, () => ({
    unit: index_1.Unit.eventOwnershipChanging,
    previousOwner: index_1.MapPlayer.eventPreviousOwner,
}));
exports.eventUnitSellItemFromShop = unitEvent(EVENT_PLAYER_UNIT_SELL_ITEM, () => ({
    shop: index_1.Unit.eventSeller,
    buyer: index_1.Unit.eventBuyer,
    item: index_1.Item.eventSold,
}));
exports.eventUnitPawnItem = unitEvent(EVENT_PLAYER_UNIT_PAWN_ITEM, () => ({
    shop: index_1.Unit.eventBuyer,
    seller: index_1.Unit.eventSeller,
    item: index_1.Item.eventSold,
}));
exports.eventUnitStackItem = unitEvent(EVENT_PLAYER_UNIT_STACK_ITEM, () => ({
    unit: index_1.Unit.eventTriggering,
    target: index_1.Item.eventStackingTarget,
    source: index_1.Item.eventStackingSource,
    targetPrevCharges: BlzGetStackingItemTargetPreviousCharges(),
}));
function spellTarget() {
    const u = GetSpellTargetUnit();
    if (u) {
        return index_1.Unit.fromHandle(u);
    }
    const d = GetSpellTargetDestructable();
    if (d) {
        return index_1.Destructable.fromHandle(d);
    }
    const i = GetSpellTargetItem();
    if (i) {
        return index_1.Item.fromHandle(i);
    }
    return index_2.vec2(GetSpellTargetX(), GetSpellTargetY());
}
exports.eventUnitSpellChannel = unitEvent(EVENT_PLAYER_UNIT_SPELL_CHANNEL, () => ({
    caster: index_1.Unit.eventCaster,
    abilityId: common_1.AbilId.of(GetSpellAbilityId()),
    ability: GetSpellAbility(),
    target: spellTarget(),
}));
exports.eventUnitSpellCast = unitEvent(EVENT_PLAYER_UNIT_SPELL_CAST, () => ({
    caster: index_1.Unit.eventCaster,
    abilityId: common_1.AbilId.of(GetSpellAbilityId()),
    ability: GetSpellAbility(),
    target: spellTarget(),
}));
exports.eventUnitSpellEffect = unitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT, () => ({
    caster: index_1.Unit.eventCaster,
    abilityId: common_1.AbilId.of(GetSpellAbilityId()),
    ability: GetSpellAbility(),
    target: spellTarget(),
}));
exports.eventUnitSpellFinish = unitEvent(EVENT_PLAYER_UNIT_SPELL_FINISH, () => ({
    caster: index_1.Unit.eventCaster,
    abilityId: common_1.AbilId.of(GetSpellAbilityId()),
    ability: GetSpellAbility(),
    target: spellTarget(),
}));
exports.eventUnitSpellEndCast = unitEvent(EVENT_PLAYER_UNIT_SPELL_ENDCAST, () => ({
    caster: index_1.Unit.eventCaster,
    abilityId: common_1.AbilId.of(GetSpellAbilityId()),
    ability: GetSpellAbility(),
    target: spellTarget(),
}));
//# sourceMappingURL=anyUnitEvents.js.map