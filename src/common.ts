/** package common contains types that represent common concepts in warcraft.
 * Multiple classes, rather than type aliasing, are used to allow for
 * `instanceof` calls to work on the constructors.
 */

// UnitID represents a unit type's identifier.
export class UnitId {
  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }

  equals(other: UnitId) {
    return this.value == other.value;
  }

  static of(val: number): UnitId {
    return new UnitId(val);
  }
}

// ItemId represents an item type's identifier.
export class ItemId {
  constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }

  equals(other: ItemId) {
    return this.value == other.value;
  }
}

// ItemId represents an destructable type's identifier.
export class DestId {
  constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }

  equals(other: DestId) {
    return this.value == other.value;
  }
}

// ItemId represents an destructable type's identifier.
export class AbilId {
  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }

  equals(other: AbilId) {
    return this.value == other.value;
  }

  static of(val: number): AbilId {
    return new AbilId(val);
  }
}

export const unitId = (val: string) => UnitId.of(FourCC(val));
export const itemId = (val: string) => new ItemId(FourCC(val));
export const destId = (val: string) => new DestId(FourCC(val));
export const abilId = (val: string) => AbilId.of(FourCC(val));
