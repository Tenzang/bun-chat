import { describe, it, expect } from "bun:test";
import Room from ".";
import Message from "../Message";
import { mockMessage } from "../Message/mocks";

describe("Room", () => {
	it("exists", () => {
		const room = new Room();
		expect(room).not.toBeNull();
	});

	it("contains messages", () => {
		const room = new Room();
		expect(room.messages).toBeDefined();
	});

	describe(".addMessage()", () => {
		const { author, content } = mockMessage;

		it("adds a message to rooms messages", () => {
			const message = new Message(author, content);

			const room = new Room();
			room.addMessage(message);

			expect(room.messages).toContain(message);
		});
	});
});
