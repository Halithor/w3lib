import { Color } from "../helper/index";
import { Handle } from "./handle";

export class MultiboardItem extends Handle<multiboarditem> {
  constructor(multiboard: Multiboard, row: number, col: number) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(MultiboardGetItem(multiboard.handle, row, col));
    }
  }

  destroy() {
    MultiboardReleaseItem(this.handle);
  }

  set icon(val: string) {
    MultiboardSetItemIcon(this.handle, val);
  }

  set text(val: string) {
    MultiboardSetItemValue(this.handle, val);
  }

  set textColor(val: Color) {
    MultiboardSetItemValueColor(
      this.handle,
      val.red,
      val.green,
      val.blue,
      val.alpha,
    );
  }

  set width(val: number) {
    MultiboardSetItemWidth(this.handle, val);
  }

  setStyle(showText: boolean, showIcon: boolean) {
    MultiboardSetItemStyle(this.handle, showText, showIcon);
  }

  public static fromHandle(handle: multiboarditem): MultiboardItem {
    return this.getObject(handle);
  }
}

export class Multiboard extends Handle<multiboard> {
  private items: MultiboardItem[];

  constructor() {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateMultiboard());
    }

    this.items = [];
  }

  item(row: number, col: number): MultiboardItem {
    const index = row * this.cols + col;
    if (!this.items[index]) {
      this.items[index] = new MultiboardItem(this, row, col);
    }
    return this.items[index];
  }

  get cols(): number {
    return MultiboardGetColumnCount(this.handle);
  }

  set cols(val: number) {
    MultiboardSetColumnCount(this.handle, val);
    this.cleanupItems();
  }

  get rows(): number {
    return MultiboardGetRowCount(this.handle);
  }

  set rows(val: number) {
    MultiboardSetRowCount(this.handle, val);
    this.cleanupItems();
  }

  get displayed(): boolean {
    return IsMultiboardDisplayed(this.handle);
  }

  set displayed(val: boolean) {
    MultiboardDisplay(this.handle, val);
  }

  get title(): string {
    return MultiboardGetTitleText(this.handle);
  }

  set title(val: string) {
    MultiboardSetTitleText(this.handle, val);
  }

  set titleColor(val: Color) {
    MultiboardSetTitleTextColor(
      this.handle,
      val.red,
      val.green,
      val.blue,
      val.alpha,
    );
  }

  clear() {
    MultiboardClear(this.handle);
  }

  destroy() {
    this.cleanupItems();
    DestroyMultiboard(this.handle);
  }

  minimize(flag: boolean) {
    MultiboardMinimize(this.handle, flag);
  }

  minimizedForLocalPlayer(): boolean {
    return IsMultiboardMinimized(this.handle);
  }

  setAllItemsIcon(iconPath: string) {
    MultiboardSetItemsIcon(this.handle, iconPath);
  }

  setAllItemsStyle(showText: boolean, showIcons: boolean) {
    MultiboardSetItemsStyle(this.handle, showText, showIcons);
  }

  setAllItemsText(val: string) {
    MultiboardSetItemsValue(this.handle, val);
  }

  setAllItemsTextColor(val: Color) {
    MultiboardSetItemsValueColor(
      this.handle,
      val.red,
      val.green,
      val.blue,
      val.alpha,
    );
  }

  setAllItemsTextWidth(val: number) {
    MultiboardSetItemsWidth(this.handle, val);
  }

  setColWidth(col: number, width: number) {
    this.column(col).forEach((item) => (item.width = width));
  }

  /** Get all items in a column, top to bottom */
  column(col: number): MultiboardItem[] {
    const items = [];
    for (let row = 0; row < this.rows; row++) {
      items.push(this.item(row, col));
    }
    return items;
  }

  private cleanupItems() {
    this.items.forEach((mbitem) => {
      mbitem.destroy();
    });
    this.items = [];
  }

  /** Suspend the display of all existing and future multiboards. */
  public static supressDisplay(flag: boolean) {
    MultiboardSuppressDisplay(flag);
  }
}
