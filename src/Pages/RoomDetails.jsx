import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const RoomDetails = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  // rewviews
  const [count, setCount] = useState(0);
  const rewviewsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // rooms details
  const { data: room, isLoading } = useQuery({
    queryKey: ["roomDetails", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/room_details/${id}`);
      return data;
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (bookingData) => {
      const { data } = await axiosSecure.post(`/book_room`, bookingData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["roomDetails", id]);
      document.getElementById("my_modal_1").close();
      toast.success("Room Booked succsessfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/my_bookings");
    },
    onError: (error) => {
      setError(error.response.data.message);
    },
  });

  const handleBooking = () => {
    setError("");
    if (!selectedStartDate) {
      return setError("Please select Date");
    }

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
    // Proceed with booking logic
    mutateAsync({
      roomId: id,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      price: room?.price,
      roomTitle: room?.title,
      roomImage: room?.images[0],
      userEmail: user?.email,
      days,
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  // reviews
  const { data: review, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["review", currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/reviews_ofRooms?room=${id}&skip=${currentPage}&limit=${rewviewsPerPage}`
      );
      return data;
    },
  });
  useEffect(() => {
    axiosSecure.get(`/reviews_count?rm=${id}`).then((res) => {
      setCount(res.data.count);
    });
  }, []);
  const totalPages = Math.ceil(count / rewviewsPerPage);
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };
  // lodaing
  if (isLoading) return <LoadingSpinner />;
  if (isLoadingReviews) return <LoadingSpinner />;

  return (
    <div className="my-8 md:my-14">
      <div className="shadow-lg rounded-lg overflow-hidden bg-white border grid grid-cols-1 md:grid-cols-2 mx-3 my-8 md:my-14 lg:my-16 xl:my-20 overflow-x-hidden gap-6">
        <div className="slider-container">
          <Slider {...settings}>
            {room?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={room.name}
                className="w-full h-64 md:h-72 lg:h-80 xl:h-96 object-cover object-bottom rounded-lg"
              />
            ))}
          </Slider>
        </div>
        <div className="p-4 cursor-pointer flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{room?.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{room?.description}</p>

            <div>
              <h4 className="text-gray-800 font-semibold mt-4">Features:</h4>
              {room?.features.map((feature, index) => (
                <li
                  key={index}
                  className="text-secondary/80 text-sm mt-2 font-medium"
                >
                  {feature}
                </li>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-indigo-600 font-bold">
                ${room?.price}/night
              </span>
              {room?.available ? (
                <span className="text-green-600 font-semibold">Available</span>
              ) : (
                <span className="text-red-600 font-semibold">Unavailable</span>
              )}
            </div>

            <div className="mt-2 text-sm text-gray-500">
              ⭐ {room?.rating > 0 ? room?.rating : "No ratings yet"} (
              {room?.totalReviews > 0
                ? `${room?.totalReviews} reviews`
                : "No reviews yet"}
              )
            </div>
          </div>
          <div>
            <button
              disabled={!room?.available}
              className={`btn bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md mt-4`}
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      {/* reviews */}
      {review.length <= 0 ? (
        <div className="mx-4">
          <p className="text-center text-gray-600 italic max-w-2xl mx-auto">
            This room is waiting for its first review! If you want to leave a
            review, you need to book the room first . Our customers love sharing
            their experiences, and we're confident you'll have a memorable stay
            too. Book now with confidence!
          </p>
        </div>
      ) : (
        <div className="px-8 md:px-14 lg:px-16 xl:px-20 overflow-x-hidden">
          <h4 className="text-2xl font-semibold text-indigo-600">Reviews</h4>
          {review.map((review) => (
            <div key={review._id} className="mt-8">
              <div className="flex items-center gap-2">
                {review?.userPhoto ? (
                  <img
                    className="w-12 h-12 object-cover rounded-full"
                    src={review?.userPhoto}
                    alt="User imge"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <img
                    className="w-12 h-12 rounded-full border border-primary p-[2px]"
                    src={userIcon}
                    alt="Default User Icon"
                  />
                )}
                <div>
                  <p className="text-lg font-semibold">{review?.userName}</p>
                  <p>{new Date(review?.timestamp).toLocaleString()}</p>
                </div>
              </div>
              <div className="my-4 ml-10">
                <p className="font-medium">
                  Rating : ⭐ ({review?.rooomRating})
                </p>
                <p className="font-medium max-w-3xl">
                  Comment :{" "}
                  <span className="text-gray-700 font-normal">
                    {" "}
                    {review?.comment}
                  </span>
                </p>
              </div>
            </div>
          ))}
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
      )}
      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box h-[500px] flex flex-col justify-between p-4">
          <div className="py-4">
            <p className="text-red-600  font-medium mb-4">{error}</p>
            <p>
              <strong>Title:</strong> {room?.title}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              <span className="text-indigo-600 font-bold">
                ${room?.price} /night
              </span>
            </p>
            <p>
              <strong>Description:</strong> {room?.description}
            </p>
            <div className="mt-4">
              <strong>Start Booking Date:</strong>
              <DatePicker
                selected={selectedStartDate}
                onChange={(date) => setSelectedStartDate(date)}
                minDate={new Date()}
                className=" border border-indigo-600 py-2 rounded-md ml-2 focus:outline-none mt-2 w-full onF"
              />
            </div>
            <div className="mt-4">
              <strong>End Booking Date:</strong>
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
              onClick={handleBooking}
            >
              {isPending ? "Booking" : " Confirm"}
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RoomDetails;
