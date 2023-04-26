import { edenTreaty } from "@elysiajs/eden";
import type { Server } from "../../server/src";

const server = edenTreaty<Server>("http://localhost:3000");

class API {
	private server = server;

	async getRooms() {
		const { data, error } = await this.server.room.get();
		if (error) throw error;
		return data;
	}
}

export default new API();
