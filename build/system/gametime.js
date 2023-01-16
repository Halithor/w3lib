"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElapsedTime = void 0;
const timer_1 = require("../handles/timer");
let elapsedTime = 0.0;
const gameTimer = new timer_1.Timer().startPeriodic(30, () => {
    elapsedTime += 30;
});
function getElapsedTime() {
    return elapsedTime + gameTimer.elapsed;
}
exports.getElapsedTime = getElapsedTime;
//# sourceMappingURL=gametime.js.map