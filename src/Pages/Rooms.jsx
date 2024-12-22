import axios from "axios";
import RoomCard from "../Components/RoomCard";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Components/LoadingSpinner";

const Rooms = () => {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ["allrooms"],
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
        All Rooms
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-4xl mx-auto">
        Experience luxurious comfort and elegant design in our meticulously
        appointed rooms, perfect for relaxation and rejuvenation.{" "}
        <span className="hidden lg:inline">
          Each room is carefully designed to provide a unique and memorable
          experience, with plush bedding features modern amenities and stunning
          views to ensure a memorable stay.
        </span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room}></RoomCard>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
