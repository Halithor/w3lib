import { HEIGHT_ENABLER } from "./basics";
import { AbilId, unitId } from "./common";
import { doAfter, MapPlayer, Unit, Widget } from "./handles/index";
import { degrees, vec2, Vec2 } from "./math/index";

// The UnitId of the dummy
const dummyId = unitId("dumm");
const specialDummyId = unitId("dumn");
// Seconds to delay until recycling
const recycleDelay = 5;

export class Dummy {
  static freeDummies: Dummy[] = [];

  private unit: Unit;
  private freed: boolean = false;
  private ability?: AbilId;
  private special: boolean = false;

  private constructor(special: boolean = false) {
    this.special = true;
    this.unit = new Unit(
      MapPlayer.neutralPassive,
      !special ? dummyId : specialDummyId,
      vec2(0, 0),
      degrees(0),
    );
    this.unit.addAbility(HEIGHT_ENABLER);
    this.unit.removeAbility(HEIGHT_ENABLER);
  }

  static get(owner: MapPlayer, pos: Vec2, special: boolean = false): Dummy {
    const index = Dummy.freeDummies.findIndex(dummy => dummy.special === special);

    const dummy = index === -1
      ? new Dummy(special)
      : Dummy.freeDummies.splice(index, 1)[0];
    
    if (!dummy) throw new Error("getting dummy popped nothing!");

    dummy.freed = false;
    dummy.unit.resetCooldown();
    // dummy.unit.resetCooldown(); <- Needs to reset attack cooldown
    dummy.unit.setPosition(pos);
    dummy.unit.setOwner(owner, true);
    return dummy;
  }

  static release(dummy: Dummy) {
    if (dummy.freed) {
      return;
    }
    dummy.freed = true;
    if (dummy.ability) {
      dummy.unit.removeAbility(dummy.ability);
      dummy.ability = undefined;
    }
    Dummy.freeDummies.push(dummy);
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
    special: boolean = false,
  ) {
    const dummy = Dummy.get(player, pos, special);
    dummy.setAbility(ability, level);

    dummy.unit.issueImmediateOrder(order);

    doAfter(recycleDelay, () => Dummy.release(dummy));
  }

  static castTarget(
    player: MapPlayer,
    pos: Vec2,
    target: Vec2 | Widget,
    ability: AbilId,
    order: string | number,
    level: number = 1,
    special: boolean = false,
  ): boolean {
    const dummy = Dummy.get(player, pos, special);
    dummy.setAbility(ability, level);

    doAfter(recycleDelay, () => Dummy.release(dummy));
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
    special: boolean = false,
  ) {
    const dummy = Dummy.get(player, pos, special);
    dummy.setAbility(ability, level);

    if (target instanceof Vec2) {
      dummy.unit.issueOrderAt(order, target);
    } else {
      dummy.unit.issueTargetOrder(order, target);
    }
    doAfter(Math.max(channelDuration, recycleDelay), () =>
      Dummy.release(dummy),
    );
  }

  static provideAura(
    player: MapPlayer,
    pos: Vec2,
    ability: AbilId,
    duration: number,
    level: number = 1,
    special: boolean = false,
  ) {
    const dummy = Dummy.get(player, pos, special);
    dummy.setAbility(ability, level);
    doAfter(duration, () => {
      Dummy.release(dummy);
    });
  }
}
