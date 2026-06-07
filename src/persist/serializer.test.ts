import { describe, expect, test } from "vitest";
import {
  NumberSerializer,
  StringSerializer,
  unionSerializer,
} from "./serializer";

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

describe("UnionSerializer", () => {
  const subject = unionSerializer([NumberSerializer, StringSerializer]);

  test("accepts any type in the union, rejects others", () => {
    expect(subject.accepts("ABC")).toBe(true);
    expect(subject.accepts(123)).toBe(true);

    expect(subject.accepts(null)).toBe(false);
    expect(subject.accepts(undefined)).toBe(false);
    expect(subject.accepts(true)).toBe(false);
  });

  describe("encode", () => {
    test("uses the first valid serializer", () => {
      expect(subject.encode("ABC")).toBe("ABC");
      expect(subject.encode(1)).toBe("\u0001");
    });

    test("throws on invalid values", () => {
      expect(() => subject.encode(null as never)).toThrow();
    });
  });

  describe("decode", () => {
    test("uses the first valid serializer", () => {
      expect(subject.decode("\u0004")).toBe(4);
    });
  });
});
