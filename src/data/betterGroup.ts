import { Unit } from "../handles";
import { Vec2 } from "../math";

/** A group that has random access. */
export class BetterGroup {
  private units = new Set<Unit>();

  // For random access, keep a cache of the units in this group. Only set this
  // value whenever random access is needed, then clear it when the set changes.
  private cachedEntries?: Unit[];

  addUnit(u: Unit) {
    this.units.add(u);
    this.cachedEntries = undefined;
  }

  removeUnit(u: Unit): boolean {
    this.cachedEntries = undefined;
    return this.units.delete(u);
  }

  hasUnit(u: Unit): boolean {
    return this.units.has(u);
  }

  forEach(func: (u: Unit) => void) {
    this.units.forEach(func);
  }

  // Iterate over the units in this group within a range.
  forUnitsInRange(
    origin: Vec2 | Unit,
    distance: number,
    func: (u: Unit) => void,
  ) {
    if (origin instanceof Vec2) {
      this.forEach((u) => {
        if (u.inRange(origin, distance)) {
          func(u);
        }
      });
    } else if (origin instanceof Unit) {
      this.forEach((u) => {
        if (u.inRangeOfUnit(origin, distance)) {
          func(u);
        }
      });
    }
  }

  /**
   * Get a random unit. Performance is worse the more often you add/remove
   * units from this group.
   */
  random(): Unit {
    if (this.cachedEntries == null) {
      this.cachedEntries = Array.from(this.units.keys());
    }
    return this.cachedEntries[
      Math.floor(Math.random() * this.cachedEntries.length)
    ];
  }
}
