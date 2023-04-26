import type Room from "../Room";

export default class RoomHash {
	hash: {
		[id: string]: Room;
	} = {};

	add(room: Room) {
		this.hash[room.id] = room;
		return this;
	}

	rooms() {
		return Object.values(this.hash).map((room) => ({
			id: room.id,
			name: room.name,
			userCount: room.users.length,
		}));
	}
}
