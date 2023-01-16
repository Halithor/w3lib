/** @noSelfInFile */
/// <reference types="war3-types/core/common" />
/** A class that represents an angle, to reduce confusion between degrees and radians */
export declare class Angle {
    rads: number;
    protected constructor(radians: number);
    static fromDegrees(degrees: number): Angle;
    static fromRadians(radians: number): Angle;
    static random(): Angle;
    get degrees(): number;
    get radians(): number;
    /** The cosine of this angle */
    get cos(): number;
    /** The sine of this angle */
    get sin(): number;
    /** A normalized vector of this angle */
    get asDirection(): Vec2;
    add(other: Angle): Angle;
    sub(other: Angle): Angle;
    angularDistance(other: Angle): Angle;
}
export declare const degrees: typeof Angle.fromDegrees;
export declare const radians: typeof Angle.fromRadians;
export declare const randomAngle: typeof Angle.random;
/**
 * Class that encapsulates a position in the game.
 */
export declare class Vec2 {
    private _x;
    private _y;
    constructor(x: number, y: number);
    get x(): number;
    get y(): number;
    private static terrainPoint;
    get terrainZ(): number;
    add(other: Vec2): Vec2;
    sub(other: Vec2): Vec2;
    scale(factor: number): Vec2;
    mul(other: Vec2): Vec2;
    dot(other: Vec2): number;
    get length(): number;
    get lengthSq(): number;
    get norm(): Vec2;
    get asAngle(): Angle;
    rotate(angle: Angle): Vec2;
    angleTo(other: Vec2): Angle;
    normalizedPointerTo(other: Vec2): Vec2;
    moveTowards(other: Vec2, dist: number): Vec2;
    polarOffset(angle: Angle, dist: number): Vec2;
    distanceTo(other: Vec2): number;
    distanceToSq(other: Vec2): number;
    inRange(other: Vec2, radius: number): boolean;
    toString(): string;
    withZ(z: number): Vec3;
    withTerrainZ(): Vec3;
    withZZero(): Vec3;
}
export declare class Vec3 {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    constructor(x: number, y: number, z: number);
    withoutZ(): Vec2;
    add(other: Vec3): Vec3;
    sub(other: Vec3): Vec3;
    scale(factor: number): Vec3;
    mul(other: Vec3): Vec3;
    dot(other: Vec3): number;
    cross(other: Vec3): Vec3;
    get length(): number;
    get lengthSq(): number;
    get norm(): Vec3;
    normalizedPointerTo(other: Vec3): Vec3;
    distanceTo(other: Vec3): number;
    distanceToSq(other: Vec3): number;
    polarProject(dist: number, angleGround: Angle, angleAir: Angle): Vec3;
    moveTowards(other: Vec3, dist: number): Vec3;
    project(other: Vec3): Vec3;
    angleTo(other: Vec3): Angle;
    toString(): string;
}
export declare const vec2: (x: number, y: number) => Vec2;
export declare const vec3: (x: number, y: number, z: number) => Vec3;
export declare function getRandomPosInRect(rect: rect): Vec2;
export declare function getRectCenter(rect: rect): Vec2;
