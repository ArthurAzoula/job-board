import React, { useState } from "react";
import SettingsIcon from "../icons/Settings.icon";
import CandidatureIcon from "../icons/Candidature.icon";

import Settings from "./Settings.component";
import Appliers from "./Appliers.component";

const Sidebar = () => {

  const [show, setShow] = useState(false);

  const handleAccountClick = () => {
    setShow(!show);
  };

  const handleCandidatureClick = () => {
    setShow(!show);
  };

  return (
    <div className="w-full">
      <div className="bg-gray-100 h-screen p-4 w-full text-gunmetal">
        <div className="flex flex-col">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-2xl">Mon espace</h1>
          </div>

          <div className="flex flex-col gap-2 mb-4 justify-center items-center">
            <button
              className={`w-40 py-2 px-4 rounded-lg hover:bg-gray-300 ${
                show
                ? "bg-gray-800 text-white"
                : "bg-gray-300 text-gray-800"
              } transition duration-200`}
              onClick={handleCandidatureClick}
            >
              <span className="flex justify-center">
                <CandidatureIcon />
              </span>
              <span className="ml-2">Candidatures</span>
            </button>
            <button
              className={`w-40 py-2 px-4 rounded-lg hover:bg-gray-300 ${
                !show
                ? "bg-gray-800 text-white"
                : "bg-gray-300 text-gray-800"
              } transition duration-200`}
              onClick={handleAccountClick}
            >
              <span className="flex justify-center">
                <SettingsIcon />
              </span>
              <span className="ml-2 flex justify-center">Paramètres</span>
            </button>
          </div>

          {show && (
            <div className="flex flex-col">
              <Appliers changeScreen={show} />
            </div>
          )}

          {!show && (   
            <div className="flex flex-col">
              <Settings />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
