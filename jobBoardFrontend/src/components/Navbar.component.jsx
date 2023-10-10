import React from "react";

function Navbar() {
  return (
    <nav className="bg-cerulean p-4">
      <div className="mx-auto container w-full">
        <div className="flex items-center justify-between w-full">
          <a href="/" className="text-dogwood text-2xl font-bold">
            Mon Site
          </a>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-dogwood hover:text-gunmetal">
                Accueil
              </a>
            </li>
            <li>
              <a href="/about" className="text-dogwood hover:text-gunmetal">
                À propos
              </a>
            </li>
            <li>
              <a href="/services" className="text-dogwood hover:text-gunmetal">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="text-dogwood hover:text-gunmetal">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
