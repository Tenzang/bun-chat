import { describe, it, expect, beforeEach } from "bun:test";
import Room from ".";
import Message from "../Message";
import { mockMessage } from "../mocks";

describe("Room", () => {
	let room: Room;

	beforeEach(() => {
		room = new Room();
	});

	it("exists", () => {
		expect(room).not.toBeNull();
	});

	it("has unique id", () => {
		expect(room.id).toBeDefined();

		const room2 = new Room();
		expect(room.id).not.toEqual(room2.id);
	});

	it("contains Messages", () => {
		expect(room.messages).toBeDefined();
	});

	describe(".addMessage()", () => {
		const { author, content } = mockMessage;

		it("adds a Message to rooms messages", () => {
			const message = new Message(author, content);

			room.addMessage(message);

			expect(room.messages).toContain(message);
		});
	});

	it("contains Users", () => {
		expect(room.users).toBeDefined();
	});
});
