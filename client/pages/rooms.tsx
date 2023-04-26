import { useEffect, useState } from "react";
import API from "../utils/API";

type Rooms = Awaited<ReturnType<typeof API.getRooms>>;

export default () => {
	const [rooms, setRooms] = useState<Rooms>();

	useEffect(() => {
		API.getRooms().then((rooms) => {
			console.log(rooms);
			setRooms(rooms);
		});
	}, []);

	return (
		<div>
			{rooms
				? rooms.map((room) => <button key={room.id}>{room.name}</button>)
				: "loading..."}
		</div>
	);
};
