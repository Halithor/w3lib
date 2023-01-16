/// <reference types="war3-types/core/common" />
import { AbilId, TechId, UnitId } from '../common';
import { Destructable, Item, MapPlayer, Unit, Widget } from '../handles/index';
import { Vec2 } from '../math/index';
import { Event } from './event';
export declare const eventUnitAttacked: Event<{
    attacked: Unit;
    attacker: Unit;
}>;
export declare const eventUnitRescued: Event<{
    rescued: Unit;
    rescuer: Unit;
}>;
export declare const eventUnitDeath: Event<{
    dying: Unit;
    killer: Unit | undefined;
}>;
export declare const eventUnitDecay: Event<{
    decaying: Unit;
}>;
export declare const eventUnitDetected: Event<{
    detected: Unit;
}>;
export declare const eventUnitHidden: Event<{
    hidden: Unit;
}>;
export declare const eventUnitSelected: Event<{
    selected: Unit;
    selector: MapPlayer;
}>;
export declare const eventUnitDeselected: Event<{
    deselected: Unit;
    selector: MapPlayer;
}>;
export declare const eventUnitConstructionStart: Event<{
    constructing: Unit;
}>;
export declare const eventUnitConstructionCancel: Event<{
    canceled: Unit;
}>;
export declare const eventUnitConstructionFinish: Event<{
    constructed: Unit;
}>;
export declare const eventUnitUpgradeStart: Event<{
    upgrading: Unit;
}>;
export declare const eventUnitUpgradeCancel: Event<{
    canceling: Unit;
}>;
export declare const eventUnitUpgradeFinish: Event<{
    upgraded: Unit;
}>;
export declare const eventUnitTrainingStart: Event<{
    trainer: Unit;
    trainingType: UnitId;
}>;
export declare const eventUnitTrainingCancel: Event<{
    trainer: Unit;
    canceledType: UnitId;
}>;
export declare const eventUnitTrainingFinish: Event<{
    trainer: Unit;
    trained: Unit;
}>;
export declare const eventUnitResearchStart: Event<{
    researcher: Unit;
    research: TechId;
}>;
export declare const eventUnitResearchCancel: Event<{
    researcher: Unit;
    research: TechId;
}>;
export declare const eventUnitResearchFinish: Event<{
    researcher: Unit;
    research: TechId;
}>;
export declare const eventUnitIssuedOrder: Event<{
    ordered: Unit;
    orderId: number;
    order: string;
}>;
export declare const eventUnitIssuedPointOrder: Event<{
    ordered: Unit;
    orderId: number;
    order: string;
    target: Vec2;
}>;
export declare const eventUnitIssuedTargetOrder: Event<{
    ordered: Unit;
    orderId: number;
    order: string;
    target: Widget;
}>;
export declare const eventUnitIssuedUnitOrder: Event<{
    ordered: Unit;
    orderId: number;
    order: string;
    target: Unit;
}>;
export declare const eventUnitHeroLevelUp: Event<{
    hero: Unit;
}>;
export declare const eventUnitHeroLearnsSkill: Event<{
    hero: Unit;
    skill: AbilId;
    skillLevel: number;
}>;
export declare const eventUnitHeroBecomesRevivable: Event<{
    hero: Unit;
}>;
export declare const eventUnitHeroReviveStart: Event<{
    hero: Unit;
}>;
export declare const eventUnitHeroReviveCancel: Event<{
    hero: Unit;
}>;
export declare const eventUnitHeroReviveFinish: Event<{
    hero: Unit;
}>;
export declare const eventUnitSummonsUnit: Event<{
    summoner: Unit;
    summoned: Unit;
}>;
export declare const eventUnitItemDrop: Event<{
    unit: Unit;
    item: Item;
}>;
export declare const eventUnitItemPickup: Event<{
    unit: Unit;
    item: Item;
}>;
export declare const eventUnitItemUse: Event<{
    unit: Unit;
    item: Item;
}>;
export declare const eventUnitLoadedIntoTransport: Event<{
    loaded: Unit;
    transport: Unit;
}>;
export declare type DamageInfo = {
    damage: number;
    attackType: attacktype;
    damageType: damagetype;
    weaponType: weapontype;
    isSpell: boolean;
    isMeleeAttack: boolean;
    isRangedAttack: boolean;
};
export declare const eventUnitDamaged: Event<{
    target: Unit;
    attacker: Unit;
    info: DamageInfo;
}>;
export declare const eventUnitDamaging: Event<{
    target: Unit;
    attacker: Unit;
    info: DamageInfo;
}>;
export declare const eventUnitSold: Event<{
    sold: Unit;
    seller: Unit;
}>;
export declare const eventUnitChangeOwner: Event<{
    unit: Unit;
    previousOwner: MapPlayer;
}>;
export declare const eventUnitSellItemFromShop: Event<{
    shop: Unit;
    buyer: Unit;
    item: Item;
}>;
export declare const eventUnitPawnItem: Event<{
    shop: Unit;
    seller: Unit;
    item: Item;
}>;
export declare const eventUnitStackItem: Event<{
    unit: Unit;
    target: Item;
    source: Item;
    targetPrevCharges: number;
}>;
export declare const eventUnitSpellChannel: Event<{
    caster: Unit;
    abilityId: AbilId;
    ability: ability;
    target: Vec2 | Destructable | Item | Unit;
}>;
export declare const eventUnitSpellCast: Event<{
    caster: Unit;
    abilityId: AbilId;
    ability: ability;
    target: Vec2 | Destructable | Item | Unit;
}>;
export declare const eventUnitSpellEffect: Event<{
    caster: Unit;
    abilityId: AbilId;
    ability: ability;
    target: Vec2 | Destructable | Item | Unit;
}>;
export declare const eventUnitSpellFinish: Event<{
    caster: Unit;
    abilityId: AbilId;
    ability: ability;
    target: Vec2 | Destructable | Item | Unit;
}>;
export declare const eventUnitSpellEndCast: Event<{
    caster: Unit;
    abilityId: AbilId;
    ability: ability;
    target: Vec2 | Destructable | Item | Unit;
}>;
