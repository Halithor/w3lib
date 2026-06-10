import { describe, expect, test } from "vitest";
import { base64Encode } from "./base64";

describe("base64Encode", () => {
  test("encodes values", () => {
    expect(base64Encode("")).toBe("");
    expect(base64Encode("ABC")).toBe("QkMA");
    expect(base64Encode("123")).toBe("MjMA");
    expect(base64Encode("AAAAAAAAAAAAAA")).toBe("QUFBQUFBQUFBQUFBQQA==");
    expect(
      base64Encode(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      ),
    ).toBe(
      "QkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPQA==",
    );
  });
});
