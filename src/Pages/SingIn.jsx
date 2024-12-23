import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googleIcon from "../assets/Google.png";
import { AuthContext } from "../Context/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";

const SingIn = () => {
  const { singIn, setUser, singInWithGoogle } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setError("");
    singIn(email, password)
      .then((result) => {
        const user = result.user;
        form.reset();
        setUser(user);
        toast.success("Succsessfully sing in", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogIn = () => {
    singInWithGoogle(googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Succsessfully sing in", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="py-24 px-2 ">
      <div className="card bg-base-100  w-full mx-auto max-w-sm shrink-0 shadow-2xl flex">
        <h1 className="text-xl md:text-2xl text-center font-bold pt-8">
          Sing in Your Account
        </h1>
        <form onSubmit={handleLogIn} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
              name="email"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              name="password"
            />
            <label className="label">
              <p className="label-text-alt cursor-pointer hover:underline  hover:text-red-500 ">
                Forgot password?
              </p>
            </label>
            <label className="label">
              <p className="label-text-alt text-red-500 ">{error}</p>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-primary/80 hover:bg-primary text-white">
              Sing in
            </button>
          </div>
          <p className="text-center text-sm mt-3 font-semibold">
            Don't have an account?{" "}
            <Link state={location.state} className="text-red-600" to="/singup">
              Sing Up
            </Link>
          </p>
        </form>
        <div className="flex justify-center mt-4 mb-8">
          <button
            onClick={handleGoogleLogIn}
            className="flex items-center justify-center gap-2 py-2 px-3 border rounded-lg shadow-xl"
          >
            <span>
              <img className="w-5" src={googleIcon} alt="google icon" />
            </span>
            Sing in with Google{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
