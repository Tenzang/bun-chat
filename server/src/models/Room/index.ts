import Message from "../Message";

export default class Room {
	messages: Message[] = [];

	addMessage(message: Message) {
		this.messages.push(message);
	}
}
