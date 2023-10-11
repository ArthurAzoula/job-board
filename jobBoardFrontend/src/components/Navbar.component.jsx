import React from "react";

function Navbar() {
  return (
    <nav className="bg-gunmetal p-4">
      <div className="mx-auto container w-4/5 flex items-center justify-between">
        <a href="/" className="text-white text-2xl font-bold text-center">
          JobBoard de l'Entrepote
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
                Signin /
              </a>
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
