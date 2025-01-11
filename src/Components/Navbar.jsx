import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import userIcon from "../assets/free-user-icon-3296-thumb.png";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, singOut } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            ` px-3 py-2 rounded-lg font-semibold ${
              isActive
                ? "text-base text-black bg-primary/50 "
                : "text-gray-800 hover:underline text-base "
            }`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg font-semibold ${
              isActive
                ? "text-base text-black bg-primary/50 "
                : "text-gray-800 hover:underline  text-base "
            }`
          }
          to="/rooms"
        >
          Rooms
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            className={({ isActive }) =>
              ` px-3 py-2 rounded-lg font-semibold ${
                isActive
                  ? "text-base text-black bg-primary/50 "
                  : "text-gray-800 hover:underline  text-base "
              }`
            }
            to="/my_bookings"
          >
            My Bookings
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg font-semibold ${
              isActive
                ? "text-base text-black bg-primary/50 "
                : "text-gray-800 hover:underline  text-base "
            }`
          }
          to="/contact"
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className=" sticky top-0 z-50">
      <Disclosure as="nav" className="bg-[#F1E9DA] backdrop-blur-xl ">
        <div className=" px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex  items-center justify-center sm:items-center sm:justify-start">
              <Link to={"/"} className="flex shrink-0 items-center">
                <img alt="Your Company" src={logo} className="h-8 w-auto" />
                <h1 className="text-gray-900 font-bold text-xl md:text-2xl ml-3 ">
                  King Hotel
                </h1>
              </Link>
              <div className="hidden sm:ml-6 lg:block">
                <div className="flex list-none gap-2">{links}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {user && user?.email ? (
                <div className="dropdown  dropdown-end">
                  {user?.photoURL ? (
                    <div tabIndex={1} role="button" className="w-10 h-10 ">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={user?.photoURL}
                        alt="User imge"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div tabIndex={1} role="button" className="w-10 h-10 ">
                      <img
                        className="w-full h-full rounded-full border border-primary p-[2px]"
                        src={userIcon}
                        alt="Default User Icon"
                      />
                    </div>
                  )}
                  <div
                    tabIndex={1}
                    className="dropdown-content menu bg-gray-700 rounded-box z-50 w-52 py-6 px-3 space-y-3 shadow "
                  >
                    <div className="text-base text-white hover:bg-gray-900 rounded-lg font-semibold flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>

                      <p>{user?.displayName}</p>
                    </div>
                    <div
                      onClick={() =>
                        singOut().then(() => {
                          toast.success("Succsessfully sing out", {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        })
                      }
                      className="text-base text-white hover:bg-gray-900 rounded-lg  font-semibold flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                        />
                      </svg>
                      <p>Sing out</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2 ">
                  <Link
                    to={"/singin"}
                    className="bg-primary py-2 px-3 rounded-lg text-base font-medium text-white"
                  >
                    Sing in
                  </Link>
                  <Link
                    to={"/singup"}
                    className="bg-primary py-2 px-3 rounded-lg text-base font-medium text-white"
                  >
                    Sing up
                  </Link>
                </div>
              )}
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel>
          <div className="space-y-4 px-2 pb-3 pt-2 list-none lg:hidden flex flex-col gap-2 mb-4">
            {links}
          </div>
          {user?.email ? (
            ""
          ) : (
            <div className="flex flex-col  gap-2 mx-3 pb-5 sm:hidden">
              <Link
                to={"/singin"}
                className="bg-primary py-2 px-3 rounded-lg text-base font-medium text-white text-center"
              >
                Sing in
              </Link>
              <Link
                to={"/singup"}
                className="bg-primary py-2 px-3 rounded-lg text-base font-medium text-white text-center"
              >
                Sing up
              </Link>
            </div>
          )}
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default Navbar;
