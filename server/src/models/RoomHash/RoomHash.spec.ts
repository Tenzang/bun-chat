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

	describe(".rooms()", () => {
		it("returns array of rooms in hash", () => {
			const room = new Room();
			roomHash.add(room);

			const rooms = roomHash.rooms();

			expect(rooms).toContain(room);
		});
	});

	describe(".get()", () => {
		it("retrieves room from hash by id", () => {
			const room1 = new Room();
			roomHash.add(room1);
			const room2 = new Room();
			roomHash.add(room2);

			expect(roomHash.get(room1.id)).toBe(room1);
			expect(roomHash.get(room2.id)).toBe(room2);
		});

		it("throws error if room not found", () => {
			expect(() => {
				roomHash.get(0);
			}).toThrow();
		});
	});
});
