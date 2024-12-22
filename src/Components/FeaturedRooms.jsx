import axios from "axios";
import RoomCard from "./RoomCard";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedRooms = () => {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_serverUrl}/rooms`
      );
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
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
        {rooms.slice(0, 6)?.map((room) => (
          <RoomCard key={room._id} room={room}></RoomCard>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
