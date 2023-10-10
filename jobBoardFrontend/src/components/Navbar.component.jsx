import React from "react";
<<<<<<< HEAD
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Nav>
        <Bars>
          <NavMenu>
            <NavLink to="/" activeStyle>Home</NavLink>
            <NavLink to="/signin" activeStyle>Connexion</NavLink>
            <NavLink to="/signup" activeStyle>Inscription</NavLink>
            <NavLink to="/announces" activeStyle>Les annonces</NavLink>
          </NavMenu>
        </Bars>
      </Nav>
    </nav>
  );
};
=======

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
>>>>>>> feature/navbar

export default Navbar;
