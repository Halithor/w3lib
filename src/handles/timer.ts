/** @noSelfInFile **/

import { Handle } from "./handle";

// doAfter uses a timer to perform an action after a given duration. Returns a cancelation function,
// which can be called to cancel the callback.
export function doAfter(timeout: number, callback: () => void) {
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

// doPeriodically uses a timer to periodically call your callback function, passing the callback a
// cancelation function, which can be used to stop the periodic timer. Also returns a cancelation
// callback to the caller, encase the caller wishes to cancel the timer. Upon cancelation, calls the
// final function.
export function doPeriodically(
  interval: number,
  callback: (cancel: () => void) => void,
  final?: () => void,
) {
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

// The index given to the call back is a count of intervals passed, starting at 1.
export function doPeriodicallyCounted(
  interval: number,
  count: number,
  callback: (cancel: () => void, index: number) => void,
  final?: () => void,
) {
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

export class Timer extends Handle<timer> {
  private static freeTimers: Timer[] = [];
  private static freeTimersCount: number = 0;
  private freed: boolean;

  public static get(): Timer {
    if (Timer.freeTimersCount > 0) {
      Timer.freeTimersCount--;
      Timer.freeTimers[Timer.freeTimersCount].freed = false;
      return Timer.freeTimers[Timer.freeTimersCount];
    } else {
      return new Timer();
    }
  }

  public release() {
    if (this.freed) {
      return;
    }
    this.freed = true;
    this.pause();
    Timer.freeTimers[Timer.freeTimersCount] = this;
    Timer.freeTimersCount++;
  }

  constructor() {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateTimer());
    }
    this.freed = false;
  }

  public get elapsed(): number {
    return TimerGetElapsed(this.handle);
  }

  public get remaining(): number {
    return TimerGetRemaining(this.handle);
  }

  public get timeout(): number {
    return TimerGetTimeout(this.handle);
  }

  public destroy() {
    DestroyTimer(this.handle);
    return this;
  }

  public pause() {
    PauseTimer(this.handle);
    return this;
  }

  public resume() {
    ResumeTimer(this.handle);
    return this;
  }

  public start(timeout: number, handlerFunc: () => void) {
    TimerStart(this.handle, timeout, false, handlerFunc);
    return this;
  }

  public startPeriodic(timeout: number, handlerFunc: () => void) {
    TimerStart(this.handle, timeout, true, handlerFunc);
    return this;
  }

  public static fromExpired(): Timer {
    return this.fromHandle(GetExpiredTimer()!);
  }

  public static fromHandle(handle: timer): Timer {
    return this.getObject(handle) as Timer;
  }
}
