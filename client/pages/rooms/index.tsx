import { useEffect, useState } from "react";
import API from "utils/API";
import Link from "next/link";

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
        ? rooms.map(({ id, name }) => (
            <button key={id}>
              <Link href={`/rooms/${id}`}>{name}</Link>
            </button>
          ))
        : "loading..."}
    </div>
  );
};
