import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Pages/Root";
import Error from "../Error";
import SingIn from "../Pages/SingIn";
import SingUp from "../Pages/SingUp";
import Home from "../Pages/Home";

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
        }

      ]
    },
  ]);

  export default router;