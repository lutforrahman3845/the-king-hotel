import axios from "axios";
import RoomCard from "../Components/RoomCard";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Rooms = () => {
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
 
    const { data: rooms, isLoading } = useQuery({
      queryKey: ["allrooms" ,currentPage],
      queryFn: async () => {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_serverUrl
          }/rooms?skip=${currentPage}&limit=${itemsPerPage}`
        );
        return data;
      },
    });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_serverUrl}/rooms_count`).then((res) => {
      setCount(res.data.count);
    });
  }, []);
  const totalPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room}></RoomCard>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1  disabled:text-gray-200 bg-secondary/70 rounded-md disabled:cursor-not-allowed disabled:bg-gray-400  disabled:hover:text-gray-500 hover:bg-secondary  text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">Previous</span>
          </div>
        </button>
        {/* Numbers */}
        {pages.map((btnNum) => (
          <button
            key={btnNum}
            onClick={() => handlePaginationButton(btnNum)}
            className={`hidden  ${
              currentPage === btnNum ? "bg-indigo-600 text-white" : ""
            } px-4 py-2 mx-1   rounded-md sm:inline hover:bg-indigo-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1   bg-secondary/70 rounded-md hover:bg-secondary disabled:bg-gray-400 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 text-white disabled:cursor-not-allowed disabled:text-gray-200"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Rooms;
