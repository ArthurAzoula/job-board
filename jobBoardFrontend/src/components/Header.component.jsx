import React from "react";
import Navbar from "./Navbar.component";

const Header = () => {
    return (
      <header className="p-6 bg-gunmetal">
        <div className="container mx-auto">
          <Navbar />
        </div>
      </header>
    );
};

export default Header;
