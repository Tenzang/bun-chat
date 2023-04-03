import { describe, it, expect, beforeEach } from "bun:test";
import User from ".";
import { WSType } from "../types";

describe("User", () => {
	const mockURL = "ws://localhost:3000/ws";
	const mockWS = "mockWS" as unknown as WSType; // TODO: replace with proper ws mock
	let user: User;

	beforeEach(() => {
		user = new User(mockWS);
	});

	it("exists", () => {
		expect(user).not.toBeNull();
	});

	it("has random name", () => {
		expect(user.name).toBeDefined();

		const user2 = new User(mockWS);
		expect(user.name).not.toBe(user2.name);
	});

	it("has a web socket instance", () => {
		expect(user.ws).toBeDefined();
	});
});
