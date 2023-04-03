import { describe, it, expect } from "bun:test";
import Message from ".";

import { mockMessage } from "./mocks";

describe("Message", () => {
	const { author, content } = mockMessage;
	it("exists", () => {
		const message = new Message(author, content);

		expect(message).not.toBeNull();
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
