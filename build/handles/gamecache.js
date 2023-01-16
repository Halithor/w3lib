"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCache = void 0;
const handle_1 = require("./handle");
class GameCache extends handle_1.Handle {
    constructor(campaignFile) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(InitGameCache(campaignFile));
        }
        this.filename = campaignFile;
    }
    flush() {
        FlushGameCache(this.handle);
    }
    flushBoolean(missionKey, key) {
        FlushStoredBoolean(this.handle, missionKey, key);
    }
    flushInteger(missionKey, key) {
        FlushStoredInteger(this.handle, missionKey, key);
    }
    flushMission(missionKey) {
        FlushStoredMission(this.handle, missionKey);
    }
    flushNumber(missionKey, key) {
        FlushStoredInteger(this.handle, missionKey, key);
    }
    flushString(missionKey, key) {
        FlushStoredString(this.handle, missionKey, key);
    }
    flushUnit(missionKey, key) {
        FlushStoredUnit(this.handle, missionKey, key);
    }
    getBoolean(missionKey, key) {
        return GetStoredBoolean(this.handle, missionKey, key);
    }
    getInteger(missionKey, key) {
        return GetStoredInteger(this.handle, missionKey, key);
    }
    getNumber(missionKey, key) {
        return GetStoredReal(this.handle, missionKey, key);
    }
    getString(missionKey, key) {
        return GetStoredString(this.handle, missionKey, key);
    }
    hasBoolean(missionKey, key) {
        return HaveStoredBoolean(this.handle, missionKey, key);
    }
    hasInteger(missionKey, key) {
        return HaveStoredInteger(this.handle, missionKey, key);
    }
    hasNumber(missionKey, key) {
        return HaveStoredReal(this.handle, missionKey, key);
    }
    hasString(missionKey, key) {
        return HaveStoredString(this.handle, missionKey, key);
    }
    restoreUnit(missionKey, key, forWhichPlayer, x, y, face) {
        return RestoreUnit(this.handle, missionKey, key, forWhichPlayer.handle, x, y, face);
    }
    save() {
        return SaveGameCache(this.handle);
    }
    store(missionKey, key, value) {
        if (typeof value === 'string') {
            StoreString(this.handle, missionKey, key, value);
        }
        else if (typeof value === 'boolean') {
            StoreBoolean(this.handle, missionKey, key, value);
        }
        else if (typeof value === 'number') {
            StoreReal(this.handle, missionKey, key, value);
        }
        else {
            StoreUnit(this.handle, missionKey, key, value);
        }
    }
    syncBoolean(missionKey, key) {
        return SyncStoredBoolean(this.handle, missionKey, key);
    }
    syncInteger(missionKey, key) {
        return SyncStoredInteger(this.handle, missionKey, key);
    }
    syncNumber(missionKey, key) {
        return SyncStoredReal(this.handle, missionKey, key);
    }
    syncString(missionKey, key) {
        return SyncStoredString(this.handle, missionKey, key);
    }
    syncUnit(missionKey, key) {
        return SyncStoredUnit(this.handle, missionKey, key);
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    static reloadFromDisk() {
        return ReloadGameCachesFromDisk();
    }
}
exports.GameCache = GameCache;
//# sourceMappingURL=gamecache.js.map