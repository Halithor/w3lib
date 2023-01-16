"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ubersplat = void 0;
const handle_1 = require("./handle");
class Ubersplat extends handle_1.Handle {
    constructor(x, y, name, red, green, blue, alpha, forcePaused, noBirthTime) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateUbersplat(x, y, name, red, green, blue, alpha, forcePaused, noBirthTime));
        }
    }
    destroy() {
        DestroyUbersplat(this.handle);
    }
    finish() {
        FinishUbersplat(this.handle);
    }
    render(flag, always = false) {
        if (always) {
            SetUbersplatRenderAlways(this.handle, flag);
        }
        else {
            SetUbersplatRender(this.handle, flag);
        }
    }
    reset() {
        ResetUbersplat(this.handle);
    }
    show(flag) {
        ShowUbersplat(this.handle, flag);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
}
exports.Ubersplat = Ubersplat;
//# sourceMappingURL=ubersplat.js.map