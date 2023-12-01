import { color, Color } from "../helper/index";
import { vec2, Vec2, Vec3 } from "../math/index";
import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Unit } from "./unit";

export class TextTag extends Handle<texttag> {
  // properties needed to be able to update one aspect at a time.
  private _text: string;
  private _size: number;

  constructor(message: string, pos: Vec3, size: number, color: Color) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateTextTag());
    }
    this._size = size * 0.0023;
    this._text = message;
    SetTextTagText(this.handle, this._text, this._size);
    SetTextTagPos(this.handle, pos.x, pos.y, pos.z);
    SetTextTagColor(
      this.handle,
      color.red,
      color.green,
      color.blue,
      color.alpha,
    );
  }

  set age(value: number) {
    SetTextTagAge(this.handle, value);
  }

  set color(value: Color) {
    SetTextTagColor(
      this.handle,
      value.red,
      value.green,
      value.blue,
      value.alpha,
    );
  }

  set fadepoint(value: number) {
    SetTextTagFadepoint(this.handle, value);
  }

  set lifespan(value: number) {
    SetTextTagLifespan(this.handle, value);
  }

  set permanent(value: boolean) {
    SetTextTagPermanent(this.handle, value);
  }

  set pos(pos: Vec3) {
    SetTextTagPos(this.handle, pos.x, pos.y, pos.z);
  }

  set size(value: number) {
    this._size = value * 0.0023;
    SetTextTagText(this.handle, this._text, this._size);
  }

  set suspended(value: boolean) {
    SetTextTagSuspended(this.handle, value);
  }

  set text(message: string) {
    this._text = message;
    SetTextTagText(this.handle, message, this._size);
  }

  get text(): string {
    return this._text;
  }

  set velocity(value: Vec2) {
    SetTextTagVelocity(this.handle, value.x, value.y);
  }

  set visible(value: boolean) {
    SetTextTagVisibility(this.handle, value);
  }

  // setVisibleForPlayer makes this text tag visible only for the given player.
  // Use the visible setter for all players.
  setVisibleForPlayer(p: MapPlayer, value: boolean) {
    if (p.isLocalPlayer) {
      SetTextTagVisibility(this.handle, value);
    } else {
      this.text = "";
    }
  }

  destroy() {
    DestroyTextTag(this.handle);
  }
}

const fontSize = 10.434;
const offset = vec2(16, 0);

export function standardTextTagForPlayer(
  pos: Vec2,
  text: string,
  player: MapPlayer,
): TextTag {
  const tt = new TextTag(text, pos.withZ(0), fontSize, color(255, 255, 255));
  tt.fadepoint = 2.0;
  tt.lifespan = 3.0;
  tt.velocity = vec2(0, 0.03);
  tt.permanent = false;
  tt.setVisibleForPlayer(player, true);
  return tt;
}

export function standardTextTag(pos: Vec2, text: string): TextTag {
  const tt = new TextTag(text, pos.withZ(0), fontSize, color(255, 255, 255));
  tt.fadepoint = 2.0;
  tt.lifespan = 3.0;
  tt.velocity = vec2(0, 0.03);
  tt.permanent = false;
  tt.visible = true;
  return tt;
}

export function createCriticalStrikeTextTag(u: Unit, damage: number): TextTag {
  const msg = Math.round(damage).toString() + "!";
  const tt = standardTextTag(u.pos, msg);
  tt.color = color(255, 0, 0);
  tt.velocity = vec2(0, 0.04);
  tt.lifespan = 5.0;
  return tt;
}

export function createGoldBountyTextTag(
  pos: Vec2,
  bounty: number,
  receiver?: MapPlayer,
): TextTag {
  const msg = "+" + bounty.toString();
  const offsetPos = pos.sub(offset);
  const tt = standardTextTag(offsetPos, msg);
  tt.color = color(255, 220, 0);
  if (receiver != undefined) {
    tt.visible = false;
    tt.setVisibleForPlayer(receiver, true);
  }
  return tt;
}

export function createLumberBountyTextTag(
  pos: Vec2,
  bounty: number,
  receiver?: MapPlayer,
): TextTag {
  const msg = "+" + bounty.toString();
  const offsetPos = pos.sub(offset);
  const tt = standardTextTag(offsetPos, msg);
  tt.color = color(0, 200, 80);
  if (receiver != undefined) {
    tt.visible = false;
    tt.setVisibleForPlayer(receiver, true);
  }
  return tt;
}

export function createManaBurnTextTag(pos: Vec2, damage: number) {
  const msg = "-" + damage.toString();
  const offsetPos = pos.sub(offset);
  const tt = standardTextTag(offsetPos, msg);
  tt.color = color(82, 82, 255);
  tt.velocity = vec2(0, 0.04);
  tt.lifespan = 5;
}

export function createManaGainTextTag(pos: Vec2, damage: number) {
  const msg = "+" + damage.toString();
  const offsetPos = pos.sub(offset);
  const tt = standardTextTag(offsetPos, msg);
  tt.color = color(82, 82, 255);
  tt.velocity = vec2(0, 0.04);
  tt.lifespan = 5;
  return tt;
}

export function createMissTextTag(origin: Unit | Vec2): TextTag {
  let pos: Vec2;
  if (origin instanceof Unit) {
    pos = origin.pos;
  } else {
    pos = origin;
  }
  const tt = standardTextTag(pos, "miss");
  tt.color = color(255, 0, 0);
  tt.fadepoint = 1;
  return tt;
}
