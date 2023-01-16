"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
const common_1 = require("../common");
const index_1 = require("../math/index");
const destructable_1 = require("./destructable");
const handle_1 = require("./handle");
const item_1 = require("./item");
const player_1 = require("./player");
const widget_1 = require("./widget");
class Unit extends widget_1.Widget {
    constructor(owner, unitId, pos, face, skinId) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            const p = typeof owner === 'number' ? Player(owner) : owner.handle;
            super(skinId
                ? BlzCreateUnitWithSkin(p, unitId.value, pos.x, pos.y, face ? face.degrees : index_1.randomAngle().degrees, skinId)
                : CreateUnit(p, unitId.value, pos.x, pos.y, face ? face.degrees : index_1.randomAngle().degrees));
        }
    }
    set acquireRange(value) {
        SetUnitAcquireRange(this.handle, value);
    }
    get acquireRange() {
        return GetUnitPropWindow(this.handle);
    }
    get agility() {
        return GetHeroAgi(this.handle, false);
    }
    set agility(value) {
        SetHeroAgi(this.handle, value, true);
    }
    get armor() {
        return BlzGetUnitArmor(this.handle);
    }
    set armor(armorAmount) {
        BlzSetUnitArmor(this.handle, armorAmount);
    }
    set canSleep(flag) {
        UnitAddSleep(this.handle, flag);
    }
    get canSleep() {
        return UnitCanSleep(this.handle);
    }
    get collisionSize() {
        return BlzGetUnitCollisionSize(this.handle);
    }
    set color(whichColor) {
        SetUnitColor(this.handle, whichColor);
    }
    get currentOrder() {
        return GetUnitCurrentOrder(this.handle);
    }
    get defaultAcquireRange() {
        return GetUnitDefaultAcquireRange(this.handle);
    }
    get defaultFlyHeight() {
        return GetUnitDefaultFlyHeight(this.handle);
    }
    get defaultMoveSpeed() {
        return GetUnitDefaultMoveSpeed(this.handle);
    }
    get defaultPropWindow() {
        return GetUnitDefaultPropWindow(this.handle);
    }
    get defaultTurnSpeed() {
        return GetUnitDefaultTurnSpeed(this.handle);
    }
    get experience() {
        return GetHeroXP(this.handle);
    }
    set experience(newXpVal) {
        SetHeroXP(this.handle, newXpVal, true);
    }
    set facing(value) {
        SetUnitFacing(this.handle, value.degrees);
    }
    get facing() {
        return index_1.Angle.fromDegrees(GetUnitFacing(this.handle));
    }
    get foodMade() {
        return GetUnitFoodMade(this.handle);
    }
    get foodUsed() {
        return GetUnitFoodUsed(this.handle);
    }
    get ignoreAlarmToggled() {
        return UnitIgnoreAlarmToggled(this.handle);
    }
    get intelligence() {
        return GetHeroInt(this.handle, false);
    }
    set intelligence(value) {
        SetHeroInt(this.handle, value, true);
    }
    get inventorySize() {
        return UnitInventorySize(this.handle);
    }
    set invulnerable(flag) {
        SetUnitInvulnerable(this.handle, flag);
    }
    get invulnerable() {
        return BlzIsUnitInvulnerable(this.handle);
    }
    get level() {
        return GetUnitLevel(this.handle);
    }
    get localZ() {
        return BlzGetLocalUnitZ(this.handle);
    }
    get mana() {
        return this.getState(UNIT_STATE_MANA);
    }
    set mana(value) {
        this.setState(UNIT_STATE_MANA, value);
    }
    get maxLife() {
        return BlzGetUnitMaxHP(this.handle);
    }
    set maxLife(value) {
        BlzSetUnitMaxHP(this.handle, value);
    }
    get maxMana() {
        return BlzGetUnitMaxMana(this.handle);
    }
    set maxMana(value) {
        BlzSetUnitMaxMana(this.handle, value);
    }
    set moveSpeed(value) {
        SetUnitMoveSpeed(this.handle, value);
    }
    get moveSpeed() {
        return GetUnitMoveSpeed(this.handle);
    }
    get name() {
        return GetUnitName(this.handle);
    }
    set name(value) {
        BlzSetUnitName(this.handle, value);
    }
    set nameProper(value) {
        BlzSetHeroProperName(this.handle, value);
    }
    get nameProper() {
        return GetHeroProperName(this.handle);
    }
    set owner(whichPlayer) {
        SetUnitOwner(this.handle, whichPlayer.handle, true);
    }
    get owner() {
        return player_1.MapPlayer.fromHandle(GetOwningPlayer(this.handle));
    }
    set paused(flag) {
        PauseUnit(this.handle, flag);
    }
    get paused() {
        return IsUnitPaused(this.handle);
    }
    get pos() {
        return index_1.vec2(this.x, this.y);
    }
    set pos(value) {
        this.x = value.x;
        this.y = value.y;
    }
    get pointValue() {
        return GetUnitPointValue(this.handle);
    }
    set propWindow(value) {
        SetUnitPropWindow(this.handle, value);
    }
    get propWindow() {
        return GetUnitAcquireRange(this.handle);
    }
    get race() {
        return GetUnitRace(this.handle);
    }
    get rallyDestructable() {
        return destructable_1.Destructable.fromHandle(GetUnitRallyDestructable(this.handle));
    }
    get rallyPoint() {
        const loc = GetUnitRallyPoint(this.handle);
        const pos = index_1.vec2(GetLocationX(loc), GetLocationY(loc));
        RemoveLocation(loc);
        return pos;
    }
    get rallyUnit() {
        return Unit.fromHandle(GetUnitRallyUnit(this.handle));
    }
    set resourceAmount(amount) {
        SetResourceAmount(this.handle, amount);
    }
    get resourceAmount() {
        return GetResourceAmount(this.handle);
    }
    get selectable() {
        return BlzIsUnitSelectable(this.handle);
    }
    set selectionScale(scale) {
        this.setField(UNIT_RF_SELECTION_SCALE, scale);
    }
    get selectionScale() {
        const result = this.getField(UNIT_RF_SELECTION_SCALE);
        return typeof result === 'number' ? result : 0;
    }
    set show(flag) {
        ShowUnit(this.handle, flag);
    }
    get show() {
        return IsUnitHidden(this.handle);
    }
    get skin() {
        return BlzGetUnitSkin(this.handle);
    }
    set skin(skinId) {
        BlzSetUnitSkin(this.handle, skinId);
    }
    get skillPoints() {
        return GetHeroSkillPoints(this.handle);
    }
    set skillPoints(skillPointDelta) {
        UnitModifySkillPoints(this.handle, skillPointDelta);
    }
    get sleeping() {
        return UnitIsSleeping(this.handle);
    }
    get strength() {
        return GetHeroStr(this.handle, false);
    }
    set strength(value) {
        SetHeroStr(this.handle, value, true);
    }
    set turnSpeed(value) {
        SetUnitTurnSpeed(this.handle, value);
    }
    get turnSpeed() {
        return GetUnitTurnSpeed(this.handle);
    }
    get typeId() {
        return common_1.UnitId.of(GetUnitTypeId(this.handle));
    }
    get userData() {
        return GetUnitUserData(this.handle);
    }
    set userData(value) {
        SetUnitUserData(this.handle, value);
    }
    set waygateActive(flag) {
        WaygateActivate(this.handle, flag);
    }
    get waygateActive() {
        return WaygateIsActive(this.handle);
    }
    get x() {
        return GetUnitX(this.handle);
    }
    set x(value) {
        SetUnitX(this.handle, value);
    }
    get y() {
        return GetUnitY(this.handle);
    }
    set y(value) {
        SetUnitY(this.handle, value);
    }
    get z() {
        return BlzGetUnitZ(this.handle);
    }
    get mineGold() {
        return GetResourceAmount(this.handle);
    }
    set mineGold(value) {
        SetResourceAmount(this.handle, value);
    }
    addAbility(abilityId) {
        return UnitAddAbility(this.handle, abilityId.value);
    }
    addAnimationProps(animProperties, add) {
        AddUnitAnimationProperties(this.handle, animProperties, add);
    }
    addExperience(xpToAdd, showEyeCandy) {
        AddHeroXP(this.handle, xpToAdd, showEyeCandy);
    }
    addIndicator(red, blue, green, alpha) {
        UnitAddIndicator(this.handle, red, blue, green, alpha);
    }
    addItem(whichItem) {
        return UnitAddItem(this.handle, whichItem.handle);
    }
    addItemById(itemId) {
        return item_1.Item.fromHandle(UnitAddItemById(this.handle, itemId.value));
    }
    addItemToSlotById(itemId, itemSlot) {
        return UnitAddItemToSlotById(this.handle, itemId.value, itemSlot);
    }
    addItemToStock(itemId, currentStock, stockMax) {
        AddItemToStock(this.handle, itemId.value, currentStock, stockMax);
    }
    addResourceAmount(amount) {
        AddResourceAmount(this.handle, amount);
    }
    addSleepPerm(add) {
        UnitAddSleepPerm(this.handle, add);
    }
    addType(whichUnitType) {
        return UnitAddType(this.handle, whichUnitType);
    }
    addUnitToStock(unitId, currentStock, stockMax) {
        AddUnitToStock(this.handle, unitId.value, currentStock, stockMax);
    }
    applyTimedLife(buffId, duration) {
        UnitApplyTimedLife(this.handle, buffId.value, duration);
    }
    attachSound(sound) {
        AttachSoundToUnit(sound.handle, this.handle);
    }
    cancelTimedLife() {
        BlzUnitCancelTimedLife(this.handle);
    }
    canSleepPerm() {
        return UnitCanSleepPerm(this.handle);
    }
    countBuffs(removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel) {
        return UnitCountBuffsEx(this.handle, removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
    }
    damageAt(delay, radius, x, y, amount, attack, ranged, attackType, damageType, weaponSound = common_1.WeaponSound.None) {
        return UnitDamagePoint(this.handle, delay, radius, x, y, amount, attack, ranged, attackType.value, damageType.value, weaponSound.value);
    }
    damageTarget(target, amount, attack, ranged, attackType, damageType, weaponSound = common_1.WeaponSound.None) {
        return UnitDamageTarget(this.handle, target.handle, amount, attack, ranged, attackType.value, damageType.value, weaponSound.value);
    }
    decAbilityLevel(abilId) {
        return DecUnitAbilityLevel(this.handle, abilId.value);
    }
    destroy() {
        RemoveUnit(this.handle);
    }
    disableAbility(abilId, hideUI) {
        BlzUnitHideAbility(this.handle, abilId.value, hideUI);
    }
    dropItem(whichItem, pos) {
        return UnitDropItemPoint(this.handle, whichItem.handle, pos.x, pos.y);
    }
    putItemInSlot(whichItem, slot) {
        return UnitDropItemSlot(this.handle, whichItem.handle, slot);
    }
    dropItemTarget(whichItem, target /* | Unit | Item | Destructable*/) {
        return UnitDropItemTarget(this.handle, whichItem.handle, target.handle);
    }
    endAbilityCooldown(abilId) {
        BlzEndUnitAbilityCooldown(this.handle, abilId.value);
    }
    getAbility(abilId) {
        return BlzGetUnitAbility(this.handle, abilId.value);
    }
    getAbilityByIndex(index) {
        return BlzGetUnitAbilityByIndex(this.handle, index);
    }
    getAbilityCooldown(abilId, level) {
        return BlzGetUnitAbilityCooldown(this.handle, abilId.value, level);
    }
    getAbilityCooldownRemaining(abilId) {
        return BlzGetUnitAbilityCooldownRemaining(this.handle, abilId.value);
    }
    getAbilityLevel(abilId) {
        return GetUnitAbilityLevel(this.handle, abilId.value);
    }
    getAbilityManaCost(abilId, level) {
        return BlzGetUnitAbilityManaCost(this.handle, abilId.value, level);
    }
    getAgility(includeBonuses) {
        return GetHeroAgi(this.handle, includeBonuses);
    }
    getAttackCooldown(weaponIndex) {
        return BlzGetUnitAttackCooldown(this.handle, weaponIndex);
    }
    getBaseDamage(weaponIndex) {
        return BlzGetUnitBaseDamage(this.handle, weaponIndex);
    }
    getDiceNumber(weaponIndex) {
        return BlzGetUnitDiceNumber(this.handle, weaponIndex);
    }
    getDiceSides(weaponIndex) {
        return BlzGetUnitDiceSides(this.handle, weaponIndex);
    }
    getIntegerField(field) {
        return BlzGetUnitIntegerField(this.handle, field);
    }
    getField(field) {
        const fieldType = field.toString().substr(0, field.toString().indexOf(':'));
        switch (fieldType) {
            case 'unitbooleanfield':
                const fieldBool = field;
                return BlzGetUnitBooleanField(this.handle, fieldBool);
            case 'unitintegerfield':
                const fieldInt = field;
                return BlzGetUnitIntegerField(this.handle, fieldInt);
            case 'unitrealfield':
                const fieldReal = field;
                return BlzGetUnitRealField(this.handle, fieldReal);
            case 'unitstringfield':
                const fieldString = field;
                return BlzGetUnitStringField(this.handle, fieldString);
            default:
                return 0;
        }
    }
    getWeaponRealField(field, index) {
        return BlzGetUnitWeaponRealField(this.handle, field, index);
    }
    getWeaponIntegerField(field, index) {
        return BlzGetUnitWeaponIntegerField(this.handle, field, index);
    }
    getWeaponBoolField(field, index) {
        return BlzGetUnitWeaponBooleanField(this.handle, field, index);
    }
    getWeaponStringField(field, index) {
        return BlzGetUnitWeaponStringField(this.handle, field, index);
    }
    getflyHeight() {
        return GetUnitFlyHeight(this.handle);
    }
    getHeroLevel() {
        return GetHeroLevel(this.handle);
    }
    getIgnoreAlarm(flag) {
        return UnitIgnoreAlarm(this.handle, flag);
    }
    getIntelligence(includeBonuses) {
        return GetHeroInt(this.handle, includeBonuses);
    }
    getItemInSlot(slot) {
        const i = UnitItemInSlot(this.handle, slot);
        if (i) {
            return item_1.Item.fromHandle(i);
        }
        return undefined;
    }
    getState(whichUnitState) {
        return GetUnitState(this.handle, whichUnitState);
    }
    getStrength(includeBonuses) {
        return GetHeroStr(this.handle, includeBonuses);
    }
    hasBuffs(removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel) {
        return UnitHasBuffsEx(this.handle, removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
    }
    hasBuff(buffId) {
        return this.getAbilityLevel(buffId) > 0;
    }
    get items() {
        let items = [];
        for (let i = 0; i < this.inventorySize; i++) {
            const inSlot = this.getItemInSlot(i);
            if (inSlot) {
                items.push(inSlot);
            }
        }
        return items;
    }
    hasItem(whichItem) {
        return UnitHasItem(this.handle, whichItem.handle);
    }
    getInventorySlotOfItemType(whichItemType) {
        for (let i = 0; i < this.inventorySize; i++) {
            const slot = this.getItemInSlot(i);
            if (slot && slot.typeId == whichItemType) {
                return i;
            }
        }
        return -1;
    }
    getInventorySlotOfItem(whichItem) {
        for (let i = 0; i < this.inventorySize; i++) {
            const slot = this.getItemInSlot(i);
            if (slot && slot == whichItem) {
                return i;
            }
        }
        return -1;
    }
    hasItemOfType(whichItemType) {
        return this.getInventorySlotOfItemType(whichItemType) >= 0;
    }
    hideAbility(abilId, flag) {
        BlzUnitHideAbility(this.handle, abilId.value, flag);
    }
    incAbilityLevel(abilId) {
        return IncUnitAbilityLevel(this.handle, abilId.value);
    }
    inForce(whichForce) {
        return IsUnitInForce(this.handle, whichForce.handle);
    }
    inGroup(whichGroup) {
        return IsUnitInGroup(this.handle, whichGroup.handle);
    }
    inRange(pos, distance) {
        return IsUnitInRangeXY(this.handle, pos.x, pos.y, distance);
    }
    inRangeOfUnit(otherUnit, distance) {
        return IsUnitInRange(this.handle, otherUnit.handle, distance);
    }
    interruptAttack() {
        BlzUnitInterruptAttack(this.handle);
    }
    inTransport(whichTransport) {
        return IsUnitInTransport(this.handle, whichTransport.handle);
    }
    isAlive() {
        return UnitAlive(this.handle);
    }
    isAlly(whichPlayer) {
        return IsUnitAlly(this.handle, whichPlayer.handle);
    }
    isEnemy(whichPlayer) {
        return IsUnitEnemy(this.handle, whichPlayer.handle);
    }
    isExperienceSuspended() {
        return IsSuspendedXP(this.handle);
    }
    isFogged(whichPlayer) {
        return IsUnitFogged(this.handle, whichPlayer.handle);
    }
    isHero() {
        return IsHeroUnitId(this.typeId.value);
    }
    isIllusion() {
        return IsUnitIllusion(this.handle);
    }
    isLoaded() {
        return IsUnitLoaded(this.handle);
    }
    isMasked(whichPlayer) {
        return IsUnitMasked(this.handle, whichPlayer.handle);
    }
    isSelected(whichPlayer) {
        return IsUnitSelected(this.handle, whichPlayer.handle);
    }
    issueBuildOrder(unit, pos) {
        return typeof unit === 'string'
            ? IssueBuildOrder(this.handle, unit, pos.x, pos.y)
            : IssueBuildOrderById(this.handle, unit.value, pos.x, pos.y);
    }
    issueImmediateOrder(order) {
        return typeof order === 'string'
            ? IssueImmediateOrder(this.handle, order)
            : IssueImmediateOrderById(this.handle, order);
    }
    issueInstantOrderAt(order, x, y, instantTargetWidget) {
        return typeof order === 'string'
            ? IssueInstantPointOrder(this.handle, order, x, y, instantTargetWidget.handle)
            : IssueInstantPointOrderById(this.handle, order, x, y, instantTargetWidget.handle);
    }
    issueInstantTargetOrder(order, targetWidget, instantTargetWidget) {
        return typeof order === 'string'
            ? IssueInstantTargetOrder(this.handle, order, targetWidget.handle, instantTargetWidget.handle)
            : IssueInstantTargetOrderById(this.handle, order, targetWidget.handle, instantTargetWidget.handle);
    }
    issueOrderAt(order, pos) {
        return typeof order === 'string'
            ? IssuePointOrder(this.handle, order, pos.x, pos.y)
            : IssuePointOrderById(this.handle, order, pos.x, pos.y);
    }
    issueTargetOrder(order, targetWidget) {
        return typeof order === 'string'
            ? IssueTargetOrder(this.handle, order, targetWidget.handle)
            : IssueTargetOrderById(this.handle, order, targetWidget.handle);
    }
    issueTrainOrder(unitId) {
        return IssueImmediateOrderById(this.handle, unitId.value);
    }
    issueResearchOrder(researchId) {
        return IssueImmediateOrderById(this.handle, researchId);
    }
    issueUpgradeOrder(unitId) {
        return IssueImmediateOrderById(this.handle, unitId.value);
    }
    isUnit(whichSpecifiedUnit) {
        return IsUnit(this.handle, whichSpecifiedUnit.handle);
    }
    isUnitType(whichUnitType) {
        return IsUnitType(this.handle, whichUnitType);
    }
    isVisible(whichPlayer) {
        return IsUnitVisible(this.handle, whichPlayer.handle);
    }
    kill() {
        KillUnit(this.handle);
    }
    lookAt(whichBone, lookAtTarget, offsetX, offsetY, offsetZ) {
        SetUnitLookAt(this.handle, whichBone, lookAtTarget.handle, offsetX, offsetY, offsetZ);
    }
    makeAbilityPermanent(permanent, abilityId) {
        UnitMakeAbilityPermanent(this.handle, permanent, abilityId.value);
    }
    modifySkillPoints(skillPointDelta) {
        return UnitModifySkillPoints(this.handle, skillPointDelta);
    }
    pauseEx(flag) {
        BlzPauseUnitEx(this.handle, flag);
    }
    pauseTimedLife(flag) {
        UnitPauseTimedLife(this.handle, flag);
    }
    queueAnimation(whichAnimation) {
        QueueUnitAnimation(this.handle, whichAnimation);
    }
    recycleGuardPosition() {
        RecycleGuardPosition(this.handle);
    }
    removeAbility(abilityId) {
        return UnitRemoveAbility(this.handle, abilityId.value);
    }
    removeBuffs(removePositive, removeNegative) {
        UnitRemoveBuffs(this.handle, removePositive, removeNegative);
    }
    removeBuffsEx(removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel) {
        UnitRemoveBuffsEx(this.handle, removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
    }
    removeGuardPosition() {
        RemoveGuardPosition(this.handle);
    }
    dropItemInstantly(whichItem) {
        UnitRemoveItem(this.handle, whichItem.handle);
    }
    dropItemInstantlyFromSlot(itemSlot) {
        return UnitRemoveItemFromSlot(this.handle, itemSlot);
    }
    removeItemFromStock(itemId) {
        RemoveItemFromStock(this.handle, itemId.value);
    }
    removeType(whichUnitType) {
        return UnitRemoveType(this.handle, whichUnitType);
    }
    removeUnitFromStock(itemId) {
        RemoveUnitFromStock(this.handle, itemId.value);
    }
    /**
     * Replace this unit with a new one of the given type. Returns the new unit.
     */
    replaceWith(unitId, state) {
        return Unit.fromHandle(ReplaceUnitBJ(this.handle, unitId.value, Unit.ReplaceState.toValue(state)));
    }
    resetCooldown() {
        UnitResetCooldown(this.handle);
    }
    resetLookAt() {
        ResetUnitLookAt(this.handle);
    }
    revive(pos, doEyecandy) {
        return ReviveHero(this.handle, pos.x, pos.y, doEyecandy);
    }
    select(flag) {
        SelectUnit(this.handle, flag);
    }
    selectSkill(abilCode) {
        SelectHeroSkill(this.handle, abilCode);
    }
    setAbilityCooldown(abilId, level, cooldown) {
        BlzSetUnitAbilityCooldown(this.handle, abilId.value, level, cooldown);
    }
    setAbilityLevel(abilId, level) {
        return SetUnitAbilityLevel(this.handle, abilId.value, level);
    }
    setAbilityManaCost(abilId, level, manaCost) {
        BlzSetUnitAbilityManaCost(this.handle, abilId.value, level, manaCost);
    }
    setAgility(value, permanent) {
        SetHeroAgi(this.handle, value, permanent);
    }
    setAnimation(whichAnimation) {
        if (typeof whichAnimation === 'string') {
            SetUnitAnimation(this.handle, whichAnimation);
        }
        else {
            SetUnitAnimationByIndex(this.handle, whichAnimation);
        }
    }
    setAnimationWithRarity(whichAnimation, rarity) {
        SetUnitAnimationWithRarity(this.handle, whichAnimation, rarity);
    }
    setAttackCooldown(cooldown, weaponIndex) {
        BlzSetUnitAttackCooldown(this.handle, cooldown, weaponIndex);
    }
    setBaseDamage(baseDamage, weaponIndex) {
        BlzSetUnitBaseDamage(this.handle, baseDamage, weaponIndex);
    }
    setBlendTime(timeScale) {
        SetUnitBlendTime(this.handle, timeScale);
    }
    setConstructionProgress(constructionPercentage) {
        UnitSetConstructionProgress(this.handle, constructionPercentage);
    }
    setCreepGuard(creepGuard) {
        SetUnitCreepGuard(this.handle, creepGuard);
    }
    setDiceNumber(diceNumber, weaponIndex) {
        BlzSetUnitDiceNumber(this.handle, diceNumber, weaponIndex);
    }
    setDiceSides(diceSides, weaponIndex) {
        BlzSetUnitDiceSides(this.handle, diceSides, weaponIndex);
    }
    setExperience(newXpVal, showEyeCandy) {
        SetHeroXP(this.handle, newXpVal, showEyeCandy);
    }
    setExploded(exploded) {
        SetUnitExploded(this.handle, exploded);
    }
    setFacingEx(facingAngle) {
        BlzSetUnitFacingEx(this.handle, facingAngle.degrees);
    }
    setField(field, value) {
        const fieldType = field.toString().substr(0, field.toString().indexOf(':'));
        if (fieldType === 'unitbooleanfield' && typeof value === 'boolean') {
            return BlzSetUnitBooleanField(this.handle, field, value);
        }
        else if (fieldType === 'unitintegerfield' && typeof value === 'number') {
            return BlzSetUnitIntegerField(this.handle, field, value);
        }
        else if (fieldType === 'unitrealfield' && typeof value === 'number') {
            return BlzSetUnitRealField(this.handle, field, value);
        }
        else if (fieldType === 'unitstringfield' && typeof value === 'string') {
            return BlzSetUnitStringField(this.handle, field, value);
        }
        return false;
    }
    setWeaponField(field, index, value) {
        const fieldType = field.toString().substr(0, field.toString().indexOf(':'));
        if (fieldType === 'unitweaponbooleanfield' && typeof value === 'boolean') {
            return BlzSetUnitWeaponBooleanField(this.handle, field, index, value);
        }
        else if (fieldType === 'unitweaponintegerfield' &&
            typeof value === 'number') {
            return BlzSetUnitWeaponIntegerField(this.handle, field, index, value);
        }
        else if (fieldType === 'unitweaponrealfield' &&
            typeof value === 'number') {
            return BlzSetUnitWeaponRealField(this.handle, field, index, value);
        }
        else if (fieldType === 'unitweaponstringfield' &&
            typeof value === 'string') {
            return BlzSetUnitWeaponStringField(this.handle, field, index, value);
        }
        return false;
    }
    setflyHeight(value, rate) {
        SetUnitFlyHeight(this.handle, value, rate);
    }
    setHeroLevel(level, showEyeCandy) {
        SetHeroLevel(this.handle, level, showEyeCandy);
    }
    setIntelligence(value, permanent) {
        SetHeroInt(this.handle, value, permanent);
    }
    setItemTypeSlots(slots) {
        SetItemTypeSlots(this.handle, slots);
    }
    setOwner(whichPlayer, changeColor) {
        SetUnitOwner(this.handle, whichPlayer.handle, changeColor);
    }
    setPathing(flag) {
        SetUnitPathing(this.handle, flag);
    }
    setPosition(pos) {
        SetUnitPosition(this.handle, pos.x, pos.y);
    }
    setRescuable(byWhichPlayer, flag) {
        SetUnitRescuable(this.handle, byWhichPlayer.handle, flag);
    }
    setRescueRange(range) {
        SetUnitRescueRange(this.handle, range);
    }
    setScale(scaleX, scaleY, scaleZ) {
        SetUnitScale(this.handle, scaleX, scaleY, scaleZ);
    }
    setState(whichUnitState, newVal) {
        SetUnitState(this.handle, whichUnitState, newVal);
    }
    setStrength(value, permanent) {
        SetHeroStr(this.handle, value, permanent);
    }
    setTimeScale(timeScale) {
        SetUnitTimeScale(this.handle, timeScale);
    }
    setUnitAttackCooldown(cooldown, weaponIndex) {
        BlzSetUnitAttackCooldown(this.handle, cooldown, weaponIndex);
    }
    setUnitTypeSlots(slots) {
        SetUnitTypeSlots(this.handle, slots);
    }
    setUpgradeProgress(upgradePercentage) {
        UnitSetUpgradeProgress(this.handle, upgradePercentage);
    }
    setUseAltIcon(flag) {
        UnitSetUsesAltIcon(this.handle, flag);
    }
    setUseFood(useFood) {
        SetUnitUseFood(this.handle, useFood);
    }
    setVertexColor(red, green, blue, alpha) {
        SetUnitVertexColor(this.handle, red, green, blue, alpha);
    }
    shareVision(whichPlayer, share) {
        UnitShareVision(this.handle, whichPlayer.handle, share);
    }
    showTeamGlow(show) {
        BlzShowUnitTeamGlow(this.handle, show);
    }
    startAbilityCooldown(abilId, cooldown) {
        BlzStartUnitAbilityCooldown(this.handle, abilId.value, cooldown);
    }
    stripLevels(howManyLevels) {
        return UnitStripHeroLevel(this.handle, howManyLevels);
    }
    suspendDecay(suspend) {
        UnitSuspendDecay(this.handle, suspend);
    }
    suspendExperience(flag) {
        SuspendHeroXP(this.handle, flag);
    }
    useItem(whichItem) {
        return UnitUseItem(this.handle, whichItem.handle);
    }
    useItemAt(whichItem, pos) {
        return UnitUseItemPoint(this.handle, whichItem.handle, pos.x, pos.y);
    }
    useItemTarget(whichItem, target) {
        return UnitUseItemTarget(this.handle, whichItem.handle, target.handle);
    }
    wakeUp() {
        UnitWakeUp(this.handle);
    }
    set waygateDestination(pos) {
        WaygateSetDestination(this.handle, pos.x, pos.y);
    }
    get waygateDestination() {
        return index_1.vec2(WaygateGetDestinationX(this.handle), WaygateGetDestinationY(this.handle));
    }
    static foodMadeByType(unitId) {
        return GetFoodMade(unitId.value);
    }
    static foodUsedByType(unitId) {
        return GetFoodUsed(unitId.value);
    }
    static fromEvent() {
        return this.fromHandle(GetTriggerUnit());
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    static getPointValueByType(unitType) {
        return GetUnitPointValueByType(unitType);
    }
    static isUnitIdHero(unitId) {
        return IsHeroUnitId(unitId.value);
    }
    static isUnitIdType(unitId, whichUnitType) {
        return IsUnitIdType(unitId.value, whichUnitType);
    }
    static get eventTriggering() {
        return this.fromHandle(GetTriggerUnit());
    }
    static get eventAttacker() {
        return this.fromHandle(GetAttacker());
    }
    static get eventRescuer() {
        return this.fromHandle(GetRescuer());
    }
    static get eventDying() {
        return this.fromHandle(GetDyingUnit());
    }
    static get eventKilling() {
        return GetKillingUnit() ? Unit.fromHandle(GetKillingUnit()) : undefined;
    }
    static get eventDecaying() {
        return this.fromHandle(GetDecayingUnit());
    }
    static get eventDetected() {
        return this.fromHandle(GetDetectedUnit());
    }
    static get eventConstructingStructure() {
        return Unit.fromHandle(GetConstructingStructure());
    }
    static get eventCanceledStructure() {
        return Unit.fromHandle(GetCancelledStructure());
    }
    static get eventConstructedStructure() {
        return Unit.fromHandle(GetConstructedStructure());
    }
    static get eventTrained() {
        return this.fromHandle(GetTrainedUnit());
    }
    static get eventResearcher() {
        return this.fromHandle(GetResearchingUnit());
    }
    static get eventOrdered() {
        return this.fromHandle(GetOrderedUnit());
    }
    static get eventOrderTarget() {
        return this.fromHandle(GetOrderTargetUnit());
    }
    static get eventHeroLeveling() {
        return this.fromHandle(GetLevelingUnit());
    }
    static get eventHeroLearning() {
        return this.fromHandle(GetLearningUnit());
    }
    static get eventHeroRevivable() {
        return this.fromHandle(GetRevivableUnit());
    }
    static get eventHeroReviving() {
        return this.fromHandle(GetRevivingUnit());
    }
    static get eventSummoner() {
        return this.fromHandle(GetSummoningUnit());
    }
    static get eventSummoned() {
        return this.fromHandle(GetSummonedUnit());
    }
    static get eventManipulating() {
        return this.fromHandle(GetManipulatingUnit());
    }
    static get eventLoaded() {
        return this.fromHandle(GetLoadedUnit());
    }
    static get eventTransport() {
        return this.fromHandle(GetTransportUnit());
    }
    static get eventSold() {
        return this.fromHandle(GetSoldUnit());
    }
    static get eventSeller() {
        return this.fromHandle(GetSellingUnit());
    }
    static get eventOwnershipChanging() {
        return this.fromHandle(GetChangingUnit());
    }
    static get eventBuyer() {
        return this.fromHandle(GetBuyingUnit());
    }
    static get eventCaster() {
        return this.fromHandle(GetSpellAbilityUnit());
    }
    static get eventEnteringRegion() {
        return this.fromHandle(GetEnteringUnit());
    }
    static get eventLeavingRegion() {
        return this.fromHandle(GetLeavingUnit());
    }
    static get filterUnit() {
        return this.fromHandle(GetFilterUnit());
    }
}
exports.Unit = Unit;
(function (Unit) {
    let ReplaceState;
    (function (ReplaceState) {
        // Use the same HP and mana percentages
        ReplaceState[ReplaceState["Relative"] = 0] = "Relative";
        // Use the absolute values for the new unit
        ReplaceState[ReplaceState["Absolute"] = 1] = "Absolute";
        // Use the default values from the new unit
        ReplaceState[ReplaceState["Default"] = 2] = "Default";
        // Use the maximum values from the new unit
        ReplaceState[ReplaceState["Maximum"] = 3] = "Maximum";
    })(ReplaceState = Unit.ReplaceState || (Unit.ReplaceState = {}));
    (function (ReplaceState) {
        function toValue(state) {
            switch (state) {
                case ReplaceState.Relative:
                    return bj_UNIT_STATE_METHOD_RELATIVE;
                case ReplaceState.Absolute:
                    return bj_UNIT_STATE_METHOD_ABSOLUTE;
                case ReplaceState.Default:
                    return bj_UNIT_STATE_METHOD_DEFAULTS;
                case ReplaceState.Maximum:
                    return bj_UNIT_STATE_METHOD_MAXIMUM;
            }
        }
        ReplaceState.toValue = toValue;
    })(ReplaceState = Unit.ReplaceState || (Unit.ReplaceState = {}));
})(Unit = exports.Unit || (exports.Unit = {}));
//# sourceMappingURL=unit.js.map