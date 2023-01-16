"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.forUnitsOfPlayer = exports.countUnitsInRange = exports.countUnitsInRect = exports.forUnitsInRect = exports.getUnitsInRect = exports.findNearestUnit = exports.getRandomUnitInRange = exports.forUnitsInRange = exports.getUnitsInRange = exports.groupOf = exports.Group = void 0;
const handle_1 = require("./handle");
const unit_1 = require("./unit");
class Group extends handle_1.Handle {
    constructor() {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateGroup());
        }
    }
    addGroupFast(addGroup) {
        return BlzGroupAddGroupFast(addGroup.handle, this.handle);
    }
    addUnit(whichUnit) {
        return GroupAddUnit(this.handle, whichUnit.handle);
    }
    clear() {
        GroupClear(this.handle);
    }
    destroy() {
        DestroyGroup(this.handle);
    }
    enumUnitsInRange(pos, radius, filter) {
        if (filter != null) {
            GroupEnumUnitsInRange(this.handle, pos.x, pos.y, radius, Filter(filter));
        }
        else {
            GroupEnumUnitsInRange(this.handle, pos.x, pos.y, radius, null);
        }
    }
    enumUnitsInRangeCounted(pos, radius, filter, countLimit) {
        if (filter != null) {
            GroupEnumUnitsInRangeCounted(this.handle, pos.x, pos.y, radius, Filter(filter), countLimit);
        }
        else {
            GroupEnumUnitsInRangeCounted(this.handle, pos.x, pos.y, radius, null, countLimit);
        }
    }
    enumUnitsInRect(r, filter = null) {
        if (filter != null) {
            GroupEnumUnitsInRect(this.handle, r.handle, Filter(filter));
        }
        else {
            GroupEnumUnitsInRect(this.handle, r.handle, null);
        }
    }
    enumUnitsInRectCounted(r, filter, countLimit) {
        if (filter != null) {
            GroupEnumUnitsInRectCounted(this.handle, r.handle, Filter(filter), countLimit);
        }
        else {
            GroupEnumUnitsInRectCounted(this.handle, r.handle, null, countLimit);
        }
    }
    enumUnitsOfPlayer(whichPlayer, filter) {
        if (filter != undefined) {
            GroupEnumUnitsOfPlayer(this.handle, whichPlayer.handle, Filter(filter));
        }
        else {
            GroupEnumUnitsOfPlayer(this.handle, whichPlayer.handle, null);
        }
    }
    enumUnitsOfType(unitName, filter) {
        if (filter != null) {
            GroupEnumUnitsOfType(this.handle, unitName, Filter(filter));
        }
        else {
            GroupEnumUnitsOfType(this.handle, unitName, null);
        }
    }
    enumUnitsOfTypeCounted(unitName, filter, countLimit) {
        if (filter != null) {
            GroupEnumUnitsOfTypeCounted(this.handle, unitName, Filter(filter), countLimit);
        }
        else {
            GroupEnumUnitsOfTypeCounted(this.handle, unitName, null, countLimit);
        }
    }
    enumUnitsSelected(whichPlayer, filter) {
        if (filter != null) {
            GroupEnumUnitsSelected(this.handle, whichPlayer.handle, Filter(filter));
        }
        else {
            GroupEnumUnitsSelected(this.handle, whichPlayer.handle, null);
        }
    }
    for(callback) {
        ForGroup(this.handle, callback);
    }
    forEach(callback) {
        this.for(() => {
            callback(Group.getEnumUnit());
        });
    }
    map(callback) {
        const result = [];
        this.forEach(u => result.push(callback(u)));
        return result;
    }
    get first() {
        return unit_1.Unit.fromHandle(FirstOfGroup(this.handle));
    }
    get size() {
        return BlzGroupGetSize(this.handle);
    }
    random() {
        return this.getUnitAt(Math.floor(Math.random() * this.size));
    }
    getUnitAt(index) {
        return unit_1.Unit.fromHandle(BlzGroupUnitAt(this.handle, index));
    }
    hasUnit(whichUnit) {
        return IsUnitInGroup(whichUnit.handle, this.handle);
    }
    orderCoords(order, pos) {
        if (typeof order === 'string') {
            GroupPointOrder(this.handle, order, pos.x, pos.y);
        }
        else {
            GroupPointOrderById(this.handle, order, pos.x, pos.y);
        }
    }
    orderImmediate(order) {
        if (typeof order === 'string') {
            GroupImmediateOrder(this.handle, order);
        }
        else {
            GroupImmediateOrderById(this.handle, order);
        }
    }
    orderTarget(order, targetWidget) {
        if (typeof order === 'string') {
            GroupTargetOrder(this.handle, order, targetWidget.handle);
        }
        else {
            GroupTargetOrderById(this.handle, order, targetWidget.handle);
        }
    }
    removeGroupFast(removeGroup) {
        return BlzGroupRemoveGroupFast(this.handle, removeGroup.handle);
    }
    removeUnit(whichUnit) {
        return GroupRemoveUnit(this.handle, whichUnit.handle);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    static getEnumUnit() {
        return unit_1.Unit.fromHandle(GetEnumUnit());
    }
    static getFilterUnit() {
        return unit_1.Unit.fromHandle(GetFilterUnit());
    }
}
exports.Group = Group;
/**
 * Construct a group of the provided units.
 */
function groupOf(...units) {
    const grp = new Group();
    units.forEach(u => grp.addUnit(u));
    return grp;
}
exports.groupOf = groupOf;
const maxCollisionSize = 200.0;
function getUnitsInRange(pos, radius, filter, collisionSizeFiltering = false) {
    const enumGroup = new Group();
    if (collisionSizeFiltering) {
        enumGroup.enumUnitsInRange(pos, radius + maxCollisionSize, () => {
            const u = unit_1.Unit.fromHandle(GetFilterUnit());
            return u.inRange(pos, radius) && (filter != null ? filter(u) : true);
        });
    }
    else {
        if (filter != null) {
            enumGroup.enumUnitsInRange(pos, radius, () => filter(unit_1.Unit.fromHandle(GetFilterUnit())));
        }
        else {
            enumGroup.enumUnitsInRange(pos, radius, null);
        }
    }
    return enumGroup;
}
exports.getUnitsInRange = getUnitsInRange;
// Iterate over all units in range calling the callback
function forUnitsInRange(pos, radius, callback, collisionSizeFiltering = false) {
    const enumGroup = getUnitsInRange(pos, radius, null, collisionSizeFiltering);
    enumGroup.for(() => {
        callback(unit_1.Unit.fromHandle(GetEnumUnit()));
    });
    enumGroup.destroy();
}
exports.forUnitsInRange = forUnitsInRange;
// Get a random unit in range, matching the provided filter.
function getRandomUnitInRange(pos, radius, filter, collisionSizeFiltering = false) {
    const enumGroup = getUnitsInRange(pos, radius, filter, collisionSizeFiltering);
    const u = enumGroup.getUnitAt(GetRandomInt(0, enumGroup.size - 1));
    enumGroup.destroy();
    return u;
}
exports.getRandomUnitInRange = getRandomUnitInRange;
// Executes a callback on the nearest unit
function findNearestUnit(pos, range, filter) {
    const enumGroup = new Group();
    let filterUnit = null;
    if (filter != null) {
        filterUnit = () => {
            const u = unit_1.Unit.fromHandle(GetFilterUnit());
            return filter(u);
        };
    }
    enumGroup.enumUnitsInRange(pos, range, filterUnit);
    if (enumGroup.size == 0) {
        return null;
    }
    let nearest = enumGroup.first;
    let bestDist = 2147483647; // max int32
    enumGroup.for(() => {
        const u = unit_1.Unit.fromHandle(GetEnumUnit());
        const distSq = pos.distanceTo(u.pos);
        if (distSq < bestDist) {
            bestDist = distSq;
            nearest = u;
        }
    });
    enumGroup.destroy();
    return nearest;
}
exports.findNearestUnit = findNearestUnit;
function getUnitsInRect(rct, filter = null) {
    const enumGroup = new Group();
    if (filter != null) {
        enumGroup.enumUnitsInRect(rct, () => filter(unit_1.Unit.fromHandle(GetFilterUnit())));
    }
    else {
        enumGroup.enumUnitsInRect(rct, null);
    }
    return enumGroup;
}
exports.getUnitsInRect = getUnitsInRect;
function forUnitsInRect(rct, callback) {
    const enumGroup = new Group();
    enumGroup.enumUnitsInRect(rct, null);
    enumGroup.for(() => {
        callback(unit_1.Unit.fromHandle(GetEnumUnit()));
    });
    enumGroup.destroy();
}
exports.forUnitsInRect = forUnitsInRect;
function countUnitsInRect(rct) {
    let count = 0;
    forUnitsInRect(rct, u => {
        count++;
    });
    return count;
}
exports.countUnitsInRect = countUnitsInRect;
function countUnitsInRange(pos, radius, collisionSizeFiltering = false) {
    let count = 0;
    forUnitsInRange(pos, radius, () => count++, collisionSizeFiltering);
    return count;
}
exports.countUnitsInRange = countUnitsInRange;
function forUnitsOfPlayer(whichPlayer, callback) {
    const g = new Group();
    g.enumUnitsOfPlayer(whichPlayer), g.forEach(u => callback(u));
    g.destroy();
}
exports.forUnitsOfPlayer = forUnitsOfPlayer;
//# sourceMappingURL=group.js.map