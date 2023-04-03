import { Elysia, ws } from "elysia";
import { Message, Users } from "./types";
import { messages } from "./mockData";
import { addMessage } from "./helpers";
import { nameGenerator } from "./helpers/nameGenerator";

const connectedUsers: Users = {};

const app = new Elysia()
	.use(ws())
	.ws("/ws", {
		message(ws, message) {
			const { id } = ws.data;
			addMessage(
				connectedUsers[id].name,
				messages,
				message as Omit<Message, "id" | "author">
			);

			Object.values(connectedUsers).forEach((user) =>
				user.ws.send({ messages })
			);
		},
		open(ws) {
			console.log("WEBSOCKET OPENED", ws.data.id);
			const user = {
				name: nameGenerator(),
				ws,
			};
			connectedUsers[ws.data.id] = user;

			ws.send({
				author: user.name,
				messages,
			});
		},
		close(ws) {
			console.log("WEBSOCKET closed", ws.data.id);
			delete connectedUsers[ws.data.id];
		},
	})
	.get("/", () => "Hello Elysia")
	.listen(3000);

export type Server = typeof app;

console.log(
	`🫓 Bun Chat server is running at ${app.server?.hostname}:${app.server?.port}`
);
