"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trigger = void 0;
const handle_1 = require("./handle");
class Trigger extends handle_1.Handle {
    constructor() {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateTrigger());
        }
    }
    set enabled(flag) {
        if (flag) {
            EnableTrigger(this.handle);
        }
        else {
            DisableTrigger(this.handle);
        }
    }
    get enabled() {
        return IsTriggerEnabled(this.handle);
    }
    get evalCount() {
        return GetTriggerEvalCount(this.handle);
    }
    static get eventId() {
        return GetTriggerEventId();
    }
    get execCount() {
        return GetTriggerExecCount(this.handle);
    }
    set waitOnSleeps(flag) {
        TriggerWaitOnSleeps(this.handle, flag);
    }
    get waitOnSleeps() {
        return IsTriggerWaitOnSleeps(this.handle);
    }
    addAction(actionFunc) {
        return TriggerAddAction(this.handle, actionFunc);
    }
    addCondition(condition) {
        return TriggerAddCondition(this.handle, Condition(condition));
    }
    destroy() {
        DestroyTrigger(this.handle);
    }
    eval() {
        return TriggerEvaluate(this.handle);
    }
    exec() {
        return TriggerExecute(this.handle);
    }
    registerAnyUnitEvent(whichPlayerUnitEvent) {
        TriggerRegisterAnyUnitEventBJ(this.handle, whichPlayerUnitEvent);
        return this;
    }
    registerCommandEvent(whichAbility, order) {
        TriggerRegisterCommandEvent(this.handle, whichAbility, order);
        return this;
    }
    registerDeathEvent(whichWidget) {
        TriggerRegisterDeathEvent(this.handle, whichWidget.handle);
        return this;
    }
    registerDialogButtonEvent(whichButton) {
        TriggerRegisterDialogButtonEvent(this.handle, whichButton.handle);
        return this;
    }
    registerDialogEvent(whichDialog) {
        TriggerRegisterDialogEvent(this.handle, whichDialog.handle);
        return this;
    }
    registerEnterRegion(whichRegion, filter) {
        TriggerRegisterEnterRegion(this.handle, whichRegion, filter ? Filter(filter) : null);
        return this;
    }
    registerFilterUnitEvent(whichUnit, whichEvent, filter) {
        TriggerRegisterFilterUnitEvent(this.handle, whichUnit, whichEvent, filter ? Filter(filter) : null);
        return this;
    }
    registerGameEvent(whichGameEvent) {
        TriggerRegisterGameEvent(this.handle, whichGameEvent);
        return this;
    }
    registerGameStateEvent(whichState, opcode, limitval) {
        TriggerRegisterGameStateEvent(this.handle, whichState, opcode, limitval);
        return this;
    }
    registerLeaveRegion(whichRegion, filter) {
        TriggerRegisterLeaveRegion(this.handle, whichRegion, filter ? Filter(filter) : null);
        return this;
    }
    registerPlayerAllianceChange(whichPlayer, whichAlliance) {
        TriggerRegisterPlayerAllianceChange(this.handle, whichPlayer.handle, whichAlliance);
        return this;
    }
    registerPlayerChatEvent(whichPlayer, chatMessageToDetect, exactMatchOnly) {
        TriggerRegisterPlayerChatEvent(this.handle, whichPlayer.handle, chatMessageToDetect, exactMatchOnly);
        return this;
    }
    registerPlayerEvent(whichPlayer, whichPlayerEvent) {
        TriggerRegisterPlayerEvent(this.handle, whichPlayer.handle, whichPlayerEvent);
        return this;
    }
    registerPlayerKeyEvent(whichPlayer, whichKey, metaKey, fireOnKeyDown) {
        BlzTriggerRegisterPlayerKeyEvent(this.handle, whichPlayer.handle, whichKey, metaKey, fireOnKeyDown);
        return this;
    }
    registerPlayerMouseEvent(whichPlayer, whichMouseEvent) {
        TriggerRegisterPlayerMouseEventBJ(this.handle, whichPlayer.handle, whichMouseEvent);
        return this;
    }
    registerPlayerStateEvent(whichPlayer, whichState, opcode, limitval) {
        TriggerRegisterPlayerStateEvent(this.handle, whichPlayer.handle, whichState, opcode, limitval);
        return this;
    }
    registerPlayerSyncEvent(whichPlayer, prefix, fromServer) {
        BlzTriggerRegisterPlayerSyncEvent(this.handle, whichPlayer.handle, prefix, fromServer);
        return this;
    }
    registerPlayerUnitEvent(whichPlayer, whichPlayerUnitEvent, filter) {
        TriggerRegisterPlayerUnitEvent(this.handle, whichPlayer.handle, whichPlayerUnitEvent, filter ? Filter(filter) : null);
        return this;
    }
    // Creates it's own timer and triggers when it expires
    registerTimerEvent(timeout, periodic) {
        TriggerRegisterTimerEvent(this.handle, timeout, periodic);
        return this;
    }
    // Triggers when the timer you tell it about expires
    registerTimerExpireEvent(t) {
        TriggerRegisterTimerExpireEvent(this.handle, t);
        return this;
    }
    registerTrackableHitEvent(whichTrackable) {
        TriggerRegisterTrackableHitEvent(this.handle, whichTrackable);
        return this;
    }
    registerTrackableTrackEvent(whichTrackable) {
        TriggerRegisterTrackableTrackEvent(this.handle, whichTrackable);
        return this;
    }
    registerUnitEvent(whichUnit, whichEvent) {
        TriggerRegisterUnitEvent(this.handle, whichUnit.handle, whichEvent);
        return this;
    }
    registerUnitInRange(whichUnit, range, filter) {
        TriggerRegisterUnitInRange(this.handle, whichUnit.handle, range, filter ? Filter(filter) : null);
        return this;
    }
    registerUnitStateEvent(whichUnit, whichState, opcode, limitval) {
        TriggerRegisterUnitStateEvent(this.handle, whichUnit.handle, whichState, opcode, limitval);
        return this;
    }
    registerUpgradeCommandEvent(whichUpgrade) {
        TriggerRegisterUpgradeCommandEvent(this.handle, whichUpgrade);
        return this;
    }
    registerVariableEvent(varName, opcode, limitval) {
        TriggerRegisterVariableEvent(this.handle, varName, opcode, limitval);
        return this;
    }
    registerBuildCommandEvent(unitId) {
        TriggerRegisterBuildCommandEventBJ(this.handle, unitId.value);
        return this;
    }
    removeAction(whichAction) {
        return TriggerRemoveAction(this.handle, whichAction);
    }
    removeActions() {
        return TriggerClearActions(this.handle);
    }
    removeCondition(whichCondition) {
        return TriggerRemoveCondition(this.handle, whichCondition);
    }
    removeConditions() {
        return TriggerClearConditions(this.handle);
    }
    reset() {
        ResetTrigger(this.handle);
    }
    triggerRegisterFrameEvent(frame, eventId) {
        BlzTriggerRegisterFrameEvent(this.handle, frame.handle, eventId);
        return this;
    }
    static fromEvent() {
        return this.fromHandle(GetTriggeringTrigger());
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
}
exports.Trigger = Trigger;
//# sourceMappingURL=trigger.js.map