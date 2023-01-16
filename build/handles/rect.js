"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const index_1 = require("../math/index");
const handle_1 = require("./handle");
class Rectangle extends handle_1.Handle {
    constructor(min, max) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(Rect(min.x, min.y, max.x, max.y));
        }
    }
    get centerX() {
        return GetRectCenterX(this.handle);
    }
    get centerY() {
        return GetRectCenterY(this.handle);
    }
    get center() {
        return index_1.vec2(this.centerX, this.centerY);
    }
    get maxX() {
        return GetRectMaxX(this.handle);
    }
    get maxY() {
        return GetRectMaxY(this.handle);
    }
    get minX() {
        return GetRectMinX(this.handle);
    }
    get minY() {
        return GetRectMinY(this.handle);
    }
    get min() {
        return index_1.vec2(this.minX, this.minY);
    }
    get max() {
        return index_1.vec2(this.maxX, this.maxY);
    }
    destroy() {
        RemoveRect(this.handle);
    }
    contains(pos) {
        return RectContainsCoords(this.handle, pos.x, pos.y);
    }
    enumDestructables(filter, actionFunc) {
        EnumDestructablesInRect(this.handle, filter, actionFunc);
    }
    enumItems(filter, actionFunc) {
        EnumItemsInRect(this.handle, filter, actionFunc);
    }
    move(newCenter) {
        MoveRectTo(this.handle, newCenter.x, newCenter.y);
    }
    setRect(min, max) {
        SetRect(this.handle, min.x, min.y, max.x, max.y);
    }
    randomPos() {
        const x = math.random(this.minX, this.maxX);
        const y = math.random(this.minY, this.maxY);
        return index_1.vec2(x, y);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    // Returns full map bounds, including unplayable borders, in world coordinates
    static getWorldBounds() {
        return Rectangle.fromHandle(GetWorldBounds());
    }
    static getPlayableArea() {
        return Rectangle.fromHandle(GetPlayableMapRect());
    }
}
exports.Rectangle = Rectangle;
//# sourceMappingURL=rect.js.map