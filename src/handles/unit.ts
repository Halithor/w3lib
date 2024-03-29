/** @noSelfInFile **/

import {
  AbilId,
  AttackType,
  DamageType,
  ItemId,
  UnitId,
  WeaponSound,
} from "../common";
import { Angle, randomAngle, Vec2, vec2 } from "../math/index";
import { Destructable } from "./destructable";
import { Force } from "./force";
import { Group } from "./group";
import { Handle } from "./handle";
import { Item } from "./item";
import { MapPlayer } from "./player";
import { Sound } from "./sound";
import { Widget } from "./widget";

export class Unit extends Widget {
  public declare readonly handle: unit;
  static underConstructionUnits: Group;
  static upgradingUnits: Group;

  constructor(
    owner: MapPlayer | number,
    unitId: UnitId,
    pos: Vec2,
    face?: Angle,
    skinId?: number,
  ) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      const p = typeof owner === "number" ? Player(owner) : owner.handle;
      super(
        skinId
          ? BlzCreateUnitWithSkin(
              p!,
              unitId.value,
              pos.x,
              pos.y,
              face ? face.degrees : randomAngle().degrees,
              skinId,
            )
          : CreateUnit(
              p!,
              unitId.value,
              pos.x,
              pos.y,
              face ? face.degrees : randomAngle().degrees,
            ),
      );
    }
  }

  public set acquireRange(value: number) {
    SetUnitAcquireRange(this.handle, value);
  }

  public get acquireRange() {
    return GetUnitPropWindow(this.handle);
  }

  public get agility() {
    return GetHeroAgi(this.handle, false);
  }

  public set agility(value: number) {
    SetHeroAgi(this.handle, value, true);
  }

  public get armor() {
    return BlzGetUnitArmor(this.handle);
  }

  public set armor(armorAmount: number) {
    BlzSetUnitArmor(this.handle, armorAmount);
  }

  public set canSleep(flag: boolean) {
    UnitAddSleep(this.handle, flag);
  }

  public get canSleep() {
    return UnitCanSleep(this.handle);
  }

  public get collisionSize() {
    return BlzGetUnitCollisionSize(this.handle);
  }

  public set color(whichColor: playercolor) {
    SetUnitColor(this.handle, whichColor);
  }

  public get currentOrder() {
    return GetUnitCurrentOrder(this.handle);
  }

  public get defaultAcquireRange() {
    return GetUnitDefaultAcquireRange(this.handle);
  }

  public get defaultFlyHeight() {
    return GetUnitDefaultFlyHeight(this.handle);
  }

  public get defaultMoveSpeed() {
    return GetUnitDefaultMoveSpeed(this.handle);
  }

  public get defaultPropWindow() {
    return GetUnitDefaultPropWindow(this.handle);
  }

  public get defaultTurnSpeed() {
    return GetUnitDefaultTurnSpeed(this.handle);
  }

  public get experience() {
    return GetHeroXP(this.handle);
  }

  public set experience(newXpVal: number) {
    SetHeroXP(this.handle, newXpVal, true);
  }

  public set facing(value: Angle) {
    SetUnitFacing(this.handle, value.degrees);
  }

  public get facing(): Angle {
    return Angle.fromDegrees(GetUnitFacing(this.handle));
  }

  public get foodMade() {
    return GetUnitFoodMade(this.handle);
  }

  public get foodUsed() {
    return GetUnitFoodUsed(this.handle);
  }

  public get ignoreAlarmToggled() {
    return UnitIgnoreAlarmToggled(this.handle);
  }

  public get intelligence() {
    return GetHeroInt(this.handle, false);
  }

  public set intelligence(value: number) {
    SetHeroInt(this.handle, value, true);
  }

  public get inventorySize() {
    return UnitInventorySize(this.handle);
  }

  public set invulnerable(flag: boolean) {
    SetUnitInvulnerable(this.handle, flag);
  }

  public get invulnerable() {
    return BlzIsUnitInvulnerable(this.handle);
  }

  public get level() {
    return GetUnitLevel(this.handle);
  }

  public get localZ() {
    return BlzGetLocalUnitZ(this.handle);
  }

  public get mana() {
    return this.getState(UNIT_STATE_MANA);
  }

  public set mana(value: number) {
    this.setState(UNIT_STATE_MANA, value);
  }

  public get maxLife() {
    return BlzGetUnitMaxHP(this.handle);
  }

  public set maxLife(value: number) {
    BlzSetUnitMaxHP(this.handle, value);
  }

  public get maxMana() {
    return BlzGetUnitMaxMana(this.handle);
  }

  public set maxMana(value: number) {
    BlzSetUnitMaxMana(this.handle, value);
  }

  public set moveSpeed(value: number) {
    SetUnitMoveSpeed(this.handle, value);
  }

  public get moveSpeed() {
    return GetUnitMoveSpeed(this.handle);
  }

  public get name() {
    return GetUnitName(this.handle)!;
  }

  public set name(value: string) {
    BlzSetUnitName(this.handle, value);
  }

  public set nameProper(value: string) {
    BlzSetHeroProperName(this.handle, value);
  }

  public get nameProper() {
    return GetHeroProperName(this.handle)!;
  }

  public set owner(whichPlayer: MapPlayer) {
    SetUnitOwner(this.handle, whichPlayer.handle, true);
  }

  public get owner() {
    return MapPlayer.fromHandle(GetOwningPlayer(this.handle));
  }

  public set paused(flag: boolean) {
    PauseUnit(this.handle, flag);
  }

  public get paused() {
    return IsUnitPaused(this.handle);
  }

  public get pos() {
    return vec2(this.x, this.y);
  }

  public set pos(value: Vec2) {
    this.x = value.x;
    this.y = value.y;
  }

  public get pointValue() {
    return GetUnitPointValue(this.handle);
  }

  public set propWindow(value: number) {
    SetUnitPropWindow(this.handle, value);
  }

  public get propWindow() {
    return GetUnitAcquireRange(this.handle);
  }

  public get race() {
    return GetUnitRace(this.handle);
  }

  public get rallyDestructable() {
    return Destructable.fromHandle(GetUnitRallyDestructable(this.handle)!);
  }

  public get rallyPoint() {
    const loc = GetUnitRallyPoint(this.handle)!;
    const pos = vec2(GetLocationX(loc), GetLocationY(loc));
    RemoveLocation(loc);
    return pos;
  }

  public get rallyUnit() {
    return Unit.fromHandle(GetUnitRallyUnit(this.handle)!);
  }

  public set resourceAmount(amount: number) {
    SetResourceAmount(this.handle, amount);
  }

  public get resourceAmount() {
    return GetResourceAmount(this.handle);
  }

  public get selectable() {
    return BlzIsUnitSelectable(this.handle);
  }

  public set selectionScale(scale: number) {
    this.setField(UNIT_RF_SELECTION_SCALE, scale);
  }

  public get selectionScale() {
    const result = this.getField(UNIT_RF_SELECTION_SCALE);
    return typeof result === "number" ? result : 0;
  }

  public set show(flag: boolean) {
    ShowUnit(this.handle, flag);
  }

  public get show() {
    return IsUnitHidden(this.handle);
  }

  public get skin() {
    return BlzGetUnitSkin(this.handle);
  }

  public set skin(skinId: number) {
    BlzSetUnitSkin(this.handle, skinId);
  }

  public get skillPoints() {
    return GetHeroSkillPoints(this.handle);
  }

  public set skillPoints(skillPointDelta: number) {
    UnitModifySkillPoints(this.handle, skillPointDelta);
  }

  public get sleeping() {
    return UnitIsSleeping(this.handle);
  }

  public get strength() {
    return GetHeroStr(this.handle, false);
  }

  public set strength(value: number) {
    SetHeroStr(this.handle, value, true);
  }

  public set turnSpeed(value: number) {
    SetUnitTurnSpeed(this.handle, value);
  }

  public get turnSpeed() {
    return GetUnitTurnSpeed(this.handle);
  }

  public get typeId() {
    return UnitId.of(GetUnitTypeId(this.handle));
  }

  public get userData() {
    return GetUnitUserData(this.handle);
  }

  public set userData(value: number) {
    SetUnitUserData(this.handle, value);
  }

  public set waygateActive(flag: boolean) {
    WaygateActivate(this.handle, flag);
  }

  public get waygateActive() {
    return WaygateIsActive(this.handle);
  }

  public get x() {
    return GetUnitX(this.handle);
  }

  public set x(value: number) {
    SetUnitX(this.handle, value);
  }

  public get y() {
    return GetUnitY(this.handle);
  }

  public set y(value: number) {
    SetUnitY(this.handle, value);
  }

  public get z() {
    return BlzGetUnitZ(this.handle);
  }

  get mineGold(): number {
    return GetResourceAmount(this.handle);
  }

  set mineGold(value: number) {
    SetResourceAmount(this.handle, value);
  }

  public addAbility(abilityId: AbilId) {
    return UnitAddAbility(this.handle, abilityId.value);
  }

  public addAnimationProps(animProperties: string, add: boolean) {
    AddUnitAnimationProperties(this.handle, animProperties, add);
  }

  public addExperience(xpToAdd: number, showEyeCandy: boolean) {
    AddHeroXP(this.handle, xpToAdd, showEyeCandy);
  }

  public addIndicator(red: number, blue: number, green: number, alpha: number) {
    UnitAddIndicator(this.handle, red, blue, green, alpha);
  }

  public addItem(whichItem: Item) {
    return UnitAddItem(this.handle, whichItem.handle);
  }

  public addItemById(itemId: ItemId): Item {
    return Item.fromHandle(UnitAddItemById(this.handle, itemId.value)!);
  }

  public addItemToSlotById(itemId: ItemId, itemSlot: number) {
    return UnitAddItemToSlotById(this.handle, itemId.value, itemSlot);
  }

  public addItemToStock(
    itemId: ItemId,
    currentStock: number,
    stockMax: number,
  ) {
    AddItemToStock(this.handle, itemId.value, currentStock, stockMax);
  }

  public addResourceAmount(amount: number) {
    AddResourceAmount(this.handle, amount);
  }

  public addSleepPerm(add: boolean) {
    UnitAddSleepPerm(this.handle, add);
  }

  public addType(whichUnitType: unittype) {
    return UnitAddType(this.handle, whichUnitType);
  }

  public addUnitToStock(
    unitId: UnitId,
    currentStock: number,
    stockMax: number,
  ) {
    AddUnitToStock(this.handle, unitId.value, currentStock, stockMax);
  }

  public applyTimedLife(buffId: AbilId, duration: number) {
    UnitApplyTimedLife(this.handle, buffId.value, duration);
  }

  public attachSound(sound: Sound) {
    AttachSoundToUnit(sound.handle, this.handle);
  }

  public cancelTimedLife() {
    BlzUnitCancelTimedLife(this.handle);
  }

  public canSleepPerm() {
    return UnitCanSleepPerm(this.handle);
  }

  public countBuffs(
    removePositive: boolean,
    removeNegative: boolean,
    magic: boolean,
    physical: boolean,
    timedLife: boolean,
    aura: boolean,
    autoDispel: boolean,
  ) {
    return UnitCountBuffsEx(
      this.handle,
      removePositive,
      removeNegative,
      magic,
      physical,
      timedLife,
      aura,
      autoDispel,
    );
  }

  public damageAt(
    delay: number,
    radius: number,
    x: number,
    y: number,
    amount: number,
    attack: boolean,
    ranged: boolean,
    attackType: AttackType,
    damageType: DamageType,
    weaponSound: WeaponSound = WeaponSound.None,
  ) {
    return UnitDamagePoint(
      this.handle,
      delay,
      radius,
      x,
      y,
      amount,
      attack,
      ranged,
      attackType.value,
      damageType.value,
      weaponSound.value,
    );
  }

  public damageTarget(
    target: Widget,
    amount: number,
    attack: boolean,
    ranged: boolean,
    attackType: AttackType,
    damageType: DamageType,
    weaponSound: WeaponSound = WeaponSound.None,
  ) {
    return UnitDamageTarget(
      this.handle,
      target.handle,
      amount,
      attack,
      ranged,
      attackType.value,
      damageType.value,
      weaponSound.value,
    );
  }

  public decAbilityLevel(abilId: AbilId) {
    return DecUnitAbilityLevel(this.handle, abilId.value);
  }

  public destroy() {
    RemoveUnit(this.handle);
  }

  public disableAbility(abilId: AbilId, hideUI: boolean) {
    BlzUnitHideAbility(this.handle, abilId.value, hideUI);
  }

  public dropItem(whichItem: Item, pos: Vec2) {
    return UnitDropItemPoint(this.handle, whichItem.handle, pos.x, pos.y);
  }

  public putItemInSlot(whichItem: Item, slot: number) {
    return UnitDropItemSlot(this.handle, whichItem.handle, slot);
  }

  public dropItemTarget(
    whichItem: Item,
    target: Widget /* | Unit | Item | Destructable*/,
  ) {
    return UnitDropItemTarget(this.handle, whichItem.handle, target.handle);
  }

  public endAbilityCooldown(abilId: AbilId) {
    BlzEndUnitAbilityCooldown(this.handle, abilId.value);
  }

  public getAbility(abilId: AbilId) {
    return BlzGetUnitAbility(this.handle, abilId.value);
  }

  public getAbilityByIndex(index: number) {
    return BlzGetUnitAbilityByIndex(this.handle, index);
  }

  public getAbilityCooldown(abilId: AbilId, level: number) {
    return BlzGetUnitAbilityCooldown(this.handle, abilId.value, level);
  }

  public getAbilityCooldownRemaining(abilId: AbilId) {
    return BlzGetUnitAbilityCooldownRemaining(this.handle, abilId.value);
  }

  public getAbilityLevel(abilId: AbilId) {
    return GetUnitAbilityLevel(this.handle, abilId.value);
  }

  public getAbilityManaCost(abilId: AbilId, level: number) {
    return BlzGetUnitAbilityManaCost(this.handle, abilId.value, level);
  }

  public getAgility(includeBonuses: boolean) {
    return GetHeroAgi(this.handle, includeBonuses);
  }

  public getAttackCooldown(weaponIndex: number) {
    return BlzGetUnitAttackCooldown(this.handle, weaponIndex);
  }

  public getBaseDamage(weaponIndex: number) {
    return BlzGetUnitBaseDamage(this.handle, weaponIndex);
  }

  public getDiceNumber(weaponIndex: number) {
    return BlzGetUnitDiceNumber(this.handle, weaponIndex);
  }

  public getDiceSides(weaponIndex: number) {
    return BlzGetUnitDiceSides(this.handle, weaponIndex);
  }

  public getIntegerField(field: unitintegerfield): number {
    return BlzGetUnitIntegerField(this.handle, field);
  }

  public getField(
    field:
      | unitbooleanfield
      | unitintegerfield
      | unitrealfield
      | unitstringfield,
  ) {
    const fieldType = field.toString().substr(0, field.toString().indexOf(":"));

    switch (fieldType) {
      case "unitbooleanfield":
        return BlzGetUnitBooleanField(this.handle, field as unitbooleanfield);
      case "unitintegerfield":
        return BlzGetUnitIntegerField(this.handle, field as unitintegerfield);
      case "unitrealfield":
        return BlzGetUnitRealField(this.handle, field as unitrealfield);
      case "unitstringfield":
        return BlzGetUnitStringField(this.handle, field as unitstringfield);
      default:
        return 0;
    }
  }

  public getWeaponRealField(field: unitweaponrealfield, index: number) {
    return BlzGetUnitWeaponRealField(this.handle, field, index);
  }

  public getWeaponIntegerField(field: unitweaponintegerfield, index: number) {
    return BlzGetUnitWeaponIntegerField(this.handle, field, index);
  }

  public getWeaponBoolField(field: unitweaponbooleanfield, index: number) {
    return BlzGetUnitWeaponBooleanField(this.handle, field, index);
  }

  public getWeaponStringField(field: unitweaponstringfield, index: number) {
    return BlzGetUnitWeaponStringField(this.handle, field, index);
  }

  public getflyHeight() {
    return GetUnitFlyHeight(this.handle);
  }

  public getHeroLevel() {
    return GetHeroLevel(this.handle);
  }

  public getIgnoreAlarm(flag: boolean) {
    return UnitIgnoreAlarm(this.handle, flag);
  }

  public getIntelligence(includeBonuses: boolean) {
    return GetHeroInt(this.handle, includeBonuses);
  }

  public getItemInSlot(slot: number): Item | undefined {
    const i = UnitItemInSlot(this.handle, slot);
    if (i != null) {
      return Item.fromHandle(i);
    }
    return undefined;
  }

  public getState(whichUnitState: unitstate) {
    return GetUnitState(this.handle, whichUnitState);
  }

  public getStrength(includeBonuses: boolean) {
    return GetHeroStr(this.handle, includeBonuses);
  }

  public hasBuffs(
    removePositive: boolean,
    removeNegative: boolean,
    magic: boolean,
    physical: boolean,
    timedLife: boolean,
    aura: boolean,
    autoDispel: boolean,
  ) {
    return UnitHasBuffsEx(
      this.handle,
      removePositive,
      removeNegative,
      magic,
      physical,
      timedLife,
      aura,
      autoDispel,
    );
  }

  hasBuff(buffId: AbilId): boolean {
    return this.getAbilityLevel(buffId) > 0;
  }

  public get items(): Item[] {
    const items: Item[] = [];
    for (let i = 0; i < this.inventorySize; i++) {
      const inSlot = this.getItemInSlot(i);
      if (inSlot) {
        items.push(inSlot);
      }
    }
    return items;
  }

  public hasItem(whichItem: Item) {
    return UnitHasItem(this.handle, whichItem.handle);
  }

  public getInventorySlotOfItemType(whichItemType: ItemId) {
    for (let i = 0; i < this.inventorySize; i++) {
      const slot = this.getItemInSlot(i);
      if (slot && slot.typeId == whichItemType) {
        return i;
      }
    }
    return -1;
  }

  public getInventorySlotOfItem(whichItem: Item) {
    for (let i = 0; i < this.inventorySize; i++) {
      const slot = this.getItemInSlot(i);
      if (slot && slot == whichItem) {
        return i;
      }
    }
    return -1;
  }

  public hasItemOfType(whichItemType: ItemId) {
    return this.getInventorySlotOfItemType(whichItemType) >= 0;
  }

  public hideAbility(abilId: AbilId, flag: boolean) {
    BlzUnitHideAbility(this.handle, abilId.value, flag);
  }

  public incAbilityLevel(abilId: AbilId) {
    return IncUnitAbilityLevel(this.handle, abilId.value);
  }

  public inForce(whichForce: Force) {
    return IsUnitInForce(this.handle, whichForce.handle);
  }

  public inGroup(whichGroup: Group) {
    return IsUnitInGroup(this.handle, whichGroup.handle);
  }

  public inRange(pos: Vec2, distance: number) {
    return IsUnitInRangeXY(this.handle, pos.x, pos.y, distance);
  }

  public inRangeOfUnit(otherUnit: Unit, distance: number) {
    return IsUnitInRange(this.handle, otherUnit.handle, distance);
  }

  public interruptAttack() {
    BlzUnitInterruptAttack(this.handle);
  }

  public inTransport(whichTransport: Unit) {
    return IsUnitInTransport(this.handle, whichTransport.handle);
  }

  public isAlive(): boolean {
    return UnitAlive(this.handle);
  }

  public isAlly(whichPlayer: MapPlayer) {
    return IsUnitAlly(this.handle, whichPlayer.handle);
  }

  public isEnemy(whichPlayer: MapPlayer) {
    return IsUnitEnemy(this.handle, whichPlayer.handle);
  }

  public isExperienceSuspended() {
    return IsSuspendedXP(this.handle);
  }

  public isFogged(whichPlayer: MapPlayer) {
    return IsUnitFogged(this.handle, whichPlayer.handle);
  }

  public isHero() {
    return IsHeroUnitId(this.typeId.value);
  }

  public isIllusion() {
    return IsUnitIllusion(this.handle);
  }

  public isLoaded() {
    return IsUnitLoaded(this.handle);
  }

  public isMasked(whichPlayer: MapPlayer) {
    return IsUnitMasked(this.handle, whichPlayer.handle);
  }

  public isSelected(whichPlayer: MapPlayer) {
    return IsUnitSelected(this.handle, whichPlayer.handle);
  }

  public issueBuildOrder(unit: string | UnitId, pos: Vec2) {
    return typeof unit === "string"
      ? IssueBuildOrder(this.handle, unit, pos.x, pos.y)
      : IssueBuildOrderById(this.handle, unit.value, pos.x, pos.y);
  }

  public issueImmediateOrder(order: string | number) {
    return typeof order === "string"
      ? IssueImmediateOrder(this.handle, order)
      : IssueImmediateOrderById(this.handle, order);
  }

  public issueInstantOrderAt(
    order: string | number,
    x: number,
    y: number,
    instantTargetWidget: Widget,
  ) {
    return typeof order === "string"
      ? IssueInstantPointOrder(
          this.handle,
          order,
          x,
          y,
          instantTargetWidget.handle,
        )
      : IssueInstantPointOrderById(
          this.handle,
          order,
          x,
          y,
          instantTargetWidget.handle,
        );
  }

  public issueInstantTargetOrder(
    order: string | number,
    targetWidget: Widget,
    instantTargetWidget: Widget,
  ) {
    return typeof order === "string"
      ? IssueInstantTargetOrder(
          this.handle,
          order,
          targetWidget.handle,
          instantTargetWidget.handle,
        )
      : IssueInstantTargetOrderById(
          this.handle,
          order,
          targetWidget.handle,
          instantTargetWidget.handle,
        );
  }

  public issueOrderAt(order: string | number, pos: Vec2) {
    return typeof order === "string"
      ? IssuePointOrder(this.handle, order, pos.x, pos.y)
      : IssuePointOrderById(this.handle, order, pos.x, pos.y);
  }

  public issueTargetOrder(
    order: string | number,
    targetWidget: Widget,
  ): boolean {
    return typeof order === "string"
      ? IssueTargetOrder(this.handle, order, targetWidget.handle)
      : IssueTargetOrderById(this.handle, order, targetWidget.handle);
  }

  issueTrainOrder(unitId: UnitId) {
    return IssueImmediateOrderById(this.handle, unitId.value);
  }

  issueResearchOrder(researchId: number) {
    return IssueImmediateOrderById(this.handle, researchId);
  }

  issueUpgradeOrder(unitId: UnitId) {
    return IssueImmediateOrderById(this.handle, unitId.value);
  }

  public isUnit(whichSpecifiedUnit: Unit) {
    return IsUnit(this.handle, whichSpecifiedUnit.handle);
  }

  public isUnitType(whichUnitType: unittype) {
    return IsUnitType(this.handle, whichUnitType);
  }

  public isVisible(whichPlayer: MapPlayer) {
    return IsUnitVisible(this.handle, whichPlayer.handle);
  }

  public kill() {
    KillUnit(this.handle);
  }

  public lookAt(
    whichBone: string,
    lookAtTarget: Unit,
    offsetX: number,
    offsetY: number,
    offsetZ: number,
  ) {
    SetUnitLookAt(
      this.handle,
      whichBone,
      lookAtTarget.handle,
      offsetX,
      offsetY,
      offsetZ,
    );
  }

  public makeAbilityPermanent(permanent: boolean, abilityId: AbilId) {
    UnitMakeAbilityPermanent(this.handle, permanent, abilityId.value);
  }

  public modifySkillPoints(skillPointDelta: number) {
    return UnitModifySkillPoints(this.handle, skillPointDelta);
  }

  public pauseEx(flag: boolean) {
    BlzPauseUnitEx(this.handle, flag);
  }

  public pauseTimedLife(flag: boolean) {
    UnitPauseTimedLife(this.handle, flag);
  }

  public queueAnimation(whichAnimation: string) {
    QueueUnitAnimation(this.handle, whichAnimation);
  }

  public recycleGuardPosition() {
    RecycleGuardPosition(this.handle);
  }

  public removeAbility(abilityId: AbilId) {
    return UnitRemoveAbility(this.handle, abilityId.value);
  }

  public removeBuffs(removePositive: boolean, removeNegative: boolean) {
    UnitRemoveBuffs(this.handle, removePositive, removeNegative);
  }

  public removeBuffsEx(
    removePositive: boolean,
    removeNegative: boolean,
    magic: boolean,
    physical: boolean,
    timedLife: boolean,
    aura: boolean,
    autoDispel: boolean,
  ) {
    UnitRemoveBuffsEx(
      this.handle,
      removePositive,
      removeNegative,
      magic,
      physical,
      timedLife,
      aura,
      autoDispel,
    );
  }

  public removeGuardPosition() {
    RemoveGuardPosition(this.handle);
  }

  public dropItemInstantly(whichItem: Item) {
    UnitRemoveItem(this.handle, whichItem.handle);
  }

  public dropItemInstantlyFromSlot(itemSlot: number) {
    return UnitRemoveItemFromSlot(this.handle, itemSlot);
  }

  public removeItemFromStock(itemId: ItemId) {
    RemoveItemFromStock(this.handle, itemId.value);
  }

  public removeType(whichUnitType: unittype) {
    return UnitRemoveType(this.handle, whichUnitType);
  }

  public removeUnitFromStock(itemId: UnitId) {
    RemoveUnitFromStock(this.handle, itemId.value);
  }

  /**
   * Replace this unit with a new one of the given type. Returns the new unit.
   */
  replaceWith(unitId: UnitId, state: Unit.ReplaceState): Unit {
    return Unit.fromHandle(
      ReplaceUnitBJ(
        this.handle,
        unitId.value,
        Unit.ReplaceState.toValue(state),
      )!,
    );
  }

  public resetCooldown() {
    UnitResetCooldown(this.handle);
  }

  public resetLookAt() {
    ResetUnitLookAt(this.handle);
  }

  public revive(pos: Vec2, doEyecandy: boolean) {
    return ReviveHero(this.handle, pos.x, pos.y, doEyecandy);
  }

  public select(flag: boolean) {
    SelectUnit(this.handle, flag);
  }

  public selectSkill(abilCode: number) {
    SelectHeroSkill(this.handle, abilCode);
  }

  public setAbilityCooldown(abilId: AbilId, level: number, cooldown: number) {
    BlzSetUnitAbilityCooldown(this.handle, abilId.value, level, cooldown);
  }

  public setAbilityLevel(abilId: AbilId, level: number) {
    return SetUnitAbilityLevel(this.handle, abilId.value, level);
  }

  public setAbilityManaCost(abilId: AbilId, level: number, manaCost: number) {
    BlzSetUnitAbilityManaCost(this.handle, abilId.value, level, manaCost);
  }

  public setAgility(value: number, permanent: boolean) {
    SetHeroAgi(this.handle, value, permanent);
  }

  public setAnimation(whichAnimation: string | number) {
    if (typeof whichAnimation === "string") {
      SetUnitAnimation(this.handle, whichAnimation);
    } else {
      SetUnitAnimationByIndex(this.handle, whichAnimation);
    }
  }

  public setAnimationWithRarity(whichAnimation: string, rarity: raritycontrol) {
    SetUnitAnimationWithRarity(this.handle, whichAnimation, rarity);
  }

  public setAttackCooldown(cooldown: number, weaponIndex: number) {
    BlzSetUnitAttackCooldown(this.handle, cooldown, weaponIndex);
  }

  public setBaseDamage(baseDamage: number, weaponIndex: number) {
    BlzSetUnitBaseDamage(this.handle, baseDamage, weaponIndex);
  }

  public setBlendTime(timeScale: number) {
    SetUnitBlendTime(this.handle, timeScale);
  }

  public setConstructionProgress(constructionPercentage: number) {
    UnitSetConstructionProgress(this.handle, constructionPercentage);
  }

  public setCreepGuard(creepGuard: boolean) {
    SetUnitCreepGuard(this.handle, creepGuard);
  }

  public setDiceNumber(diceNumber: number, weaponIndex: number) {
    BlzSetUnitDiceNumber(this.handle, diceNumber, weaponIndex);
  }

  public setDiceSides(diceSides: number, weaponIndex: number) {
    BlzSetUnitDiceSides(this.handle, diceSides, weaponIndex);
  }

  public setExperience(newXpVal: number, showEyeCandy: boolean) {
    SetHeroXP(this.handle, newXpVal, showEyeCandy);
  }

  public setExploded(exploded: boolean) {
    SetUnitExploded(this.handle, exploded);
  }

  public setFacingEx(facingAngle: Angle) {
    BlzSetUnitFacingEx(this.handle, facingAngle.degrees);
  }

  public setField(
    field:
      | unitbooleanfield
      | unitintegerfield
      | unitrealfield
      | unitstringfield,
    value: boolean | number | string,
  ) {
    const fieldType = field.toString().substr(0, field.toString().indexOf(":"));

    if (fieldType === "unitbooleanfield" && typeof value === "boolean") {
      return BlzSetUnitBooleanField(
        this.handle,
        field as unitbooleanfield,
        value,
      );
    } else if (fieldType === "unitintegerfield" && typeof value === "number") {
      return BlzSetUnitIntegerField(
        this.handle,
        field as unitintegerfield,
        value,
      );
    } else if (fieldType === "unitrealfield" && typeof value === "number") {
      return BlzSetUnitRealField(this.handle, field as unitrealfield, value);
    } else if (fieldType === "unitstringfield" && typeof value === "string") {
      return BlzSetUnitStringField(
        this.handle,
        field as unitstringfield,
        value,
      );
    }

    return false;
  }

  public setWeaponField(
    field:
      | unitweaponbooleanfield
      | unitweaponintegerfield
      | unitweaponrealfield
      | unitweaponstringfield,
    index: number,
    value: boolean | number | string,
  ) {
    const fieldType = field.toString().substr(0, field.toString().indexOf(":"));

    if (fieldType === "unitweaponbooleanfield" && typeof value === "boolean") {
      return BlzSetUnitWeaponBooleanField(
        this.handle,
        field as unitweaponbooleanfield,
        index,
        value,
      );
    } else if (
      fieldType === "unitweaponintegerfield" &&
      typeof value === "number"
    ) {
      return BlzSetUnitWeaponIntegerField(
        this.handle,
        field as unitweaponintegerfield,
        index,
        value,
      );
    } else if (
      fieldType === "unitweaponrealfield" &&
      typeof value === "number"
    ) {
      return BlzSetUnitWeaponRealField(
        this.handle,
        field as unitweaponrealfield,
        index,
        value,
      );
    } else if (
      fieldType === "unitweaponstringfield" &&
      typeof value === "string"
    ) {
      return BlzSetUnitWeaponStringField(
        this.handle,
        field as unitweaponstringfield,
        index,
        value,
      );
    }

    return false;
  }

  public setflyHeight(value: number, rate: number) {
    SetUnitFlyHeight(this.handle, value, rate);
  }

  public setHeroLevel(level: number, showEyeCandy: boolean) {
    SetHeroLevel(this.handle, level, showEyeCandy);
  }

  public setIntelligence(value: number, permanent: boolean) {
    SetHeroInt(this.handle, value, permanent);
  }

  public setItemTypeSlots(slots: number) {
    SetItemTypeSlots(this.handle, slots);
  }

  public setOwner(whichPlayer: MapPlayer, changeColor: boolean) {
    SetUnitOwner(this.handle, whichPlayer.handle, changeColor);
  }

  public setPathing(flag: boolean) {
    SetUnitPathing(this.handle, flag);
  }

  public setPosition(pos: Vec2) {
    SetUnitPosition(this.handle, pos.x, pos.y);
  }

  public setRescuable(byWhichPlayer: MapPlayer, flag: boolean) {
    SetUnitRescuable(this.handle, byWhichPlayer.handle, flag);
  }

  public setRescueRange(range: number) {
    SetUnitRescueRange(this.handle, range);
  }

  public setScale(scaleX: number, scaleY: number, scaleZ: number) {
    SetUnitScale(this.handle, scaleX, scaleY, scaleZ);
  }

  public setState(whichUnitState: unitstate, newVal: number) {
    SetUnitState(this.handle, whichUnitState, newVal);
  }

  public setStrength(value: number, permanent: boolean) {
    SetHeroStr(this.handle, value, permanent);
  }

  public setTimeScale(timeScale: number) {
    SetUnitTimeScale(this.handle, timeScale);
  }

  public setUnitAttackCooldown(cooldown: number, weaponIndex: number) {
    BlzSetUnitAttackCooldown(this.handle, cooldown, weaponIndex);
  }

  public setUnitTypeSlots(slots: number) {
    SetUnitTypeSlots(this.handle, slots);
  }

  public setUpgradeProgress(upgradePercentage: number) {
    UnitSetUpgradeProgress(this.handle, upgradePercentage);
  }

  public setUseAltIcon(flag: boolean) {
    UnitSetUsesAltIcon(this.handle, flag);
  }

  public setUseFood(useFood: boolean) {
    SetUnitUseFood(this.handle, useFood);
  }

  public setVertexColor(
    red: number,
    green: number,
    blue: number,
    alpha: number,
  ) {
    SetUnitVertexColor(this.handle, red, green, blue, alpha);
  }

  public shareVision(whichPlayer: MapPlayer, share: boolean) {
    UnitShareVision(this.handle, whichPlayer.handle, share);
  }

  public showTeamGlow(show: boolean) {
    BlzShowUnitTeamGlow(this.handle, show);
  }

  public startAbilityCooldown(abilId: AbilId, cooldown: number) {
    BlzStartUnitAbilityCooldown(this.handle, abilId.value, cooldown);
  }

  public stripLevels(howManyLevels: number) {
    return UnitStripHeroLevel(this.handle, howManyLevels);
  }

  public suspendDecay(suspend: boolean) {
    UnitSuspendDecay(this.handle, suspend);
  }

  public suspendExperience(flag: boolean) {
    SuspendHeroXP(this.handle, flag);
  }

  public useItem(whichItem: Item) {
    return UnitUseItem(this.handle, whichItem.handle);
  }

  public useItemAt(whichItem: Item, pos: Vec2) {
    return UnitUseItemPoint(this.handle, whichItem.handle, pos.x, pos.y);
  }

  public useItemTarget(whichItem: Item, target: Widget) {
    return UnitUseItemTarget(this.handle, whichItem.handle, target.handle);
  }

  public wakeUp() {
    UnitWakeUp(this.handle);
  }

  public set waygateDestination(pos: Vec2) {
    WaygateSetDestination(this.handle, pos.x, pos.y);
  }

  public get waygateDestination(): Vec2 {
    return vec2(
      WaygateGetDestinationX(this.handle),
      WaygateGetDestinationY(this.handle),
    );
  }

  public static foodMadeByType(unitId: UnitId) {
    return GetFoodMade(unitId.value);
  }

  public static foodUsedByType(unitId: UnitId) {
    return GetFoodUsed(unitId.value);
  }

  public static fromEvent() {
    return this.fromHandle(GetTriggerUnit()!);
  }

  public static fromHandle(handle: unit): Unit {
    return this.getObject(handle) as Unit;
  }

  public static getPointValueByType(unitType: number) {
    return GetUnitPointValueByType(unitType);
  }

  public static isUnitIdHero(unitId: UnitId) {
    return IsHeroUnitId(unitId.value);
  }

  public static isUnitIdType(unitId: UnitId, whichUnitType: unittype) {
    return IsUnitIdType(unitId.value, whichUnitType);
  }

  static get eventTriggering(): Unit {
    return this.fromHandle(GetTriggerUnit()!);
  }

  static get eventAttacker(): Unit {
    return this.fromHandle(GetAttacker()!);
  }

  static get eventRescuer(): Unit {
    return this.fromHandle(GetRescuer()!);
  }

  static get eventDying(): Unit {
    return this.fromHandle(GetDyingUnit()!);
  }

  static get eventKilling(): Unit | undefined {
    return GetKillingUnit() != null
      ? Unit.fromHandle(GetKillingUnit()!)
      : undefined;
  }

  static get eventDecaying(): Unit {
    return this.fromHandle(GetDecayingUnit()!);
  }

  static get eventDetected(): Unit {
    return this.fromHandle(GetDetectedUnit()!);
  }

  static get eventConstructingStructure(): Unit {
    return Unit.fromHandle(GetConstructingStructure()!);
  }

  static get eventCanceledStructure(): Unit {
    return Unit.fromHandle(GetCancelledStructure()!);
  }

  static get eventConstructedStructure(): Unit {
    return Unit.fromHandle(GetConstructedStructure()!);
  }

  static get eventTrained(): Unit {
    return this.fromHandle(GetTrainedUnit()!);
  }

  static get eventResearcher(): Unit {
    return this.fromHandle(GetResearchingUnit()!);
  }

  static get eventOrdered(): Unit {
    return this.fromHandle(GetOrderedUnit()!);
  }

  static get eventOrderTarget(): Unit {
    return this.fromHandle(GetOrderTargetUnit()!);
  }

  static get eventHeroLeveling(): Unit {
    return this.fromHandle(GetLevelingUnit()!);
  }

  static get eventHeroLearning(): Unit {
    return this.fromHandle(GetLearningUnit()!);
  }

  static get eventHeroRevivable(): Unit {
    return this.fromHandle(GetRevivableUnit()!);
  }

  static get eventHeroReviving(): Unit {
    return this.fromHandle(GetRevivingUnit()!);
  }

  static get eventSummoner(): Unit {
    return this.fromHandle(GetSummoningUnit()!);
  }

  static get eventSummoned(): Unit {
    return this.fromHandle(GetSummonedUnit()!);
  }

  static get eventManipulating(): Unit {
    return this.fromHandle(GetManipulatingUnit()!);
  }

  static get eventLoaded(): Unit {
    return this.fromHandle(GetLoadedUnit()!);
  }

  static get eventTransport(): Unit {
    return this.fromHandle(GetTransportUnit()!);
  }

  static get eventSold(): Unit {
    return this.fromHandle(GetSoldUnit()!);
  }

  static get eventSeller(): Unit {
    return this.fromHandle(GetSellingUnit()!);
  }

  static get eventOwnershipChanging(): Unit {
    return this.fromHandle(GetChangingUnit()!);
  }

  static get eventBuyer(): Unit {
    return this.fromHandle(GetBuyingUnit()!);
  }

  static get eventCaster(): Unit {
    return this.fromHandle(GetSpellAbilityUnit()!);
  }

  static get eventEnteringRegion(): Unit {
    return this.fromHandle(GetEnteringUnit()!);
  }

  static get eventLeavingRegion(): Unit {
    return this.fromHandle(GetLeavingUnit()!);
  }

  static get filterUnit(): Unit {
    return this.fromHandle(GetFilterUnit()!);
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Unit {
  export enum ReplaceState {
    // Use the same HP and mana percentages
    Relative,
    // Use the absolute values for the new unit
    Absolute,
    // Use the default values from the new unit
    Default,
    // Use the maximum values from the new unit
    Maximum,
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace ReplaceState {
    export function toValue(state: ReplaceState): number {
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
  }
}
