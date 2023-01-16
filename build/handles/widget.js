"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
const handle_1 = require("./handle");
class Widget extends handle_1.Handle {
    get life() {
        return GetWidgetLife(this.handle);
    }
    set life(value) {
        SetWidgetLife(this.handle, value);
    }
    get x() {
        return GetWidgetX(this.handle);
    }
    get y() {
        return GetWidgetY(this.handle);
    }
    static fromEvent() {
        return this.fromHandle(GetTriggerWidget());
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    static get eventTriggering() {
        return this.fromHandle(GetTriggerWidget());
    }
    static get eventOrderTarget() {
        return this.fromHandle(GetOrderTarget());
    }
}
exports.Widget = Widget;
//# sourceMappingURL=widget.js.map