/** @noSelfInFile **/

import { Unit } from "./unit";
import { doAfter } from "../handles/timer";
import { Angle, Vec2, Vec3, vec3 } from "../math/index";
import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Point } from "./point";
import { Widget } from "./widget";

export class Effect extends Handle<effect> {
  constructor(modelName: string, pos: Vec2);
  constructor(modelName: string, targetWidget: Widget, attachPointName: string);
  constructor(modelName: string, a: Vec2 | Widget, b?: string) {
    if (Handle.initFromHandle()) {
      super();
    } else if (a instanceof Vec2) {
      super(AddSpecialEffect(modelName, a.x, a.y));
    } else if (a instanceof Widget && b) {
      super(AddSpecialEffectTarget(modelName, a.handle, b));
    }
  }

  public get scale() {
    return BlzGetSpecialEffectScale(this.handle);
  }

  public set scale(scale: number) {
    BlzSetSpecialEffectScale(this.handle, scale);
  }

  /**
   * Warning: Asynchronous. Can cause desyncs
   */
  public get pos() {
    return vec3(
      BlzGetLocalSpecialEffectX(this.handle),
      BlzGetLocalSpecialEffectY(this.handle),
      BlzGetLocalSpecialEffectZ(this.handle),
    );
  }

  public set pos(val: Vec3) {
    BlzSetSpecialEffectX(this.handle, val.x);
    BlzSetSpecialEffectY(this.handle, val.y);
    BlzSetSpecialEffectZ(this.handle, val.z);
  }

  public addSubAnimation(subAnim: subanimtype) {
    BlzSpecialEffectAddSubAnimation(this.handle, subAnim);
  }

  public clearSubAnimations() {
    BlzSpecialEffectClearSubAnimations(this.handle);
  }

  public destroy() {
    DestroyEffect(this.handle);
  }

  public playAnimation(animType: animtype) {
    BlzPlaySpecialEffect(this.handle, animType);
  }

  public playWithTimeScale(animType: animtype, timeScale: number) {
    BlzPlaySpecialEffectWithTimeScale(this.handle, animType, timeScale);
  }

  public removeSubAnimation(subAnim: subanimtype) {
    BlzSpecialEffectRemoveSubAnimation(this.handle, subAnim);
  }

  public resetScaleMatrix() {
    BlzResetSpecialEffectMatrix(this.handle);
  }

  public setAlpha(alpha: number) {
    BlzSetSpecialEffectAlpha(this.handle, alpha);
  }

  public setColor(red: number, green: number, blue: number) {
    BlzSetSpecialEffectColor(this.handle, red, green, blue);
  }

  public setColorByPlayer(whichPlayer: MapPlayer) {
    BlzSetSpecialEffectColorByPlayer(this.handle, whichPlayer.handle);
  }

  public setHeight(height: number) {
    BlzSetSpecialEffectHeight(this.handle, height);
  }

  public setOrientation(yaw: number, pitch: number, roll: number) {
    BlzSetSpecialEffectOrientation(this.handle, yaw, pitch, roll);
  }

  public setPitch(pitch: number) {
    BlzSetSpecialEffectPitch(this.handle, pitch);
  }

  public setPoint(p: Point) {
    BlzSetSpecialEffectPositionLoc(this.handle, p.handle);
  }

  public setRoll(roll: number) {
    BlzSetSpecialEffectRoll(this.handle, roll);
  }

  public setScaleMatrix(x: number, y: number, z: number) {
    BlzSetSpecialEffectMatrixScale(this.handle, x, y, z);
  }

  public setTime(value: number) {
    BlzSetSpecialEffectTime(this.handle, value);
  }

  public setTimeScale(timeScale: number) {
    BlzSetSpecialEffectTimeScale(this.handle, timeScale);
  }

  public setYaw(y: number) {
    BlzSetSpecialEffectYaw(this.handle, y);
  }

  public set yaw(angle: Angle) {
    BlzSetSpecialEffectYaw(this.handle, angle.radians);
  }

  public static fromHandle(handle: effect): Effect {
    return this.getObject(handle) as Effect;
  }
}

export function flashEffect(
  path: string,
  pos: Vec2 | Vec3,
  scale?: number,
  angle?: Angle,
) {
  const e = AddSpecialEffect(path, pos.x, pos.y)!;
  if (pos instanceof Vec3) {
    BlzSetSpecialEffectZ(e, pos.z);
  }
  if (scale) {
    BlzSetSpecialEffectScale(e, scale);
  }
  if (angle) {
    BlzSetSpecialEffectYaw(e, angle.radians);
  }
  DestroyEffect(e);
}

export function flashEffectDuration(
  path: string,
  pos: Vec2,
  duration: number,
  scale?: number,
  angle?: Angle,
) {
  const e = AddSpecialEffect(path, pos.x, pos.y)!;
  if (scale) {
    BlzSetSpecialEffectScale(e, scale);
  }
  if (angle) {
    BlzSetSpecialEffectYaw(e, angle.radians);
  }
  doAfter(duration, () => DestroyEffect(e));
}

export function flashEffectUnit(
  path: string,
  target: Unit,
  attachmentPoint: string = "origin",
  scale?: number,
  angle?: Angle,
) {
  const e = new Effect(path, target, attachmentPoint);
  if (scale) {
    e.scale = scale;
  }
  if (angle) {
    e.setYaw(angle.radians);
  }
  e.destroy();
}
