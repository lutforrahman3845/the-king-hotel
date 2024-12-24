import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect } from "react";
const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    // Show the modal every time the page loads
    const modal = document.getElementById("my_modal_3");
    modal.showModal();
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col  overflow-x-hidden">
        <Navbar></Navbar>
        <main className="flex-grow">
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div>
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
    </>
  );
};

export default Root;
