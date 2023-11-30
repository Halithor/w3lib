/** @noSelfInFile **/

import { Rectangle } from "./rect";
import { DestId } from "../common";
import { Angle, Vec2, vec2, Vec3 } from "../math/index";
import { Handle } from "./handle";
import { Widget } from "./widget";

export class Destructable extends Widget {
  public declare readonly handle: destructable;

  constructor(
    destId: DestId,
    pos: Vec3,
    face: Angle,
    scale: number,
    varation: number,
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
          varation,
        ),
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

  public get typeId(): DestId {
    return DestId.of(GetDestructableTypeId(this.handle));
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

  public gateOpen() {
    if (this.life > 0) {
      this.kill();
    }
    this.setAnim("death alternate");
  }

  public gateClose() {
    if (this.life <= 0) {
      this.heal(this.maxLife, true);
    }
  }

  public gateDestroy() {
    if (this.life > 0) {
      this.kill();
    }
    this.setAnim("death");
  }

  public static fromEvent() {
    return this.fromHandle(GetTriggerDestructable());
  }

  public static fromHandle(handle: destructable): Destructable {
    return this.getObject(handle);
  }
}

export function forDestructablesInRect(
  rect: Rectangle,
  callback: (d: Destructable) => void,
) {
  EnumDestructablesInRectAll(rect.handle, () => {
    callback(Destructable.fromHandle(GetEnumDestructable()));
  });
}

// forDestructablesInCircle iterates over all destructables in a circle and
// calls the callback upon them.
export function forDestructablesInCircle(
  pos: Vec2,
  radius: number,
  callback: (d: Destructable) => void,
) {
  // add buffer for AoE
  const adjustedRadius = radius + 65;
  const r = new Rectangle(
    pos.sub(vec2(adjustedRadius, adjustedRadius)),
    pos.add(vec2(adjustedRadius, adjustedRadius)),
  );

  const radiusSq = radius * radius;
  forDestructablesInRect(r, (d: Destructable) => {
    const dPos = new Vec2(d.x, d.y);
    if (dPos.distanceToSq(pos) < radiusSq) {
      callback(d);
    }
  });
  r.destroy();
}

// killDestructablesInCircle kills all destructables, optionally calling the
// passed callback after each kill. Does not remove pathing blockers.
export function killDestructablesInCircle(
  pos: Vec2,
  radius: number,
  callback?: (d: Destructable) => void,
) {
  forDestructablesInCircle(pos, radius, (d: Destructable) => {
    if (d.life > 1) {
      d.kill();
      if (callback) {
        callback(d);
      }
    }
  });
}

// getRandomDestructableInRange selects a random destructable in range that
// matches the optionally provided filter.
export function getRandomDestructableInRange(
  pos: Vec2,
  radius: number,
  filter?: (d: Destructable) => boolean,
): Destructable | undefined {
  let count = 0;
  let selected: Destructable | undefined = undefined;
  forDestructablesInCircle(pos, radius, (d: Destructable) => {
    if (!filter || filter(d)) {
      count++;
      if (GetRandomInt(1, count) == 1) {
        selected = d;
      }
    }
  });
  return selected;
}
