/** package common contains types that represent common concepts in warcraft.
 * Multiple classes, rather than type aliasing, are used to allow for
 * `instanceof` calls to work on the constructors.
 */

// UnitID represents a unit type's identifier.
export class UnitId {
  constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }
}

// ItemId represents an item type's identifier.
export class ItemId {
  constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }
}

// ItemId represents an destructable type's identifier.
export class DestId {
  constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }
}

// ItemId represents an destructable type's identifier.
export class AbilId {
  constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }
}

export const unitId = (val: string) => new UnitId(FourCC(val));
export const itemId = (val: string) => new ItemId(FourCC(val));
export const destId = (val: string) => new DestId(FourCC(val));
export const abilId = (val: string) => new AbilId(FourCC(val));
