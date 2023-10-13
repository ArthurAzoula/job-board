import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../assets/logo/logo_EpiJob/png/white_transparent.png';
import HomeIcon from '../icons/Home.icon';
import AdvertissementIcon from '../icons/Advertissement.icon';
import AboutIcon from '../icons/About.icon';
import SignInIcon from '../icons/SignIn.icon';
import AdminIcon from '../icons/Admin.icon';
import { accountService } from '../services/account.service';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '../icons/Logout.icon';
import ButtonAddAdvert from './ButtonAddAdvert.component';

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
            console.log(response.data);
            setUser(response.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [logged, token]);

  let navigate = useNavigate();

  const logout = () => {
    accountService.logout();
    setLogged(false);
    navigate('/');
  } 

  const userType =  localStorage.getItem('type') || null;

  return (
    <nav className="bg-gunmetal">
      <div className="mx-auto container flex items-center justify-between">
        <Link to="/" className="text-white text-4xl font-bold text-center">
          <span className="text-gradient font-extrabold text-5xl">&#123;EpiJob&#125;</span>
          <span className="text-bleugris font-bold text-3xl ml-2">{userType === 'company' ? 'for company' : userType === 'user' ? 'for user' : ''}</span>
        </Link>
        <ul className="hidden md:flex space-x-14 items-center bg-gunemetal p-4 rounded-xl text-xl">
          <li>
            <Link
              to="/"
              className="text-white flex items-center hover:underline hover:underline-offset-2 decoration-white font-bold"
            >
              <HomeIcon className="mr-2" />
              <span className='ml-2 hover:scale-110 duration-100'>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/annonces"
              className="text-white flex items-center hover:underline decoration-white font-bold"
            >
              <AdvertissementIcon className="mr-2" />
              <span className='ml-2 hover:scale-110 duration-100'>Adverts</span>
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="text-white flex items-center hover:underline decoration-white font-bold"
            >
              <AboutIcon className="mr-2" />
              <span className='ml-2 hover:scale-110 duration-100'>About</span>
            </Link>
          </li>
          {userType === 'company' && (
            <li>
              <ButtonAddAdvert />
            </li>
          )}
          <li>
            {!logged ? (
              <div className="bg-bleugris rounded-lg px-4 py-2 flex items-center">
                <Link
                  to="/signin"
                  className="text-white hover:underline decoration-white hover:scale-110 duration-100"
                >
                  <div className='flex justify-center'>
                    <AdminIcon className="mr-2" />
                    <span className='ml-2'>Connexion</span>
                  </div>
                  
                </Link>
                <span className="ml-3 text-white">/</span>
                <Link
                  to="/signup"
                  className="text-white hover:underline decoration-white ml-4 hover:scale-110 duration-100"
                >
                  <div className='flex justify-center'>
                    <SignInIcon className="mr-2" />
                    <span className='ml-2'>Inscription</span>
                  </div>
                  
                </Link>
              </div>
            ) : (
              <div className="">
                <button
                  onClick={logout}
                  className="flex items-center bg-bleugris rounded-lg font-bold hover:scale-110 duration-200 px-4 py-2 text-white hover:underline decoration-white"
                >
                  <LogoutIcon />
                  <span className='ml-2'>Logout</span>
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;