import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthProvider from "../Context/AuthProvider";
import LoadingSpinner from "../Components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthProvider);

  if (user && user?.email) return children;
  if (loading) return <LoadingSpinner />;

  return <Navigate to="/singin" state={location.pathname}></Navigate>;
};

export default PrivateRoute;
