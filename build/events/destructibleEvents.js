"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whenDestructibleDies = void 0;
const index_1 = require("../handles/index");
const event_1 = require("./event");
function whenDestructibleDies(destructable) {
    return new event_1.Event(emit => {
        const trg = new index_1.Trigger().registerDeathEvent(destructable);
        trg.addAction(() => emit({ killer: index_1.Unit.eventKilling }));
        return () => trg.destroy();
    });
}
exports.whenDestructibleDies = whenDestructibleDies;
//# sourceMappingURL=destructibleEvents.js.map