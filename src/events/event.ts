
export interface Subscription {
  unsubscribe(): void;
}

/* Event is a simple subscribable event. Construct an event by providing it
 * with an emitter function. The emitter function will only be called on first
 * subscription to set up event emission from the Event. The emitter should call
 * the `emit` function for every event that it wishes to emit, which will be
 * passed to all subscribers.
 *
 * Events can be unsubscribed from, but there's no mechanisms to clean up
 * the internal emitters when no more subscriptions exist.
 */
export class Event<T> {
  private initialized = false;
  private handlers: {[key: number]: (value: T) => void} = {};
  private idx = 0;

  constructor(private readonly emitter: (emit: (value: T) => void) => void) {}

  subscribe(subscriber: (value: T) => void): Subscription {
    if (!this.initialized) {
      this.initialize();
    }

    const idx = this.idx;
    this.handlers[idx] = subscriber;
    this.idx++;
    return {
      unsubscribe: () => delete this.handlers[idx],
    };
  }

  protected initialize() {
    this.emitter((val: T) => {
      this._emit(val);
    });
    this.initialized = true;
  }

  protected _emit(value: T) {
    for (let key in this.handlers) {
      this.handlers[key](value);
    }
  }

  map<V>(transformation: (value: T) => V): Event<V> {
    return new Event(emit => {
      this.subscribe(val => {
        emit(transformation(val));
      });
    });
  }

  filter(check: (value: T) => boolean): Event<T> {
    return new Event(emit => {
      this.subscribe(val => {
        if (check(val)) {
          emit(val);
        }
      });
    });
  }
}

export class Subject<T> extends Event<T> {
  constructor() {
    super(() => {});
  }

  emit(value: T) {
    this._emit(value);
  }
}