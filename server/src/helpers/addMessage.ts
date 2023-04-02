import { Message } from "../types";
import generateID from "./generateID";

export default (
	author: string,
	messages: Message[],
	message: Omit<Message, "id" | "author">
) => {
	messages.push({ id: generateID(), author, ...message });
	console.log(messages);
};
