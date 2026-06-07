import { describe, expect, test } from "vitest";
import { asNumber, asString } from "./helper";

test("asNumber interprets the bytes of a string as numbers", () => {
  expect(asNumber("A")).toBe(65);
  expect(asNumber("AA")).toBe(16_705);
  expect(asNumber("AAA")).toBe(4_276_545);
});

describe("asString", () => {
  test("interprets a number as a string of bytes", () => {
    expect(asString(65, 1)).toBe("A");
    expect(asString(16_705, 2)).toBe("AA");
    expect(asString(4_276_545, 3)).toBe("AAA");
  });

  test("pads with zeroes", () => {
    expect(asString(65, 4)).toBe("\u0000\u0000\u0000A");
  });

  test("throws when the value is too large", () => {
    expect(() => asString(4_276_545, 1)).toThrow();
  });
});

test("asNumber round-trips with asString", () => {
  expect(asNumber(asString(1, 4))).toBe(1);
});
