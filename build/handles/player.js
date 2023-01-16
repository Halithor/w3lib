"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapPlayer = exports.AllianceState = exports.Players = void 0;
const handle_1 = require("./handle");
const index_1 = require("../helper/index");
exports.Players = [];
const localPlayer = GetLocalPlayer();
var AllianceState;
(function (AllianceState) {
    AllianceState[AllianceState["Unallied"] = 0] = "Unallied";
    AllianceState[AllianceState["UnalliedVision"] = 1] = "UnalliedVision";
    AllianceState[AllianceState["Allied"] = 2] = "Allied";
    AllianceState[AllianceState["AlliedVision"] = 3] = "AlliedVision";
    AllianceState[AllianceState["AlliedUnits"] = 4] = "AlliedUnits";
    AllianceState[AllianceState["AlliedAdvUnits"] = 5] = "AlliedAdvUnits";
    AllianceState[AllianceState["Neutral"] = 6] = "Neutral";
    AllianceState[AllianceState["NeutralVision"] = 7] = "NeutralVision";
})(AllianceState = exports.AllianceState || (exports.AllianceState = {}));
class MapPlayer extends handle_1.Handle {
    constructor(index) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(Player(index));
        }
    }
    set color(color) {
        SetPlayerColor(this.handle, color);
    }
    get color() {
        return GetPlayerColor(this.handle);
    }
    get controller() {
        return GetPlayerController(this.handle);
    }
    get handicap() {
        return GetPlayerHandicap(this.handle);
    }
    set handicap(handicap) {
        SetPlayerHandicap(this.handle, handicap);
    }
    get handicapXp() {
        return GetPlayerHandicapXP(this.handle);
    }
    set handicapXp(handicap) {
        SetPlayerHandicapXP(this.handle, handicap);
    }
    get id() {
        return GetPlayerId(this.handle);
    }
    get isLocalPlayer() {
        return GetLocalPlayer() == this.handle;
    }
    get name() {
        return GetPlayerName(this.handle);
    }
    set name(value) {
        SetPlayerName(this.handle, value);
    }
    get nameShort() {
        const idx = this.name.indexOf('#');
        return this.name.substring(0, idx > 0 ? idx : this.name.length);
    }
    get nameColored() {
        return index_1.playerColors[this.id].code + this.name + '|r';
    }
    get nameShortColored() {
        return index_1.playerColors[this.id].code + this.nameShort + '|r';
    }
    get race() {
        return GetPlayerRace(this.handle);
    }
    get slotState() {
        return GetPlayerSlotState(this.handle);
    }
    get startLocation() {
        return GetPlayerStartLocation(this.handle);
    }
    get startLocationX() {
        return GetStartLocationX(this.startLocation);
    }
    get startLocationY() {
        return GetStartLocationY(this.startLocation);
    }
    get startLocationPoint() {
        return GetStartLocationLoc(this.startLocation);
    }
    get team() {
        return GetPlayerTeam(this.handle);
    }
    get townHallCount() {
        return BlzGetPlayerTownHallCount(this.handle);
    }
    get gold() {
        return this.getState(PLAYER_STATE_RESOURCE_GOLD);
    }
    set gold(value) {
        this.setState(PLAYER_STATE_RESOURCE_GOLD, value);
    }
    get lumber() {
        return this.getState(PLAYER_STATE_RESOURCE_LUMBER);
    }
    set lumber(value) {
        this.setState(PLAYER_STATE_RESOURCE_LUMBER, value);
    }
    get foodCap() {
        return this.getState(PLAYER_STATE_RESOURCE_FOOD_CAP);
    }
    set foodCap(val) {
        this.setState(PLAYER_STATE_RESOURCE_FOOD_CAP, val);
    }
    get foodUsed() {
        return this.getState(PLAYER_STATE_RESOURCE_FOOD_USED);
    }
    set foodUsed(val) {
        this.setState(PLAYER_STATE_RESOURCE_FOOD_USED, val);
    }
    // Used to store hero level data for the scorescreen
    // before units are moved to neutral passive in melee games
    cacheHeroData() {
        CachePlayerHeroData(this.handle);
    }
    compareAlliance(otherPlayer, whichAllianceSetting) {
        return GetPlayerAlliance(this.handle, otherPlayer.handle, whichAllianceSetting);
    }
    isIngame() {
        return (this.slotState == PLAYER_SLOT_STATE_PLAYING &&
            this.controller == MAP_CONTROL_USER);
    }
    isFogged(pos) {
        return IsFoggedToPlayer(pos.x, pos.y, this.handle);
    }
    isMasked(pos) {
        return IsMaskedToPlayer(pos.x, pos.y, this.handle);
    }
    isVisible(pos) {
        return IsVisibleToPlayer(pos.x, pos.y, this.handle);
    }
    cripple(toWhichPlayers, flag) {
        CripplePlayer(this.handle, toWhichPlayers.handle, flag);
    }
    getScore(whichPlayerScore) {
        return GetPlayerScore(this.handle, whichPlayerScore);
    }
    getState(whichPlayerState) {
        return GetPlayerState(this.handle, whichPlayerState);
    }
    getStructureCount(includeIncomplete) {
        return GetPlayerStructureCount(this.handle, includeIncomplete);
    }
    getTaxRate(otherPlayer, whichResource) {
        return GetPlayerTaxRate(this.handle, otherPlayer, whichResource);
    }
    getTechCount(techId) {
        return GetPlayerTechCount(this.handle, techId.value, true);
    }
    getTechMaxAllowed(techId) {
        return GetPlayerTechMaxAllowed(this.handle, techId.value);
    }
    getTechResearched(techId) {
        return GetPlayerTechResearched(this.handle, techId.value, true);
    }
    addTechResearched(techId, levels) {
        AddPlayerTechResearched(this.handle, techId.value, levels);
    }
    decTechResearched(techId, levels) {
        BlzDecPlayerTechResearched(this.handle, techId.value, levels);
    }
    setTechMaxAllowed(techId, maximum) {
        SetPlayerTechMaxAllowed(this.handle, techId.value, maximum);
    }
    setTechResearched(techId, setToLevel) {
        SetPlayerTechResearched(this.handle, techId.value, setToLevel);
    }
    getUnitCount(includeIncomplete) {
        return GetPlayerUnitCount(this.handle, includeIncomplete);
    }
    getUnitCountByType(unitName, includeIncomplete, includeUpgrades) {
        return GetPlayerTypedUnitCount(this.handle, unitName, includeIncomplete, includeUpgrades);
    }
    inForce(whichForce) {
        return IsPlayerInForce(this.handle, whichForce.handle);
    }
    isObserver() {
        return IsPlayerObserver(this.handle);
    }
    isPlayerAlly(otherPlayer) {
        return IsPlayerAlly(this.handle, otherPlayer.handle);
    }
    isPlayerEnemy(otherPlayer) {
        return IsPlayerEnemy(this.handle, otherPlayer.handle);
    }
    isRacePrefSet(pref) {
        return IsPlayerRacePrefSet(this.handle, pref);
    }
    isSelectable() {
        return GetPlayerSelectable(this.handle);
    }
    remove(gameResult) {
        RemovePlayer(this.handle, gameResult);
    }
    removeAllGuardPositions() {
        RemoveAllGuardPositions(this.handle);
    }
    setAbilityAvailable(abilId, avail) {
        SetPlayerAbilityAvailable(this.handle, abilId.value, avail);
    }
    setAlliance(otherPlayer, whichAllianceSetting, value) {
        SetPlayerAlliance(this.handle, otherPlayer.handle, whichAllianceSetting, value);
    }
    setAllianceState(otherPlayer, state) {
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
                const _checkExhaustive = state;
                throw new Error('should not happen');
        }
    }
    setOnScoreScreen(flag) {
        SetPlayerOnScoreScreen(this.handle, flag);
    }
    setState(whichPlayerState, value) {
        SetPlayerState(this.handle, whichPlayerState, value);
    }
    setTaxRate(otherPlayer, whichResource, rate) {
        SetPlayerTaxRate(this.handle, otherPlayer.handle, whichResource, rate);
    }
    setUnitsOwner(newOwner) {
        SetPlayerUnitsOwner(this.handle, newOwner);
    }
    selectUnitSingle(unit) {
        SelectUnitForPlayerSingle(unit.handle, this.handle);
    }
    selectUnitAdd(unit) {
        SelectUnitAddForPlayer(unit.handle, this.handle);
    }
    selectUnitRemove(unit) {
        SelectUnitRemoveForPlayer(unit.handle, this.handle);
    }
    selectUnitClear() {
        ClearSelectionForPlayer(this.handle);
    }
    selectUnitGroup(group) {
        this.selectUnitClear();
        group.for(() => {
            SelectUnitAddForPlayer(GetEnumUnit(), this.handle);
        });
    }
    // get selectedUnits(): Group {
    //   const g = new Group()
    //   g.enumUnitsSelected(this, null)
    //   return g
    // }
    setUnitMaxAllowed(unitId, count) {
        SetPlayerTechMaxAllowed(this.handle, unitId.value, count);
    }
    displayText(message, xPos = 0, yPos = 0) {
        DisplayTextToPlayer(this.handle, xPos, yPos, message);
    }
    displayTextTimed(seconds, message, xPos = 0, yPos = 0) {
        DisplayTimedTextToPlayer(this.handle, xPos, yPos, seconds, message);
    }
    static fromEnum() {
        return MapPlayer.fromHandle(GetEnumPlayer());
    }
    static fromEvent() {
        return MapPlayer.fromHandle(GetTriggerPlayer());
    }
    static fromFilter() {
        return MapPlayer.fromHandle(GetFilterPlayer());
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    static fromIndex(index) {
        return this.fromHandle(Player(index));
    }
    static fromLocal() {
        return this.fromHandle(GetLocalPlayer());
    }
    static get eventTriggering() {
        return this.fromHandle(GetTriggerPlayer());
    }
    static get eventPreviousOwner() {
        return MapPlayer.fromHandle(GetChangingUnitPrevOwner());
    }
    static get neutralHostile() {
        return exports.Players[PLAYER_NEUTRAL_AGGRESSIVE];
    }
    static get neutralPassive() {
        return exports.Players[PLAYER_NEUTRAL_PASSIVE];
    }
}
exports.MapPlayer = MapPlayer;
for (let i = 0; i < bj_MAX_PLAYER_SLOTS; i++) {
    exports.Players[i] = MapPlayer.fromHandle(Player(i));
}
//# sourceMappingURL=player.js.map