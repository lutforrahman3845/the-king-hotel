import axios from "axios";
import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_serberUrl}/rooms`).then((res) => {
      setRooms(res.data.slice(0, 6));
    });
  }, []);
  return (
    <div className="py-6 md:py-10 px-3">
      <h1 className="text-xl  lg:text-2xl  xl:text-3xl text-center font-cinzel font-semibold">
        Rooms
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
        Experience luxurious comfort and elegant design in our meticulously
        appointed rooms, perfect for relaxation and rejuvenation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room}></RoomCard>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
