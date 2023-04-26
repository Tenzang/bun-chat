import { describe, it, expect, beforeEach } from "bun:test";
import RoomHash from ".";
import Room from "../Room";

describe("RoomHash", () => {
	let roomHash: RoomHash;

	beforeEach(() => {
		roomHash = new RoomHash();
	});

	describe(".add()", () => {
		it("contains a hash table", () => {
			let { hash } = roomHash;

			expect(hash).toBeDefined();
		});

		it("adds a room to the hash", () => {
			const room = new Room();
			roomHash.add(room);

			expect(room.id in roomHash.hash).toBe(true);
		});

		it('returns "this"', () => {
			const output = roomHash.add(new Room());
			expect(output).toBe(roomHash);
		});
	});
});
