"use strict";
/** @noSelfInFile */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRectCenter = exports.getRandomPosInRect = exports.vec3 = exports.vec2 = exports.Vec3 = exports.Vec2 = exports.randomAngle = exports.radians = exports.degrees = exports.Angle = void 0;
const point_1 = require("../handles/point");
/** Converts Degrees to Radians */
const DEGTORAD = 0.017453293;
/** Converts Radians to Degrees */
const RADTODEG = 57.295779513;
/** A class that represents an angle, to reduce confusion between degrees and radians */
class Angle {
    constructor(radians) {
        this.rads = radians;
    }
    static fromDegrees(degrees) {
        return new Angle(degrees * DEGTORAD);
    }
    static fromRadians(radians) {
        return new Angle(radians);
    }
    static random() {
        return new Angle(GetRandomReal(0, math.pi * 2));
    }
    get degrees() {
        return this.rads * RADTODEG;
    }
    get radians() {
        return this.rads;
    }
    /** The cosine of this angle */
    get cos() {
        return Cos(this.rads);
    }
    /** The sine of this angle */
    get sin() {
        return Sin(this.rads);
    }
    /** A normalized vector of this angle */
    get asDirection() {
        return new Vec2(Cos(this.rads), Sin(this.rads));
    }
    add(other) {
        return new Angle(this.radians + other.radians);
    }
    sub(other) {
        return new Angle(this.radians - other.radians);
    }
    // angularDistance calculates the difference between two angles, with a max
    // of half a rotation.
    angularDistance(other) {
        const n1 = this.degrees % 360;
        const n2 = other.degrees % 360;
        const diff = (n1 - n2) % 360;
        const rotDist = 360 - diff;
        if (diff < rotDist) {
            return exports.degrees(diff);
        }
        else {
            return exports.degrees(rotDist);
        }
    }
}
exports.Angle = Angle;
// Helper methods that make it easy to construct Angles
exports.degrees = Angle.fromDegrees;
exports.radians = Angle.fromRadians;
exports.randomAngle = Angle.random;
/**
 * Class that encapsulates a position in the game.
 */
class Vec2 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get terrainZ() {
        Vec2.terrainPoint.setPosition(this.x, this.y);
        return Vec2.terrainPoint.z;
    }
    add(other) {
        return new Vec2(this.x + other.x, this.y + other.y);
    }
    sub(other) {
        return new Vec2(this.x - other.x, this.y - other.y);
    }
    scale(factor) {
        return new Vec2(this.x * factor, this.y * factor);
    }
    mul(other) {
        return new Vec2(this.x * other.x, this.y * other.y);
    }
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    get length() {
        return SquareRoot(this.x * this.x + this.y * this.y);
    }
    get lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    get norm() {
        const len = this.length;
        if (len > 0) {
            return new Vec2(this.x / len, this.y / len);
        }
        return new Vec2(this.x, this.y);
    }
    // asAngle converts this vector into the angle on the ground.
    get asAngle() {
        const norm = this.norm;
        return Angle.fromRadians(Atan2(norm.y, norm.x));
    }
    // rotate this vector around the Z axis (up from the ground). This is
    // clockwise along the ground.
    rotate(angle) {
        const cos = angle.cos;
        const sin = angle.sin;
        const px = this.x * cos - this.y * sin;
        const py = this.x * sin + this.y * cos;
        return new Vec2(px, py);
    }
    angleTo(other) {
        // Weird implementation note: this method causes map start failures when
        // not in the same file in as the Angle class.
        const dir = this.normalizedPointerTo(other);
        return Angle.fromRadians(Atan2(dir.y, dir.x));
    }
    // normalizedPointerTo returns a normalized vector in the direction of the
    // target. When the target and this vector are equal, return a vector
    // pointing right.
    normalizedPointerTo(other) {
        let v = other.sub(this).norm;
        if (v.length == 0) {
            return new Vec2(1, 0);
        }
        return v;
    }
    moveTowards(other, dist) {
        return this.add(this.normalizedPointerTo(other).scale(dist));
    }
    polarOffset(angle, dist) {
        return this.add(angle.asDirection.scale(dist));
    }
    distanceTo(other) {
        return other.sub(this).length;
    }
    distanceToSq(other) {
        return other.sub(this).lengthSq;
    }
    // Is this Vec2 in the given range of the other vec2
    inRange(other, radius) {
        return this.distanceToSq(other) < radius * radius;
    }
    toString() {
        return '(' + this.x.toString() + ', ' + this.y.toString() + ')';
    }
    withZ(z) {
        return new Vec3(this.x, this.y, z);
    }
    withTerrainZ() {
        return new Vec3(this.x, this.y, this.terrainZ);
    }
    withZZero() {
        return new Vec3(this.x, this.y, 0);
    }
}
exports.Vec2 = Vec2;
Vec2.terrainPoint = new point_1.Point(0, 0);
class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    withoutZ() {
        return new Vec2(this.x, this.y);
    }
    add(other) {
        return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    sub(other) {
        return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    scale(factor) {
        return new Vec3(this.x * factor, this.y * factor, this.z * factor);
    }
    mul(other) {
        return new Vec3(this.x * other.x, this.y * other.y, this.z * other.z);
    }
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    cross(other) {
        return new Vec3(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x);
    }
    get length() {
        return SquareRoot(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    get lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    get norm() {
        const len = this.length;
        if (len > 0) {
            return new Vec3(this.x / len, this.y / len, this.z / len);
        }
        return new Vec3(this.x, this.y, this.z);
    }
    // returns a normalized vector in the direction of the
    // target. When the target and origin vector are equal, returns the x-axis
    // unit vector.
    normalizedPointerTo(other) {
        const v = other.sub(this).norm;
        if (v.length == 0) {
            return new Vec3(1, 0, 0);
        }
        return v;
    }
    distanceTo(other) {
        return other.sub(this).length;
    }
    distanceToSq(other) {
        return other.sub(this).lengthSq;
    }
    polarProject(dist, angleGround, angleAir) {
        return new Vec3(this.x + dist * angleGround.cos * angleAir.sin, this.y + dist * angleGround.sin * angleAir.sin, this.z + dist * angleAir.cos);
    }
    moveTowards(other, dist) {
        return this.add(this.normalizedPointerTo(other).scale(dist));
    }
    project(other) {
        const l = other.lengthSq;
        if (l == 0) {
            return new Vec3(0, 0, 0);
        }
        const f = this.dot(other) / l;
        return new Vec3(other.x / f, other.y / f, other.z / f);
    }
    angleTo(other) {
        const v = this.dot(other) / (this.length * other.length);
        return exports.radians(Acos(v));
    }
    toString() {
        return ('(' +
            this.x.toString() +
            ', ' +
            this.y.toString() +
            ',' +
            this.z.toString() +
            ')');
    }
}
exports.Vec3 = Vec3;
// Make a new position.
const vec2 = (x, y) => new Vec2(x, y);
exports.vec2 = vec2;
const vec3 = (x, y, z) => new Vec3(x, y, z);
exports.vec3 = vec3;
function getRandomPosInRect(rect) {
    return new Vec2(GetRandomInt(GetRectMinX(rect), GetRectMaxX(rect)), GetRandomInt(GetRectMinY(rect), GetRectMaxY(rect)));
}
exports.getRandomPosInRect = getRandomPosInRect;
function getRectCenter(rect) {
    return new Vec2(GetRectCenterX(rect), GetRectCenterY(rect));
}
exports.getRectCenter = getRectCenter;
//# sourceMappingURL=types.js.map