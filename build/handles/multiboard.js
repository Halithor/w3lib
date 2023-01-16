"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multiboard = exports.MultiboardItem = void 0;
const handle_1 = require("./handle");
class MultiboardItem extends handle_1.Handle {
    constructor(multiboard, row, col) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(MultiboardGetItem(multiboard.handle, row, col));
        }
    }
    destroy() {
        MultiboardReleaseItem(this.handle);
    }
    set icon(val) {
        MultiboardSetItemIcon(this.handle, val);
    }
    set text(val) {
        MultiboardSetItemValue(this.handle, val);
    }
    set textColor(val) {
        MultiboardSetItemValueColor(this.handle, val.red, val.green, val.blue, val.alpha);
    }
    set width(val) {
        MultiboardSetItemWidth(this.handle, val);
    }
    setStyle(showText, showIcon) {
        MultiboardSetItemStyle(this.handle, showText, showIcon);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
}
exports.MultiboardItem = MultiboardItem;
class Multiboard extends handle_1.Handle {
    constructor() {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateMultiboard());
        }
        this.items = [];
    }
    item(row, col) {
        const index = row * this.cols + col;
        if (!this.items[index]) {
            this.items[index] = new MultiboardItem(this, row, col);
        }
        return this.items[index];
    }
    get cols() {
        return MultiboardGetColumnCount(this.handle);
    }
    set cols(val) {
        MultiboardSetColumnCount(this.handle, val);
        this.cleanupItems();
    }
    get rows() {
        return MultiboardGetRowCount(this.handle);
    }
    set rows(val) {
        MultiboardSetRowCount(this.handle, val);
        this.cleanupItems();
    }
    get displayed() {
        return IsMultiboardDisplayed(this.handle);
    }
    set displayed(val) {
        MultiboardDisplay(this.handle, val);
    }
    get title() {
        return MultiboardGetTitleText(this.handle);
    }
    set title(val) {
        MultiboardSetTitleText(this.handle, val);
    }
    set titleColor(val) {
        MultiboardSetTitleTextColor(this.handle, val.red, val.green, val.blue, val.alpha);
    }
    clear() {
        MultiboardClear(this.handle);
    }
    destroy() {
        this.cleanupItems();
        DestroyMultiboard(this.handle);
    }
    minimize(flag) {
        MultiboardMinimize(this.handle, flag);
    }
    minimizedForLocalPlayer() {
        return IsMultiboardMinimized(this.handle);
    }
    setAllItemsIcon(iconPath) {
        MultiboardSetItemsIcon(this.handle, iconPath);
    }
    setAllItemsStyle(showText, showIcons) {
        MultiboardSetItemsStyle(this.handle, showText, showIcons);
    }
    setAllItemsText(val) {
        MultiboardSetItemsValue(this.handle, val);
    }
    setAllItemsTextColor(val) {
        MultiboardSetItemsValueColor(this.handle, val.red, val.green, val.blue, val.alpha);
    }
    setAllItemsTextWidth(val) {
        MultiboardSetItemsWidth(this.handle, val);
    }
    setColWidth(col, width) {
        this.column(col).forEach(item => item.width = width);
    }
    /** Get all items in a column, top to bottom */
    column(col) {
        const items = [];
        for (let row = 0; row < this.rows; row++) {
            items.push(this.item(row, col));
        }
        return items;
    }
    cleanupItems() {
        this.items.forEach(mbitem => {
            mbitem.destroy();
        });
        this.items = [];
    }
    /** Suspend the display of all existing and future multiboards. */
    static supressDisplay(flag) {
        MultiboardSuppressDisplay(flag);
    }
}
exports.Multiboard = Multiboard;
//# sourceMappingURL=multiboard.js.map