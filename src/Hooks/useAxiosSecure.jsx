import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_serverUrl,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { singOut } = useContext(AuthContext);
  const navigate = useNavigate();
  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        await singOut();
        navigate("/singin");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};
export default useAxiosSecure;
