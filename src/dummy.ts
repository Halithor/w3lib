import { HEIGHT_ENABLER } from "./basics";
import { AbilId, unitId } from "./common";
import { doAfter, MapPlayer, Unit, Widget } from "./handles/index";
import { degrees, vec2, Vec2 } from "./math/index";

// The UnitId of the dummy
const dummyId = unitId("dumm");
// Seconds to delay until recycling
const recycleDelay = 5;

export class Dummy {
  static freeDummies: Dummy[] = [];

  private unit: Unit;
  private freed: boolean = false;
  private ability?: AbilId;

  private constructor() {
    this.unit = new Unit(
      MapPlayer.neutralPassive,
      dummyId,
      vec2(0, 0),
      degrees(0),
    );
    this.unit.addAbility(HEIGHT_ENABLER);
    this.unit.removeAbility(HEIGHT_ENABLER);
  }

  static get(owner: MapPlayer, pos: Vec2): Dummy {
    const dummy =
      Dummy.freeDummies.length == 0 ? new Dummy() : Dummy.freeDummies.pop();
    if (!dummy) throw new Error("getting dummy popped nothing!");

    dummy.freed = false;
    dummy.unit.resetCooldown();
    dummy.unit.setPosition(pos);
    dummy.unit.setOwner(owner, true);
    return dummy;
  }

  release() {
    if (this.freed) {
      return;
    }
    this.freed = true;
    if (this.ability) {
      this.unit.removeAbility(this.ability);
      this.ability = undefined;
    }
    Dummy.freeDummies.push(this);
  }

  private setAbility(ability: AbilId, level: number) {
    this.unit.addAbility(ability);
    this.unit.setAbilityLevel(ability, level);
    this.ability = ability;
  }

  /**
   * Cast an instant ability at the target point for the given player.
   */
  static castImmediate(
    player: MapPlayer,
    pos: Vec2,
    ability: AbilId,
    order: string | number,
    level: number = 1,
  ) {
    const dummy = Dummy.get(player, pos);
    dummy.setAbility(ability, level);

    dummy.unit.issueImmediateOrder(order);

    doAfter(recycleDelay, () => dummy.release());
  }

  static castTarget(
    player: MapPlayer,
    pos: Vec2,
    target: Vec2 | Widget,
    ability: AbilId,
    order: string | number,
    level: number = 1,
  ): boolean {
    const dummy = Dummy.get(player, pos);
    dummy.setAbility(ability, level);

    doAfter(recycleDelay, () => dummy.release);
    if (target instanceof Vec2) {
      dummy.unit.setFacingEx(pos.angleTo(target));
      return dummy.unit.issueOrderAt(order, target);
    } else {
      dummy.unit.setFacingEx(pos.angleTo(vec2(target.x, target.y)));
      return dummy.unit.issueTargetOrder(order, target);
    }
  }

  static castTargetChannel(
    player: MapPlayer,
    pos: Vec2,
    target: Vec2 | Widget,
    channelDuration: number,
    ability: AbilId,
    order: string | number,
    level: number = 1,
  ) {
    const dummy = Dummy.get(player, pos);
    dummy.setAbility(ability, level);

    if (target instanceof Vec2) {
      dummy.unit.issueOrderAt(order, target);
    } else {
      dummy.unit.issueTargetOrder(order, target);
    }
    doAfter(Math.max(channelDuration, recycleDelay), () => dummy.release());
  }
}
