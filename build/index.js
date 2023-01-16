"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsGlobals = void 0;
__exportStar(require("./handles/index"), exports);
__exportStar(require("./hooks/index"), exports);
__exportStar(require("./system/index"), exports);
__exportStar(require("./math/index"), exports);
__exportStar(require("./events/index"), exports);
const tsGlobals = require("./globals/index");
exports.tsGlobals = tsGlobals;
__exportStar(require("./common"), exports);
__exportStar(require("./helper/index"), exports);
__exportStar(require("./dummy"), exports);
__exportStar(require("./basics"), exports);
//# sourceMappingURL=index.js.map