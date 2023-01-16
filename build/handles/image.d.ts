/** @noSelfInFile **/
/// <reference types="war3-types/core/common" />
import { Handle } from './handle';
export declare enum ImageType {
    Selection = 1,
    Indicator = 2,
    OcclusionMask = 3,
    Ubersplat = 4
}
export declare class Image extends Handle<image> {
    constructor(file: string, sizeX: number, sizeY: number, sizeZ: number, posX: number, posY: number, posZ: number, originX: number, originY: number, originZ: number, imageType: ImageType);
    destroy(): void;
    setAboveWater(flag: boolean, useWaterAlpha: boolean): void;
    setColor(red: number, green: number, blue: number, alpha: number): void;
    setConstantHeight(flag: boolean, height: number): void;
    setPosition(x: number, y: number, z: number): void;
    setRender(flag: boolean): void;
    setType(imageType: ImageType): void;
    show(flag: boolean): void;
    static fromHandle(handle: image): Image;
}
