import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import StarRatingComponent from "react-star-rating-component";
import userIcon from "../assets/free-user-icon-3296-thumb.png";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  //   update booking
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [error, setError] = useState("");
  const [roomdtls, setRoomdtls] = useState({});
  //   review
  const [rating, setRating] = useState(1);
  const { data: bookingRooms, isLoading } = useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/booked_rooms?email=${user.email}`
      );
      return data;
    },
  });
  //   cancel booking
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

  // update booking
  const { mutateAsync: updateBooking, isPending } = useMutation({
    mutationFn: async (updateData) => {
      const { data } = await axiosSecure.patch(
        `/update_booking?id=${updateData?.id}`,
        updateData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myBookings"]);
      document.getElementById("my_modal_1").close();
      toast.success("Update successfully", {
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

  const updateModal = (room) => {
    document.getElementById("my_modal_1").showModal();
    setRoomdtls(room);
    setSelectedStartDate(new Date(room?.startDate));
    setSelectedEndDate(
      new Date(room?.endDate === null ? room?.startDate : room?.endDate)
    );
  };
  const handleUdate = (id) => {
    setError("");
    const start = new Date(selectedStartDate);
    const end = new Date(selectedEndDate);

    // Calculate duration in days
    const durationInMilliseconds = end - start;
    const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);

    if (selectedEndDate && durationInDays < 0) {
      return setError("End date must be after the start date.");
    }

    const maxDuration = 3; // Maximum allowed duration
    if (selectedEndDate && durationInDays > maxDuration) {
      return setError(`You can only book up to ${maxDuration} days`);
    }
    const days = durationInDays <= 0 ? 1 : durationInDays;
    updateBooking({
      id,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      days,
    });
  };

  //   review for specific room
  const { mutateAsync: reviewRoom } = useMutation({
    mutationFn: async (reviewData) => {
      const {data} = await axiosSecure.post("/review", reviewData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allrooms", "rooms"]);
      document.getElementById("my_modal_5").close();
      toast.success("Review give successfully", {
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
  })
  const reviewModal = (room) => {
    document.getElementById("my_modal_5").showModal();
    setRoomdtls(room);
  };
  const onStarClick = (nextValue) => {
    setRating(nextValue);
  };
  const hanleReviewSubmite = (e, room) => {
    e.preventDefault();
    const from = e.target;
    const comment = from.comment.value;
    const rooomRating = rating;
    const reviewData = {
      id: room?._id,
      roomId: room?.roomId,
      comment,
      rooomRating,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      timestamp: new Date().toLocaleString()
    };
    reviewRoom(reviewData);
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
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
                    <button
                      onClick={() => updateModal(room)}
                      className="py-2 px-2 rounded-md bg-primary text-white font-medium"
                    >
                      Update Date
                    </button>
                    <button
                      onClick={() => reviewModal(room)}
                      className="py-2 px-2 rounded-md bg-indigo-500 text-white font-medium"
                    >
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
      {/* Udate modal*/}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box h-[500px] flex flex-col justify-between p-4">
          <div className="py-4">
            <p className="text-red-600  font-medium">{error}</p>
            <div className="mb-1">
              <img
                className="w-14 h-14 rounded-full object-cover mb-4"
                src={roomdtls?.roomImage}
                alt={roomdtls?.roomTitle}
              />
              <p>
                {" "}
                <strong>Title:</strong>
                <span className="text-indigo-600 font-bold text-lg">
                  {roomdtls?.roomTitle}
                </span>
              </p>
            </div>
            <p>
              <strong>Price:</strong>{" "}
              <span className="text-indigo-600 font-bold">
                ${roomdtls?.price} /night
              </span>
            </p>
            <div className="mt-4">
              <strong>Select start booking date:</strong>
              <DatePicker
                selected={selectedStartDate}
                onChange={(date) => setSelectedStartDate(date)}
                minDate={new Date()}
                className=" border border-indigo-600 py-2 rounded-md ml-2 focus:outline-none mt-2 w-full onF"
              />
            </div>
            <div className="mt-4">
              <strong>Select end booking date:</strong>
              <DatePicker
                selected={selectedEndDate}
                onChange={(date) => setSelectedEndDate(date)}
                minDate={new Date()}
                className=" border border-indigo-600 py-2 rounded-md ml-2 focus:outline-none mt-2 w-full onF"
              />
            </div>
          </div>
          <div className="modal-action">
            <button
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={() => handleUdate(roomdtls?._id)}
            >
              {isPending ? "Updating..." : "Update"}
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* Review modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-xl">Leave a Review</h3>
          <div className="flex items-center gap-2 mt-4">
            {user?.photoURL ? (
              <img
                className="w-10 h-10 object-cover rounded-full"
                src={user?.photoURL}
                alt="User imge"
                referrerPolicy="no-referrer"
              />
            ) : (
              <img
                className="w-10 h-10 rounded-full border border-primary p-[2px]"
                src={userIcon}
                alt="Default User Icon"
              />
            )}
            <h4 className="text-lg font-semibold">{user?.displayName}</h4>
          </div>
          <form onSubmit={(e) => hanleReviewSubmite(e, roomdtls)}>
            <label className="block font-medium mt-4">Rating</label>
            <StarRatingComponent
              name="rating"
              value={rating}
              starCount={5}
              onStarClick={onStarClick}
              starColor="gold"
              emptyStarColor="gray"
              className="text-2xl"
            />
            <label className="block font-medium mt-2">Comment</label>
            <textarea
              id="comment"
              placeholder="Write your comment here..."
              className="textarea textarea-bordered w-full mt-2"
              required
            />

            <div className="modal-action">
              <div className="modal-action mt-4">
                <button
                  type="submit"
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded-md"
                >
                  Give review
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("my_modal_5").close()}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default MyBookings;
