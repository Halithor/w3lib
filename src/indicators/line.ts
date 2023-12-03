import { Effect } from "../handles";
import { Angle, Vec2 } from "../math";

const INDICATOR_MODEL = "Doodads\\Cinematic\\GlowingRunes\\GlowingRunes4.mdl";

const DEFAULT_WIDTH = 100;
const DEFAULT_DENSITY = 1;

export interface LineIndicatorOpts {
  width?: number;
  density?: number;
}

export class LineIndicator {
  #start: Vec2;
  #end: Vec2;
  #width: number;
  #density: number;

  private lEffects: Effect[] = [];
  private rEffects: Effect[] = [];

  public constructor(start: Vec2, end: Vec2, opts?: LineIndicatorOpts) {
    this.#start = start;
    this.#end = end;
    this.#width = opts?.width ?? DEFAULT_WIDTH;
    this.#density = opts?.density ?? DEFAULT_DENSITY;

    this.updateEffects();
  }

  public get start(): Vec2 {
    return this.#start;
  }

  public set start(pos: Vec2) {
    this.#start = pos;
    this.updateEffects();
  }

  public get end(): Vec2 {
    return this.#end;
  }

  public set end(pos: Vec2) {
    this.#end = pos;
    this.updateEffects();
  }

  public get width(): number {
    return this.#width;
  }

  public set width(w: number) {
    this.#width = w;
    this.updateEffects();
  }

  public get density(): number {
    return this.#density;
  }

  public set density(val: number) {
    this.#density = val;
    this.updateEffects();
  }

  public remove() {
    for (const effect of this.lEffects) {
      effect.destroy();
    }

    for (const effect of this.rEffects) {
      effect.destroy();
    }
  }

  private updateEffects() {
    const dir = this.#start.normalizedPointerTo(this.#end);
    const length = this.#start.distanceTo(this.#end);
    const count = math.ceil((length / 100.0) * this.#density) + 1;
    const spacing = length / (count - 1);

    const updateEffects = (angle: Angle, list: Effect[]) => {
      const pos = this.#start.add(dir.rotate(angle).scale(this.#width));
      const delta = count - list.length;

      // Create any required new effects.
      for (let i = 0; i < delta; i++) {
        const effect = new Effect(INDICATOR_MODEL, pos);
        effect.scale = 0.4;
        effect.setTimeScale(5.0);

        list.push(effect);
      }

      // Destroy any extra effects..
      for (let i = 0; i < -delta; i++) {
        list.pop()!.destroy();
      }

      // Move effects to their correct location.
      for (let i = 0; i < list.length; i++) {
        list[i].pos = this.#start
          .moveTowards(this.#end, i * spacing)
          .add(dir.rotate(angle).scale(this.#width / 2))
          .withTerrainZ();
      }
    };

    updateEffects(Angle.fromDegrees(-90), this.lEffects);
    updateEffects(Angle.fromDegrees(90), this.rEffects);
  }
}
