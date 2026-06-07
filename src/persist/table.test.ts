import { describe, expect, test } from "vitest";
import { Table } from "./table";
import { NumberKey } from "./standard";

describe("get", () => {
  test("returns the decoded value", () => {
    const subject = new Table(
      "\u0000\u0001\u0000\u0001A" + "\u0000\u0002\u0000\u0001B",
    );

    expect(subject.get(new NumberKey(1))).toBe(65);
    expect(subject.get(new NumberKey(2))).toBe(66);
  });

  test("returns null when no value is present", () => {
    const subject = new Table("\u0000\u0001\u0000\u0001A");

    expect(subject.get(new NumberKey(2))).toBeNull();
  });
});

describe("set", () => {
  test("updates the value when already present", () => {
    const key = new NumberKey(1);

    const subject = new Table("\u0000\u0001\u0000\u0001A");

    expect(subject.get(key)).not.toBeNull();

    subject.set(key, 100);

    expect(subject.get(key)).toBe(100);
  });

  test("adds the key when missing", () => {
    const key = new NumberKey(2);

    const subject = new Table("\u0000\u0001\u0000\u0001A");

    expect(subject.get(key)).toBeNull();

    subject.set(key, 100);

    expect(subject.get(key)).toBe(100);
  });
});

test("toString returns the encoded entries", () => {
  const encoded = "\u0000\u0001\u0000\u0001A" + "\u0000\u0002\u0000\u0001B";

  const subject = new Table(encoded);

  expect(subject.toString()).toBe(encoded);
});
