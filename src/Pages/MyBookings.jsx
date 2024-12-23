import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
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
  const { mutateAsync } = useMutation({
    mutationFn: async (deleteData) => {
      const { data } = await axiosSecure.delete(
        `/cancel_booking?id=${deleteData?.id}&roomId=${deleteData?.roomId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myBookings"]);
      toast.success("Booking cancelled successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  const handleDelete = (id, bookdate, roomId) => {
    // check date for cancel a booking 1 day before  the booked date
    const bookDate = new Date(bookdate);
    const today = new Date();
    const diffTime = Math.abs(bookDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 2) {
      return toast.error(
        "You can't cancel booking 1 day before the booked date",
        {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
    const deleteData = { id, roomId };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateAsync(deleteData);
        Swal.fire({
          title: "Cancelled!",
          text: "Your room has been cancelleed.",
          icon: "success",
        });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="py-8 md:pb-14 lg:pb-16 px-2 overflow-x-hidden">
      <h1 className="text-xl  lg:text-2xl  xl:text-3xl text-center font-cinzel font-semibold">
        Your Bookings List
      </h1>
      {bookingRooms.length === 0 && (
        <p className="text-center  font-semibold text-red-700 mt-4">
          You have no bookings yet
        </p>
      )}

      <div className="overflow-x-auto mx-2 md:mx-4 lg:mx-6 xl:mx-8 mt-6">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Room name</th>
              <th>Price/night</th>
              <th>Date</th>
              <th>Booked days</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {bookingRooms.map((room, index) => (
              <tr key={room._id} className="hover">
                <th>{index + 1}</th>
                <td className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full object-cover "
                    src={room?.roomImage}
                    alt={room?.roomTitle}
                  />
                  <p>{room?.roomTitle}</p>
                </td>
                <td>${room?.price}</td>
                <td>
                  {format(new Date(room?.startDate), "dd/MM/yyyy")}{" "}
                  {room?.endDate === null
                    ? ""
                    : `- ${format(new Date(room?.endDate), "dd/MM/yyyy")}`}
                </td>
                <td>{room?.days}</td>
                <td className="flex items-center gap-2">
                  <button className="py-2 px-2 rounded-md bg-primary text-white font-medium">
                    Update Date
                  </button>
                  <button className="py-2 px-2 rounded-md bg-indigo-500 text-white font-medium">
                    review{" "}
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(room?._id, room?.startDate, room?.roomId)
                    }
                    className="py-2 px-2 rounded-md bg-red-500 text-white font-medium"
                  >
                    cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
