import { describe, expect, test } from "vitest";
import { NumberSerializer, StringSerializer } from "./serializer";

describe("StringSerializer", () => {
  test("encode returns the value", () => {
    const value = "ABCD";

    expect(StringSerializer.encode(value)).toBe(value);
  });

  test("decode returns the value", () => {
    const value = "ABCD";

    expect(StringSerializer.decode(value)).toBe(value);
  });
});

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
