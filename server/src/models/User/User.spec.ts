import { describe, it, expect, beforeEach } from "bun:test";
import User from ".";

describe("User", () => {
	let user: User;

	beforeEach(() => {
		user = new User();
	});

	it("exists", () => {
		expect(user).not.toBeNull();
	});

	it("has unique id", () => {
		expect(user.id).toBeDefined();

		const user2 = new User();
		expect(user.id).not.toEqual(user2.id);
	});

	it("has random name", () => {
		expect(user.name).toBeDefined();

		const user2 = new User();
		expect(user.name).not.toBe(user2.name);
	});
});
