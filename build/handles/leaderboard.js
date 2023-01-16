"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const handle_1 = require("./handle");
class Leaderboard extends handle_1.Handle {
    constructor() {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateLeaderboard());
        }
    }
    addItem(label, value, p) {
        LeaderboardAddItem(this.handle, label, value, p.handle);
    }
    clear() {
        LeaderboardClear(this.handle);
    }
    destroy() {
        DestroyLeaderboard(this.handle);
    }
    display(flag = true) {
        LeaderboardDisplay(this.handle, flag);
    }
    get displayed() {
        return IsLeaderboardDisplayed(this.handle);
    }
    get itemCount() {
        return LeaderboardGetItemCount(this.handle);
    }
    set itemCount(count) {
        LeaderboardSetSizeByItemCount(this.handle, count);
    }
    getPlayerIndex(p) {
        return LeaderboardGetPlayerIndex(this.handle, p.handle);
    }
    hasPlayerItem(p) {
        LeaderboardHasPlayerItem(this.handle, p.handle);
    }
    removeItem(index) {
        LeaderboardRemoveItem(this.handle, index);
    }
    removePlayerItem(p) {
        LeaderboardRemovePlayerItem(this.handle, p.handle);
    }
    setItemLabel(item, label) {
        LeaderboardSetItemLabel(this.handle, item, label);
    }
    setItemLabelColor(item, red, green, blue, alpha) {
        LeaderboardSetItemLabelColor(this.handle, item, red, green, blue, alpha);
    }
    setItemStyle(item, showLabel = true, showValues = true, showIcons = true) {
        LeaderboardSetItemStyle(this.handle, item, showLabel, showValues, showIcons);
    }
    setItemValue(item, value) {
        LeaderboardSetItemValue(this.handle, item, value);
    }
    setItemValueColor(item, red, green, blue, alpha) {
        LeaderboardSetItemValueColor(this.handle, item, red, green, blue, alpha);
    }
    setLabelColor(red, green, blue, alpha) {
        LeaderboardSetLabelColor(this.handle, red, green, blue, alpha);
    }
    setPlayerBoard(p) {
        PlayerSetLeaderboard(p.handle, this.handle);
    }
    setStyle(showLabel = true, showNames = true, showValues = true, showIcons = true) {
        LeaderboardSetStyle(this.handle, showLabel, showNames, showValues, showIcons);
    }
    setValueColor(red, green, blue, alpha) {
        LeaderboardSetValueColor(this.handle, red, green, blue, alpha);
    }
    sortByLabel(asc = true) {
        LeaderboardSortItemsByLabel(this.handle, asc);
    }
    sortByPlayer(asc = true) {
        LeaderboardSortItemsByPlayer(this.handle, asc);
    }
    sortByValue(asc = true) {
        LeaderboardSortItemsByValue(this.handle, asc);
    }
    set label(value) {
        LeaderboardSetLabel(this.handle, value);
    }
    get label() {
        return LeaderboardGetLabelText(this.handle);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    static fromPlayer(p) {
        return this.fromHandle(PlayerGetLeaderboard(p.handle));
    }
}
exports.Leaderboard = Leaderboard;
//# sourceMappingURL=leaderboard.js.map