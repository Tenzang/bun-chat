import { edenTreaty } from "@elysiajs/eden";
import type { Server } from "../../server/src";
import { EdenTreaty } from "@elysiajs/eden/src/treaty/types";

export interface Message {
  id: string;
  author: string;
  content: string;
}

type MessageResponse = {
  author: string;
  messages: Message[];
};

export type HandleMessage = ({
  data: { author, messages },
}: EdenTreaty.OnMessage<MessageResponse>) => void;

const server = edenTreaty<Server>("http://localhost:3000");

class API {
  private server = server;

  async getRooms() {
    const { data, error } = await this.server.room.get();
    if (error) throw error;
    return data;
  }

  joinRoom(roomId: string, handleMessage: HandleMessage) {
    const ws = this.server.ws[roomId].subscribe();
    ws.on("message", handleMessage);

    return ws;
  }

  leaveRoom(
    ws: ReturnType<typeof this.joinRoom>,
    handleMessage: HandleMessage
  ) {
    ws.off("message", handleMessage);
    ws.close();
  }
}

export default new API();
