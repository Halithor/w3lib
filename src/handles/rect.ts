/** @noSelfInFile **/

import { vec2, Vec2 } from "../math/index";
import { Handle } from "./handle";

export class Rectangle extends Handle<rect> {
  constructor(min: Vec2, max: Vec2) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(Rect(min.x, min.y, max.x, max.y));
    }
  }

  public get centerX() {
    return GetRectCenterX(this.handle);
  }

  public get centerY() {
    return GetRectCenterY(this.handle);
  }

  public get center(): Vec2 {
    return vec2(this.centerX, this.centerY);
  }

  public get maxX() {
    return GetRectMaxX(this.handle);
  }

  public get maxY() {
    return GetRectMaxY(this.handle);
  }

  public get minX() {
    return GetRectMinX(this.handle);
  }

  public get minY() {
    return GetRectMinY(this.handle);
  }

  public get min() {
    return vec2(this.minX, this.minY);
  }

  public get max() {
    return vec2(this.maxX, this.maxY);
  }

  public destroy() {
    RemoveRect(this.handle);
  }

  public contains(pos: Vec2) {
    return RectContainsCoords(this.handle, pos.x, pos.y);
  }

  public enumDestructables(
    filter: boolexpr | undefined,
    actionFunc: () => void,
  ) {
    EnumDestructablesInRect(this.handle, filter, actionFunc);
  }

  public enumItems(filter: boolexpr | undefined, actionFunc: () => void) {
    EnumItemsInRect(this.handle, filter, actionFunc);
  }

  public move(newCenter: Vec2) {
    MoveRectTo(this.handle, newCenter.x, newCenter.y);
  }

  public setRect(min: Vec2, max: Vec2) {
    SetRect(this.handle, min.x, min.y, max.x, max.y);
  }

  public randomPos() {
    const x = math.random(this.minX, this.maxX);
    const y = math.random(this.minY, this.maxY);
    return vec2(x, y);
  }

  public static fromHandle(handle: rect): Rectangle {
    return this.getObject(handle) as Rectangle;
  }

  // Returns full map bounds, including unplayable borders, in world coordinates
  public static getWorldBounds() {
    return Rectangle.fromHandle(GetWorldBounds()!);
  }

  public static getPlayableArea() {
    return Rectangle.fromHandle(GetPlayableMapRect()!);
  }
}
