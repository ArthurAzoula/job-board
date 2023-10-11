import React from "react";
import logo from '../assets/logo/logo_EpiJob/png/white_transparent.png'

function Navbar() {
  return (
    <nav className="bg-gunmetal">
      <div className="mx-auto container flex items-center justify-between">
        <img className="h-12 max-w-lg mr-3" src={logo} alt="Logo" />
        <a href="/" className="text-white text-4xl font-bold text-center">
          EpiJob
        </a>
        <ul className="flex space-x-4 items-center bg-bleugris p-4 rounded-md">
          <li>
            <a href="/" className="text-white hover:text-gunmetal">
              Home
            </a>
          </li>
          <li>
            <a href="/annonces" className="text-white hover:text-gunmetal">
              Adverts
            </a>
          </li>
          <li>
            <a href="/services" className="text-white hover:text-gunmetal">
              About
            </a>
          </li>
          <li>
            <div className="bg-dogwood rounded-full px-4 py-2">
              <a href="/signin" className="text-cerulean hover:text-gunmetal">
                Signin 
              </a>
              <span className="ml-3 text-cerulean">/</span>
              <a
                href="/signup"
                className="text-cerulean hover:text-gunmetal ml-4"
              >
                Signup
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
