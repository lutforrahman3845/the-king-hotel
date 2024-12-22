import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  const handleClick = () => {
    navigate(`/room_details/${room._id}`);
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white border ">
      <div className="slider-container">
        <Slider {...settings}>
          {room?.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={room.name}
              className="w-full h-64 object-cover"
            ></img>
          ))}
        </Slider>
      </div>
      <div onClick={handleClick} className="p-4  cursor-pointer">
        <h3 className="text-lg font-bold text-gray-800">{room?.title}</h3>
        <p className="text-gray-600 text-sm mt-2">{room?.description}</p>

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
        <Link to={`/room_details/${room._id}`}>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
