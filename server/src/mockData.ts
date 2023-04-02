import { generateID } from "./helpers";
import { Message } from "./types";

export const messages: Message[] = [
	{ id: generateID(), author: "micky", content: "test 1" },
	{ id: generateID(), author: "davo", content: "test 2" },
];
