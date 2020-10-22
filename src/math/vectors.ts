/** @noSelfInFile */

import {Point} from '../handles';
import {Angle} from './angle';

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

  public get terrainZ() {
    const temp = new Point(this.x, this.y);
    const z = temp.z;
    temp.destroy();
    return z;
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

  public rotate(angle: Angle): Vec2 {
    const cos = angle.cos;
    const sin = angle.sin;

    const px = this.x * cos - this.y * sin;
    const py = this.x * sin + this.y * cos;
    return new Vec2(px, py);
  }

  // TODO(Halithor): Figure out why this doesn't work!
  public angleTo(other: Vec2): Angle {
    const dir = this.normalizedPointerTo(other);
    return Angle.fromRadians(Atan2(dir.y, dir.x));
    // return new Angle(0)
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
}

// Make a new position.
export const vec2 = (x: number, y: number) => new Vec2(x, y);

export function getRandomPosInRect(rect: rect): Vec2 {
  return new Vec2(
    GetRandomInt(GetRectMinX(rect), GetRectMaxX(rect)),
    GetRandomInt(GetRectMinY(rect), GetRectMaxY(rect))
  );
}

export function getRectCenter(rect: rect): Vec2 {
  return new Vec2(GetRectCenterX(rect), GetRectCenterY(rect));
}
