"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventPlayerLeaves = exports.eventPlayerChat = void 0;
const index_1 = require("../handles/index");
const event_1 = require("./event");
function playerEvent(register, extractor) {
    return new event_1.Event(emit => {
        const trg = new index_1.Trigger();
        trg.addAction(() => emit(extractor()));
        for (let i = 0; i < bj_MAX_PLAYERS; i++) {
            const p = index_1.Players[i];
            register(trg, p);
        }
        return () => trg.destroy();
    });
}
exports.eventPlayerChat = playerEvent((trg, p) => trg.registerPlayerChatEvent(p, '', false), () => ({
    player: index_1.MapPlayer.eventTriggering,
    message: GetEventPlayerChatString(),
}));
exports.eventPlayerLeaves = playerEvent((trg, p) => trg.registerPlayerEvent(p, EVENT_PLAYER_LEAVE), () => ({ player: index_1.MapPlayer.eventTriggering }));
//# sourceMappingURL=playerEvents.js.map