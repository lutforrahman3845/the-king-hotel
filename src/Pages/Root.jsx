import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect } from "react";
const Root = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <div className="min-h-screen flex flex-col container mx-auto">
        <Navbar></Navbar>
        <main className="flex-grow overflow-x-hidden">
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div>
      
    </>
  );
};

export default Root;
