import { describe, expect, test } from "vitest";
import { newStore } from "./index";
import { NumberSerializer, StringSerializer } from "./serializer";

describe("newStore", () => {
	test("exposes typed getters and setters", () => {
		const store = newStore(
			"",
			["foo", 1, NumberSerializer],
			["bar", 2, StringSerializer],
		);

		expect(store.getFoo()).toBeNull();
		expect(store.getBar()).toBeNull();

		store.setFoo(42);
		store.setBar("hello");

		expect(store.getFoo()).toBe(42);
		expect(store.getBar()).toBe("hello");
	});

	test("reads values from an existing blob", () => {
		const store = newStore("\u0000\u0001\u0000\u0001A", [
			"foo",
			1,
			NumberSerializer,
		]);

		expect(store.getFoo()).toBe(65);
	});

	describe("toString", () => {
		test("round-trips", () => {
			const store = newStore("", ["foo", 1, NumberSerializer]);
			store.setFoo(100);

			const restored = newStore(store.toString(), ["foo", 1, NumberSerializer]);

			expect(restored.getFoo()).toBe(100);
		});

		test("disregards unknown fields", () => {
			const store = newStore("", ["foo", 1, NumberSerializer]);
			store.setFoo(65);

			const other = newStore(store.toString(), ["bar", 2, StringSerializer]);
			other.setBar("ABC");

			expect(other.toString()).toBe("\u0000\u0001\u0000\u0001A\u0000\u0002\u0000\u0003ABC");
		});
	});
});
