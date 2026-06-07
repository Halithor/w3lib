import { Serializer } from "./index";

export const StringSerializer: Serializer<string> = {
  accepts(value: unknown) {
    return typeof value === "string";
  },

  encode(value: string): string {
    return value;
  },

  decode(value: string): string {
    return value;
  },
};
