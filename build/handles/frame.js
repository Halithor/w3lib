"use strict";
/** @noSelfInFile **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frame = void 0;
const handle_1 = require("./handle");
class Frame extends handle_1.Handle {
    constructor(name, owner, priority, createContext) {
        if (handle_1.Handle.initFromHandle()) {
            super();
        }
        else {
            if (!createContext) {
                super(BlzCreateSimpleFrame(name, owner.handle, priority));
            }
            else {
                super(BlzCreateFrame(name, owner.handle, priority, createContext));
            }
        }
    }
    set alpha(alpha) {
        BlzFrameSetAlpha(this.handle, alpha);
    }
    get alpha() {
        return BlzFrameGetAlpha(this.handle);
    }
    get children() {
        const count = this.childrenCount;
        const output = [];
        for (let i = 0; i < count; i++) {
            output.push(this.getChild(i));
        }
        return output;
    }
    get childrenCount() {
        return BlzFrameGetChildrenCount(this.handle);
    }
    set enabled(flag) {
        BlzFrameSetEnable(this.handle, flag);
    }
    get enabled() {
        return BlzFrameGetEnable(this.handle);
    }
    set height(height) {
        BlzFrameSetSize(this.handle, this.width, height);
    }
    get height() {
        return BlzFrameGetHeight(this.handle);
    }
    set parent(parent) {
        BlzFrameSetParent(this.handle, parent.handle);
    }
    get parent() {
        return Frame.fromHandle(BlzFrameGetParent(this.handle));
    }
    set text(text) {
        BlzFrameSetText(this.handle, text);
    }
    get text() {
        return BlzFrameGetText(this.handle);
    }
    set textSizeLimit(size) {
        BlzFrameSetTextSizeLimit(this.handle, size);
    }
    get textSizeLimit() {
        return BlzFrameGetTextSizeLimit(this.handle);
    }
    set value(value) {
        BlzFrameSetValue(this.handle, value);
    }
    get value() {
        return BlzFrameGetValue(this.handle);
    }
    set visible(flag) {
        BlzFrameSetVisible(this.handle, flag);
    }
    get visible() {
        return BlzFrameIsVisible(this.handle);
    }
    set width(width) {
        BlzFrameSetSize(this.handle, width, this.height);
    }
    get width() {
        return BlzFrameGetWidth(this.handle);
    }
    addText(text) {
        BlzFrameAddText(this.handle, text);
        return this;
    }
    cageMouse(enable) {
        BlzFrameCageMouse(this.handle, enable);
        return this;
    }
    clearPoints() {
        BlzFrameClearAllPoints(this.handle);
        return this;
    }
    click() {
        BlzFrameClick(this.handle);
        return this;
    }
    destroy() {
        BlzDestroyFrame(this.handle);
        return this;
    }
    getChild(index) {
        return Frame.fromHandle(BlzFrameGetChild(this.handle, index));
    }
    setAbsPoint(point, x, y) {
        BlzFrameSetAbsPoint(this.handle, point, x, y);
        return this;
    }
    setAllPoints(relative) {
        BlzFrameSetAllPoints(this.handle, relative.handle);
        return this;
    }
    setAlpha(alpha) {
        BlzFrameSetAlpha(this.handle, alpha);
        return this;
    }
    setEnabled(flag) {
        BlzFrameSetEnable(this.handle, flag);
        return this;
    }
    setFocus(flag) {
        BlzFrameSetFocus(this.handle, flag);
        return this;
    }
    setFont(filename, height, flags) {
        BlzFrameSetFont(this.handle, filename, height, flags);
        return this;
    }
    setHeight(height) {
        BlzFrameSetSize(this.handle, this.width, height);
        return this;
    }
    setLevel(level) {
        BlzFrameSetLevel(this.handle, level);
        return this;
    }
    setMinMaxValue(minValue, maxValue) {
        BlzFrameSetMinMaxValue(this.handle, minValue, maxValue);
        return this;
    }
    setModel(modelFile, cameraIndex) {
        BlzFrameSetModel(this.handle, modelFile, cameraIndex);
        return this;
    }
    setParent(parent) {
        BlzFrameSetParent(this.handle, parent.handle);
        return this;
    }
    setPoint(point, relative, relativePoint, x, y) {
        BlzFrameSetPoint(this.handle, point, relative.handle, relativePoint, x, y);
        return this;
    }
    setScale(scale) {
        BlzFrameSetScale(this.handle, scale);
        return this;
    }
    setSize(width, height) {
        BlzFrameSetSize(this.handle, width, height);
        return this;
    }
    setSpriteAnimate(primaryProp, flags) {
        BlzFrameSetSpriteAnimate(this.handle, primaryProp, flags);
        return this;
    }
    setStepSize(stepSize) {
        BlzFrameSetStepSize(this.handle, stepSize);
        return this;
    }
    setText(text) {
        BlzFrameSetText(this.handle, text);
        return this;
    }
    setTextColor(color) {
        BlzFrameSetTextColor(this.handle, color);
        return this;
    }
    setTextSizeLimit(size) {
        BlzFrameSetTextSizeLimit(this.handle, size);
        return this;
    }
    setTexture(texFile, flag, blend) {
        BlzFrameSetTexture(this.handle, texFile, flag, blend);
        return this;
    }
    setTooltip(tooltip) {
        BlzFrameSetTooltip(this.handle, tooltip.handle);
        return this;
    }
    setValue(value) {
        BlzFrameSetValue(this.handle, value);
        return this;
    }
    setVertexColor(color) {
        BlzFrameSetVertexColor(this.handle, color);
        return this;
    }
    setVisible(flag) {
        BlzFrameSetVisible(this.handle, flag);
        return this;
    }
    setWidth(width) {
        BlzFrameSetSize(this.handle, width, this.height);
        return this;
    }
    static autoPosition(enable) {
        BlzEnableUIAutoPosition(enable);
    }
    static fromEvent() {
        return this.fromHandle(BlzGetTriggerFrame());
    }
    static fromHandle(handle) {
        return this.getObject(handle);
    }
    static fromName(name, createContext) {
        return this.fromHandle(BlzGetFrameByName(name, createContext));
    }
    static fromOrigin(frameType, index) {
        return this.fromHandle(BlzGetOriginFrame(frameType, index));
    }
    static getEventHandle() {
        return BlzGetTriggerFrameEvent();
    }
    static getEventText() {
        return BlzGetTriggerFrameValue();
    }
    static getEventValue() {
        return BlzGetTriggerFrameValue();
    }
    static hideOrigin(enable) {
        BlzHideOriginFrames(enable);
    }
    static loadTOC(filename) {
        return BlzLoadTOCFile(filename);
    }
}
exports.Frame = Frame;
//# sourceMappingURL=frame.js.map