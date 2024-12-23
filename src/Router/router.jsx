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
          path:"/room_details/:id",
          element: <PrivateRoute><RoomDetails></RoomDetails></PrivateRoute>
        }

      ]
    },
  ]);

  export default router;