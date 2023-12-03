import { Effect, MapPlayer } from "../handles";
import { Angle, FULL_CIRCLE_RADS, Vec2 } from "../math";

const INDICATOR_MODEL = "Doodads\\Cinematic\\GlowingRunes\\GlowingRunes4.mdl";

const DEFAULT_SCALE = 0.4;
const DEFAULT_TIME_SCALE = 5.0;

export interface CircleIndicatorOpts {
  count?: number;
  scale?: number;
  timeScale?: number;
  player?: MapPlayer;
}

export class CircleIndicator {
  #rad: number;
  #pos: Vec2;

  #effects: Effect[];

  public constructor(pos: Vec2, rad: number, opts?: CircleIndicatorOpts) {
    this.#pos = pos;
    this.#rad = rad;

    let model = INDICATOR_MODEL;
    if (opts?.player && !opts?.player.isLocalPlayer) {
      model = "";
    }

    const count = opts?.count ?? MathRound((rad * 3) / 100);

    this.#effects = [];
    for (let i = 0; i < count; i++) {
      this.#effects[i] = new Effect(model, pos);
      this.#effects[i].scale = opts?.scale ?? DEFAULT_SCALE;
      this.#effects[i].setTimeScale(opts?.timeScale ?? DEFAULT_TIME_SCALE);
    }

    this.updateEffects();
  }

  public get pos(): Vec2 {
    return this.#pos;
  }

  public set pos(pos: Vec2) {
    this.#pos = pos;
    this.updateEffects();
  }

  public get rad(): number {
    return this.#rad;
  }

  public set rad(radius: number) {
    this.#rad = radius;
    this.updateEffects();
  }

  public remove() {
    for (const effect of this.#effects) {
      if (effect != null) {
        effect.destroy();
      }
    }
  }

  private updateEffects() {
    const step = FULL_CIRCLE_RADS / this.#effects.length;
    for (let i = 0; i < this.#effects.length; i++) {
      const angle = Angle.fromRadians(step * i);

      const effect = this.#effects[i];
      effect.pos = this.#pos.polarOffset(angle, this.#rad).withTerrainZ();
      effect.setYaw(angle.radians);
    }
  }
}
