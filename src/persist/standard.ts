import { Key } from "./table";
import { asNumber, asString, minWidth } from "./helper";

export abstract class BaseKey<T> implements Key<T> {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  abstract encode(value: T): string;
  abstract decode(value: string): T;
}

export class StringKey extends BaseKey<string> {
  encode(value: string): string {
    return value;
  }

  decode(value: string): string {
    return value;
  }
}

export class NumberKey extends BaseKey<number> {
  encode(value: number): string {
    return asString(value, minWidth(value));
  }

  decode(value: string): number {
    return asNumber(value);
  }
}
