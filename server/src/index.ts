import { Elysia, ws } from "elysia";
import { Message } from "./types";
import { messages } from "./mockData";
import { addMessage } from "./helpers";

const app = new Elysia()
	.use(ws())
	.ws("/ws", {
		message(ws, message) {
			console.log(message);
			addMessage(messages, message as Omit<Message, "id">);
			ws.send(messages);
		},
		open(ws) {
			console.log("WEBSOCKET OPENED", ws.data.id);
			ws.send(messages);
		},
		close(ws) {
			console.log("WEBSOCKET closed", ws.data.id);
		},
	})
	.get("/", () => "Hello Elysia")
	.listen(3000);

console.log(
	`🫓 Bun Chat server is running at ${app.server?.hostname}:${app.server?.port}`
);
