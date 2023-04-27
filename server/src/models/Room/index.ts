import IdHandler from "../IdHandler";
import Message from "../Message";
import User from "../User";

export default class Room {
	static #idHandler = new IdHandler();

	id: string;
	name: string;
	messages: Message[] = [];
	users: User[] = [];

	constructor(name?: string) {
		this.id = Room.#idHandler.generateId();
		this.name = name || `Room #${this.id}`;
	}

	addMessage(message: Message) {
		this.messages.push(message);
	}

	addUser(user: User) {
		this.users.push(user);
	}

	removeUser(wsID: string) {
		const userIndex = this.users.findIndex((user) => user.ws.data.id === wsID);
		if (userIndex === -1) throw Error("room does not contain user: " + wsID);
		this.users.splice(userIndex, 1);
	}
}
