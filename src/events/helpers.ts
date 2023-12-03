import { AbilId } from "../common";
import { Unit } from "../handles";

export function isCastBy(
  id: AbilId,
  unit: Unit,
): (e: { caster: Unit; abilityId: AbilId }) => boolean {
  return (e: { caster: Unit; abilityId: AbilId }) =>
    e.caster === unit && e.abilityId === id;
}
