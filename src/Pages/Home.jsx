import { useNavigate } from "react-router-dom";
import About from "../Components/About";
import Bannar from "../Components/Bannar";
import ContactUs from "../Components/ContactUs";
import FeaturedRooms from "../Components/FeaturedRooms";
import FQquestion from "../Components/FQquestion";
import HappyCoustomer from "../Components/HappyCoustomer";
import OurLocation from "../Components/OurLocation";
import Reviews from "../Components/Reviews";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isFirstVisit = sessionStorage.getItem("isFirstVisit");

    if (!isFirstVisit) {
      const modal = document.getElementById("my_modal_3");
      modal.showModal();
      sessionStorage.setItem("isFirstVisit", "true");
    }
  }, []);
  return (
    <div>
      <Bannar></Bannar>
      <About></About>
      <HappyCoustomer></HappyCoustomer>
      <FeaturedRooms></FeaturedRooms>
      <Reviews></Reviews>
      <OurLocation></OurLocation>
      <ContactUs></ContactUs>
      <FQquestion></FQquestion>
      {/* Offer modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box relative">
          <form method="dialog">
            {/* Close button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* Modal content */}
          <h3 className="font-bold text-lg text-center">
            🎉 Special Offers! 🎉
          </h3>
          <p className="py-4 text-center">
            Don't miss out on our amazing deals! Enjoy up to{" "}
            <span className="text-red-500 font-bold">20% off</span> on selected
            rooms. Book now and make your stay unforgettable.
          </p>
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co.com/5WgXWNt/hotel-deal-for-flyers.png"
              alt="Special Offer"
              className=" object-cover rounded"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                document.getElementById("my_modal_3").close();
                navigate("/rooms");
              }}
              className="btn bg-indigo-600 text-white px-4 py-2 rounded transition"
            >
              Explore Offers
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Home;
