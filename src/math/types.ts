/** @noSelfInFile */

import {Point} from '../handles/point';

/** Converts Degrees to Radians */
const DEGTORAD = 0.017453293;
/** Converts Radians to Degrees */
const RADTODEG = 57.295779513;
/** A class that represents an angle, to reduce confusion between degrees and radians */
export class Angle {
  rads: number;

  protected constructor(radians: number) {
    this.rads = radians;
  }

  public static fromDegrees(degrees: number): Angle {
    return new Angle(degrees * DEGTORAD);
  }

  public static fromRadians(radians: number): Angle {
    return new Angle(radians);
  }

  public static random(): Angle {
    return new Angle(GetRandomReal(0, math.pi * 2));
  }

  public get degrees() {
    return this.rads * RADTODEG;
  }

  public get radians() {
    return this.rads;
  }

  /** The cosine of this angle */
  public get cos() {
    return Cos(this.rads);
  }

  /** The sine of this angle */
  public get sin() {
    return Sin(this.rads);
  }

  /** A normalized vector of this angle */
  public get asDirection() {
    return new Vec2(Cos(this.rads), Sin(this.rads));
  }

  public add(other: Angle): Angle {
    return new Angle(this.radians + other.radians);
  }

  public sub(other: Angle): Angle {
    return new Angle(this.radians - other.radians);
  }

  // angularDistance calculates the difference between two angles, with a max
  // of half a rotation.
  public angularDistance(other: Angle): Angle {
    const n1 = this.degrees % 360;
    const n2 = other.degrees % 360;
    const diff = (n1 - n2) % 360;
    const rotDist = 360 - diff;
    if (diff < rotDist) {
      return degrees(diff);
    } else {
      return degrees(rotDist);
    }
  }
}

// Helper methods that make it easy to construct Angles
export const degrees = Angle.fromDegrees;
export const radians = Angle.fromRadians;
export const randomAngle = Angle.random;

/**
 * Class that encapsulates a position in the game.
 */
export class Vec2 {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  private static terrainPoint = new Point(0, 0);
  public get terrainZ() {
    Vec2.terrainPoint.setPosition(this.x, this.y);
    return Vec2.terrainPoint.z;
  }

  public add(other: Vec2): Vec2 {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  public sub(other: Vec2): Vec2 {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  public scale(factor: number): Vec2 {
    return new Vec2(this.x * factor, this.y * factor);
  }

  public mul(other: Vec2): Vec2 {
    return new Vec2(this.x * other.x, this.y * other.y);
  }

  public dot(other: Vec2): number {
    return this.x * other.x + this.y * other.y;
  }

  public get length(): number {
    return SquareRoot(this.x * this.x + this.y * this.y);
  }

  public get lengthSq(): number {
    return this.x * this.x + this.y * this.y;
  }

  public get norm(): Vec2 {
    const len = this.length;
    if (len > 0) {
      return new Vec2(this.x / len, this.y / len);
    }
    return new Vec2(this.x, this.y);
  }

  // asAngle converts this vector into the angle on the ground.
  public get asAngle(): Angle {
    const norm = this.norm;
    return Angle.fromRadians(Atan2(norm.y, norm.x));
  }

  // rotate this vector around the Z axis (up from the ground). This is
  // clockwise along the ground.
  public rotate(angle: Angle): Vec2 {
    const cos = angle.cos;
    const sin = angle.sin;

    const px = this.x * cos - this.y * sin;
    const py = this.x * sin + this.y * cos;
    return new Vec2(px, py);
  }

  public angleTo(other: Vec2): Angle {
    // Weird implementation note: this method causes map start failures when
    // not in the same file in as the Angle class.
    const dir = this.normalizedPointerTo(other);
    return Angle.fromRadians(Atan2(dir.y, dir.x));
  }

  // normalizedPointerTo returns a normalized vector in the direction of the
  // target. When the target and this vector are equal, return a vector
  // pointing right.
  public normalizedPointerTo(other: Vec2): Vec2 {
    let v = other.sub(this).norm;
    if (v.length == 0) {
      return new Vec2(1, 0);
    }
    return v;
  }

  public moveTowards(other: Vec2, dist: number) {
    return this.add(this.normalizedPointerTo(other).scale(dist));
  }

  public polarOffset(angle: Angle, dist: number) {
    return this.add(angle.asDirection.scale(dist));
  }

  public distanceTo(other: Vec2) {
    return other.sub(this).length;
  }

  public distanceToSq(other: Vec2) {
    return other.sub(this).lengthSq;
  }

  // Is this Vec2 in the given range of the other vec2
  public inRange(other: Vec2, radius: number): boolean {
    return this.distanceToSq(other) < radius * radius;
  }

  public toString() {
    return '(' + this.x.toString() + ', ' + this.y.toString() + ')';
  }

  public withZ(z: number) {
    return new Vec3(this.x, this.y, z);
  }

  public withTerrainZ() {
    return new Vec3(this.x, this.y, this.terrainZ);
  }

  public withZZero() {
    return new Vec3(this.x, this.y, 0);
  }
}

export class Vec3 {
  constructor(readonly x: number, readonly y: number, readonly z: number) {}

  public withoutZ() {
    return new Vec2(this.x, this.y);
  }

  public add(other: Vec3): Vec3 {
    return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  public sub(other: Vec3): Vec3 {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  public scale(factor: number): Vec3 {
    return new Vec3(this.x * factor, this.y * factor, this.z * factor);
  }

  public mul(other: Vec3): Vec3 {
    return new Vec3(this.x * other.x, this.y * other.y, this.z * other.z);
  }

  public dot(other: Vec3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  public cross(other: Vec3) {
    return new Vec3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }

  public get length(): number {
    return SquareRoot(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  public get lengthSq(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  public get norm(): Vec3 {
    const len = this.length;
    if (len > 0) {
      return new Vec3(this.x / len, this.y / len, this.z / len);
    }
    return new Vec3(this.x, this.y, this.z);
  }

  // returns a normalized vector in the direction of the
  // target. When the target and origin vector are equal, returns the x-axis
  // unit vector.
  public normalizedPointerTo(other: Vec3) {
    const v = other.sub(this).norm;
    if (v.length == 0) {
      return new Vec3(1, 0, 0);
    }
    return v;
  }

  public distanceTo(other: Vec3) {
    return other.sub(this).length;
  }

  public distanceToSq(other: Vec3) {
    return other.sub(this).lengthSq;
  }

  public polarProject(dist: number, angleGround: Angle, angleAir: Angle) {
    return new Vec3(
      this.x + dist * angleGround.cos * angleAir.sin,
      this.y + dist * angleGround.sin * angleAir.sin,
      this.z + dist * angleAir.cos
    );
  }

  public moveTowards(other: Vec3, dist: number) {
    return this.add(this.normalizedPointerTo(other).scale(dist));
  }

  public project(other: Vec3) {
    const l = other.lengthSq;
    if (l == 0) {
      return new Vec3(0, 0, 0);
    }
    const f = this.dot(other) / l;
    return new Vec3(other.x / f, other.y / f, other.z / f);
  }

  public angleTo(other: Vec3): Angle {
    const v = this.dot(other) / (this.length * other.length);
    return radians(Acos(v));
  }

  public toString() {
    return (
      '(' +
      this.x.toString() +
      ', ' +
      this.y.toString() +
      ',' +
      this.z.toString() +
      ')'
    );
  }
}

// Make a new position.
export const vec2 = (x: number, y: number) => new Vec2(x, y);
export const vec3 = (x: number, y: number, z: number) => new Vec3(x, y, z);

export function getRandomPosInRect(rect: rect): Vec2 {
  return new Vec2(
    GetRandomInt(GetRectMinX(rect), GetRectMaxX(rect)),
    GetRandomInt(GetRectMinY(rect), GetRectMaxY(rect))
  );
}

export function getRectCenter(rect: rect): Vec2 {
  return new Vec2(GetRectCenterX(rect), GetRectCenterY(rect));
}
