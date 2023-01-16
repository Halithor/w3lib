"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerDialog = void 0;
const handle_1 = require("./handle");
class TimerDialog extends handle_1.Handle {
    constructor(t) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateTimerDialog(t.handle));
        }
    }
    get display() {
        return IsTimerDialogDisplayed(this.handle);
    }
    set display(display) {
        TimerDialogDisplay(this.handle, display);
    }
    destroy() {
        DestroyTimerDialog(this.handle);
    }
    setSpeed(speedMultFactor) {
        TimerDialogSetSpeed(this.handle, speedMultFactor);
    }
    setTimeRemaining(value) {
        TimerDialogSetRealTimeRemaining(this.handle, value);
    }
    setTitle(title) {
        TimerDialogSetTitle(this.handle, title);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
}
exports.TimerDialog = TimerDialog;
//# sourceMappingURL=timerdialog.js.map