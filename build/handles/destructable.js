"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomDestructableInRange = exports.killDestructablesInCircle = exports.forDestructablesInCircle = exports.forDestructablesInRect = exports.Destructable = void 0;
const rect_1 = require("./rect");
const common_1 = require("../common");
const index_1 = require("../math/index");
const handle_1 = require("./handle");
const widget_1 = require("./widget");
class Destructable extends widget_1.Widget {
    constructor(destId, pos, face, scale, varation) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateDestructableZ(destId.value, pos.x, pos.y, pos.z, face.degrees, scale, varation));
        }
    }
    set invulnerable(flag) {
        SetDestructableInvulnerable(this.handle, flag);
    }
    get invulnerable() {
        return IsDestructableInvulnerable(this.handle);
    }
    get life() {
        return GetDestructableLife(this.handle);
    }
    set life(value) {
        SetDestructableLife(this.handle, value);
    }
    get maxLife() {
        return GetDestructableMaxLife(this.handle);
    }
    set maxLife(value) {
        SetDestructableMaxLife(this.handle, value);
    }
    get name() {
        return GetDestructableName(this.handle);
    }
    get occluderHeight() {
        return GetDestructableOccluderHeight(this.handle);
    }
    set occluderHeight(value) {
        SetDestructableOccluderHeight(this.handle, value);
    }
    get typeId() {
        return common_1.DestId.of(GetDestructableTypeId(this.handle));
    }
    get pos() {
        return index_1.vec2(GetDestructableX(this.handle), GetDestructableY(this.handle));
    }
    destroy() {
        RemoveDestructable(this.handle);
    }
    heal(life, showBirth) {
        DestructableRestoreLife(this.handle, life, showBirth);
    }
    kill() {
        KillDestructable(this.handle);
    }
    queueAnim(whichAnimation) {
        QueueDestructableAnimation(this.handle, whichAnimation);
    }
    setAnim(whichAnimation) {
        SetDestructableAnimation(this.handle, whichAnimation);
    }
    setAnimSpeed(speedFactor) {
        SetDestructableAnimationSpeed(this.handle, speedFactor);
    }
    show(flag) {
        ShowDestructable(this.handle, flag);
    }
    gateOpen() {
        if (this.life > 0) {
            this.kill();
        }
        this.setAnim('death alternate');
    }
    gateClose() {
        if (this.life <= 0) {
            this.heal(this.maxLife, true);
        }
    }
    gateDestroy() {
        if (this.life > 0) {
            this.kill();
        }
        this.setAnim('death');
    }
    static fromEvent() {
        return this.fromHandle(GetTriggerDestructable());
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
}
exports.Destructable = Destructable;
function forDestructablesInRect(rect, callback) {
    EnumDestructablesInRectAll(rect.handle, () => {
        callback(Destructable.fromHandle(GetEnumDestructable()));
    });
}
exports.forDestructablesInRect = forDestructablesInRect;
// forDestructablesInCircle iterates over all destructables in a circle and
// calls the callback upon them.
function forDestructablesInCircle(pos, radius, callback) {
    // add buffer for AoE
    const adjustedRadius = radius + 65;
    const r = new rect_1.Rectangle(pos.sub(index_1.vec2(adjustedRadius, adjustedRadius)), pos.add(index_1.vec2(adjustedRadius, adjustedRadius)));
    const radiusSq = radius * radius;
    forDestructablesInRect(r, (d) => {
        const dPos = new index_1.Vec2(d.x, d.y);
        if (dPos.distanceToSq(pos) < radiusSq) {
            callback(d);
        }
    });
    r.destroy();
}
exports.forDestructablesInCircle = forDestructablesInCircle;
// killDestructablesInCircle kills all destructables, optionally calling the
// passed callback after each kill. Does not remove pathing blockers.
function killDestructablesInCircle(pos, radius, callback) {
    forDestructablesInCircle(pos, radius, (d) => {
        if (d.life > 1) {
            d.kill();
            if (callback) {
                callback(d);
            }
        }
    });
}
exports.killDestructablesInCircle = killDestructablesInCircle;
// getRandomDestructableInRange selects a random destructable in range that
// matches the optionally provided filter.
function getRandomDestructableInRange(pos, radius, filter) {
    let count = 0;
    let selected = undefined;
    forDestructablesInCircle(pos, radius, (d) => {
        if (!filter || filter(d)) {
            count++;
            if (GetRandomInt(1, count) == 1) {
                selected = d;
            }
        }
    });
    return selected;
}
exports.getRandomDestructableInRange = getRandomDestructableInRange;
//# sourceMappingURL=destructable.js.map