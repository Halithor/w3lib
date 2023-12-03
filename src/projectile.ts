import {
  Destructable,
  Effect,
  Unit,
  doPeriodically,
  forDestructablesInCircle,
  forUnitsInRange,
} from "./handles";
import { Vec2, Vec3, vec3 } from "./math";

export type OnImpactFunc = (target: Vec3 | Unit | Destructable, pos: Vec2) => void;
export type CancelFunc = () => void;

export interface ProjectileOpts {
  src: Vec3;
  dst: Vec3 | Unit;

  effect: string;

  groundSpeed: number;
  gravity: number;

  radius?: number;

  shouldImpactUnit?: true | ((target: Unit) => boolean);
  shouldImpactDestructable?: true | ((target: Destructable) => boolean);

  checkVertical?: boolean;
  destroyOnImpact?: boolean;
}

const DEFAULT_RADIUS = 80;
const INTERVAL = 0.03;

export function createProjectile(opts: ProjectileOpts, onImpact: OnImpactFunc): CancelFunc {
  const {
    src,
    dst,
    effect: effectName,
    gravity,
    groundSpeed,
    shouldImpactUnit,
    shouldImpactDestructable,
    checkVertical,
    destroyOnImpact,
  } = opts;

  let source2 = src.withoutZ();
  let target3: Vec3;

  const isUnitTarget = dst instanceof Unit;
  if (isUnitTarget) {
    target3 = dst.pos.withTerrainZ();
  } else {
    target3 = dst;
  }

  let target2 = target3.withoutZ();

  // Set up the effect.
  const effect = new Effect(effectName, source2);
  effect.yaw = source2.angleTo(target2);

  // Calculate the initial vertical speed.
  const flightTime = source2.distanceTo(target2) / groundSpeed;
  let vertSpeed =
    (target3.z - src.z) / flightTime + (flightTime * gravity) / 2.0;

  let nextSource2: Vec2;

  // Set up impact checks that will be used frequently if configured.
  let checkUnit: (u: Unit) => void;
  if (shouldImpactUnit === true) {
    checkUnit = (u: Unit) => {
      if (checkVertical) {
        const zDistance = u.pos
          .withTerrainZ()
          .add(vec3(0, 0, u.getflyHeight()))
          .distanceTo(effect.pos);

        if (zDistance > 100 + u.collisionSize) {
          return;
        }
      }

      onImpact(u, nextSource2);

      if (destroyOnImpact) {
        // TODO: Stop iterating through units.
        cleanup();
      }
    };
  } else if (shouldImpactUnit) {
    checkUnit = (u: Unit) => {
      if (shouldImpactUnit(u)) {
        if (checkVertical) {
          const zDistance = u.pos
            .withTerrainZ()
            .add(vec3(0, 0, u.getflyHeight()))
            .distanceTo(effect.pos);

          if (zDistance > 100 + u.collisionSize) {
            return;
          }
        }

        onImpact(u, nextSource2);

        if (destroyOnImpact) {
          // TODO: Stop iterating through units.
          cleanup();
        }
      }
    };
  }

  let checkDestructible: (d: Destructable) => void;
  if (shouldImpactDestructable === true) {
    checkDestructible = (d: Destructable) => {
      onImpact(d, nextSource2);

      if (destroyOnImpact) {
        // TODO: Stop iterating through destructables.
        cleanup();
      }
    };
  } else if (shouldImpactDestructable) {
    checkDestructible = (d: Destructable) => {
      if (shouldImpactDestructable(d)) {
        onImpact(d, nextSource2);

        if (destroyOnImpact) {
          // TODO: Stop iterating through destructables.
          cleanup();
        }
      }
    };
  }

  const radius = opts.radius ?? DEFAULT_RADIUS;

  const period = doPeriodically(INTERVAL, () => {
    if (isUnitTarget) {
      // Update the destination since the unit could have moved.
      target2 = dst.pos;
    }

    let distance = source2.distanceTo(target2);
    if (isUnitTarget) {
      // Update the distance to impact the unit at their edge, not their center.
      distance -= dst.collisionSize;
    }

    source2 = effect.pos.withoutZ();

    const distanceCovered = groundSpeed * INTERVAL;
    if (distanceCovered < distance) {
      // We're still in the air.
      nextSource2 = source2.moveTowards(target2, distanceCovered);
      vertSpeed -= gravity * INTERVAL;

      // Update the effect's position before checking impacts.
      effect.yaw = source2.angleTo(target2);
      effect.pos = nextSource2.withZ(
        math.max(
          effect.pos.z + vertSpeed * INTERVAL,
          nextSource2.terrainZ + 80,
        ),
      );

      if (shouldImpactUnit) {
        forUnitsInRange(nextSource2, radius, checkUnit);
      }

      if (shouldImpactDestructable) {
        forDestructablesInCircle(nextSource2, radius, checkDestructible);
      }
    } else {
      // We've impacted the target.
      onImpact(dst, target2);
      cleanup();
    }
  });

  const cleanup = () => {
    effect.destroy();
    period.cancel();
  };

  return cleanup;
}
