"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dummy = void 0;
const basics_1 = require("./basics");
const common_1 = require("./common");
const index_1 = require("./handles/index");
const index_2 = require("./math/index");
// The UnitId of the dummy
const dummyId = common_1.unitId('dumm');
// Seconds to delay until recycling
const recycleDelay = 5;
class Dummy {
    constructor() {
        this.freed = false;
        this.unit = new index_1.Unit(index_1.MapPlayer.neutralPassive, dummyId, index_2.vec2(0, 0), index_2.degrees(0));
        this.unit.addAbility(basics_1.HEIGHT_ENABLER);
        this.unit.removeAbility(basics_1.HEIGHT_ENABLER);
    }
    static get(owner, pos) {
        const dummy = Dummy.freeDummies.length == 0 ? new Dummy() : Dummy.freeDummies.pop();
        if (!dummy)
            throw new Error('getting dummy popped nothing!');
        dummy.freed = false;
        dummy.unit.resetCooldown();
        dummy.unit.setPosition(pos);
        dummy.unit.setOwner(owner, true);
        return dummy;
    }
    release() {
        if (this.freed) {
            return;
        }
        this.freed = true;
        if (this.ability) {
            this.unit.removeAbility(this.ability);
            this.ability = undefined;
        }
        Dummy.freeDummies.push(this);
    }
    setAbility(ability, level) {
        this.unit.addAbility(ability);
        this.unit.setAbilityLevel(ability, level);
        this.ability = ability;
    }
    /**
     * Cast an instant ability at the target point for the given player.
     */
    static castImmediate(player, pos, ability, order, level = 1) {
        const dummy = Dummy.get(player, pos);
        dummy.setAbility(ability, level);
        dummy.unit.issueImmediateOrder(order);
        index_1.doAfter(recycleDelay, () => dummy.release());
    }
    static castTarget(player, pos, target, ability, order, level = 1) {
        const dummy = Dummy.get(player, pos);
        dummy.setAbility(ability, level);
        index_1.doAfter(recycleDelay, () => dummy.release);
        if (target instanceof index_2.Vec2) {
            dummy.unit.setFacingEx(pos.angleTo(target));
            return dummy.unit.issueOrderAt(order, target);
        }
        else {
            dummy.unit.setFacingEx(pos.angleTo(index_2.vec2(target.x, target.y)));
            return dummy.unit.issueTargetOrder(order, target);
        }
    }
    static castTargetChannel(player, pos, target, channelDuration, ability, order, level = 1) {
        const dummy = Dummy.get(player, pos);
        dummy.setAbility(ability, level);
        if (target instanceof index_2.Vec2) {
            dummy.unit.issueOrderAt(order, target);
        }
        else {
            dummy.unit.issueTargetOrder(order, target);
        }
        index_1.doAfter(Math.max(channelDuration, recycleDelay), () => dummy.release());
    }
}
exports.Dummy = Dummy;
Dummy.freeDummies = [];
//# sourceMappingURL=dummy.js.map