/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
export declare class Frame extends Handle<framehandle> {
    constructor(name: string, owner: Frame, priority: number, createContext: number);
    /**
     * Creates a SimpleFrame.
     * @param name
     * @param owner
     * @param createContext
     */
    constructor(name: string, owner: Frame, createContext: number);
    set alpha(alpha: number);
    get alpha(): number;
    get children(): Frame[];
    get childrenCount(): number;
    set enabled(flag: boolean);
    get enabled(): boolean;
    set height(height: number);
    get height(): number;
    set parent(parent: Frame);
    get parent(): Frame;
    set text(text: string);
    get text(): string;
    set textSizeLimit(size: number);
    get textSizeLimit(): number;
    set value(value: number);
    get value(): number;
    set visible(flag: boolean);
    get visible(): boolean;
    set width(width: number);
    get width(): number;
    addText(text: string): this;
    cageMouse(enable: boolean): this;
    clearPoints(): this;
    click(): this;
    destroy(): this;
    getChild(index: number): Frame;
    setAbsPoint(point: framepointtype, x: number, y: number): this;
    setAllPoints(relative: Frame): this;
    setAlpha(alpha: number): this;
    setEnabled(flag: boolean): this;
    setFocus(flag: boolean): this;
    setFont(filename: string, height: number, flags: number): this;
    setHeight(height: number): this;
    setLevel(level: number): this;
    setMinMaxValue(minValue: number, maxValue: number): this;
    setModel(modelFile: string, cameraIndex: number): this;
    setParent(parent: Frame): this;
    setPoint(point: framepointtype, relative: Frame, relativePoint: framepointtype, x: number, y: number): this;
    setScale(scale: number): this;
    setSize(width: number, height: number): this;
    setSpriteAnimate(primaryProp: number, flags: number): this;
    setStepSize(stepSize: number): this;
    setText(text: string): this;
    setTextColor(color: number): this;
    setTextSizeLimit(size: number): this;
    setTexture(texFile: string, flag: number, blend: boolean): this;
    setTooltip(tooltip: Frame): this;
    setValue(value: number): this;
    setVertexColor(color: number): this;
    setVisible(flag: boolean): this;
    setWidth(width: number): this;
    static autoPosition(enable: boolean): void;
    static fromEvent(): Frame;
    static fromHandle(handle: framehandle): Frame;
    static fromName(name: string, createContext: number): Frame;
    static fromOrigin(frameType: originframetype, index: number): Frame;
    static getEventHandle(): frameeventtype;
    static getEventText(): number;
    static getEventValue(): number;
    static hideOrigin(enable: boolean): void;
    static loadTOC(filename: string): boolean;
}
