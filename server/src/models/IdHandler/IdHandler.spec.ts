import { describe, it, expect, beforeEach } from "bun:test";
import IdHandler from ".";

describe("ID class", () => {
	let idHandler: IdHandler;

	beforeEach(() => {
		idHandler = new IdHandler();
	});

	it("exists", () => {
		expect(idHandler).toBeDefined();
	});

	it("has prevId", () => {
		expect(idHandler.prevId).toBeDefined();
	});

	describe(".generateId()", () => {
		it("generates unique ID's", () => {
			const id1 = idHandler.generateId();
			const id2 = idHandler.generateId();
			expect(id1).not.toEqual(id2);
		});
	});
});
