import {
  eventUnitConstructionFinish,
  eventUnitDeath,
  eventUnitSold,
  eventUnitSummonsUnit,
  eventUnitTrainingFinish,
} from "../events";
import { Unit } from "../handles";
import { BetterGroup } from "./betterGroup";

/**
 * A class that wraps a group of units. Units that match the filter are
 * automatically added and removed from this group.
 *
 * Note: Units are removed on death, revival may cause issues.
 */
export class UnitTracker {
  readonly units = new BetterGroup();

  constructor(private readonly filter: (u: Unit) => boolean) {
    eventUnitTrainingFinish
      .filter(({ trained }) => filter(trained))
      .subscribe(({ trained }) => this.units.addUnit(trained));
    eventUnitSold
      .filter(({ sold }) => filter(sold))
      .subscribe(({ sold }) => this.units.addUnit(sold));
    eventUnitSummonsUnit
      .filter(({ summoned }) => filter(summoned))
      .subscribe(({ summoned }) => this.units.addUnit(summoned));
    eventUnitConstructionFinish
      .filter(({ constructed }) => filter(constructed))
      .subscribe(({ constructed }) => this.units.addUnit(constructed));

    eventUnitDeath
      .filter(({ dying }) => filter(dying))
      .subscribe(({ dying }) => this.units.removeUnit(dying));
  }
}
