import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Pages/Root";
import Error from "../Error";
import SingIn from "../Pages/SingIn";
import SingUp from "../Pages/SingUp";
import Home from "../Pages/Home";
import Rooms from "../Pages/Rooms";
import PrivateRoute from "./PrivateRoute";
import RoomDetails from "../Pages/RoomDetails";
import MyBookings from "../Pages/MyBookings";
import ContactUs from "../Components/ContactUs";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<Error></Error>,
      children:[
        {
          path: "/singin",
          element: <SingIn></SingIn>
        },
        {
          path: "/singup",
          element: <SingUp></SingUp>
        },
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "/rooms",
          element: <Rooms></Rooms>
        },
        {
          path:"/contact",
          element: <ContactUs></ContactUs>
        },
        {
          path:"/room_details/:id",
          element: <PrivateRoute><RoomDetails></RoomDetails></PrivateRoute>
        },
        {
          path: "/my_bookings",
          element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
        }

      ]
    },
  ]);

  export default router;