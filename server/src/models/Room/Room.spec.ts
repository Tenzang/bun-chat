import { describe, it, expect } from "bun:test";
import Room from ".";

describe("Room", () => {
	it("exists", () => {
		const room = new Room();
		expect(room).not.toBeNull();
	});

	it("contains messages", () => {
		const room = new Room();
		expect(room.messages).toBeDefined();
	});
});
