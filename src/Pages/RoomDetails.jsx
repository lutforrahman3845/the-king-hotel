import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
const RoomDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  const { data: room, isLoading } = useQuery({
    queryKey: ["roomDetails", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_serverUrl}/room_details/${id}`
      );
      return data;
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (bookingData) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_serverUrl}/book_room`,
        bookingData
      );
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

    // Proceed with booking logic
    mutateAsync({
      roomId: id,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      price: room?.price,
      roomTitle: room?.title,
      userEmail: user?.email,
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
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
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
    </>
  );
};

export default RoomDetails;
