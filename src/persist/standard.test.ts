import { describe, expect, test } from "vitest";
import { NumberKey, StringKey } from "./standard";

describe("StringKey", () => {
  const subject = new StringKey(1);

  test("encode returns the value", () => {
    const value = "ABCD";

    expect(subject.encode(value)).toBe(value);
  });

  test("decode returns the value", () => {
    const value = "ABCD";

    expect(subject.decode(value)).toBe(value);
  });
});

describe("NumberKey", () => {
  const subject = new NumberKey(1);

  test("encode encodes the value as the shortest possible string", () => {
    expect(subject.encode(4)).toBe("\u0004");
    expect(subject.encode(256)).toBe("\u0001\u0000");
  });

  test("decode parses a string as a number", () => {
    expect(subject.decode("\u0004")).toBe(4);
    expect(subject.decode("\u0000\u0000\u0000\u0004")).toBe(4);
  });
});
