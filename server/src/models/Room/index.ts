import IdHandler from "../IdHandler";
import Message from "../Message";
import User from "../User";

export default class Room {
	static #idHandler = new IdHandler();

	id: number;
	messages: Message[] = [];
	users: User[] = [];

	constructor() {
		this.id = Room.#idHandler.generateId();
	}

	addMessage(message: Message) {
		this.messages.push(message);
	}
}
