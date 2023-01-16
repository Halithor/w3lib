"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Force = void 0;
const handle_1 = require("./handle");
const player_1 = require("./player");
class Force extends handle_1.Handle {
    constructor() {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateForce());
        }
    }
    addPlayer(whichPlayer) {
        ForceAddPlayer(this.handle, whichPlayer.handle);
    }
    clear() {
        ForceClear(this.handle);
    }
    destroy() {
        DestroyForce(this.handle);
    }
    enumAllies(whichPlayer, filter) {
        ForceEnumAllies(this.handle, whichPlayer.handle, filter);
    }
    enumEnemies(whichPlayer, filter) {
        ForceEnumEnemies(this.handle, whichPlayer.handle, filter);
    }
    enumPlayers(filter) {
        ForceEnumPlayers(this.handle, filter);
    }
    enumPlayersCounted(filter, countLimit) {
        ForceEnumPlayersCounted(this.handle, filter, countLimit);
    }
    for(callback) {
        ForForce(this.handle, callback);
    }
    forEach(callback) {
        let idx = 0;
        this.for(() => {
            callback(player_1.MapPlayer.fromEnum(), idx);
            idx++;
        });
    }
    hasPlayer(whichPlayer) {
        return IsPlayerInForce(whichPlayer.handle, this.handle);
    }
    removePlayer(whichPlayer) {
        ForceRemovePlayer(this.handle, whichPlayer.handle);
    }
    get size() {
        let size = 0;
        this.for(() => size++);
        return size;
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    static get allPlayers() {
        return Force.fromHandle(bj_FORCE_ALL_PLAYERS);
    }
}
exports.Force = Force;
//# sourceMappingURL=force.js.map