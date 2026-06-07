import { asNumber, asString, minWidth } from "../helper";
import { Serializer } from "./index";

export const NumberSerializer: Serializer<number> = {
  accepts(value: unknown) {
    return typeof value === "number";
  },

  encode(value: number): string {
    return asString(value, minWidth(value));
  },

  decode(value: string): number {
    return asNumber(value);
  },
};
