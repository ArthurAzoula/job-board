import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../assets/logo/logo_EpiJob/png/white_transparent.png";
import HomeIcon from "../icons/Home.icon";
import AdvertissementIcon from "../icons/Advertissement.icon";
import AboutIcon from "../icons/About.icon";
import SignInIcon from "../icons/SignIn.icon";
import AdminIcon from "../icons/Admin.icon";
import { accountService } from "../services/account.service";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../icons/Logout.icon";
import ButtonAddAdvert from "./ButtonAddAdvert.component";
import { FaBuilding } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import SettingsIcon from "../icons/Settings.icon";

const Navbar = () => {
  const [logged, setLogged] = useState(accountService.isLogged());
  const [user, setUser] = useState([]);
  const token = accountService.getToken() || null;

  useEffect(() => {
    if (logged && token) {
      axios({
        method: "GET",
        url: `http://localhost:3000/api/auth/me/${token}`,
        responseType: "json",
      })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [logged, token]);

  let navigate = useNavigate();

  const logout = () => {
    accountService.logout();
    toast.success("Déconnexion réussie!");
    setTimeout(() => {
      navigate("/signin");
      window.location.reload();
    }, 2000);
  };

  const userType = localStorage.getItem("type") || null;

  return (
    <>
      <nav className="bg-gunmetal">
        <div className="mx-auto container items-center justify-between block md:flex">
          <Link to="/" className="text-white text-4xl font-bold text-center">
            <div className="flex justify-between">
              <span className="text-gradient font-extrabold lg:text-5xl text-3xl">
                &#123;EpiJob&#125;
              </span>
              <div className="xs:hidden">
                {!logged ? (
                  <div className="bg-bleugris rounded-lg px-2 py-0 flex items-center">
                    <Link
                      to="/signin"
                      className="text-white hover:underline decoration-white hover:scale-110 duration-100"
                    >
                      <div className="block lg:flex justify-center">
                        <AdminIcon className="mr-2" />
                        <span className="ml-2 hidden 2xl:inline">
                          Connexion
                        </span>
                      </div>
                    </Link>
                    <span className="ml-3 text-white">/</span>
                    <Link
                      to="/signup"
                      className="text-white hover:underline decoration-white ml-4 hover:scale-110 duration-100"
                    >
                      <div className="block lg:flex justify-center">
                        <SignInIcon className="mr-2" />
                        <span className="ml-2 hidden 2xl:inline">
                          Inscription
                        </span>
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className="">
                    <button
                      onClick={logout}
                      className="block lg:flex items-center bg-bleugris rounded-lg font-bold hover:scale-110 duration-200 px-4 py-2 text-white hover:underline decoration-white"
                    >
                      <LogoutIcon />
                      <span className="ml-2 hidden 2xl:inline">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <span className="text-bleugris font-bold text-3xl ml-2 hidden lg:inline">
              {userType === "company"
                ? "for company"
                : userType === "user" && user.isAdmin
                ? "for admin"
                : userType === "user" && !user.isAdmin
                ? "for user"
                : ""}
            </span>
          </Link>
          <ul className="flex space-x-8 md:space-x-14 items-center bg-gunemetal p-2 md:p-4 rounded-xl text-xl">
            <li>
              <Link
                to="/"
                className="text-white flex items-center hover:underline hover:underline-offset-2 decoration-white font-bold"
              >
                <HomeIcon className="mr-2 sm:mr-2 md:mr-2" />
                <span className="ml-2 hover:scale-110 duration-100 hidden xl:inline">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/annonces"
                className="text-white flex items-center hover:underline decoration-white font-bold"
              >
                <AdvertissementIcon className="mr-2" />
                <span className="ml-2 hover:scale-110 duration-100 hidden xl:inline">
                  Adverts
                </span>
              </Link>
            </li>
            <li className="lg:hidden">
              <Link
                to="/settings"
                className=" text-white flex items-center hover:underline decoration-white font-bold"
              >
                <SettingsIcon className="mr-2" />
                <span className="ml-2 hover:scale-110 duration-100 hidden">
                  Settings
                </span>
              </Link>
            </li>
            {localStorage.getItem("type") !== "company" && (
              <li>
                <Link
                  to="/companies"
                  className="text-white flex items-center hover:underline decoration-white font-bold"
                >
                  <FaBuilding className="mr-2" />
                  <span className="ml-2 hover:scale-110 duration-100 hidden xl:inline">
                    Companies
                  </span>
                </Link>
              </li>
            )}
            {user.isAdmin && logged && (
              <li>
                <Link
                  to="/admin"
                  className="text-white flex items-center hover:underline decoration-white font-bold"
                >
                  <AdminIcon className="mr-2" />
                  <span className="ml-2 hover:scale-110 duration-100 hidden xl:inline">
                    Admin
                  </span>
                </Link>
              </li>
            )}
            {userType === "company" && (
              <li>
                <ButtonAddAdvert />
              </li>
            )}
            <li>
              {!logged ? (
                <div className="hidden xs:flex bg-bleugris rounded-lg px-4 py-2 items-center">
                  <Link
                    to="/signin"
                    className="text-white hover:underline decoration-white hover:scale-110 duration-100"
                  >
                    <div className="block lg:flex justify-center">
                      <AdminIcon className="mr-2" />
                      <span className="ml-2 hidden 2xl:inline">Connexion</span>
                    </div>
                  </Link>
                  <span className="ml-3 text-white">/</span>
                  <Link
                    to="/signup"
                    className="text-white hover:underline decoration-white ml-4 hover:scale-110 duration-100"
                  >
                    <div className="block lg:flex justify-center">
                      <SignInIcon className="mr-2" />
                      <span className="ml-2 hidden 2xl:inline">
                        Inscription
                      </span>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="hidden xs:flex">
                  <button
                    onClick={logout}
                    className="block lg:flex items-center bg-bleugris rounded-lg font-bold hover:scale-110 duration-200 px-4 py-2 text-white hover:underline decoration-white"
                  >
                    <LogoutIcon />
                    <span className="ml-2 hidden 2xl:inline">Logout</span>
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
        <ToastContainer />
      </nav>
    </>
  );
};

export default Navbar;
