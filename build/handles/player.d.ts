/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Group } from './group';
import { Unit } from './unit';
import { Vec2 } from '../math/index';
import { Force } from './force';
import { Handle } from './handle';
import { AbilId, TechId, UnitId } from '../common';
export declare const Players: MapPlayer[];
export declare enum AllianceState {
    Unallied = 0,
    UnalliedVision = 1,
    Allied = 2,
    AlliedVision = 3,
    AlliedUnits = 4,
    AlliedAdvUnits = 5,
    Neutral = 6,
    NeutralVision = 7
}
export declare class MapPlayer extends Handle<player> {
    private constructor();
    set color(color: playercolor);
    get color(): playercolor;
    get controller(): mapcontrol;
    get handicap(): number;
    set handicap(handicap: number);
    get handicapXp(): number;
    set handicapXp(handicap: number);
    get id(): number;
    get isLocalPlayer(): boolean;
    get name(): string;
    set name(value: string);
    get nameShort(): string;
    get nameColored(): string;
    get nameShortColored(): string;
    get race(): race;
    get slotState(): playerslotstate;
    get startLocation(): number;
    get startLocationX(): number;
    get startLocationY(): number;
    get startLocationPoint(): location;
    get team(): number;
    get townHallCount(): number;
    get gold(): number;
    set gold(value: number);
    get lumber(): number;
    set lumber(value: number);
    get foodCap(): number;
    set foodCap(val: number);
    get foodUsed(): number;
    set foodUsed(val: number);
    cacheHeroData(): void;
    compareAlliance(otherPlayer: MapPlayer, whichAllianceSetting: alliancetype): boolean;
    isIngame(): boolean;
    isFogged(pos: Vec2): boolean;
    isMasked(pos: Vec2): boolean;
    isVisible(pos: Vec2): boolean;
    cripple(toWhichPlayers: Force, flag: boolean): void;
    getScore(whichPlayerScore: playerscore): number;
    getState(whichPlayerState: playerstate): number;
    getStructureCount(includeIncomplete: boolean): number;
    getTaxRate(otherPlayer: player, whichResource: playerstate): number;
    getTechCount(techId: TechId): number;
    getTechMaxAllowed(techId: TechId): number;
    getTechResearched(techId: TechId): boolean;
    addTechResearched(techId: TechId, levels: number): void;
    decTechResearched(techId: TechId, levels: number): void;
    setTechMaxAllowed(techId: TechId, maximum: number): void;
    setTechResearched(techId: TechId, setToLevel: number): void;
    getUnitCount(includeIncomplete: boolean): number;
    getUnitCountByType(unitName: string, includeIncomplete: boolean, includeUpgrades: boolean): number;
    inForce(whichForce: Force): boolean;
    isObserver(): boolean;
    isPlayerAlly(otherPlayer: MapPlayer): boolean;
    isPlayerEnemy(otherPlayer: MapPlayer): boolean;
    isRacePrefSet(pref: racepreference): boolean;
    isSelectable(): boolean;
    remove(gameResult: playergameresult): void;
    removeAllGuardPositions(): void;
    setAbilityAvailable(abilId: AbilId, avail: boolean): void;
    setAlliance(otherPlayer: MapPlayer, whichAllianceSetting: alliancetype, value: boolean): void;
    setAllianceState(otherPlayer: MapPlayer, state: AllianceState): void;
    setOnScoreScreen(flag: boolean): void;
    setState(whichPlayerState: playerstate, value: number): void;
    setTaxRate(otherPlayer: MapPlayer, whichResource: playerstate, rate: number): void;
    setUnitsOwner(newOwner: number): void;
    selectUnitSingle(unit: Unit): void;
    selectUnitAdd(unit: Unit): void;
    selectUnitRemove(unit: Unit): void;
    selectUnitClear(): void;
    selectUnitGroup(group: Group): void;
    setUnitMaxAllowed(unitId: UnitId, count: number): void;
    displayText(message: string, xPos?: number, yPos?: number): void;
    displayTextTimed(seconds: number, message: string, xPos?: number, yPos?: number): void;
    static fromEnum(): MapPlayer;
    static fromEvent(): MapPlayer;
    static fromFilter(): MapPlayer;
    static fromHandle(handle: player): MapPlayer;
    static fromIndex(index: number): MapPlayer;
    static fromLocal(): MapPlayer;
    static get eventTriggering(): MapPlayer;
    static get eventPreviousOwner(): MapPlayer;
    static get neutralHostile(): MapPlayer;
    static get neutralPassive(): MapPlayer;
}
