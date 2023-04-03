import { describe, it, expect, beforeEach } from "bun:test";
import Message from ".";

import { mockMessage } from "../mocks";

describe("Message", () => {
	const { author, content } = mockMessage;
	let message: Message;

	beforeEach(() => {
		message = new Message(author, content);
	});

	it("exists", () => {
		expect(message).not.toBeNull();
	});

	it("has unique id", () => {
		expect(message.id).toBeDefined();

		const message2 = new Message(author, content);
		expect(message.id).not.toEqual(message2.id);
	});

	it("has author", () => {
		const message = new Message(author, content);
		expect(message.author).toBe(author);
	});

	it("has content", () => {
		const message = new Message(author, content);
		expect(message.content).toBe(content);
	});
});
