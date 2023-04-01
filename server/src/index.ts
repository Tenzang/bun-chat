import { Elysia, ws } from "elysia";
import { Message } from "./types";
import { messages } from "./mockData";
import { addMessage } from "./helpers";

interface Sockets {
	[key: string]: any;
}

const openSockets: Sockets = {};

const app = new Elysia()
	.use(ws())
	.ws("/ws", {
		message(ws, message) {
			console.log(message);
			addMessage(messages, message as Omit<Message, "id">);
			Object.values(openSockets).forEach((ws) => ws.send(messages));
		},
		open(ws) {
			console.log("WEBSOCKET OPENED", ws.data.id);
			ws.send(messages);
			openSockets[ws.data.id] = ws;
		},
		close(ws) {
			console.log("WEBSOCKET closed", ws.data.id);
			delete openSockets[ws.data.id];
		},
	})
	.get("/", () => "Hello Elysia")
	.listen(3000);

console.log(
	`🫓 Bun Chat server is running at ${app.server?.hostname}:${app.server?.port}`
);
