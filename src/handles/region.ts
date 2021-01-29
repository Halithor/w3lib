/** @noSelfInFile **/

import {Vec2} from '../math/index';
import {Handle} from './handle';
import {Rectangle} from './rect';
import {Unit} from './unit';

export class Region extends Handle<region> {
  constructor() {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateRegion());
    }
  }

  public addCell(pos: Vec2) {
    RegionAddCell(this.handle, pos.x, pos.y);
  }

  public addRect(r: Rectangle) {
    RegionAddRect(this.handle, r.handle);
  }

  public clearCell(pos: Vec2) {
    RegionClearCell(this.handle, pos.x, pos.y);
  }

  public clearRect(r: Rectangle) {
    RegionClearRect(this.handle, r.handle);
  }

  public containsCoords(pos: Vec2) {
    return IsPointInRegion(this.handle, pos.x, pos.y);
  }

  public containsUnit(whichUnit: Unit) {
    return IsUnitInRegion(this.handle, whichUnit.handle);
  }

  public destroy() {
    RemoveRegion(this.handle);
  }

  public static fromHandle(handle: region): Region {
    return this.getObject(handle);
  }

  public static fromRect(rect: rect): Region {
    const reg = new Region();
    reg.addRect(Rectangle.fromHandle(rect));
    return reg;
  }
}
