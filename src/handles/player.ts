/** @noSelfInFile **/

import {Group} from './group';
import {Unit} from './unit';
import {Vec2} from '../math/index';
import {Force} from './force';
import {Handle} from './handle';
import {AbilId} from '../common';

export const Players: MapPlayer[] = [];
const localPlayer = GetLocalPlayer();

export enum AllianceState {
  Unallied,
  UnalliedVision,
  Allied,
  AlliedVision,
  AlliedUnits,
  AlliedAdvUnits,
  Neutral,
  NeutralVision,
}

export class MapPlayer extends Handle<player> {
  private constructor(index: number) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(Player(index));
    }
  }

  public set color(color: playercolor) {
    SetPlayerColor(this.handle, color);
  }

  public get color() {
    return GetPlayerColor(this.handle);
  }

  public get controller() {
    return GetPlayerController(this.handle);
  }

  public get handicap() {
    return GetPlayerHandicap(this.handle);
  }

  public set handicap(handicap: number) {
    SetPlayerHandicap(this.handle, handicap);
  }

  public get handicapXp() {
    return GetPlayerHandicapXP(this.handle);
  }

  public set handicapXp(handicap: number) {
    SetPlayerHandicapXP(this.handle, handicap);
  }

  public get id() {
    return GetPlayerId(this.handle);
  }

  get isLocalPlayer(): boolean {
    return localPlayer == this.handle;
  }

  public get name() {
    return GetPlayerName(this.handle);
  }

  public set name(value: string) {
    SetPlayerName(this.handle, value);
  }

  public get race() {
    return GetPlayerRace(this.handle);
  }

  public get slotState() {
    return GetPlayerSlotState(this.handle);
  }

  public get startLocation() {
    return GetPlayerStartLocation(this.handle);
  }

  public get startLocationX() {
    return GetStartLocationX(this.startLocation);
  }

  public get startLocationY() {
    return GetStartLocationY(this.startLocation);
  }

  public get startLocationPoint() {
    return GetStartLocationLoc(this.startLocation);
  }

  public get team() {
    return GetPlayerTeam(this.handle);
  }

  public get townHallCount() {
    return BlzGetPlayerTownHallCount(this.handle);
  }

  public get gold(): number {
    return this.getState(PLAYER_STATE_RESOURCE_GOLD);
  }

  public set gold(value: number) {
    this.setState(PLAYER_STATE_RESOURCE_GOLD, value);
  }

  public get lumber(): number {
    return this.getState(PLAYER_STATE_RESOURCE_LUMBER);
  }

  public set lumber(value: number) {
    this.setState(PLAYER_STATE_RESOURCE_LUMBER, value);
  }

  public addTechResearched(techId: number, levels: number) {
    AddPlayerTechResearched(this.handle, techId, levels);
  }

  public decTechResearched(techId: number, levels: number) {
    BlzDecPlayerTechResearched(this.handle, techId, levels);
  }

  // Used to store hero level data for the scorescreen
  // before units are moved to neutral passive in melee games
  public cacheHeroData() {
    CachePlayerHeroData(this.handle);
  }

  public compareAlliance(
    otherPlayer: MapPlayer,
    whichAllianceSetting: alliancetype
  ) {
    return GetPlayerAlliance(
      this.handle,
      otherPlayer.handle,
      whichAllianceSetting
    );
  }

  isIngame(): boolean {
    return (
      this.slotState == PLAYER_SLOT_STATE_PLAYING &&
      this.controller == MAP_CONTROL_USER
    );
  }

  public isFogged(pos: Vec2) {
    return IsFoggedToPlayer(pos.x, pos.y, this.handle);
  }

  public isMasked(pos: Vec2) {
    return IsMaskedToPlayer(pos.x, pos.y, this.handle);
  }

  public isVisible(pos: Vec2) {
    return IsVisibleToPlayer(pos.x, pos.y, this.handle);
  }

  public cripple(toWhichPlayers: Force, flag: boolean) {
    CripplePlayer(this.handle, toWhichPlayers.handle, flag);
  }

  public getScore(whichPlayerScore: playerscore) {
    return GetPlayerScore(this.handle, whichPlayerScore);
  }

  public getState(whichPlayerState: playerstate) {
    return GetPlayerState(this.handle, whichPlayerState);
  }

  public getStructureCount(includeIncomplete: boolean) {
    return GetPlayerStructureCount(this.handle, includeIncomplete);
  }

  public getTaxRate(otherPlayer: player, whichResource: playerstate) {
    return GetPlayerTaxRate(this.handle, otherPlayer, whichResource);
  }

  public getTechCount(techId: number, specificonly: boolean) {
    return GetPlayerTechCount(this.handle, techId, specificonly);
  }

  public getTechMaxAllowed(techId: number) {
    return GetPlayerTechMaxAllowed(this.handle, techId);
  }

  public getTechResearched(techId: number, specificonly: boolean) {
    return GetPlayerTechResearched(this.handle, techId, specificonly);
  }

  public getUnitCount(includeIncomplete: boolean) {
    return GetPlayerUnitCount(this.handle, includeIncomplete);
  }

  public getUnitCountByType(
    unitName: string,
    includeIncomplete: boolean,
    includeUpgrades: boolean
  ) {
    return GetPlayerTypedUnitCount(
      this.handle,
      unitName,
      includeIncomplete,
      includeUpgrades
    );
  }

  public inForce(whichForce: Force) {
    return IsPlayerInForce(this.handle, whichForce.handle);
  }

  public isObserver() {
    return IsPlayerObserver(this.handle);
  }

  public isPlayerAlly(otherPlayer: MapPlayer) {
    return IsPlayerAlly(this.handle, otherPlayer.handle);
  }

  public isPlayerEnemy(otherPlayer: MapPlayer) {
    return IsPlayerEnemy(this.handle, otherPlayer.handle);
  }

  public isRacePrefSet(pref: racepreference) {
    return IsPlayerRacePrefSet(this.handle, pref);
  }

  public isSelectable() {
    return GetPlayerSelectable(this.handle);
  }

  public remove(gameResult: playergameresult) {
    RemovePlayer(this.handle, gameResult);
  }

  public removeAllGuardPositions() {
    RemoveAllGuardPositions(this.handle);
  }

  public setAbilityAvailable(abilId: AbilId, avail: boolean) {
    SetPlayerAbilityAvailable(this.handle, abilId.value, avail);
  }

  public setAlliance(
    otherPlayer: MapPlayer,
    whichAllianceSetting: alliancetype,
    value: boolean
  ) {
    SetPlayerAlliance(
      this.handle,
      otherPlayer.handle,
      whichAllianceSetting,
      value
    );
  }

  setAllianceState(otherPlayer: MapPlayer, state: AllianceState) {
    switch (state) {
      case AllianceState.Unallied:
        this.setAlliance(otherPlayer, ALLIANCE_PASSIVE, false);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_REQUEST, false);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_RESPONSE, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_XP, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_SPELLS, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_VISION, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_CONTROL, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_ADVANCED_CONTROL, false);
        break;
      case AllianceState.UnalliedVision:
        this.setAlliance(otherPlayer, ALLIANCE_PASSIVE, false);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_REQUEST, false);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_RESPONSE, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_XP, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_SPELLS, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_VISION, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_CONTROL, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_ADVANCED_CONTROL, false);
        break;
      case AllianceState.Allied:
        this.setAlliance(otherPlayer, ALLIANCE_PASSIVE, true);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_REQUEST, true);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_RESPONSE, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_XP, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_SPELLS, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_VISION, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_CONTROL, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_ADVANCED_CONTROL, false);
        break;
      case AllianceState.AlliedVision:
        this.setAlliance(otherPlayer, ALLIANCE_PASSIVE, true);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_REQUEST, true);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_RESPONSE, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_XP, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_SPELLS, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_VISION, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_CONTROL, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_ADVANCED_CONTROL, false);
        break;
      case AllianceState.AlliedUnits:
        this.setAlliance(otherPlayer, ALLIANCE_PASSIVE, true);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_REQUEST, true);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_RESPONSE, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_XP, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_SPELLS, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_VISION, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_CONTROL, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_ADVANCED_CONTROL, false);
        break;
      case AllianceState.AlliedAdvUnits:
        this.setAlliance(otherPlayer, ALLIANCE_PASSIVE, true);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_REQUEST, true);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_RESPONSE, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_XP, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_SPELLS, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_VISION, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_CONTROL, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_ADVANCED_CONTROL, true);
        break;
      case AllianceState.Neutral:
        this.setAlliance(otherPlayer, ALLIANCE_PASSIVE, false);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_REQUEST, false);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_RESPONSE, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_XP, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_SPELLS, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_VISION, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_CONTROL, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_ADVANCED_CONTROL, false);
        this.setAlliance(otherPlayer, ALLIANCE_PASSIVE, true);
        break;
      case AllianceState.NeutralVision:
        this.setAlliance(otherPlayer, ALLIANCE_PASSIVE, false);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_REQUEST, false);
        this.setAlliance(otherPlayer, ALLIANCE_HELP_RESPONSE, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_XP, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_SPELLS, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_VISION, true);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_CONTROL, false);
        this.setAlliance(otherPlayer, ALLIANCE_SHARED_ADVANCED_CONTROL, false);
        this.setAlliance(otherPlayer, ALLIANCE_PASSIVE, true);
        break;
      default:
        const _checkExhaustive: never = state;
        throw new Error('should not happen');
    }
  }
  public setOnScoreScreen(flag: boolean) {
    SetPlayerOnScoreScreen(this.handle, flag);
  }

  public setState(whichPlayerState: playerstate, value: number) {
    SetPlayerState(this.handle, whichPlayerState, value);
  }

  public setTaxRate(
    otherPlayer: MapPlayer,
    whichResource: playerstate,
    rate: number
  ) {
    SetPlayerTaxRate(this.handle, otherPlayer.handle, whichResource, rate);
  }

  public setTechMaxAllowed(techId: number, maximum: number) {
    SetPlayerTechMaxAllowed(this.handle, techId, maximum);
  }

  public setTechResearched(techId: number, setToLevel: number) {
    SetPlayerTechResearched(this.handle, techId, setToLevel);
  }

  public setUnitsOwner(newOwner: number) {
    SetPlayerUnitsOwner(this.handle, newOwner);
  }

  public selectUnitSingle(unit: Unit) {
    SelectUnitForPlayerSingle(unit.handle, this.handle);
  }

  public selectUnitAdd(unit: Unit) {
    SelectUnitAddForPlayer(unit.handle, this.handle);
  }

  public selectUnitRemove(unit: Unit) {
    SelectUnitRemoveForPlayer(unit.handle, this.handle);
  }

  public selectUnitClear() {
    ClearSelectionForPlayer(this.handle);
  }

  public selectUnitGroup(group: Group) {
    this.selectUnitClear();
    group.for(() => {
      SelectUnitAddForPlayer(GetEnumUnit(), this.handle);
    });
  }

  public static fromEnum() {
    return MapPlayer.fromHandle(GetEnumPlayer());
  }

  public static fromEvent() {
    return MapPlayer.fromHandle(GetTriggerPlayer());
  }

  public static fromFilter() {
    return MapPlayer.fromHandle(GetFilterPlayer());
  }

  public static fromHandle(handle: player): MapPlayer {
    return this.getObject(handle);
  }

  public static fromIndex(index: number) {
    return this.fromHandle(Player(index));
  }

  public static fromLocal() {
    return this.fromHandle(GetLocalPlayer());
  }
}

for (let i = 0; i < bj_MAX_PLAYER_SLOTS; i++) {
  Players[i] = MapPlayer.fromHandle(Player(i));
}
