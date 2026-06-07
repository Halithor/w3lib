import { describe, expect, test } from "vitest";
import { NumberSerializer } from "./number";

describe("NumberSerializer", () => {
  test("encode encodes the value as the shortest possible string", () => {
    expect(NumberSerializer.encode(4)).toBe("\u0004");
    expect(NumberSerializer.encode(256)).toBe("\u0001\u0000");
  });

  test("decode parses a string as a number", () => {
    expect(NumberSerializer.decode("\u0004")).toBe(4);
    expect(NumberSerializer.decode("\u0000\u0000\u0000\u0004")).toBe(4);
  });
});
