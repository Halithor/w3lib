"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const common_1 = require("../common");
const index_1 = require("../math/index");
const handle_1 = require("./handle");
const widget_1 = require("./widget");
class Item extends widget_1.Widget {
    constructor(itemId, pos, skinId) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(skinId
                ? BlzCreateItemWithSkin(itemId.value, pos.x, pos.y, skinId)
                : CreateItem(itemId.value, pos.x, pos.y));
        }
    }
    get charges() {
        return GetItemCharges(this.handle);
    }
    set charges(value) {
        SetItemCharges(this.handle, value);
    }
    set invulnerable(flag) {
        SetItemInvulnerable(this.handle, true);
    }
    get invulnerable() {
        return IsItemInvulnerable(this.handle);
    }
    get level() {
        return GetItemLevel(this.handle);
    }
    set iconPath(value) {
        BlzSetItemIconPath(this.handle, value);
    }
    get name() {
        return GetItemName(this.handle);
    }
    set name(value) {
        BlzSetItemName(this.handle, value);
    }
    set tooltip(value) {
        BlzSetItemTooltip(this.handle, value);
    }
    set tooltipExtended(value) {
        BlzSetItemExtendedTooltip(this.handle, value);
    }
    set description(value) {
        BlzSetItemDescription(this.handle, value);
    }
    get pawnable() {
        return IsItemPawnable(this.handle);
    }
    set pawnable(flag) {
        SetItemPawnable(this.handle, flag);
    }
    get player() {
        return GetItemPlayer(this.handle);
    }
    get type() {
        return GetItemType(this.handle);
    }
    get typeId() {
        return common_1.ItemId.of(GetItemTypeId(this.handle));
    }
    get userData() {
        return GetItemUserData(this.handle);
    }
    set userData(value) {
        SetItemUserData(this.handle, value);
    }
    get visible() {
        return IsItemVisible(this.handle);
    }
    set visible(flag) {
        SetItemVisible(this.handle, flag);
    }
    get skin() {
        return BlzGetItemSkin(this.handle);
    }
    set skin(skinId) {
        BlzSetItemSkin(this.handle, skinId);
    }
    get x() {
        return GetItemX(this.handle);
    }
    set x(value) {
        SetItemPosition(this.handle, value, this.y);
    }
    get y() {
        return GetItemY(this.handle);
    }
    set y(value) {
        SetItemPosition(this.handle, this.x, value);
    }
    set pos(value) {
        SetItemPosition(this.handle, value.x, value.y);
    }
    get pos() {
        return index_1.vec2(this.x, this.y);
    }
    destroy() {
        RemoveItem(this.handle);
    }
    getField(field) {
        const fieldType = field.toString().substr(0, field.toString().indexOf(':'));
        switch (fieldType) {
            case 'unitbooleanfield':
                return BlzGetItemBooleanField(this.handle, field);
            case 'unitintegerfield':
                return BlzGetItemIntegerField(this.handle, field);
            case 'unitrealfield':
                return BlzGetItemRealField(this.handle, field);
            case 'unitstringfield':
                return BlzGetItemStringField(this.handle, field);
            default:
                return 0;
        }
    }
    isOwned() {
        return IsItemOwned(this.handle);
    }
    isPawnable() {
        return IsItemPawnable(this.handle);
    }
    isPowerup() {
        return IsItemPowerup(this.handle);
    }
    isSellable() {
        return IsItemSellable(this.handle);
    }
    setDropId(unitId) {
        SetItemDropID(this.handle, unitId);
    }
    setDropOnDeath(flag) {
        SetItemDropOnDeath(this.handle, flag);
    }
    setDroppable(flag) {
        SetItemDroppable(this.handle, flag);
    }
    setField(field, value) {
        const fieldType = field.toString().substr(0, field.toString().indexOf(':'));
        if (fieldType === 'unitbooleanfield' && typeof value === 'boolean') {
            return BlzSetItemBooleanField(this.handle, field, value);
        }
        else if (fieldType === 'unitintegerfield' && typeof value === 'number') {
            return BlzSetItemIntegerField(this.handle, field, value);
        }
        else if (fieldType === 'unitrealfield' && typeof value === 'number') {
            return BlzSetItemRealField(this.handle, field, value);
        }
        else if (fieldType === 'unitstringfield' && typeof value === 'string') {
            return BlzSetItemStringField(this.handle, field, value);
        }
        return false;
    }
    setOwner(whichPlayer, changeColor) {
        SetItemPlayer(this.handle, whichPlayer.handle, changeColor);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    static isIdPawnable(itemId) {
        return IsItemIdPawnable(itemId.value);
    }
    static isIdPowerup(itemId) {
        return IsItemIdPowerup(itemId.value);
    }
    static isIdSellable(itemId) {
        return IsItemIdSellable(itemId.value);
    }
    static get eventManipulated() {
        return this.fromHandle(GetManipulatedItem());
    }
    static get eventSold() {
        return this.fromHandle(GetSoldItem());
    }
    static get eventStackingTarget() {
        return this.fromHandle(BlzGetStackingItemTarget());
    }
    static get eventStackingSource() {
        return this.fromHandle(BlzGetStackingItemSource());
    }
}
exports.Item = Item;
//# sourceMappingURL=item.js.map