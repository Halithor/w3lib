/** @noSelfInFile **/

import {DestId} from '../common';
import {Angle, vec2, Vec3} from '../math/index';
import {Handle} from './handle';
import {Widget} from './widget';

export class Destructable extends Widget {
  public readonly handle!: destructable;

  constructor(
    destId: DestId,
    pos: Vec3,
    face: Angle,
    scale: number,
    varation: number
  ) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(
        CreateDestructableZ(
          destId.value,
          pos.x,
          pos.y,
          pos.z,
          face.degrees,
          scale,
          varation
        )
      );
    }
  }

  public set invulnerable(flag: boolean) {
    SetDestructableInvulnerable(this.handle, flag);
  }

  public get invulnerable() {
    return IsDestructableInvulnerable(this.handle);
  }

  public get life() {
    return GetDestructableLife(this.handle);
  }

  public set life(value: number) {
    SetDestructableLife(this.handle, value);
  }

  public get maxLife() {
    return GetDestructableMaxLife(this.handle);
  }

  public set maxLife(value: number) {
    SetDestructableMaxLife(this.handle, value);
  }

  public get name() {
    return GetDestructableName(this.handle);
  }

  public get occluderHeight() {
    return GetDestructableOccluderHeight(this.handle);
  }

  public set occluderHeight(value: number) {
    SetDestructableOccluderHeight(this.handle, value);
  }

  public get typeId() {
    return GetDestructableTypeId(this.handle);
  }

  public get pos() {
    return vec2(GetDestructableX(this.handle), GetDestructableY(this.handle));
  }

  public destroy() {
    RemoveDestructable(this.handle);
  }

  public heal(life: number, showBirth: boolean) {
    DestructableRestoreLife(this.handle, life, showBirth);
  }

  public kill() {
    KillDestructable(this.handle);
  }

  public queueAnim(whichAnimation: string) {
    QueueDestructableAnimation(this.handle, whichAnimation);
  }

  public setAnim(whichAnimation: string) {
    SetDestructableAnimation(this.handle, whichAnimation);
  }

  public setAnimSpeed(speedFactor: number) {
    SetDestructableAnimationSpeed(this.handle, speedFactor);
  }

  public show(flag: boolean) {
    ShowDestructable(this.handle, flag);
  }

  public static fromEvent() {
    return this.fromHandle(GetTriggerDestructable());
  }

  public static fromHandle(handle: destructable): Destructable {
    return this.getObject(handle);
  }
}
