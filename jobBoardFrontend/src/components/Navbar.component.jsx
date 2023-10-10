import React from "react";

function Navbar() {
  return (
    <nav className="bg-gunmetal p-4">
      <div className="mx-auto container w-full flex items-center justify-between">
        <a href="/" className="text-dogwood text-2xl font-bold text-center">
          {" "}
          {/* Utilisation de text-center */}
          JobBoard de l'Entrepote
        </a>
        <ul className="flex space-x-4">
          <li className="ml-auto">
            <a href="/" className="text-dogwood hover:text-gunmetal">
              Accueil
            </a>
          </li>
          <li className="ml-auto">
            <a href="/about" className="text-dogwood hover:text-gunmetal">
              À propos
            </a>
          </li>
          <li className="ml-auto">
            <a href="/services" className="text-dogwood hover:text-gunmetal">
              Services
            </a>
          </li>
          <li className="ml-auto">
            <a href="/contact" className="text-dogwood hover:text-gunmetal">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
