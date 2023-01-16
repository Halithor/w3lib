"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whenAnyUnitLeavesRegion = exports.whenAnyUnitEntersRegion = void 0;
const index_1 = require("../handles/index");
const event_1 = require("./event");
function whenAnyUnitEntersRegion(region) {
    return new event_1.Event(emit => {
        const trg = new index_1.Trigger().registerEnterRegion(region.handle, null);
        trg.addAction(() => emit({ entered: index_1.Unit.eventEnteringRegion }));
        return () => trg.destroy();
    });
}
exports.whenAnyUnitEntersRegion = whenAnyUnitEntersRegion;
function whenAnyUnitLeavesRegion(region) {
    return new event_1.Event(emit => {
        const trg = new index_1.Trigger().registerEnterRegion(region.handle, null);
        trg.addAction(() => emit({ leaving: index_1.Unit.eventLeavingRegion }));
        return () => trg.destroy();
    });
}
exports.whenAnyUnitLeavesRegion = whenAnyUnitLeavesRegion;
//# sourceMappingURL=regionEvents.js.map