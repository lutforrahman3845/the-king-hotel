import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: bookingRooms, isLoading } = useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/booked_rooms?email=${user.email}`
      );
      return data;
    },
  });
  console.log(bookingRooms);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="py-8 md:pb-14 lg:pb-16 px-2 overflow-x-hidden">
      <h1 className="text-xl  lg:text-2xl  xl:text-3xl text-center font-cinzel font-semibold">
        Your Bookings List
      </h1>

      <div className="overflow-x-auto mx-2 md:mx-4 lg:mx-6 xl:mx-8 mt-6">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
