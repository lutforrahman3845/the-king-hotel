import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Pages/Root";
import Error from "../Error";
import SingIn from "../Pages/SingIn";
import SingUp from "../Pages/SingUp";

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
        }

      ]
    },
  ]);

  export default router;