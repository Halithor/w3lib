/** @noSelfInFile **/

import {Vec2} from '../math/index';
import {Handle} from './handle';
import {MapPlayer} from './player';
import {Rectangle} from './rect';
import {Unit} from './unit';
import {Widget} from './widget';

export class Group extends Handle<group> {
  constructor() {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateGroup());
    }
  }

  public addGroupFast(addGroup: Group): number {
    return BlzGroupAddGroupFast(this.handle, addGroup.handle);
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

  public enumUnitsInRange(
    pos: Vec2,
    radius: number,
    filter: (() => boolean) | null
  ) {
    if (filter != null) {
      GroupEnumUnitsInRange(this.handle, pos.x, pos.y, radius, Filter(filter));
    } else {
      GroupEnumUnitsInRange(this.handle, pos.x, pos.y, radius, null);
    }
  }

  public enumUnitsInRangeCounted(
    pos: Vec2,
    radius: number,
    filter: (() => boolean) | null,
    countLimit: number
  ) {
    if (filter != null) {
      GroupEnumUnitsInRangeCounted(
        this.handle,
        pos.x,
        pos.y,
        radius,
        Filter(filter),
        countLimit
      );
    } else {
      GroupEnumUnitsInRangeCounted(
        this.handle,
        pos.x,
        pos.y,
        radius,
        null,
        countLimit
      );
    }
  }

  public enumUnitsInRect(r: Rectangle, filter: (() => boolean) | null) {
    if (filter != null) {
      GroupEnumUnitsInRect(this.handle, r.handle, Filter(filter));
    } else {
      GroupEnumUnitsInRect(this.handle, r.handle, null);
    }
  }

  public enumUnitsInRectCounted(
    r: Rectangle,
    filter: (() => boolean) | null,
    countLimit: number
  ) {
    if (filter != null) {
      GroupEnumUnitsInRectCounted(
        this.handle,
        r.handle,
        Filter(filter),
        countLimit
      );
    } else {
      GroupEnumUnitsInRectCounted(this.handle, r.handle, null, countLimit);
    }
  }

  public enumUnitsOfPlayer(
    whichPlayer: MapPlayer,
    filter: (() => boolean) | null
  ) {
    if (filter != null) {
      GroupEnumUnitsOfPlayer(this.handle, whichPlayer.handle, Filter(filter));
    } else {
      GroupEnumUnitsOfPlayer(this.handle, whichPlayer.handle, null);
    }
  }

  public enumUnitsOfType(unitName: string, filter: (() => boolean) | null) {
    if (filter != null) {
      GroupEnumUnitsOfType(this.handle, unitName, Filter(filter));
    } else {
      GroupEnumUnitsOfType(this.handle, unitName, null);
    }
  }

  public enumUnitsOfTypeCounted(
    unitName: string,
    filter: (() => boolean) | null,
    countLimit: number
  ) {
    if (filter != null) {
      GroupEnumUnitsOfTypeCounted(
        this.handle,
        unitName,
        Filter(filter),
        countLimit
      );
    } else {
      GroupEnumUnitsOfTypeCounted(this.handle, unitName, null, countLimit);
    }
  }

  public enumUnitsSelected(
    whichPlayer: MapPlayer,
    filter: (() => boolean) | null
  ) {
    if (filter != null) {
      GroupEnumUnitsSelected(this.handle, whichPlayer.handle, Filter(filter));
    } else {
      GroupEnumUnitsSelected(this.handle, whichPlayer.handle, null);
    }
  }

  public for(callback: () => void) {
    ForGroup(this.handle, callback);
  }

  public get first() {
    return Unit.fromHandle(FirstOfGroup(this.handle));
  }

  public get size(): number {
    return BlzGroupGetSize(this.handle);
  }

  public getUnitAt(index: number): Unit {
    return Unit.fromHandle(BlzGroupUnitAt(this.handle, index));
  }

  public hasUnit(whichUnit: Unit) {
    return IsUnitInGroup(whichUnit.handle, this.handle);
  }

  public orderCoords(order: string | number, pos: Vec2) {
    if (typeof order === 'string') {
      GroupPointOrder(this.handle, order, pos.x, pos.y);
    } else {
      GroupPointOrderById(this.handle, order, pos.x, pos.y);
    }
  }

  public orderImmediate(order: string | number) {
    if (typeof order === 'string') {
      GroupImmediateOrder(this.handle, order);
    } else {
      GroupImmediateOrderById(this.handle, order);
    }
  }

  public orderTarget(order: string | number, targetWidget: Widget | Unit) {
    if (typeof order === 'string') {
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

  public static fromHandle(handle: group): Group {
    return this.getObject(handle);
  }

  public static getEnumUnit(): Unit {
    return Unit.fromHandle(GetEnumUnit());
  }

  public static getFilterUnit(): Unit {
    return Unit.fromHandle(GetFilterUnit());
  }
}

const maxCollisionSize = 200.0;

function getUnitsInRange(
  pos: Vec2,
  radius: number,
  filter: ((u: Unit) => boolean) | null,
  collisionSizeFiltering: boolean = false
): Group {
  const enumGroup = new Group();
  if (collisionSizeFiltering) {
    enumGroup.enumUnitsInRange(pos, radius + maxCollisionSize, () => {
      const u = Unit.fromHandle(GetFilterUnit());
      return u.inRange(pos, radius) && (filter != null ? filter(u) : true);
    });
  } else {
    if (filter != null) {
      enumGroup.enumUnitsInRange(pos, radius, () =>
        filter(Unit.fromHandle(GetFilterUnit()))
      );
    } else {
      enumGroup.enumUnitsInRange(pos, radius, null);
    }
  }
  return enumGroup;
}

// Iterate over all units in range calling the callback
export function forUnitsInRange(
  pos: Vec2,
  radius: number,
  callback: (u: Unit) => void,
  collisionSizeFiltering: boolean = false
) {
  const enumGroup = getUnitsInRange(pos, radius, null, collisionSizeFiltering);
  enumGroup.for(() => {
    callback(Unit.fromHandle(GetEnumUnit()));
  });
  enumGroup.destroy();
}

// Get a random unit in range, matching the provided filter.
export function getRandomUnitInRange(
  pos: Vec2,
  radius: number,
  filter: (u: Unit) => boolean,
  collisionSizeFiltering: boolean = false
): Unit {
  const enumGroup = getUnitsInRange(
    pos,
    radius,
    filter,
    collisionSizeFiltering
  );
  const u = enumGroup.getUnitAt(GetRandomInt(0, enumGroup.size - 1));
  enumGroup.destroy();
  return u;
}

// Executes a callback on the nearest unit
export function findNearestUnit(
  pos: Vec2,
  range: number,
  filter: ((u: Unit) => boolean) | null
): Unit | null {
  const enumGroup = new Group();
  let filterUnit: (() => boolean) | null = null;
  if (filter != null) {
    filterUnit = () => {
      const u = Unit.fromHandle(GetFilterUnit());
      return filter(u);
    };
  }
  enumGroup.enumUnitsInRange(pos, range, filterUnit);
  if (enumGroup.size == 0) {
    return null;
  }
  let nearest: Unit = enumGroup.first;
  let bestDist = 2147483647; // max int32
  enumGroup.for(() => {
    const u = Unit.fromHandle(GetEnumUnit());
    const distSq = pos.distanceTo(u.pos);
    if (distSq < bestDist) {
      bestDist = distSq;
      nearest = u;
    }
  });
  enumGroup.destroy();
  return nearest;
}

export function forUnitsInRect(rct: Rectangle, callback: (u: Unit) => void) {
  const enumGroup = new Group();
  enumGroup.enumUnitsInRect(rct, null);
  enumGroup.for(() => {
    callback(Unit.fromHandle(GetEnumUnit()));
  });
}

export function countUnitsInRect(rct: Rectangle) {
  let count = 0;
  forUnitsInRect(rct, u => {
    count++;
  });
  return count;
}
