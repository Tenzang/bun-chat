import { Elysia, ws } from "elysia";
import Message from "./models/Message";
import User from "./models/User";
import Room from "./models/Room";

const room = new Room();

const app = new Elysia()
	.use(ws())
	.ws("/ws", {
		message(ws, data) {
			const { id } = ws.data;

			const author = room.users.find((user) => user.ws.data.id === id) as User;

			type messageData = { content: string };
			const message = new Message(author.name, (data as messageData).content);
			room.addMessage(message);

			room.users.forEach((user) => user.ws.send({ messages: room.messages }));
		},
		open(ws) {
			console.log("WEBSOCKET OPENED", ws.data.id);
			const user = new User(ws);
			room.addUser(user);

			ws.send({
				author: user.name,
				messages: room.messages,
			});
		},
		close(ws) {
			console.log("WEBSOCKET closed", ws.data.id);
			room.removeUser(ws.data.id);
		},
	})
	.get("/", () => "Server is running 👌")
	.listen(3000);

export type Server = typeof app;

console.log(
	`🫓 Bun Chat server is running at ${app.server?.hostname}:${app.server?.port}`
);
