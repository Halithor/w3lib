"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = void 0;
const handle_1 = require("./handle");
const rect_1 = require("./rect");
class Region extends handle_1.Handle {
    constructor() {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateRegion());
        }
    }
    addCell(pos) {
        RegionAddCell(this.handle, pos.x, pos.y);
    }
    addRect(r) {
        RegionAddRect(this.handle, r.handle);
    }
    clearCell(pos) {
        RegionClearCell(this.handle, pos.x, pos.y);
    }
    clearRect(r) {
        RegionClearRect(this.handle, r.handle);
    }
    containsCoords(pos) {
        return IsPointInRegion(this.handle, pos.x, pos.y);
    }
    containsUnit(whichUnit) {
        return IsUnitInRegion(this.handle, whichUnit.handle);
    }
    destroy() {
        RemoveRegion(this.handle);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    static fromRect(rect) {
        const reg = new Region();
        reg.addRect(rect_1.Rectangle.fromHandle(rect));
        return reg;
    }
}
exports.Region = Region;
//# sourceMappingURL=region.js.map