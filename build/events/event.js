"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = exports.Event = exports.Subscription = exports.Subscriber = void 0;
class Subscriber {
    next(value) { }
}
exports.Subscriber = Subscriber;
class FunctionSubscriber extends Subscriber {
    constructor(funct) {
        super();
        this.funct = funct;
    }
    next(value) {
        this.funct(value);
    }
}
class Subscription {
    constructor(teardown) {
        this.teardown = teardown;
        this._closed = false;
    }
    get closed() {
        return this._closed;
    }
    unsubscribe() {
        if (this.closed) {
            return;
        }
        this._closed = true;
        if (this.teardown) {
            this.teardown();
        }
    }
}
exports.Subscription = Subscription;
/* Event is a simple subscribable event. Construct an event by providing it
 * with an emitter function. The emitter function will only be called on first
 * subscription to set up event emission from the Event. The emitter should call
 * the `emit` function for every event that it wishes to emit, which will be
 * passed to all subscribers.
 *
 * Events can be unsubscribed from, but there's no mechanisms to clean up
 * the internal emitters when no more subscriptions exist.
 */
class Event {
    constructor(setup) {
        this.setup = setup;
        this.initialized = false;
        this.subbers = [];
    }
    subscribe(subscriberOrNext) {
        const subscriber = typeof subscriberOrNext == 'function'
            ? new FunctionSubscriber(subscriberOrNext)
            : subscriberOrNext;
        this.subbers.push(subscriber);
        if (!this.initialized) {
            this.initialize();
        }
        return new Subscription(() => this.removeSubscription(subscriber));
    }
    subscribeOnce(subscriberOrNext) {
        const subscriber = typeof subscriberOrNext == 'function'
            ? new FunctionSubscriber(subscriberOrNext)
            : subscriberOrNext;
        const sub = this.subscribe((value) => {
            subscriber.next(value);
            sub.unsubscribe();
        });
        return sub;
    }
    initialize() {
        this.teardown = this.setup((val) => this._emit(val));
        this.initialized = true;
    }
    _emit(value) {
        this.subbers.forEach(sub => {
            try {
                sub.next(value);
            }
            catch (e) {
                if (e instanceof Error) {
                    print('Subscriber threw exception: ' +
                        e.message +
                        '\n' +
                        (e.stack ? e.stack : ''));
                }
            }
        });
    }
    removeSubscription(subscription) {
        arrRemove(this.subbers, subscription);
        if (this.subbers.length == 0) {
            if (this.teardown) {
                this.teardown();
                this.initialized = false;
            }
        }
    }
    map(transformation) {
        return new Event(emit => {
            const sub = this.subscribe(val => {
                emit(transformation(val));
            });
            return () => sub.unsubscribe();
        });
    }
    filter(check) {
        return new Event(emit => {
            const sub = this.subscribe(val => {
                if (check(val)) {
                    emit(val);
                }
            });
            return () => sub.unsubscribe();
        });
    }
}
exports.Event = Event;
class Subject extends Event {
    constructor() {
        super(() => { });
    }
    emit(value) {
        this._emit(value);
    }
}
exports.Subject = Subject;
function arrRemove(arr, item) {
    const idx = arr.indexOf(item);
    if (idx >= 0) {
        arr.splice(idx, 1);
    }
}
//# sourceMappingURL=event.js.map