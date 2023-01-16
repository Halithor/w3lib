/** @noSelfInFile **/
/// <reference types="war3-types/core/compat" />
export declare class Handle<T extends handle> {
    readonly handle: T;
    private static initHandle;
    protected constructor(handle?: T);
    get id(): number;
    static initFromHandle(): boolean;
    protected static getObject(handle: handle): any;
}
