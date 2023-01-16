/** package common contains types that represent common concepts in warcraft.
 * Multiple classes, rather than type aliasing, are used to allow for
 * `instanceof` calls to work on the constructors.
 */
/// <reference types="war3-types/core/common" />
export declare function getFourCC(num: Number): string;
export declare class UnitId {
    private readonly _value;
    private static map;
    private constructor();
    get value(): number;
    get fourCC(): string;
    static of(val: number): UnitId;
}
export declare class ItemId {
    private readonly _value;
    private static map;
    private constructor();
    get value(): number;
    get fourCC(): string;
    static of(val: number): ItemId;
}
export declare class DestId {
    private readonly _value;
    private static map;
    private constructor();
    get value(): number;
    get fourCC(): string;
    static of(val: number): DestId;
}
export declare class AbilId {
    private readonly _value;
    private static map;
    private constructor();
    get value(): number;
    get fourCC(): string;
    static of(val: number): AbilId;
}
export declare class TechId {
    private readonly _value;
    private static map;
    private constructor();
    get value(): number;
    get fourCC(): string;
    static of(val: number): TechId;
}
export declare const unitId: (val: string) => UnitId;
export declare const itemId: (val: string) => ItemId;
export declare const destId: (val: string) => DestId;
export declare const abilId: (val: string) => AbilId;
export declare const techId: (val: string) => TechId;
export declare class AttackType {
    readonly value: attacktype;
    private constructor();
    static readonly Normal: AttackType;
    static readonly Pierce: AttackType;
    static readonly Siege: AttackType;
    static readonly Hero: AttackType;
    static readonly Chaos: AttackType;
    static readonly Magic: AttackType;
    static readonly Spells: AttackType;
    /** Loopup the AttackType for the given unwraped type. */
    static fromType(value: attacktype): AttackType;
}
export declare class DamageType {
    readonly value: damagetype;
    private constructor();
    static readonly Physical: DamageType;
    static readonly EnhancedPhysical: DamageType;
    static readonly Poison: DamageType;
    static readonly Disease: DamageType;
    static readonly Acid: DamageType;
    static readonly Demolition: DamageType;
    static readonly SlowPoison: DamageType;
    static readonly Universal: DamageType;
    static readonly UniversalUnknown: DamageType;
    static readonly MagicCold: DamageType;
    static readonly MagicDeath: DamageType;
    static readonly MagicDefensive: DamageType;
    static readonly MagicDivine: DamageType;
    static readonly MagicFire: DamageType;
    static readonly MagicForce: DamageType;
    static readonly MagicLightning: DamageType;
    static readonly MagicMind: DamageType;
    static readonly MagicPlant: DamageType;
    static readonly MagicShadow: DamageType;
    static readonly MagicSonic: DamageType;
    static readonly MagicSpiritlink: DamageType;
}
export declare class WeaponSound {
    readonly value: weapontype;
    private constructor();
    static readonly None: WeaponSound;
    static readonly MetalChopLight: WeaponSound;
    static readonly MetalChopMedium: WeaponSound;
    static readonly MetalChopHeavy: WeaponSound;
    static readonly MetalSliceLight: WeaponSound;
    static readonly MetalSliceMedium: WeaponSound;
    static readonly MetalSliceHeavy: WeaponSound;
    static readonly MetalBashMedium: WeaponSound;
    static readonly MetalBashHeavy: WeaponSound;
    static readonly MetalStabMedium: WeaponSound;
    static readonly MetalStabHeavy: WeaponSound;
    static readonly WoodSliceLight: WeaponSound;
    static readonly WoodSliceMedium: WeaponSound;
    static readonly WoodSliceHeavy: WeaponSound;
    static readonly WoodBashLight: WeaponSound;
    static readonly WoodBashMedium: WeaponSound;
    static readonly WoodBashHeavy: WeaponSound;
    static readonly WoodStabLight: WeaponSound;
    static readonly WoodStabMedium: WeaponSound;
    static readonly ClawSliceLight: WeaponSound;
    static readonly ClawSliceMedium: WeaponSound;
    static readonly ClawSliceHeavy: WeaponSound;
    static readonly AxeChopMedium: WeaponSound;
    static readonly RockBashHeavy: WeaponSound;
}
