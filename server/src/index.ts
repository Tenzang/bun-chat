import { Elysia, ws } from "elysia";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import { roomSchema, roomIndexSchema } from "./schemas";
import { Message, Room, RoomHash, User } from "./models";

const room = new Room();
const roomHash = new RoomHash();
roomHash.add(room);

const app = new Elysia()
	.use(cors())
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
	.get(
		"/room",
		() =>
			roomHash.rooms().map(({ id, name, users }) => ({
				id,
				name,
				userCount: users.length,
			})),
		roomIndexSchema
	)
	.get(
		"/room/:id",
		// @ts-ignore (confirmed payload passes schema validation - not sure where type error is coming from)
		({ params: { id } }) => {
			const { name, messages, users } = roomHash.get(id);
			return {
				id,
				name,
				messages, // NOTE: remove messages from payload (they're already handled by websockets)
				users: users.map(({ name }) => ({ name })), // NOTE: may want to move this to websockets
			};
		},
		roomSchema
	)
	.get("/", () => "Server is running 👌")
	.listen(3000);

export type Server = typeof app;

console.log(
	`🫓 Bun Chat server is running at ${app.server?.hostname}:${app.server?.port}`
);
