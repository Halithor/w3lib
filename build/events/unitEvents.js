"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whenUnitBuildButtonPressed = exports.whenUnitComesInRange = void 0;
const index_1 = require("../handles/index");
const event_1 = require("./event");
function whenUnitComesInRange(u, range) {
    return new event_1.Event(emit => {
        const trg = new index_1.Trigger().registerUnitInRange(u, range);
        trg.addAction(() => emit({ entered: index_1.Unit.eventTriggering }));
        return () => trg.destroy();
    });
}
exports.whenUnitComesInRange = whenUnitComesInRange;
function whenUnitBuildButtonPressed(builtId) {
    return new event_1.Event(emit => {
        const trg = new index_1.Trigger().registerBuildCommandEvent(builtId);
        trg.addAction(() => emit({ builder: index_1.Unit.eventTriggering }));
        return () => trg.destroy();
    });
}
exports.whenUnitBuildButtonPressed = whenUnitBuildButtonPressed;
//# sourceMappingURL=unitEvents.js.map