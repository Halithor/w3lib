"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quest = exports.QuestItem = void 0;
const handle_1 = require("./handle");
class QuestItem extends handle_1.Handle {
    constructor(whichQuest) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(QuestCreateItem(whichQuest.handle));
        }
    }
    setDescription(description) {
        QuestItemSetDescription(this.handle, description);
    }
    get completed() {
        return IsQuestItemCompleted(this.handle);
    }
    set completed(completed) {
        QuestItemSetCompleted(this.handle, completed);
    }
}
exports.QuestItem = QuestItem;
class Quest extends handle_1.Handle {
    constructor() {
        super(handle_1.Handle.initFromHandle() ? undefined : CreateQuest());
    }
    get completed() {
        return IsQuestCompleted(this.handle);
    }
    set completed(completed) {
        QuestSetCompleted(this.handle, completed);
    }
    get discovered() {
        return IsQuestDiscovered(this.handle);
    }
    set discovered(discovered) {
        QuestSetDiscovered(this.handle, discovered);
    }
    get enabled() {
        return IsQuestEnabled(this.handle);
    }
    set enabled(enabled) {
        QuestSetEnabled(this.handle, enabled);
    }
    get failed() {
        return IsQuestFailed(this.handle);
    }
    set failed(failed) {
        QuestSetFailed(this.handle, failed);
    }
    get required() {
        return IsQuestRequired(this.handle);
    }
    set required(required) {
        QuestSetRequired(this.handle, required);
    }
    addItem(description) {
        const questItem = new QuestItem(this);
        questItem.setDescription(description);
        return questItem;
    }
    destroy() {
        DestroyQuest(this.handle);
    }
    setDescription(description) {
        QuestSetDescription(this.handle, description);
    }
    setIcon(iconPath) {
        QuestSetIconPath(this.handle, iconPath);
    }
    setTitle(title) {
        QuestSetTitle(this.handle, title);
    }
    static flashQuestDialogButton() {
        FlashQuestDialogButton();
    }
    static forceQuestDialogUpdate() {
        ForceQuestDialogUpdate();
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
}
exports.Quest = Quest;
//# sourceMappingURL=quest.js.map