"use strict";
/** package common contains types that represent common concepts in warcraft.
 * Multiple classes, rather than type aliasing, are used to allow for
 * `instanceof` calls to work on the constructors.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponSound = exports.DamageType = exports.AttackType = exports.techId = exports.abilId = exports.destId = exports.itemId = exports.unitId = exports.TechId = exports.AbilId = exports.DestId = exports.ItemId = exports.UnitId = exports.getFourCC = void 0;
function getFourCC(num) {
    return string.pack('>I4', num);
}
exports.getFourCC = getFourCC;
// UnitID represents a unit type's identifier.
class UnitId {
    constructor(_value) {
        this._value = _value;
    }
    get value() {
        return this._value;
    }
    get fourCC() {
        return getFourCC(this._value);
    }
    static of(val) {
        if (!this.map[val]) {
            this.map[val] = new UnitId(val);
        }
        return this.map[val];
    }
}
exports.UnitId = UnitId;
UnitId.map = {};
// ItemId represents an item type's identifier.
class ItemId {
    constructor(_value) {
        this._value = _value;
    }
    get value() {
        return this._value;
    }
    get fourCC() {
        return getFourCC(this._value);
    }
    static of(val) {
        if (!this.map[val]) {
            this.map[val] = new ItemId(val);
        }
        return this.map[val];
    }
}
exports.ItemId = ItemId;
ItemId.map = {};
// ItemId represents an destructable type's identifier.
class DestId {
    constructor(_value) {
        this._value = _value;
    }
    get value() {
        return this._value;
    }
    get fourCC() {
        return getFourCC(this._value);
    }
    static of(val) {
        if (!this.map[val]) {
            this.map[val] = new DestId(val);
        }
        return this.map[val];
    }
}
exports.DestId = DestId;
DestId.map = {};
// ItemId represents an destructable type's identifier.
class AbilId {
    constructor(_value) {
        this._value = _value;
    }
    get value() {
        return this._value;
    }
    get fourCC() {
        return getFourCC(this._value);
    }
    static of(val) {
        if (!this.map[val]) {
            this.map[val] = new AbilId(val);
        }
        return this.map[val];
    }
}
exports.AbilId = AbilId;
AbilId.map = {};
// TechId represents an destructable type's identifier.
class TechId {
    constructor(_value) {
        this._value = _value;
    }
    get value() {
        return this._value;
    }
    get fourCC() {
        return getFourCC(this._value);
    }
    static of(val) {
        if (!this.map[val]) {
            this.map[val] = new TechId(val);
        }
        return this.map[val];
    }
}
exports.TechId = TechId;
TechId.map = {};
const unitId = (val) => UnitId.of(FourCC(val));
exports.unitId = unitId;
const itemId = (val) => ItemId.of(FourCC(val));
exports.itemId = itemId;
const destId = (val) => DestId.of(FourCC(val));
exports.destId = destId;
const abilId = (val) => AbilId.of(FourCC(val));
exports.abilId = abilId;
const techId = (val) => TechId.of(FourCC(val));
exports.techId = techId;
class AttackType {
    constructor(value) {
        this.value = value;
    }
    /** Loopup the AttackType for the given unwraped type. */
    static fromType(value) {
        switch (value) {
            case ATTACK_TYPE_MELEE:
                return AttackType.Normal;
            case ATTACK_TYPE_PIERCE:
                return AttackType.Pierce;
            case ATTACK_TYPE_SIEGE:
                return AttackType.Siege;
            case ATTACK_TYPE_CHAOS:
                return AttackType.Chaos;
            case ATTACK_TYPE_MAGIC:
                return AttackType.Magic;
            case ATTACK_TYPE_NORMAL:
                return AttackType.Spells;
        }
        return this.Normal;
    }
}
exports.AttackType = AttackType;
// Standard attack types for units
AttackType.Normal = new AttackType(ATTACK_TYPE_MELEE);
AttackType.Pierce = new AttackType(ATTACK_TYPE_PIERCE);
AttackType.Siege = new AttackType(ATTACK_TYPE_SIEGE);
AttackType.Hero = new AttackType(ATTACK_TYPE_HERO);
AttackType.Chaos = new AttackType(ATTACK_TYPE_CHAOS);
// Magic attack type. Does not affect spell immune, but can hit ethereal units
AttackType.Magic = new AttackType(ATTACK_TYPE_MAGIC);
// Type for spells. Spell damage reduction applies to this type, but requires
// other specific Damage Types to properly work.
AttackType.Spells = new AttackType(ATTACK_TYPE_NORMAL);
class DamageType {
    constructor(value) {
        this.value = value;
    }
}
exports.DamageType = DamageType;
// A physical attack. Reduces the damage dealt based on the target's armor.
DamageType.Physical = new DamageType(DAMAGE_TYPE_NORMAL);
// Enhanced physical types. Ignore defense value.
DamageType.EnhancedPhysical = new DamageType(DAMAGE_TYPE_ENHANCED);
DamageType.Poison = new DamageType(DAMAGE_TYPE_POISON);
DamageType.Disease = new DamageType(DAMAGE_TYPE_DISEASE);
DamageType.Acid = new DamageType(DAMAGE_TYPE_ACID);
DamageType.Demolition = new DamageType(DAMAGE_TYPE_DEMOLITION);
DamageType.SlowPoison = new DamageType(DAMAGE_TYPE_SLOW_POISON);
// Universal damage types. Ignore defense value. Ignores spell immunity UNLESS
// the attack type is spells.
DamageType.Universal = new DamageType(DAMAGE_TYPE_UNIVERSAL);
DamageType.UniversalUnknown = new DamageType(DAMAGE_TYPE_UNKNOWN);
// Magical damage types! Ignores defense value, cannot affect spell immune
// units, and can hit etheral units.
DamageType.MagicCold = new DamageType(DAMAGE_TYPE_COLD);
DamageType.MagicDeath = new DamageType(DAMAGE_TYPE_DEATH);
DamageType.MagicDefensive = new DamageType(DAMAGE_TYPE_DEFENSIVE);
DamageType.MagicDivine = new DamageType(DAMAGE_TYPE_DIVINE);
DamageType.MagicFire = new DamageType(DAMAGE_TYPE_FIRE);
DamageType.MagicForce = new DamageType(DAMAGE_TYPE_FORCE);
DamageType.MagicLightning = new DamageType(DAMAGE_TYPE_LIGHTNING);
DamageType.MagicMind = new DamageType(DAMAGE_TYPE_MIND);
DamageType.MagicPlant = new DamageType(DAMAGE_TYPE_PLANT);
DamageType.MagicShadow = new DamageType(DAMAGE_TYPE_SHADOW_STRIKE);
DamageType.MagicSonic = new DamageType(DAMAGE_TYPE_SONIC);
DamageType.MagicSpiritlink = new DamageType(DAMAGE_TYPE_SPIRIT_LINK);
class WeaponSound {
    constructor(value) {
        this.value = value;
    }
}
exports.WeaponSound = WeaponSound;
WeaponSound.None = new WeaponSound(WEAPON_TYPE_WHOKNOWS);
WeaponSound.MetalChopLight = new WeaponSound(WEAPON_TYPE_METAL_LIGHT_CHOP);
WeaponSound.MetalChopMedium = new WeaponSound(WEAPON_TYPE_METAL_MEDIUM_CHOP);
WeaponSound.MetalChopHeavy = new WeaponSound(WEAPON_TYPE_METAL_HEAVY_CHOP);
WeaponSound.MetalSliceLight = new WeaponSound(WEAPON_TYPE_METAL_LIGHT_SLICE);
WeaponSound.MetalSliceMedium = new WeaponSound(WEAPON_TYPE_METAL_MEDIUM_SLICE);
WeaponSound.MetalSliceHeavy = new WeaponSound(WEAPON_TYPE_METAL_HEAVY_SLICE);
WeaponSound.MetalBashMedium = new WeaponSound(WEAPON_TYPE_METAL_MEDIUM_BASH);
WeaponSound.MetalBashHeavy = new WeaponSound(WEAPON_TYPE_METAL_HEAVY_BASH);
WeaponSound.MetalStabMedium = new WeaponSound(WEAPON_TYPE_METAL_MEDIUM_STAB);
WeaponSound.MetalStabHeavy = new WeaponSound(WEAPON_TYPE_METAL_HEAVY_STAB);
WeaponSound.WoodSliceLight = new WeaponSound(WEAPON_TYPE_WOOD_LIGHT_SLICE);
WeaponSound.WoodSliceMedium = new WeaponSound(WEAPON_TYPE_WOOD_MEDIUM_SLICE);
WeaponSound.WoodSliceHeavy = new WeaponSound(WEAPON_TYPE_WOOD_HEAVY_SLICE);
WeaponSound.WoodBashLight = new WeaponSound(WEAPON_TYPE_WOOD_LIGHT_BASH);
WeaponSound.WoodBashMedium = new WeaponSound(WEAPON_TYPE_WOOD_MEDIUM_BASH);
WeaponSound.WoodBashHeavy = new WeaponSound(WEAPON_TYPE_WOOD_HEAVY_BASH);
WeaponSound.WoodStabLight = new WeaponSound(WEAPON_TYPE_WOOD_LIGHT_STAB);
WeaponSound.WoodStabMedium = new WeaponSound(WEAPON_TYPE_WOOD_MEDIUM_STAB);
WeaponSound.ClawSliceLight = new WeaponSound(WEAPON_TYPE_CLAW_LIGHT_SLICE);
WeaponSound.ClawSliceMedium = new WeaponSound(WEAPON_TYPE_CLAW_MEDIUM_SLICE);
WeaponSound.ClawSliceHeavy = new WeaponSound(WEAPON_TYPE_CLAW_HEAVY_SLICE);
WeaponSound.AxeChopMedium = new WeaponSound(WEAPON_TYPE_AXE_MEDIUM_CHOP);
WeaponSound.RockBashHeavy = new WeaponSound(WEAPON_TYPE_ROCK_HEAVY_BASH);
//# sourceMappingURL=common.js.map