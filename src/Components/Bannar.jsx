import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import bnnr1 from "../assets/bannar1.jpg";
import bnnr2 from "../assets/bannar2.jpg";
import bnnr3 from "../assets/bannar3.jpg";
import bnnr4 from "../assets/bannar4.png";
import { useNavigate } from "react-router-dom";


const Bannar = () => {
  const navigate = useNavigate()
  return (
    <div className="relative   md:px-6 pt-2  ">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        pagination={
          {
            clickable: true
          }
        }
        className="w-[98%] md:w-full h-[300px] md:h-[450px] lg:h-[550px] xl:h-[700px] rounded-sm"
      >
        <SwiperSlide className=" relative ">
          <div className="absolute top-1/2 left-2 md:left-10 lg:left-16 xl:left-20 -translate-y-1/2 z-50 text-white">
            <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl  font-bold max-w-2xl ">
            Discover Your Dream Stay
            </h1>
            <p className="text-xs sm:text-base  max-w-2xl text-gray-200 my-2 font-light">
            Unwind in luxurious comfort and world-class amenities. Your perfect getaway is just a click away. Experience the art of exceptional hospitality
            </p>
            <button onClick={()=> navigate('/rooms')} className="py-2 px-3  text-xs md:text-base rounded-md bg-primary text-white mt-3 md:mt-6 lg:mt-8">
            Discover More
            </button>
          </div>
          <img
            src={bnnr2}
            alt="Bannar image"
            className="w-full h-full object-cover rounded-sm"
          />
        </SwiperSlide>
        <SwiperSlide className=" relative text-black">
          <div className="absolute top-1/2 left-2 md:left-10 lg:left-16 xl:left-20 -translate-y-1/2 z-50  text-white">
            <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl  font-bold max-w-2xl ">
            More Than Just a Stay
            </h1>
            <p className="text-xs sm:text-base max-w-2xl my-2 text-gray-200 font-light">
            Immerse yourself in local culture and unique experiences at our curated destinations. Discover the stories behind every journey. Make every trip a meaningful adventure.
            </p>
            <button onClick={()=> navigate('/rooms')} className="py-2 px-3 text-xs md:text-base rounded-md bg-primary text-white mt-3 md:mt-6 lg:mt-8">
            Discover More
            </button>
          </div>
          <img
            src={bnnr3}
            alt="Bannar image"
            className="w-full h-full object-cover object-bottom rounded-sm"
          />
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/70 to-transparent z-10"></div>

          <div className="absolute top-1/2 left-2 md:left-10 lg:left-16 xl:left-20 -translate-y-1/2 z-20">
            <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold max-w-2xl text-white">
            Plan Your Stay Effortlessly
            </h1>
            <p className="text-xs sm:text-base text-gray-200 max-w-2xl my-2 font-light">
            Quick, secure, and hassle-free booking for an unforgettable stay. Let us make your journey stress-free and memorable. Your perfect trip begins here.
            </p>
            <button onClick={()=> navigate('/rooms')} className="py-2 px-3  text-xs md:text-base rounded-md bg-primary text-white mt-3 md:mt-6 lg:mt-8">
            Discover More
            </button>
          </div>

          <img
            src={bnnr1}
            alt="Banner image"
            className="w-full h-full md:h-11/12 object-cover object-bottom rounded-sm "
          />
        </SwiperSlide>
        <SwiperSlide className=" relative text-black">
          <div className="absolute top-1/2 left-2 md:left-10 lg:left-16 xl:left-20 -translate-y-1/2 z-50  text-white">
            <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl  font-bold max-w-2xl ">
            Wake Up to Stunning Views
            </h1>
            <p className="text-xs sm:text-base max-w-2xl my-2 text-gray-200 font-light">
            Experience breathtaking landscapes from the comfort of your room. Book your escape today and create unforgettable memories. Let nature inspire your next journey.
            </p>
            <button onClick={()=> navigate('/rooms')} className="py-2 px-3 text-xs md:text-base rounded-md bg-primary text-white mt-3 md:mt-6 lg:mt-8">
            Discover More
            </button>
          </div>
          <img
            src={bnnr4}
            alt="Bannar image"
            className="w-full h-full object-cover object-bottom rounded-sm"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Bannar;
