/** @noSelfInFile **/

import { UnitId } from "../common";
import { Vec2 } from "../math/index";
import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Rectangle } from "./rect";
import { Unit } from "./unit";
import { Widget } from "./widget";

export class Group extends Handle<group> {
  static getNew() {
    return new Group();
  }

  constructor() {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateGroup());
    }
  }

  public addGroupFast(addGroup: Group): number {
    return BlzGroupAddGroupFast(addGroup.handle, this.handle);
  }

  public addUnit(whichUnit: Unit): boolean {
    return GroupAddUnit(this.handle, whichUnit.handle);
  }

  public clear() {
    GroupClear(this.handle);
  }

  public destroy() {
    DestroyGroup(this.handle);
  }

  public enumUnitsInRange(pos: Vec2, radius: number, filter?: () => boolean) {
    if (filter != null) {
      const filterFunc = Filter(filter);
      GroupEnumUnitsInRange(this.handle, pos.x, pos.y, radius, filterFunc);
      DestroyFilter(filterFunc);
    } else {
      GroupEnumUnitsInRange(this.handle, pos.x, pos.y, radius, undefined);
    }
  }

  public enumUnitsInRangeCounted(
    pos: Vec2,
    radius: number,
    filter: (() => boolean) | null,
    countLimit: number,
  ) {
    if (filter != null) {
      GroupEnumUnitsInRangeCounted(
        this.handle,
        pos.x,
        pos.y,
        radius,
        Filter(filter),
        countLimit,
      );
    } else {
      GroupEnumUnitsInRangeCounted(
        this.handle,
        pos.x,
        pos.y,
        radius,
        undefined,
        countLimit,
      );
    }
  }

  public enumUnitsInRect(r: Rectangle, filter?: () => boolean) {
    if (filter != null) {
      const filterFunc = Filter(filter);
      GroupEnumUnitsInRect(this.handle, r.handle, filterFunc);
      DestroyFilter(filterFunc);
    } else {
      GroupEnumUnitsInRect(this.handle, r.handle, undefined);
    }
  }

  public enumUnitsInRectCounted(
    r: Rectangle,
    filter: (() => boolean) | null,
    countLimit: number,
  ) {
    if (filter != null) {
      GroupEnumUnitsInRectCounted(
        this.handle,
        r.handle,
        Filter(filter),
        countLimit,
      );
    } else {
      GroupEnumUnitsInRectCounted(this.handle, r.handle, undefined, countLimit);
    }
  }

  public enumUnitsOfPlayer(whichPlayer: MapPlayer, filter?: () => boolean) {
    if (filter != undefined) {
      GroupEnumUnitsOfPlayer(this.handle, whichPlayer.handle, Filter(filter));
    } else {
      GroupEnumUnitsOfPlayer(this.handle, whichPlayer.handle, undefined);
    }
  }

  public enumUnitsOfType(unitName: string, filter: (() => boolean) | null) {
    if (filter != null) {
      GroupEnumUnitsOfType(this.handle, unitName, Filter(filter));
    } else {
      GroupEnumUnitsOfType(this.handle, unitName, undefined);
    }
  }

  public enumUnitsOfTypeId(unitType: UnitId) {
    return Group.fromHandle(GetUnitsOfTypeIdAll(unitType.value)!);
  }

  public enumUnitsOfTypeCounted(
    unitName: string,
    filter: (() => boolean) | null,
    countLimit: number,
  ) {
    if (filter != null) {
      GroupEnumUnitsOfTypeCounted(
        this.handle,
        unitName,
        Filter(filter),
        countLimit,
      );
    } else {
      GroupEnumUnitsOfTypeCounted(this.handle, unitName, undefined, countLimit);
    }
  }

  public enumUnitsSelected(
    whichPlayer: MapPlayer,
    filter: (() => boolean) | null,
  ) {
    if (filter != null) {
      GroupEnumUnitsSelected(this.handle, whichPlayer.handle, Filter(filter));
    } else {
      GroupEnumUnitsSelected(this.handle, whichPlayer.handle, undefined);
    }
  }

  public for(callback: () => void) {
    ForGroup(this.handle, callback);
  }

  public forEach(callback: (u: Unit) => void) {
    this.for(() => {
      callback(Group.getEnumUnit());
    });
  }

  public map<R>(callback: (u: Unit) => R): R[] {
    const result: R[] = [];
    this.forEach((u) => result.push(callback(u)));
    return result;
  }

  public get first() {
    return Unit.fromHandle(FirstOfGroup(this.handle)!);
  }

  public get size(): number {
    return BlzGroupGetSize(this.handle);
  }

  public random(): Unit {
    return this.getUnitAt(Math.floor(Math.random() * this.size));
  }

  public getUnitAt(index: number): Unit {
    return Unit.fromHandle(BlzGroupUnitAt(this.handle, index)!);
  }

  public hasUnit(whichUnit: Unit) {
    return IsUnitInGroup(whichUnit.handle, this.handle);
  }

  public orderCoords(order: string | number, pos: Vec2) {
    if (typeof order === "string") {
      GroupPointOrder(this.handle, order, pos.x, pos.y);
    } else {
      GroupPointOrderById(this.handle, order, pos.x, pos.y);
    }
  }

  public orderImmediate(order: string | number) {
    if (typeof order === "string") {
      GroupImmediateOrder(this.handle, order);
    } else {
      GroupImmediateOrderById(this.handle, order);
    }
  }

  public orderTarget(order: string | number, targetWidget: Widget | Unit) {
    if (typeof order === "string") {
      GroupTargetOrder(this.handle, order, targetWidget.handle);
    } else {
      GroupTargetOrderById(this.handle, order, targetWidget.handle);
    }
  }

  public removeGroupFast(removeGroup: Group): number {
    return BlzGroupRemoveGroupFast(this.handle, removeGroup.handle);
  }

  public removeUnit(whichUnit: Unit): boolean {
    return GroupRemoveUnit(this.handle, whichUnit.handle);
  }

  [Symbol.iterator]() {
    let idx = 0;
    const size = this.size;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    
    return {
      next(): IteratorResult<Unit> {
        if (idx >= size) return { value: self.random(), done: true };
        return { value: self.getUnitAt(idx++), done: false };
      },
    };
  }

  public static fromHandle(handle: group): Group {
    return this.getObject(handle) as Group;
  }

  public static getEnumUnit(): Unit {
    return Unit.fromHandle(GetEnumUnit()!);
  }

  public static getFilterUnit(): Unit {
    return Unit.fromHandle(GetFilterUnit()!);
  }
}

/**
 * Construct a group of the provided units.
 */
export function groupOf(...units: Unit[]): Group {
  const grp = new Group();
  units.forEach((u) => grp.addUnit(u));
  return grp;
}

const maxCollisionSize = 200.0;

export function getUnitsInRange(
  origin: Vec2 | Unit,
  radius: number,
  filter?: (u: Unit) => boolean,
): Group {
  const enumGroup = new Group();
  if (origin instanceof Vec2) {
    enumGroup.enumUnitsInRange(origin, radius + maxCollisionSize, () => {
      const u = Unit.fromHandle(GetFilterUnit()!);
      return u.inRange(origin, radius) && (filter != null ? filter(u) : true);
    });
  } else if (origin instanceof Unit) {
    // Use the unit's collision and the inRangeOfUnit check instead.
    enumGroup.enumUnitsInRange(
      origin.pos,
      radius + maxCollisionSize + origin.collisionSize,
      () => {
        const u = Unit.fromHandle(GetFilterUnit()!);
        return (
          u.inRangeOfUnit(origin, radius) && (filter != null ? filter(u) : true)
        );
      },
    );
  }
  return enumGroup;
}

// Iterate over all units in range calling the callback
export function forUnitsInRange(
  origin: Vec2 | Unit,
  radius: number,
  callback: (u: Unit) => void,
) {
  const enumGroup = getUnitsInRange(origin, radius);
  enumGroup.forEach((u) => callback(u));
  enumGroup.destroy();
}

// Get a random unit in range, matching the provided filter.
export function getRandomUnitInRange(
  origin: Vec2 | Unit,
  radius: number,
  filter?: (u: Unit) => boolean,
): Unit | undefined {
  const enumGroup = getUnitsInRange(origin, radius, filter);
  if (enumGroup.size == 0) {
    enumGroup.destroy();
    return undefined;
  }
  const u = enumGroup.getUnitAt(GetRandomInt(0, enumGroup.size - 1));
  enumGroup.destroy();
  return u;
}

// Finds the nearest unit matching the filter.
export function findNearestUnit(
  origin: Vec2 | Unit,
  range: number,
  filter?: (u: Unit) => boolean,
): Unit | undefined {
  const g = getUnitsInRange(origin, range, filter);
  if (g.size == 0) {
    return undefined;
  }
  const pos = origin instanceof Unit ? origin.pos : origin;
  let nearest: Unit = g.first;
  let bestDist = 2147483647; // max int32
  g.for(() => {
    const u = Unit.fromHandle(GetEnumUnit()!);
    const distSq = pos.distanceTo(u.pos);
    if (distSq < bestDist) {
      bestDist = distSq;
      nearest = u;
    }
  });
  g.destroy();
  return nearest;
}

export function getUnitsInRect(
  rct: Rectangle,
  filter?: (u: Unit) => boolean,
): Group {
  const enumGroup = new Group();
  if (filter != null) {
    enumGroup.enumUnitsInRect(rct, () =>
      filter(Unit.fromHandle(GetFilterUnit()!)),
    );
  } else {
    enumGroup.enumUnitsInRect(rct);
  }
  return enumGroup;
}

export function forUnitsInRect(rct: Rectangle, callback: (u: Unit) => void) {
  const g = getUnitsInRect(rct);
  g.forEach((u) => callback(u));
  g.destroy();
}

export function countUnitsInRect(
  rct: Rectangle,
  filter?: (u: Unit) => boolean,
) {
  const g = getUnitsInRect(rct, filter);
  const count = g.size;
  g.destroy();
  return count;
}

export function countUnitsInRange(
  origin: Vec2 | Unit,
  radius: number,
  filter?: (u: Unit) => boolean,
): number {
  const g = getUnitsInRange(origin, radius, filter);
  const count = g.size;
  g.destroy();
  return count;
}

export function forUnitsOfPlayer(
  whichPlayer: MapPlayer,
  callback: (u: Unit) => void,
) {
  const g = new Group();
  g.enumUnitsOfPlayer(whichPlayer);
  g.forEach((u) => callback(u));
  g.destroy();
}

export function forUnitsOfType(whichType: UnitId, callback: (u: Unit) => void) {
  const g = new Group();
  g.enumUnitsOfTypeId(whichType);
  g.forEach((u) => callback(u));
  g.destroy();
}
