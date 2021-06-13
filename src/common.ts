/** package common contains types that represent common concepts in warcraft.
 * Multiple classes, rather than type aliasing, are used to allow for
 * `instanceof` calls to work on the constructors.
 */

// UnitID represents a unit type's identifier.
export class UnitId {
  private static map: {[key: number]: UnitId} = {};

  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
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
  private static map: {[key: number]: ItemId} = {};

  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
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
  private static map: {[key: number]: DestId} = {};

  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
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
  private static map: {[key: number]: AbilId} = {};

  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }

  static of(val: number): AbilId {
    if (!this.map[val]) {
      this.map[val] = new AbilId(val);
    }
    return this.map[val];
  }
}

export const unitId = (val: string) => UnitId.of(FourCC(val));
export const itemId = (val: string) => ItemId.of(FourCC(val));
export const destId = (val: string) => DestId.of(FourCC(val));
export const abilId = (val: string) => AbilId.of(FourCC(val));
