import IdHandler from "../IdHandler";

export default class Message {
	static #idHandler = new IdHandler();

	id: number;
	author: string;
	content: string;

	constructor(author: string, content: string) {
		this.id = Message.#idHandler.generateId();
		this.author = author;
		this.content = content;
	}
}
