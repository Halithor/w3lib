interface Unsubscribable {
  unsubscribe(): void;
}

type TeardownLogic = (() => void) | void;

interface Observer<T> {
  next: (value: T) => void;
}

export class Subscriber<T> implements Observer<T> {
  next(value: T): void {}
}

class FunctionSubscriber<T> extends Subscriber<T> {
  constructor(private readonly funct: (value: T) => void) {
    super();
  }
  next(value: T): void {
    this.funct(value);
  }
}

export class Subscription implements Unsubscribable {
  private _closed = false;

  get closed(): boolean {
    return this._closed;
  }

  constructor(private teardown?: () => void) {}

  unsubscribe(): void {
    if (this.closed) {
      return;
    }
    this._closed = true;
    if (this.teardown) {
      this.teardown();
    }
  }
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
  private readonly subbers: Subscriber<T>[] = [];

  private teardown: TeardownLogic | undefined;

  constructor(
    private readonly setup: (emit: (value: T) => void) => TeardownLogic
  ) {}

  subscribe(
    subscriberOrNext: Subscriber<T> | ((value: T) => void)
  ): Subscription {
    const subscriber: Subscriber<T> =
      typeof subscriberOrNext == 'function'
        ? new FunctionSubscriber(subscriberOrNext)
        : subscriberOrNext;

    this.subbers.push(subscriber);

    if (!this.initialized) {
      this.initialize();
    }

    return new Subscription(() => this.removeSubscription(subscriber));
  }

  subscribeOnce(
    subscriberOrNext: Subscriber<T> | ((value: T) => void)
  ): Subscription {
    const subscriber: Subscriber<T> =
      typeof subscriberOrNext == 'function'
        ? new FunctionSubscriber(subscriberOrNext)
        : subscriberOrNext;

    const sub = this.subscribe((value: T) => {
      subscriber.next(value);
      sub.unsubscribe();
    });
    return sub;
  }

  protected initialize() {
    this.teardown = this.setup((val: T) => this._emit(val));
    this.initialized = true;
  }

  protected _emit(value: T) {
    this.subbers.forEach(sub => {
      try {
        sub.next(value);
      } catch (e: unknown) {
        if (e instanceof Error) {
          print(
            'Subscriber threw exception: ' +
              e.message +
              '\n' +
              (e.stack ? e.stack : '')
          );
        }
      }
    });
  }

  protected removeSubscription(subscription: Subscriber<T>) {
    arrRemove(this.subbers, subscription);
    if (this.subbers.length == 0) {
      if (this.teardown) {
        this.teardown();
        this.initialized = false;
      }
    }
  }

  map<V>(transformation: (value: T) => V): Event<V> {
    return new Event(emit => {
      const sub = this.subscribe(val => {
        emit(transformation(val));
      });
      return () => sub.unsubscribe();
    });
  }

  filter(check: (value: T) => boolean): Event<T> {
    return new Event(emit => {
      const sub = this.subscribe(val => {
        if (check(val)) {
          emit(val);
        }
      });
      return () => sub.unsubscribe();
    });
  }

  // Takes the first [count] items emitted before closing the subscription.
  // take(count: number): Event<T> {
  //   let seen = 0;
  //   return new Event(emit => {
  //     const sub = this.subscribe(val => {
  //       if (seen < count) {
  //         emit(val);
  //         seen++;
  //       }
  //       if (seen >= count) {
  //         sub.unsubscribe();
  //       }
  //     });

  //     return () => sub.unsubscribe();
  //   });
  // }

  // takeUntil(other: Event<unknown>): Event<T> {
  //   return new Event(emit => {
  //     const sub = this.subscribe(val => {
  //       emit(val);
  //     });
  //     const interSub = other.take(1).subscribe(() => {
  //       sub.unsubscribe();
  //     });
  //     return () => {
  //       sub.unsubscribe();
  //       interSub.unsubscribe();
  //     };
  //   });
  // }
}

export class Subject<T> extends Event<T> {
  constructor() {
    super(() => {});
  }

  emit(value: T) {
    this._emit(value);
  }
}

function arrRemove<T>(arr: T[], item: T) {
  const idx = arr.indexOf(item);
  if (idx >= 0) {
    arr.splice(idx, 1);
  }
}
