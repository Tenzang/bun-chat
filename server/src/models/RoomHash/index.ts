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
		return Object.values(this.hash);
	}

	get(id: number) {
		const room = this.hash[id];
		if (!room) throw `Room #${id} not found.`;
		return this.hash[id];
	}
}
