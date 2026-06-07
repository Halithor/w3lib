import { describe, expect, test } from "vitest";
import { NumberSerializer } from "./number";
import { StringSerializer } from "./string";
import { unionSerializer } from "./union";

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
