"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handle = void 0;
const map = new WeakMap();
class Handle {
    constructor(handle) {
        this.handle = handle === undefined ? Handle.initHandle : handle;
        map.set(this.handle, this);
    }
    get id() {
        return GetHandleId(this.handle);
    }
    static initFromHandle() {
        return Handle.initHandle !== undefined;
    }
    static getObject(handle) {
        const obj = map.get(handle);
        if (obj !== undefined) {
            return obj;
        }
        Handle.initHandle = handle;
        const newObj = new this();
        Handle.initHandle = undefined;
        return newObj;
    }
}
exports.Handle = Handle;
//# sourceMappingURL=handle.js.map