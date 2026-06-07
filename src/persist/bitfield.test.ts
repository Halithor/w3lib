import { describe, expect, test } from "vitest";
import { bitfield } from "./bitfield";

const flags = bitfield("active", "hidden", "locked");

describe("create", () => {
  test("defaults to all flags clear", () => {
    const f = flags.create();

    expect(f.getActive()).toBe(false);
    expect(f.getHidden()).toBe(false);
    expect(f.getLocked()).toBe(false);
    expect(f.valueOf()).toBe(0);
  });

  test("seeds from a number", () => {
    const f = flags.create(0b101);

    expect(f.getActive()).toBe(true);
    expect(f.getHidden()).toBe(false);
    expect(f.getLocked()).toBe(true);
  });
});

test("set, clear, and toggle mutate in place", () => {
  const f = flags.create();

  f.setActive();
  expect(f.getActive()).toBe(true);

  f.toggleHidden();
  expect(f.getHidden()).toBe(true);
  f.toggleHidden();
  expect(f.getHidden()).toBe(false);

  f.clearActive();
  expect(f.getActive()).toBe(false);
});

test("flags are independent", () => {
  const f = flags.create();

  f.setHidden();

  expect(f.getActive()).toBe(false);
  expect(f.getHidden()).toBe(true);
  expect(f.getLocked()).toBe(false);
  expect(f.valueOf()).toBe(0b010);
});

describe("Serializer", () => {
  test("round-trips", () => {
    const f = flags.create();
    f.setActive();
    f.setLocked();

    const decoded = flags.decode(flags.encode(f));

    expect(decoded.getActive()).toBe(true);
    expect(decoded.getHidden()).toBe(false);
    expect(decoded.getLocked()).toBe(true);
  });

  test("accepts created bitfields, rejects non-objects", () => {
    expect(flags.accepts(flags.create())).toBe(true);

    expect(flags.accepts(123)).toBe(false);
    expect(flags.accepts(null)).toBe(false);
  });
});
