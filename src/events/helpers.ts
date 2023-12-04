import { AbilId } from "../common";
import { Unit } from "../handles";

export function isCastBy(
  id: AbilId,
  unit: Unit,
): (e: { caster: Unit; abilityId: AbilId }) => boolean {
  return (e: { caster: Unit; abilityId: AbilId }) =>
    e.caster === unit && e.abilityId === id;
}

export function hasAbility(id: AbilId): (e: { attacker: Unit }) => boolean {
  return (e: { attacker: Unit }) => e.attacker.getAbilityLevel(id) > 0;
}
