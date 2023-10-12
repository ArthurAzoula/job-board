import { Link } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../assets/logo/logo_EpiJob/png/white_transparent.png';
import HomeIcon from '../icons/Home.icon';
import AdvertissementIcon from '../icons/Advertissement.icon';
import AboutIcon from '../icons/About.icon';
import SignInIcon from '../icons/SignIn.icon';
import AdminIcon from '../icons/Admin.icon';
import { accountService } from '../services/account.service';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isLogged, setIsLogged] = useState(accountService.isLogged());


  let navigate = useNavigate();

  const logout = () => {
    accountService.logout();
    navigate('/');
  }

  return (
    <nav className="bg-gunmetal">
      <div className="mx-auto container flex items-center justify-between">
        <Link to="/" className="text-white text-4xl font-bold text-center">
          EpiJob
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
          <li>
            {!isLogged ? (
            <div className="bg-bleugris rounded-full px-4 py-2 flex items-center">
              <Link
                to="/signin"
                className="text-white hover:underline decoration-white hover:scale-110 duration-100"
              >
                <AdminIcon className="mr-2" />
              </Link>
              <span className="ml-3 text-white">/</span>
              <Link
                to="/signup"
                className="text-white hover:underline decoration-white ml-4 hover:scale-110 duration-100"
              >
                <SignInIcon className="mr-2" />
              </Link>
              </div>
            ) : (
              <div className="bg-bleugris font-bold rounded-full px-4 py-2 flex items-center">
                  <button
                    onClick={logout}
                    className="bg-bleugris rounded-full hover:scale-110 duration-200 px-4 py-2 text-white hover:underline decoration-white"
                  >
                    Logout
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