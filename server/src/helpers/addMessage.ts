import { Message } from "../types";
import generateID from "./generateID";

export default (messages: Message[], message: Omit<Message, "id">) => {
	messages.push({ id: generateID(), ...message });
	console.log(messages);
};
