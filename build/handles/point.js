"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const handle_1 = require("./handle");
class Point extends handle_1.Handle {
    constructor(x, y) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(Location(x, y));
        }
    }
    get x() {
        return GetLocationX(this.handle);
    }
    set x(value) {
        MoveLocation(this.handle, value, this.y);
    }
    get y() {
        return GetLocationY(this.handle);
    }
    set y(value) {
        MoveLocation(this.handle, this.x, value);
    }
    /**
     * This function is asynchronous. The values it returns are not guaranteed synchronous between each player.
     * If you attempt to use it in a synchronous manner, it may cause a desync.
     */
    get z() {
        return GetLocationZ(this.handle);
    }
    destroy() {
        RemoveLocation(this.handle);
    }
    setPosition(x, y) {
        MoveLocation(this.handle, x, y);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
}
exports.Point = Point;
//# sourceMappingURL=point.js.map