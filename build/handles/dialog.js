"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = exports.DialogButton = void 0;
const handle_1 = require("./handle");
class DialogButton extends handle_1.Handle {
    constructor(whichDialog, text, hotkey = 0, quit = false, score = false) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else if (!quit) {
            super(DialogAddButton(whichDialog.handle, text, hotkey));
        }
        else {
            super(DialogAddQuitButton(whichDialog.handle, score, text, hotkey));
        }
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
}
exports.DialogButton = DialogButton;
class Dialog extends handle_1.Handle {
    constructor() {
        super(handle_1.Handle.initFromHandle() ? undefined : DialogCreate());
    }
    addButton(text, hotkey = 0, quit = false, score = false) {
        return new DialogButton(this, text, hotkey, quit, score);
    }
    clear() {
        DialogClear(this.handle);
    }
    destroy() {
        DialogDestroy(this.handle);
    }
    display(whichPlayer, flag) {
        DialogDisplay(whichPlayer.handle, this.handle, flag);
    }
    setMessage(whichMessage) {
        DialogSetMessage(this.handle, whichMessage);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
}
exports.Dialog = Dialog;
//# sourceMappingURL=dialog.js.map