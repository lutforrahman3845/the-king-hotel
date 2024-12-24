import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import userIcon from "../assets/free-user-icon-3296-thumb.png";

const Reviews = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="py-8 md:py-14 lg:py-16 xl:py-20 px-2 overflow-x-hidden">
      <h1 className="text-xl  lg:text-2xl  xl:text-3xl text-center font-cinzel font-semibold">
        Testimonial
      </h1>
      <p className="text-center text-gray-600 mb-6 max-w-4xl mx-auto">
        I recently stayed at this hotel, and it was an absolutely wonderful
        experience. From the moment I arrived, the staff went above and beyond
        to ensure my comfort and satisfaction.
      </p>
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full h-72 my-5 mx-10"
      >
        {reviews.slice(0, 6).map((review) => (
          <SwiperSlide
            key={review._id}
            className="border-2 border-indigo-400 p-4 rounded-lg"
          >
            {" "}
            <div>
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
                <p className="font-medium">
                  Comment : <span className="text-gray-700 font-normal"> {review?.comment.substring(0,250)}.</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
