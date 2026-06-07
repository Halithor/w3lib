import { describe, expect, test } from "vitest";
import { decode, encode } from "./buffer";

describe("encode", () => {
  test("converts an empty array to an empty string", () => {
    expect(encode([])).toBe("");
  });

  test("converts a list of entries", () => {
    expect(
      encode([
        {
          key: 1,
          value: "A",
        },
        {
          key: 2,
          value: "B",
        },
      ]),
    ).toBe("\u0000\u0001\u0000\u0001A" + "\u0000\u0002\u0000\u0001B");
  });
});

describe("decode", () => {
  test("converts an empty string to an empty array", () => {
    expect(decode("")).toStrictEqual([]);
  });

  test("converts an empty string to an empty array", () => {
    expect(
      decode("\u0000\u0001\u0000\u0001A" + "\u0000\u0002\u0000\u0001B"),
    ).toStrictEqual([
      {
        key: 1,
        value: "A",
      },
      {
        key: 2,
        value: "B",
      },
    ]);
  });
});
