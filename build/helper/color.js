"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerColorNames = exports.playerColors = exports.color = exports.Color = void 0;
class Color {
    // alpha defaults to 255, fully opaque, if ommitted.
    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        if (alpha) {
            this.alpha = alpha;
        }
        else {
            this.alpha = 255;
        }
    }
    get code() {
        return `|c${toHex(this.alpha)}${toHex(this.red)}${toHex(this.green)}${toHex(this.blue)}`;
    }
}
exports.Color = Color;
function toHex(num) {
    let hex = num.toString(16);
    if (hex.length < 2) {
        hex = '0' + hex;
    }
    return hex;
}
const color = (red, green, blue, alpha) => new Color(red, green, blue, alpha);
exports.color = color;
// playerColors is the player colors sorted by index. Does not include
// neutrals colors.
exports.playerColors = [
    exports.color(255, 2, 2),
    exports.color(0, 65, 255),
    exports.color(27, 229, 184),
    exports.color(83, 0, 128),
    exports.color(255, 252, 0),
    exports.color(254, 137, 13),
    exports.color(31, 191, 0),
    exports.color(228, 90, 175),
    exports.color(148, 149, 150),
    exports.color(125, 190, 241),
    exports.color(15, 97, 69),
    exports.color(77, 41, 3),
    exports.color(155, 0, 0),
    exports.color(0, 0, 195),
    exports.color(0, 234, 255),
    exports.color(190, 0, 254),
    exports.color(235, 205, 135),
    exports.color(248, 164, 139),
    exports.color(191, 255, 128),
    exports.color(220, 185, 235),
    exports.color(40, 40, 40),
    exports.color(235, 240, 255),
    exports.color(0, 120, 30),
    exports.color(164, 111, 51),
];
// playerColorNames is the names of players colors sorted by player index.
exports.playerColorNames = [
    'red',
    'blue',
    'teal',
    'purple',
    'yellow',
    'orange',
    'green',
    'pink',
    'gray',
    'light blue',
    'dark green',
    'brown',
    'maroon',
    'navy',
    'turquoise',
    'violet',
    'wheat',
    'peach',
    'mint',
    'lavender',
    'coal',
    'snow',
    'emerald',
    'peanut',
];
//# sourceMappingURL=color.js.map