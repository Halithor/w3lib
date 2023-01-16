interface Unsubscribable {
    unsubscribe(): void;
}
declare type TeardownLogic = (() => void) | void;
interface Observer<T> {
    next: (value: T) => void;
}
export declare class Subscriber<T> implements Observer<T> {
    next(value: T): void;
}
export declare class Subscription implements Unsubscribable {
    private teardown?;
    private _closed;
    get closed(): boolean;
    constructor(teardown?: (() => void) | undefined);
    unsubscribe(): void;
}
export declare class Event<T> {
    private readonly setup;
    private initialized;
    private readonly subbers;
    private teardown;
    constructor(setup: (emit: (value: T) => void) => TeardownLogic);
    subscribe(subscriberOrNext: Subscriber<T> | ((value: T) => void)): Subscription;
    subscribeOnce(subscriberOrNext: Subscriber<T> | ((value: T) => void)): Subscription;
    protected initialize(): void;
    protected _emit(value: T): void;
    protected removeSubscription(subscription: Subscriber<T>): void;
    map<V>(transformation: (value: T) => V): Event<V>;
    filter(check: (value: T) => boolean): Event<T>;
}
export declare class Subject<T> extends Event<T> {
    constructor();
    emit(value: T): void;
}
export {};
