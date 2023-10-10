import React from "react";
import Navbar from "./Navbar.component";

const Header = () => {
    return (
      <header className="p-6 bg-cerulean">
        <div className="container mx-auto flex justify-between items-center">
          <Navbar />
        </div>
      </header>
    );
};

export default Header;
