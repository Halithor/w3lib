import { describe, expect, test } from "vitest";
import { Reader } from "./reader";

test("remaining returns the unconsumed length", () => {
  expect(new Reader("").remaining()).toBe(0);
  expect(new Reader("AAAA").remaining()).toBe(4);

  const subject = new Reader("AAAA");

  subject.read(2);

  expect(subject.remaining()).toBe(2);

  subject.read(4);

  expect(subject.remaining()).toBe(0);
});

describe("read", () => {
  test("reads the next bytes", () => {
    const subject = new Reader("ABCD");

    expect(subject.read(2)).toBe("AB");
    expect(subject.read(2)).toBe("CD");
  });

  test("returns short strings when reading past the end", () => {
    const subject = new Reader("ABCD");

    expect(subject.read(2)).toBe("AB");
    expect(subject.read(4)).toBe("CD");
  });
});

describe("mustRead", () => {
  test("reads the next bytes", () => {
    const subject = new Reader("ABCD");

    expect(subject.mustRead(2)).toBe("AB");
    expect(subject.mustRead(2)).toBe("CD");
  });

  test("throws when reading past the end", () => {
    const subject = new Reader("ABCD");

    expect(subject.mustRead(2)).toBe("AB");
    expect(() => subject.mustRead(4)).toThrow();
  });
});
