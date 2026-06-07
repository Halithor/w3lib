import { Key } from "./table";
import { asNumber, asString, minWidth } from "./helper";

export class StringKey implements Key<string> {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  encode(value: string): string {
    return value;
  }

  decode(value: string): string {
    return value;
  }
}

export class NumberKey implements Key<number> {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  encode(value: number): string {
    return asString(value, minWidth(value));
  }

  decode(value: string): number {
    return asNumber(value);
  }
}
