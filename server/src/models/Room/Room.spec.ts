import { describe, it, expect, beforeEach } from "bun:test";
import Room from ".";
import Message from "../Message";
import User from "../User";
import { mockMessage } from "../mocks";
import { WSType } from "../types";

const nameStub = "test room";

describe("Room", () => {
	const mockWS = { data: { id: "mockID" } } as unknown as WSType;
	let room: Room;

	beforeEach(() => {
		room = new Room(nameStub);
	});

	it("exists", () => {
		expect(room).not.toBeNull();
	});

	it("has unique id", () => {
		expect(room.id).toBeDefined();

		const room2 = new Room(nameStub);
		expect(room.id).not.toEqual(room2.id);
	});

	it("contains Messages", () => {
		expect(room.messages).toBeDefined();
	});

	describe("name field", () => {
		it("is assigned by constructor", () => {
			expect(room.name).toEqual(nameStub);
		});

		it('defaults to "Room #[roomId]"', () => {
			const namelessRoom = new Room();
			expect(namelessRoom.name).toBe(`Room #${namelessRoom.id}`);
		});
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

	describe(".addUser()", () => {
		it("adds User to Room", () => {
			const user = new User(mockWS);

			expect(room.users).not.toContain(user);
			room.addUser(user);
			expect(room.users).toContain(user);
		});
	});

	describe(".removeUser()", () => {
		it("removes User from Room", () => {
			const user = new User(mockWS);
			room.addUser(user);
			room.removeUser(user.ws.data.id);
			expect(room.users).not.toContain(user);
		});

		it("throws error if Room does not contain User", () => {
			const user = new User(mockWS);

			expect(() => {
				room.removeUser(user.ws.data.id);
			}).toThrow();
		});
	});
});
