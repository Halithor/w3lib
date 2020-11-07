/** @noSelfInFile **/

import {Dialog, DialogButton} from './dialog';
import {Frame} from './frame';
import {Handle} from './handle';
import {MapPlayer} from './player';
import {Unit} from './unit';
import {Widget} from './widget';

export class Trigger extends Handle<trigger> {
  constructor() {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateTrigger());
    }
  }

  public set enabled(flag: boolean) {
    if (flag) {
      EnableTrigger(this.handle);
    } else {
      DisableTrigger(this.handle);
    }
  }

  public get enabled() {
    return IsTriggerEnabled(this.handle);
  }

  public get evalCount() {
    return GetTriggerEvalCount(this.handle);
  }

  public static get eventId() {
    return GetTriggerEventId();
  }

  public get execCount() {
    return GetTriggerExecCount(this.handle);
  }

  public set waitOnSleeps(flag: boolean) {
    TriggerWaitOnSleeps(this.handle, flag);
  }

  public get waitOnSleeps() {
    return IsTriggerWaitOnSleeps(this.handle);
  }

  public addAction(actionFunc: () => void) {
    return TriggerAddAction(this.handle, actionFunc);
  }

  public addCondition(condition: () => boolean) {
    return TriggerAddCondition(this.handle, Condition(condition));
  }

  public destroy() {
    DestroyTrigger(this.handle);
  }

  public eval() {
    return TriggerEvaluate(this.handle);
  }

  public exec() {
    return TriggerExecute(this.handle);
  }

  public registerAnyUnitEvent(whichPlayerUnitEvent: playerunitevent): Trigger {
    TriggerRegisterAnyUnitEventBJ(this.handle, whichPlayerUnitEvent);
    return this;
  }

  public registerCommandEvent(whichAbility: number, order: string): Trigger {
    TriggerRegisterCommandEvent(this.handle, whichAbility, order);
    return this;
  }

  public registerDeathEvent(whichWidget: Widget): Trigger {
    TriggerRegisterDeathEvent(this.handle, whichWidget.handle);
    return this;
  }

  public registerDialogButtonEvent(whichButton: DialogButton): Trigger {
    TriggerRegisterDialogButtonEvent(this.handle, whichButton.handle);
    return this;
  }

  public registerDialogEvent(whichDialog: Dialog): Trigger {
    TriggerRegisterDialogEvent(this.handle, whichDialog.handle);
    return this;
  }

  public registerEnterRegion(
    whichRegion: region,
    filter: (() => boolean) | null
  ): Trigger {
    TriggerRegisterEnterRegion(
      this.handle,
      whichRegion,
      filter ? Filter(filter) : null
    );
    return this;
  }

  public registerFilterUnitEvent(
    whichUnit: unit,
    whichEvent: unitevent,
    filter: (() => boolean) | null
  ): Trigger {
    TriggerRegisterFilterUnitEvent(
      this.handle,
      whichUnit,
      whichEvent,
      filter ? Filter(filter) : null
    );
    return this;
  }

  public registerGameEvent(whichGameEvent: gameevent): Trigger {
    TriggerRegisterGameEvent(this.handle, whichGameEvent);
    return this;
  }

  public registerGameStateEvent(
    whichState: gamestate,
    opcode: limitop,
    limitval: number
  ): Trigger {
    TriggerRegisterGameStateEvent(this.handle, whichState, opcode, limitval);
    return this;
  }

  public registerLeaveRegion(
    whichRegion: region,
    filter: (() => boolean) | null
  ): Trigger {
    TriggerRegisterLeaveRegion(
      this.handle,
      whichRegion,
      filter ? Filter(filter) : null
    );
    return this;
  }

  public registerPlayerAllianceChange(
    whichPlayer: MapPlayer,
    whichAlliance: alliancetype
  ): Trigger {
    TriggerRegisterPlayerAllianceChange(
      this.handle,
      whichPlayer.handle,
      whichAlliance
    );
    return this;
  }

  public registerPlayerChatEvent(
    whichPlayer: MapPlayer,
    chatMessageToDetect: string,
    exactMatchOnly: boolean
  ): Trigger {
    TriggerRegisterPlayerChatEvent(
      this.handle,
      whichPlayer.handle,
      chatMessageToDetect,
      exactMatchOnly
    );
    return this;
  }

  public registerPlayerEvent(
    whichPlayer: MapPlayer,
    whichPlayerEvent: playerevent
  ): Trigger {
    TriggerRegisterPlayerEvent(
      this.handle,
      whichPlayer.handle,
      whichPlayerEvent
    );
    return this;
  }

  public registerPlayerKeyEvent(
    whichPlayer: MapPlayer,
    whichKey: oskeytype,
    metaKey: number,
    fireOnKeyDown: boolean
  ): Trigger {
    BlzTriggerRegisterPlayerKeyEvent(
      this.handle,
      whichPlayer.handle,
      whichKey,
      metaKey,
      fireOnKeyDown
    );
    return this;
  }

  public registerPlayerMouseEvent(
    whichPlayer: MapPlayer,
    whichMouseEvent: number
  ): Trigger {
    TriggerRegisterPlayerMouseEventBJ(
      this.handle,
      whichPlayer.handle,
      whichMouseEvent
    );
    return this;
  }

  public registerPlayerStateEvent(
    whichPlayer: MapPlayer,
    whichState: playerstate,
    opcode: limitop,
    limitval: number
  ): Trigger {
    TriggerRegisterPlayerStateEvent(
      this.handle,
      whichPlayer.handle,
      whichState,
      opcode,
      limitval
    );
    return this;
  }

  public registerPlayerSyncEvent(
    whichPlayer: MapPlayer,
    prefix: string,
    fromServer: boolean
  ): Trigger {
    BlzTriggerRegisterPlayerSyncEvent(
      this.handle,
      whichPlayer.handle,
      prefix,
      fromServer
    );
    return this;
  }

  public registerPlayerUnitEvent(
    whichPlayer: MapPlayer,
    whichPlayerUnitEvent: playerunitevent,
    filter: (() => boolean) | null
  ): Trigger {
    TriggerRegisterPlayerUnitEvent(
      this.handle,
      whichPlayer.handle,
      whichPlayerUnitEvent,
      filter ? Filter(filter) : null
    );
    return this;
  }

  // Creates it's own timer and triggers when it expires
  public registerTimerEvent(timeout: number, periodic: boolean): Trigger {
    TriggerRegisterTimerEvent(this.handle, timeout, periodic);
    return this;
  }

  // Triggers when the timer you tell it about expires
  public registerTimerExpireEvent(t: timer): Trigger {
    TriggerRegisterTimerExpireEvent(this.handle, t);
    return this;
  }

  public registerTrackableHitEvent(whichTrackable: trackable): Trigger {
    TriggerRegisterTrackableHitEvent(this.handle, whichTrackable);
    return this;
  }

  public registerTrackableTrackEvent(whichTrackable: trackable): Trigger {
    TriggerRegisterTrackableTrackEvent(this.handle, whichTrackable);
    return this;
  }

  public registerUnitEvent(whichUnit: Unit, whichEvent: unitevent): Trigger {
    TriggerRegisterUnitEvent(this.handle, whichUnit.handle, whichEvent);
    return this;
  }

  public registerUnitInRage(
    whichUnit: unit,
    range: number,
    filter: (() => boolean) | null
  ): Trigger {
    TriggerRegisterUnitInRange(
      this.handle,
      whichUnit,
      range,
      filter ? Filter(filter) : null
    );
    return this;
  }

  public registerUnitStateEvent(
    whichUnit: Unit,
    whichState: unitstate,
    opcode: limitop,
    limitval: number
  ): Trigger {
    TriggerRegisterUnitStateEvent(
      this.handle,
      whichUnit.handle,
      whichState,
      opcode,
      limitval
    );
    return this;
  }

  public registerUpgradeCommandEvent(whichUpgrade: number): Trigger {
    TriggerRegisterUpgradeCommandEvent(this.handle, whichUpgrade);
    return this;
  }

  public registerVariableEvent(
    varName: string,
    opcode: limitop,
    limitval: number
  ): Trigger {
    TriggerRegisterVariableEvent(this.handle, varName, opcode, limitval);
    return this;
  }

  public removeAction(whichAction: triggeraction) {
    return TriggerRemoveAction(this.handle, whichAction);
  }

  public removeActions() {
    return TriggerClearActions(this.handle);
  }

  public removeCondition(whichCondition: triggercondition) {
    return TriggerRemoveCondition(this.handle, whichCondition);
  }

  public removeConditions() {
    return TriggerClearConditions(this.handle);
  }

  public reset() {
    ResetTrigger(this.handle);
  }

  public triggerRegisterFrameEvent(
    frame: Frame,
    eventId: frameeventtype
  ): Trigger {
    BlzTriggerRegisterFrameEvent(this.handle, frame.handle, eventId);
    return this;
  }

  public static fromEvent(): Trigger {
    return this.fromHandle(GetTriggeringTrigger());
  }

  public static fromHandle(handle: trigger): Trigger {
    return this.getObject(handle);
  }
}
