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

  public enumUnitsInRange(pos: Vec2, radius: number, filter: () => boolean) {
    GroupEnumUnitsInRange(this.handle, pos.x, pos.y, radius, Filter(filter));
  }

  public enumUnitsInRangeCounted(
    pos: Vec2,
    radius: number,
    filter: () => boolean,
    countLimit: number
  ) {
    GroupEnumUnitsInRangeCounted(
      this.handle,
      pos.x,
      pos.y,
      radius,
      Filter(filter),
      countLimit
    );
  }

  public enumUnitsInRect(r: Rectangle, filter: () => boolean) {
    GroupEnumUnitsInRect(this.handle, r.handle, Filter(filter));
  }

  public enumUnitsInRectCounted(
    r: Rectangle,
    filter: () => boolean,
    countLimit: number
  ) {
    GroupEnumUnitsInRectCounted(
      this.handle,
      r.handle,
      Filter(filter),
      countLimit
    );
  }

  public enumUnitsOfPlayer(whichPlayer: MapPlayer, filter: () => boolean) {
    GroupEnumUnitsOfPlayer(this.handle, whichPlayer.handle, Filter(filter));
  }

  public enumUnitsOfType(unitName: string, filter: () => boolean) {
    GroupEnumUnitsOfType(this.handle, unitName, Filter(filter));
  }

  public enumUnitsOfTypeCounted(
    unitName: string,
    filter: () => boolean,
    countLimit: number
  ) {
    GroupEnumUnitsOfTypeCounted(
      this.handle,
      unitName,
      Filter(filter),
      countLimit
    );
  }

  public enumUnitsSelected(whichPlayer: MapPlayer, filter: () => boolean) {
    GroupEnumUnitsSelected(this.handle, whichPlayer.handle, Filter(filter));
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
