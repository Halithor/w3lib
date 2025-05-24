/** package common contains types that represent common concepts in warcraft.
 * Multiple classes, rather than type aliasing, are used to allow for
 * `instanceof` calls to work on the constructors.
 */

export function getFourCC(num: number): string {
  return string.pack(">I4", num);
}

// UnitID represents a unit type's identifier.
export class UnitId {
  private static map: { [key: number]: UnitId } = {};

  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }

  get fourCC(): string {
    return getFourCC(this._value);
  }

  static of(val: number): UnitId {
    if (!this.map[val]) {
      this.map[val] = new UnitId(val);
    }
    return this.map[val];
  }
}

// ItemId represents an item type's identifier.
export class ItemId {
  private static map: { [key: number]: ItemId } = {};

  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }

  get fourCC(): string {
    return getFourCC(this._value);
  }

  static of(val: number): ItemId {
    if (!this.map[val]) {
      this.map[val] = new ItemId(val);
    }
    return this.map[val];
  }
}

// ItemId represents an destructable type's identifier.
export class DestId {
  private static map: { [key: number]: DestId } = {};

  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }

  get fourCC(): string {
    return getFourCC(this._value);
  }

  static of(val: number): DestId {
    if (!this.map[val]) {
      this.map[val] = new DestId(val);
    }
    return this.map[val];
  }
}

// ItemId represents an destructable type's identifier.
export class AbilId {
  private static map: { [key: number]: AbilId } = {};

  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }

  get fourCC(): string {
    return getFourCC(this._value);
  }

  static of(val: number): AbilId {
    if (!this.map[val]) {
      this.map[val] = new AbilId(val);
    }
    return this.map[val];
  }
}

// TechId represents an destructable type's identifier.
export class TechId {
  private static map: { [key: number]: TechId } = {};

  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }

  get fourCC(): string {
    return getFourCC(this._value);
  }

  static of(val: number): TechId {
    if (!this.map[val]) {
      this.map[val] = new TechId(val);
    }
    return this.map[val];
  }
}

export const unitId = (val: string) => UnitId.of(FourCC(val));
export const itemId = (val: string) => ItemId.of(FourCC(val));
export const destId = (val: string) => DestId.of(FourCC(val));
export const abilId = (val: string) => AbilId.of(FourCC(val));
export const techId = (val: string) => TechId.of(FourCC(val));

export class AttackType {
  private constructor(public readonly value: attacktype) {}
  // Standard attack types for units
  static readonly Normal = new AttackType(ATTACK_TYPE_MELEE);
  static readonly Pierce = new AttackType(ATTACK_TYPE_PIERCE);
  static readonly Siege = new AttackType(ATTACK_TYPE_SIEGE);
  static readonly Hero = new AttackType(ATTACK_TYPE_HERO);
  static readonly Chaos = new AttackType(ATTACK_TYPE_CHAOS);
  // Magic attack type. Does not affect spell immune, but can hit ethereal units
  static readonly Magic = new AttackType(ATTACK_TYPE_MAGIC);
  // Type for spells. Spell damage reduction applies to this type, but requires
  // other specific Damage Types to properly work.
  static readonly Spells = new AttackType(ATTACK_TYPE_NORMAL);

  /** Loopup the AttackType for the given unwraped type. */
  static fromType(value: attacktype): AttackType {
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

export class DamageType {
  private constructor(public readonly value: damagetype) {}
  // A physical attack. Reduces the damage dealt based on the target's armor.
  static readonly Physical = new DamageType(DAMAGE_TYPE_NORMAL);
  // Enhanced physical types. Ignore defense value.
  static readonly EnhancedPhysical = new DamageType(DAMAGE_TYPE_ENHANCED);
  static readonly Poison = new DamageType(DAMAGE_TYPE_POISON);
  static readonly Disease = new DamageType(DAMAGE_TYPE_DISEASE);
  static readonly Acid = new DamageType(DAMAGE_TYPE_ACID);
  static readonly Demolition = new DamageType(DAMAGE_TYPE_DEMOLITION);
  static readonly SlowPoison = new DamageType(DAMAGE_TYPE_SLOW_POISON);
  // Universal damage types. Ignore defense value. Ignores spell immunity UNLESS
  // the attack type is spells.
  static readonly Universal = new DamageType(DAMAGE_TYPE_UNIVERSAL);
  static readonly UniversalUnknown = new DamageType(DAMAGE_TYPE_UNKNOWN);
  // Magical damage types! Ignores defense value, cannot affect spell immune
  // units, and can hit etheral units.
  static readonly MagicCold = new DamageType(DAMAGE_TYPE_COLD);
  static readonly MagicDeath = new DamageType(DAMAGE_TYPE_DEATH);
  static readonly MagicDefensive = new DamageType(DAMAGE_TYPE_DEFENSIVE);
  static readonly MagicDivine = new DamageType(DAMAGE_TYPE_DIVINE);
  static readonly MagicFire = new DamageType(DAMAGE_TYPE_FIRE);
  static readonly MagicForce = new DamageType(DAMAGE_TYPE_FORCE);
  static readonly MagicLightning = new DamageType(DAMAGE_TYPE_LIGHTNING);
  static readonly MagicMind = new DamageType(DAMAGE_TYPE_MIND);
  static readonly MagicPlant = new DamageType(DAMAGE_TYPE_PLANT);
  static readonly MagicShadow = new DamageType(DAMAGE_TYPE_SHADOW_STRIKE);
  static readonly MagicSonic = new DamageType(DAMAGE_TYPE_SONIC);
  static readonly MagicSpiritlink = new DamageType(DAMAGE_TYPE_SPIRIT_LINK);

  static fromType(value: damagetype): DamageType {
    switch (value) {
      case DAMAGE_TYPE_NORMAL:
        return DamageType.Physical;
      case DAMAGE_TYPE_ENHANCED:
        return DamageType.EnhancedPhysical;
      case DAMAGE_TYPE_POISON:
        return DamageType.Poison;
      case DAMAGE_TYPE_DISEASE:
        return DamageType.Disease;
      case DAMAGE_TYPE_ACID:
        return DamageType.Acid;
      case DAMAGE_TYPE_DEMOLITION:
        return DamageType.Demolition;
      case DAMAGE_TYPE_SLOW_POISON:
        return DamageType.SlowPoison;
      case DAMAGE_TYPE_UNIVERSAL:
        return DamageType.Universal;
      case DAMAGE_TYPE_UNKNOWN:
        return DamageType.UniversalUnknown;
      case DAMAGE_TYPE_COLD:
        return DamageType.MagicCold;
      case DAMAGE_TYPE_DEATH:
        return DamageType.MagicDeath;
      case DAMAGE_TYPE_DEFENSIVE:
        return DamageType.MagicDefensive;
      case DAMAGE_TYPE_DIVINE:
        return DamageType.MagicDivine;
      case DAMAGE_TYPE_FIRE:
        return DamageType.MagicFire;
      case DAMAGE_TYPE_FORCE:
        return DamageType.MagicForce;
      case DAMAGE_TYPE_LIGHTNING:
        return DamageType.MagicLightning;
      case DAMAGE_TYPE_MIND:
        return DamageType.MagicMind;
      case DAMAGE_TYPE_PLANT:
        return DamageType.MagicPlant;
      case DAMAGE_TYPE_SHADOW_STRIKE:
        return DamageType.MagicShadow;
      case DAMAGE_TYPE_SONIC:
        return DamageType.MagicSonic;
      case DAMAGE_TYPE_SPIRIT_LINK:
        return DamageType.MagicSpiritlink;
      default:
        return DamageType.Physical;
    }
  }
}

export class WeaponSound {
  private constructor(public readonly value: weapontype) {}

  static readonly None = new WeaponSound(WEAPON_TYPE_WHOKNOWS);
  static readonly MetalChopLight = new WeaponSound(
    WEAPON_TYPE_METAL_LIGHT_CHOP,
  );
  static readonly MetalChopMedium = new WeaponSound(
    WEAPON_TYPE_METAL_MEDIUM_CHOP,
  );
  static readonly MetalChopHeavy = new WeaponSound(
    WEAPON_TYPE_METAL_HEAVY_CHOP,
  );
  static readonly MetalSliceLight = new WeaponSound(
    WEAPON_TYPE_METAL_LIGHT_SLICE,
  );
  static readonly MetalSliceMedium = new WeaponSound(
    WEAPON_TYPE_METAL_MEDIUM_SLICE,
  );
  static readonly MetalSliceHeavy = new WeaponSound(
    WEAPON_TYPE_METAL_HEAVY_SLICE,
  );
  static readonly MetalBashMedium = new WeaponSound(
    WEAPON_TYPE_METAL_MEDIUM_BASH,
  );
  static readonly MetalBashHeavy = new WeaponSound(
    WEAPON_TYPE_METAL_HEAVY_BASH,
  );
  static readonly MetalStabMedium = new WeaponSound(
    WEAPON_TYPE_METAL_MEDIUM_STAB,
  );
  static readonly MetalStabHeavy = new WeaponSound(
    WEAPON_TYPE_METAL_HEAVY_STAB,
  );
  static readonly WoodSliceLight = new WeaponSound(
    WEAPON_TYPE_WOOD_LIGHT_SLICE,
  );
  static readonly WoodSliceMedium = new WeaponSound(
    WEAPON_TYPE_WOOD_MEDIUM_SLICE,
  );
  static readonly WoodSliceHeavy = new WeaponSound(
    WEAPON_TYPE_WOOD_HEAVY_SLICE,
  );
  static readonly WoodBashLight = new WeaponSound(WEAPON_TYPE_WOOD_LIGHT_BASH);
  static readonly WoodBashMedium = new WeaponSound(
    WEAPON_TYPE_WOOD_MEDIUM_BASH,
  );
  static readonly WoodBashHeavy = new WeaponSound(WEAPON_TYPE_WOOD_HEAVY_BASH);
  static readonly WoodStabLight = new WeaponSound(WEAPON_TYPE_WOOD_LIGHT_STAB);
  static readonly WoodStabMedium = new WeaponSound(
    WEAPON_TYPE_WOOD_MEDIUM_STAB,
  );
  static readonly ClawSliceLight = new WeaponSound(
    WEAPON_TYPE_CLAW_LIGHT_SLICE,
  );
  static readonly ClawSliceMedium = new WeaponSound(
    WEAPON_TYPE_CLAW_MEDIUM_SLICE,
  );
  static readonly ClawSliceHeavy = new WeaponSound(
    WEAPON_TYPE_CLAW_HEAVY_SLICE,
  );
  static readonly AxeChopMedium = new WeaponSound(WEAPON_TYPE_AXE_MEDIUM_CHOP);
  static readonly RockBashHeavy = new WeaponSound(WEAPON_TYPE_ROCK_HEAVY_BASH);
}

export class DefenseType {
  private constructor(
    public readonly value: defensetype,
    public readonly numericValue: number,
  ) {}

  static readonly Divine = new DefenseType(DEFENSE_TYPE_DIVINE, 6);
  /**
   * Word of warning using fortified: it has weird aggro mechanics for units. It
   * has a lower priority than most.
   */
  static readonly Fortified = new DefenseType(DEFENSE_TYPE_FORT, 3);
  static readonly Hero = new DefenseType(DEFENSE_TYPE_HERO, 5);
  static readonly Large = new DefenseType(DEFENSE_TYPE_LARGE, 2);
  static readonly Light = new DefenseType(DEFENSE_TYPE_LIGHT, 0);
  static readonly Medium = new DefenseType(DEFENSE_TYPE_MEDIUM, 1);
  static readonly None = new DefenseType(DEFENSE_TYPE_NONE, 7);
  static readonly Normal = new DefenseType(DEFENSE_TYPE_NORMAL, 4);

  static fromType(value: defensetype) {
    switch (value) {
      case DEFENSE_TYPE_DIVINE:
        return DefenseType.Divine;
      case DEFENSE_TYPE_FORT:
        return DefenseType.Fortified;
      case DEFENSE_TYPE_HERO:
        return DefenseType.Hero;
      case DEFENSE_TYPE_LARGE:
        return DefenseType.Large;
      case DEFENSE_TYPE_LIGHT:
        return DefenseType.Light;
      case DEFENSE_TYPE_MEDIUM:
        return DefenseType.Medium;
      case DEFENSE_TYPE_NONE:
        return DefenseType.None;
      case DEFENSE_TYPE_NORMAL:
        return DefenseType.Normal;
      default:
        return DefenseType.Normal;
    }
  }

  static fromNumber(value: number) {
    switch (value) {
      case 0:
        return DefenseType.Light;
      case 1:
        return DefenseType.Medium;
      case 2:
        return DefenseType.Large;
      case 3:
        return DefenseType.Fortified;
      case 4:
        return DefenseType.Normal;
      case 5:
        return DefenseType.Hero;
      case 6:
        return DefenseType.Divine;
      case 7:
        return DefenseType.None;
      default:
        return DefenseType.Normal;
    }
  }
}
