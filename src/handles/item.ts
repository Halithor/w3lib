/** @noSelfInFile **/

import {ItemId} from '../common';
import {vec2, Vec2} from '../math/index';
import {Handle} from './handle';
import {MapPlayer} from './player';
import { Rectangle } from './rect';
import {Widget} from './widget';

export class Item extends Widget {
  declare public readonly handle: item;

  constructor(itemId: ItemId, pos: Vec2, skinId?: number) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(
        skinId
          ? BlzCreateItemWithSkin(itemId.value, pos.x, pos.y, skinId)
          : CreateItem(itemId.value, pos.x, pos.y)
      );
    }
  }

  public get charges() {
    return GetItemCharges(this.handle);
  }

  public set charges(value: number) {
    SetItemCharges(this.handle, value);
  }

  public set invulnerable(flag: boolean) {
    SetItemInvulnerable(this.handle, true);
  }

  public get invulnerable() {
    return IsItemInvulnerable(this.handle);
  }

  public get level() {
    return GetItemLevel(this.handle);
  }

  set iconPath(value: string) {
    BlzSetItemIconPath(this.handle, value);
  }

  get name() {
    return GetItemName(this.handle);
  }

  set name(value: string) {
    BlzSetItemName(this.handle, value);
  }

  set tooltip(value: string) {
    BlzSetItemTooltip(this.handle, value);
  }

  set tooltipExtended(value: string) {
    BlzSetItemExtendedTooltip(this.handle, value);
  }

  set description(value: string) {
    BlzSetItemDescription(this.handle, value);
  }

  public get pawnable() {
    return IsItemPawnable(this.handle);
  }

  public set pawnable(flag: boolean) {
    SetItemPawnable(this.handle, flag);
  }

  public get player() {
    return GetItemPlayer(this.handle);
  }

  public get type() {
    return GetItemType(this.handle);
  }

  public get typeId() {
    return ItemId.of(GetItemTypeId(this.handle));
  }

  public get userData() {
    return GetItemUserData(this.handle);
  }

  public set userData(value: number) {
    SetItemUserData(this.handle, value);
  }

  public get visible() {
    return IsItemVisible(this.handle);
  }

  public set visible(flag: boolean) {
    SetItemVisible(this.handle, flag);
  }

  public get skin() {
    return BlzGetItemSkin(this.handle);
  }

  public set skin(skinId: number) {
    BlzSetItemSkin(this.handle, skinId);
  }

  public get x() {
    return GetItemX(this.handle);
  }

  public set x(value: number) {
    SetItemPosition(this.handle, value, this.y);
  }

  public get y() {
    return GetItemY(this.handle);
  }

  public set y(value: number) {
    SetItemPosition(this.handle, this.x, value);
  }

  public set pos(value: Vec2) {
    SetItemPosition(this.handle, value.x, value.y);
  }

  public get pos(): Vec2 {
    return vec2(this.x, this.y);
  }

  public destroy() {
    RemoveItem(this.handle);
  }

  public getField(
    field: itembooleanfield | itemintegerfield | itemrealfield | itemstringfield
  ) {
    const fieldType = field.toString().substr(0, field.toString().indexOf(':'));

    switch (fieldType) {
      case 'unitbooleanfield':
        return BlzGetItemBooleanField(this.handle, field as itembooleanfield);
      case 'unitintegerfield':
        return BlzGetItemIntegerField(this.handle, field as itemintegerfield);
      case 'unitrealfield':
        return BlzGetItemRealField(this.handle, field as itemrealfield);
      case 'unitstringfield':
        return BlzGetItemStringField(this.handle, field as itemstringfield);
      default:
        return 0;
    }
  }

  public isOwned() {
    return IsItemOwned(this.handle);
  }

  public isPawnable() {
    return IsItemPawnable(this.handle);
  }

  public isPowerup() {
    return IsItemPowerup(this.handle);
  }

  public isSellable() {
    return IsItemSellable(this.handle);
  }

  public setDropId(unitId: number) {
    SetItemDropID(this.handle, unitId);
  }

  public setDropOnDeath(flag: boolean) {
    SetItemDropOnDeath(this.handle, flag);
  }

  public setDroppable(flag: boolean) {
    SetItemDroppable(this.handle, flag);
  }

  public setField(
    field:
      | itembooleanfield
      | itemintegerfield
      | itemrealfield
      | itemstringfield,
    value: boolean | number | string
  ) {
    const fieldType = field.toString().substr(0, field.toString().indexOf(':'));

    if (fieldType === 'unitbooleanfield' && typeof value === 'boolean') {
      return BlzSetItemBooleanField(
        this.handle,
        field as itembooleanfield,
        value
      );
    } else if (fieldType === 'unitintegerfield' && typeof value === 'number') {
      return BlzSetItemIntegerField(
        this.handle,
        field as itemintegerfield,
        value
      );
    } else if (fieldType === 'unitrealfield' && typeof value === 'number') {
      return BlzSetItemRealField(this.handle, field as itemrealfield, value);
    } else if (fieldType === 'unitstringfield' && typeof value === 'string') {
      return BlzSetItemStringField(
        this.handle,
        field as itemstringfield,
        value
      );
    }

    return false;
  }

  public setOwner(whichPlayer: MapPlayer, changeColor: boolean) {
    SetItemPlayer(this.handle, whichPlayer.handle, changeColor);
  }

  public static fromHandle(handle: item): Item {
    return this.getObject(handle);
  }

  public static isIdPawnable(itemId: ItemId) {
    return IsItemIdPawnable(itemId.value);
  }

  public static isIdPowerup(itemId: ItemId) {
    return IsItemIdPowerup(itemId.value);
  }

  public static isIdSellable(itemId: ItemId) {
    return IsItemIdSellable(itemId.value);
  }

  static get eventManipulated(): Item {
    return this.fromHandle(GetManipulatedItem());
  }

  static get eventSold(): Item {
    return this.fromHandle(GetSoldItem());
  }

  static get eventStackingTarget(): Item {
    return this.fromHandle(BlzGetStackingItemTarget());
  }

  static get eventStackingSource(): Item {
    return this.fromHandle(BlzGetStackingItemSource());
  }
}


export function forItemsInRect(rect: Rectangle, callback: (i: Item) => void) {
  EnumItemsInRect(rect.handle, null, () => {
    callback(Item.fromHandle(GetEnumItem()))
  });
}

export function forItemsInRange(pos: Vec2, radius: number, callback: (i: Item) => void) {
  const offset = vec2(radius + 32, radius + 32);
  const rect = new Rectangle(pos.sub(offset), pos.add(offset));

  const radiusSq = radius * radius;
  forItemsInRect(rect, i => {
    if (i.pos.distanceToSq(pos) < radiusSq) {
      callback(i);
    }
  });
  rect.destroy();
}