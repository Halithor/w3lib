import { asNumber, asString, minWidth } from "./helper";

export interface Serializer<T> {
  encode(value: T): string;
  decode(value: string): T;
}

export const StringSerializer: Serializer<string> = {
  encode(value: string): string {
    return value;
  },

  decode(value: string): string {
    return value;
  },
};

export const NumberSerializer: Serializer<number> = {
  encode(value: number): string {
    return asString(value, minWidth(value));
  },

  decode(value: string): number {
    return asNumber(value);
  },
};
