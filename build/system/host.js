"use strict";
/** @noSelfInFile */
Object.defineProperty(exports, "__esModule", { value: true });
exports.onHostDetect = exports.getHost = void 0;
const index_1 = require("../handles/index");
const timer_1 = require("../handles/timer");
const index_2 = require("../hooks/index");
const base64_1 = require("./base64");
const binaryreader_1 = require("./binaryreader");
const binarywriter_1 = require("./binarywriter");
const sync_1 = require("./sync");
const lobbyTimes = [];
const hostCallbacks = [];
let localJoinTime = 0;
let localStartTime = 0;
let host;
let isChecking = false;
function getHost() {
    if (host) {
        return host;
    }
    else if (!isChecking) {
        timer_1.doAfter(0, findHost);
    }
    return;
}
exports.getHost = getHost;
function onHostDetect(callback) {
    if (host) {
        callback();
    }
    else {
        hostCallbacks.push(callback);
    }
}
exports.onHostDetect = onHostDetect;
function onConfig() {
    if (localJoinTime === 0) {
        localJoinTime = os.clock();
    }
}
function findHost() {
    isChecking = true;
    if (localStartTime === 0) {
        localStartTime = os.clock();
    }
    // sync each players total game time
    const writer = new binarywriter_1.BinaryWriter();
    writer.writeFloat(localStartTime - localJoinTime);
    new sync_1.SyncRequest(index_1.MapPlayer.fromLocal(), base64_1.base64Encode(writer.toString()))
        .then((res, req) => {
        const data = base64_1.base64Decode(res.data);
        const reader = new binaryreader_1.BinaryReader(data);
        const syncedTime = reader.readFloat();
        // store how long the player has been in the game
        const from = index_1.MapPlayer.fromEvent();
        lobbyTimes[from.id] = syncedTime;
        // check which player has been in the game the longest
        let hostTime = 0;
        let hostId = 0;
        for (let i = 0; i < bj_MAX_PLAYERS; i++) {
            const p = index_1.MapPlayer.fromIndex(i);
            // skip if the player is not playing
            if (p.slotState !== PLAYER_SLOT_STATE_PLAYING ||
                p.controller !== MAP_CONTROL_USER) {
                continue;
            }
            // if a playing user has not yet finished syncing then terminate execution
            if (!lobbyTimes[p.id]) {
                return;
            }
            // store the host with the longest game time
            if (lobbyTimes[p.id] > hostTime) {
                hostTime = lobbyTimes[p.id];
                hostId = p.id;
            }
        }
        // set the host, cleanup, and execute callbacks
        host = index_1.MapPlayer.fromIndex(hostId);
        for (const cb of hostCallbacks) {
            cb();
        }
    })
        .catch(res => {
        print(`findHost Error: ${res.status}`);
        isChecking = false;
    });
}
function onMain() {
    timer_1.doAfter(0.0, findHost);
}
index_2.addScriptHook(index_2.W3TS_HOOK.MAIN_AFTER, onMain);
index_2.addScriptHook(index_2.W3TS_HOOK.CONFIG_BEFORE, onConfig);
//# sourceMappingURL=host.js.map