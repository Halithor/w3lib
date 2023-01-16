"use strict";
/** @noSelfInFile */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncRequest = void 0;
const player_1 = require("../handles/player");
const timer_1 = require("../handles/timer");
const trigger_1 = require("../handles/trigger");
const base64_1 = require("./base64");
const binaryreader_1 = require("./binaryreader");
const binarywriter_1 = require("./binarywriter");
const gametime_1 = require("./gametime");
const SYNC_PREFIX = "T";
const SYNC_PREFIX_CHUNK = "S";
const SYNC_MAX_CHUNK_SIZE = 244;
class SyncIncomingPacket {
    constructor(prefix, data) {
        const isChunk = prefix === SYNC_PREFIX_CHUNK;
        const header = base64_1.base64Decode(isChunk ? data.substr(0, 10) : data.substr(0, 5));
        const reader = new binaryreader_1.BinaryReader(header);
        const id = reader.readUInt16();
        this.req = SyncRequest.fromIndex(id);
        this.chunks = isChunk ? reader.readUInt16() : 0;
        this.chunk = isChunk ? reader.readUInt16() : 0;
        this.data = isChunk ? data.substr(10) : data.substr(5);
    }
}
class SyncOutgoingPacket {
    constructor(req, data, chunk = -1, totalChunks = 0) {
        this.req = req;
        this.data = data;
        this.chunk = chunk;
        this.chunks = totalChunks;
    }
    getHeader() {
        const writer = new binarywriter_1.BinaryWriter();
        writer.writeUInt16(this.req.id);
        if (this.chunk !== -1) {
            writer.writeUInt16(this.chunks);
            writer.writeUInt16(this.chunk);
        }
        return base64_1.base64Encode(writer.toString());
    }
    toString() {
        const header = this.getHeader();
        const writer = new binarywriter_1.BinaryWriter();
        writer.writeString(this.data);
        return header + writer.toString();
    }
}
/**
 * A system which provides an easy way to synchronize data between game clients.
 * The data will be split into chunks and sent in order until all of them are recieved by
 * every player. Splitting the data is required as `BlzSendSyncData` only allows 255 characters
 * per request.
 *
 * @example
 * ```ts
 * const data = File.read("savecode.txt");
 *
 * // Synchronize the contents of the file from the first player's computer.
 * new SyncRequest(Players[0], data).then((res, req) => {
 *  print(res.data);
 * });
 * ```
 */
class SyncRequest {
    /**
     * Creates a new sync request. The data will be sent immediately if `data` is not empty.
     * @param from The player to send the data from.
     * @param data The data to send.
     * @param options The options of the request such as timeout.
     */
    constructor(from, data, options) {
        this._startTime = 0;
        this.chunks = [];
        this.currentChunk = 0;
        this.destroyed = false;
        this.status = 0 /* None */;
        // initialize
        this.options = !options ? SyncRequest.defaultOptions : options;
        this.from = from;
        // TODO: test this change
        this.id = SyncRequest.allocate();
        SyncRequest.indicies[this.id] = -1;
        SyncRequest.cache[this.id] = this;
        SyncRequest.init();
        if (typeof data === "string") {
            this.start(data);
        }
    }
    /**
     * Get the time that the sync request started syncing.
     */
    get startTime() {
        return this._startTime;
    }
    /**
     * Sets the callback for when a request failed.
     * @param callback
     */
    catch(callback) {
        this.onError = callback;
        return this;
    }
    /**
     * Recycles the request index and prevents it from sending any more data.
     */
    destroy() {
        SyncRequest.indicies[this.id] = SyncRequest.index;
        SyncRequest.index = this.id;
        this.destroyed = true;
    }
    /**
     * Start syncing
     * @param data The data to sync. If data was passed to the constructor then nothing will happen.
     */
    start(data) {
        if (this.status !== 0 /* None */ || this.destroyed) {
            return false;
        }
        // start syncing
        this.currentChunk = 0;
        if (data.length <= SYNC_MAX_CHUNK_SIZE) {
            this.send(new SyncOutgoingPacket(this, data));
        }
        else {
            // if the data is too long then send it over multiple packets
            const chunks = Math.floor(data.length / SYNC_MAX_CHUNK_SIZE);
            for (let i = 0; i <= chunks; i++) {
                this.send(new SyncOutgoingPacket(this, data.substr(i * SYNC_MAX_CHUNK_SIZE, SYNC_MAX_CHUNK_SIZE), i, chunks));
            }
        }
        this._startTime = gametime_1.getElapsedTime();
        this.status = 1 /* Syncing */;
        // handle timeout
        if (this.options.timeout > 0) {
            new timer_1.Timer().start(this.options.timeout, () => {
                var _a;
                (_a = timer_1.Timer.fromExpired()) === null || _a === void 0 ? void 0 : _a.destroy();
                if (this.onError && this.status === 1 /* Syncing */) {
                    this.onError({
                        data: "Timeout",
                        status: 3 /* Timeout */,
                        time: this.startTime,
                    }, this);
                }
            });
        }
        return true;
    }
    /**
     * Sets the callback for when a request has sucessfully synchronized.
     * @param callback
     */
    then(callback) {
        this.onResponse = callback;
        return this;
    }
    /**
     * Allocates a unique index.
     */
    static allocate() {
        if (SyncRequest.index !== 0) {
            const id = SyncRequest.index;
            SyncRequest.index = SyncRequest.indicies[id];
            return id;
        }
        SyncRequest.counter++;
        return SyncRequest.counter;
    }
    /**
     * Encode and send the data from the correct player.
     * @param data
     */
    send(packet) {
        const prefix = packet.chunk === -1 ? SYNC_PREFIX : SYNC_PREFIX_CHUNK;
        if (this.from === player_1.MapPlayer.fromLocal() &&
            !BlzSendSyncData(prefix, packet.toString())) {
            print("SyncData: Network Error");
        }
    }
    /**
     * Retrieve a request based on it's index
     * @param index The request index
     */
    static fromIndex(index) {
        return this.cache[index];
    }
    /**
     * Initialize
     */
    static init() {
        if (this.initialized) {
            return;
        }
        for (let i = 0; i < bj_MAX_PLAYER_SLOTS; i++) {
            const p = player_1.MapPlayer.fromIndex(i);
            if (p !== undefined &&
                p.controller === MAP_CONTROL_USER &&
                p.slotState === PLAYER_SLOT_STATE_PLAYING) {
                this.eventTrigger.registerPlayerSyncEvent(p, SYNC_PREFIX, false);
                this.eventTrigger.registerPlayerSyncEvent(p, SYNC_PREFIX_CHUNK, false);
            }
        }
        this.eventTrigger.addAction(() => {
            this.onSync();
        });
        this.initialized = true;
    }
    /**
     * Handler for all sync responses
     */
    static onSync() {
        const syncPrefix = BlzGetTriggerSyncPrefix();
        const syncData = BlzGetTriggerSyncData();
        if (syncPrefix === undefined || syncData === undefined)
            return;
        const packet = new SyncIncomingPacket(syncPrefix, syncData);
        if (packet.req === undefined) {
            return;
        }
        packet.req.currentChunk++;
        packet.req.chunks[packet.chunk] = packet.data;
        if (packet.chunk >= packet.chunks) {
            if (packet.req.onResponse) {
                const data = packet.req.chunks.join("");
                const status = 2 /* Success */;
                packet.req.status = 2 /* Success */;
                packet.req.onResponse({ data, status, time: gametime_1.getElapsedTime() }, packet.req);
            }
        }
    }
}
exports.SyncRequest = SyncRequest;
SyncRequest.cache = [];
SyncRequest.counter = 0;
SyncRequest.defaultOptions = { timeout: 0 };
SyncRequest.eventTrigger = new trigger_1.Trigger();
SyncRequest.index = 0;
SyncRequest.indicies = [];
SyncRequest.initialized = false;
//# sourceMappingURL=sync.js.map