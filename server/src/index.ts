import { Elysia, ws } from "elysia";
import swagger from "@elysiajs/swagger";
import Message from "./models/Message";
import User from "./models/User";
import RoomHash from "./models/RoomHash";
import Room from "./models/Room";
import { roomIndexSchema } from "./schemas";

const room = new Room();
const roomHash = new RoomHash();
roomHash.add(room);

const app = new Elysia()
	.use(swagger())
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
	.get("/room", () => roomHash.rooms(), roomIndexSchema)
	.get("/", () => "Server is running 👌")
	.listen(3000);

export type Server = typeof app;

console.log(
	`🫓 Bun Chat server is running at ${app.server?.hostname}:${app.server?.port}`
);
