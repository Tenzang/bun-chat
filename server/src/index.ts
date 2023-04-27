import { Elysia, ws } from "elysia";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import { roomSchema, roomIndexSchema, wsBodyDTO, wsParamsDTO } from "./schemas";
import { Message, Room, RoomHash, User } from "./models";

const defaultRoom = new Room();
const roomHash = new RoomHash();
roomHash.add(defaultRoom);

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(ws())
  .ws("/ws/:roomId", {
    schema: {
      body: wsBodyDTO,
      params: wsParamsDTO,
    },
    message({ data }, content) {
      const { id, params } = data;

      const room = roomHash.get(params.roomId);

      const author = room.users.find((user) => user.ws.data.id === id);
      if (!author) throw `user #${id} not found`;

      const message = new Message(author.name, content);

      room.addMessage(message);

      room.users.forEach((user) =>
        user.ws.send({ author: author.name, messages: room.messages })
      );
    },
    open(ws) {
      const user = new User(ws);

      const { roomId } = ws.data.params;
      const room = roomHash.get(roomId);

      room.addUser(user);
      console.log("WEBSOCKET OPENED", ws.data.id);

      ws.send({
        author: user.name,
        messages: room.messages,
      });
    },
    close(ws) {
      const { roomId } = ws.data.params;
      const room = roomHash.get(roomId);

      room.removeUser(ws.data.id);
      console.log("WEBSOCKET closed", ws.data.id);
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
