import React from "react";
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
            <NavLink to="/" activeStyle>
              Home
            </NavLink>
            <NavLink to="/signin" activeStyle>
              Connexion
            </NavLink>
            <NavLink to="/signup" activeStyle>
              Inscription
            </NavLink>
            <NavLink to="/announces" activeStyle>
              Les annonces
            </NavLink>
          </NavMenu>
        </Bars>
      </Nav>
    </nav>
  );
};

export default Navbar;
