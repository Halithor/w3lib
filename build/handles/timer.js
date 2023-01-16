"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = exports.doPeriodicallyCounted = exports.doPeriodically = exports.doAfter = void 0;
const handle_1 = require("./handle");
// doAfter uses a timer to perform an action after a given duration. Returns a cancelation function,
// which can be called to cancel the callback.
function doAfter(timeout, callback) {
    const t = Timer.get();
    t.start(timeout, () => {
        t.release();
        callback();
    });
    return {
        cancel: () => t.release(),
        timer: t,
    };
}
exports.doAfter = doAfter;
// doPeriodically uses a timer to periodically call your callback function, passing the callback a
// cancelation function, which can be used to stop the periodic timer. Also returns a cancelation
// callback to the caller, encase the caller wishes to cancel the timer. Upon cancelation, calls the
// final function.
function doPeriodically(interval, callback, final) {
    const t = Timer.get();
    const cancel = () => {
        if (final) {
            final();
        }
        t.release();
    };
    t.startPeriodic(interval, () => {
        callback(cancel);
    });
    return {
        cancel,
        timer: t,
    };
}
exports.doPeriodically = doPeriodically;
// The index given to the call back is a count of intervals passed, starting at 1.
function doPeriodicallyCounted(interval, count, callback, final) {
    const t = Timer.get();
    const cancel = () => {
        if (final) {
            final();
        }
        t.release();
    };
    let i = 0;
    t.startPeriodic(interval, () => {
        i++;
        if (i > count) {
            cancel();
            return;
        }
        callback(cancel, i);
    });
    return {
        cancel,
        timer: t,
    };
}
exports.doPeriodicallyCounted = doPeriodicallyCounted;
class Timer extends handle_1.Handle {
    constructor() {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateTimer());
        }
        this.freed = false;
    }
    static get() {
        if (Timer.freeTimersCount > 0) {
            Timer.freeTimersCount--;
            Timer.freeTimers[Timer.freeTimersCount].freed = false;
            return Timer.freeTimers[Timer.freeTimersCount];
        }
        else {
            return new Timer();
        }
    }
    release() {
        if (this.freed) {
            return;
        }
        this.freed = true;
        this.pause();
        Timer.freeTimers[Timer.freeTimersCount] = this;
        Timer.freeTimersCount++;
    }
    get elapsed() {
        return TimerGetElapsed(this.handle);
    }
    get remaining() {
        return TimerGetRemaining(this.handle);
    }
    get timeout() {
        return TimerGetTimeout(this.handle);
    }
    destroy() {
        DestroyTimer(this.handle);
        return this;
    }
    pause() {
        PauseTimer(this.handle);
        return this;
    }
    resume() {
        ResumeTimer(this.handle);
        return this;
    }
    start(timeout, handlerFunc) {
        TimerStart(this.handle, timeout, false, handlerFunc);
        return this;
    }
    startPeriodic(timeout, handlerFunc) {
        TimerStart(this.handle, timeout, true, handlerFunc);
        return this;
    }
    static fromExpired() {
        return this.fromHandle(GetExpiredTimer());
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
}
exports.Timer = Timer;
Timer.freeTimers = [];
Timer.freeTimersCount = 0;
//# sourceMappingURL=timer.js.map