"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMissTextTag = exports.createManaGainTextTag = exports.createManaBurnTextTag = exports.createLumberBountyTextTag = exports.createGoldBountyTextTag = exports.createCriticalStrikeTextTag = exports.standardTextTag = exports.standardTextTagForPlayer = exports.TextTag = void 0;
const index_1 = require("../helper/index");
const index_2 = require("../math/index");
const handle_1 = require("./handle");
const unit_1 = require("./unit");
class TextTag extends handle_1.Handle {
    constructor(message, pos, size, color) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            super(CreateTextTag());
        }
        this._size = size * 0.0023;
        this._text = message;
        SetTextTagText(this.handle, this._text, this._size);
        SetTextTagPos(this.handle, pos.x, pos.y, pos.z);
        SetTextTagColor(this.handle, color.red, color.green, color.blue, color.alpha);
    }
    set age(value) {
        SetTextTagAge(this.handle, value);
    }
    set color(value) {
        SetTextTagColor(this.handle, value.red, value.green, value.blue, value.alpha);
    }
    set fadepoint(value) {
        SetTextTagFadepoint(this.handle, value);
    }
    set lifespan(value) {
        SetTextTagLifespan(this.handle, value);
    }
    set permanent(value) {
        SetTextTagPermanent(this.handle, value);
    }
    set pos(pos) {
        SetTextTagPos(this.handle, pos.x, pos.y, pos.z);
    }
    set size(value) {
        this._size = value * 0.0023;
        SetTextTagText(this.handle, this._text, this._size);
    }
    set suspended(value) {
        SetTextTagSuspended(this.handle, value);
    }
    set text(message) {
        this._text = message;
        SetTextTagText(this.handle, message, this._size);
    }
    get text() {
        return this._text;
    }
    set velocity(value) {
        SetTextTagVelocity(this.handle, value.x, value.y);
    }
    set visible(value) {
        SetTextTagVisibility(this.handle, value);
    }
    // setVisibleForPlayer makes this text tag visible only for the given player.
    // Use the visible setter for all players.
    setVisibleForPlayer(p, value) {
        if (p.isLocalPlayer) {
            SetTextTagVisibility(this.handle, value);
        }
    }
    destroy() {
        DestroyTextTag(this.handle);
    }
}
exports.TextTag = TextTag;
const fontSize = 10.434;
const offset = index_2.vec2(16, 0);
function standardTextTagForPlayer(pos, text, player) {
    const tt = new TextTag(text, pos.withZ(0), fontSize, index_1.color(255, 255, 255));
    tt.fadepoint = 2.0;
    tt.lifespan = 3.0;
    tt.velocity = index_2.vec2(0, 0.03);
    tt.permanent = false;
    tt.setVisibleForPlayer(player, true);
    return tt;
}
exports.standardTextTagForPlayer = standardTextTagForPlayer;
function standardTextTag(pos, text) {
    const tt = new TextTag(text, pos.withZ(0), fontSize, index_1.color(255, 255, 255));
    tt.fadepoint = 2.0;
    tt.lifespan = 3.0;
    tt.velocity = index_2.vec2(0, 0.03);
    tt.permanent = false;
    tt.visible = true;
    return tt;
}
exports.standardTextTag = standardTextTag;
function createCriticalStrikeTextTag(u, damage) {
    const msg = Math.round(damage).toString() + '!';
    const tt = standardTextTag(u.pos, msg);
    tt.color = index_1.color(255, 0, 0);
    tt.velocity = index_2.vec2(0, 0.04);
    tt.lifespan = 5.0;
    return tt;
}
exports.createCriticalStrikeTextTag = createCriticalStrikeTextTag;
function createGoldBountyTextTag(pos, bounty, receiver) {
    const msg = '+' + bounty.toString();
    const offsetPos = pos.sub(offset);
    const tt = standardTextTag(offsetPos, msg);
    tt.color = index_1.color(255, 220, 0);
    if (receiver != undefined) {
        tt.visible = false;
        tt.setVisibleForPlayer(receiver, true);
    }
    return tt;
}
exports.createGoldBountyTextTag = createGoldBountyTextTag;
function createLumberBountyTextTag(pos, bounty, receiver) {
    const msg = '+' + bounty.toString();
    const offsetPos = pos.sub(offset);
    const tt = standardTextTag(offsetPos, msg);
    tt.color = index_1.color(0, 200, 80);
    if (receiver != undefined) {
        tt.visible = false;
        tt.setVisibleForPlayer(receiver, true);
    }
    return tt;
}
exports.createLumberBountyTextTag = createLumberBountyTextTag;
function createManaBurnTextTag(pos, damage) {
    const msg = '-' + damage.toString();
    const offsetPos = pos.sub(offset);
    const tt = standardTextTag(offsetPos, msg);
    tt.color = index_1.color(82, 82, 255);
    tt.velocity = index_2.vec2(0, 0.04);
    tt.lifespan = 5;
}
exports.createManaBurnTextTag = createManaBurnTextTag;
function createManaGainTextTag(pos, damage) {
    const msg = '+' + damage.toString();
    const offsetPos = pos.sub(offset);
    const tt = standardTextTag(offsetPos, msg);
    tt.color = index_1.color(82, 82, 255);
    tt.velocity = index_2.vec2(0, 0.04);
    tt.lifespan = 5;
}
exports.createManaGainTextTag = createManaGainTextTag;
function createMissTextTag(origin) {
    let pos;
    if (origin instanceof unit_1.Unit) {
        pos = origin.pos;
    }
    else {
        pos = origin;
    }
    const tt = standardTextTag(pos, 'miss');
    tt.color = index_1.color(255, 0, 0);
    tt.fadepoint = 1;
    return tt;
}
exports.createMissTextTag = createMissTextTag;
//# sourceMappingURL=texttag.js.map