import { describe, expect, test } from "vitest";
import { StringSerializer } from "./string";

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
