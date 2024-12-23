import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import { AuthContext } from "../Context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (user && user?.email) return children;
  if (loading) return <LoadingSpinner />;

  return <Navigate to="/singin" state={location.pathname}></Navigate>;
};

export default PrivateRoute;
