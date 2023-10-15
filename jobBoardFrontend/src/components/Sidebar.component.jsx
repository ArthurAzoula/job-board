import React, { useState } from "react";
import SettingsIcon from "../icons/Settings.icon";
import AdminIcon from "../icons/Admin.icon";
import CandidatureIcon from "../icons/Candidature.icon";
import Settings from "./Settings.component";

const   Sidebar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [showCandidature, setShowCandidature] = useState(false);

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
    setShowCandidature(false);
  };

  const handleCandidatureClick = () => {
    setShowCandidature(!showCandidature);
    setShowAccount(false);
  };

  return (
    <div className="Sidebar fixed">
      <div className="bg-gray-100 h-screen p-4 w-full text-gunmetal">
        <div className="flex flex-col">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-2xl">Mon espace</h1>
          </div>

          <div className="flex flex-col gap-2 mb-4 justify-center">
            {" "}
            <button
              className=" w-full py-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition duration-200"
              onClick={handleCandidatureClick}
            >
              <span className="flex justify-center">
                <CandidatureIcon />
              </span>
              <span className="ml-2">Applications</span>
            </button>
            <button
              className="text-left w-full py-2 px-4 rounded-lg bg-gray-800 hover-bg-gray-700 text-white transition duration-200"
              onClick={handleAccountClick}
            >
              <span className="flex justify-center">
                <SettingsIcon />
              </span>
              <span className="ml-2 flex justify-center">Settings</span>
            </button>
          </div>

          {showCandidature && (
            <div className="flex flex-col">
              <p>En cours</p>
              <p>Refusé</p>
              <p>Admis</p>
            </div>
          )}

          {showAccount && (
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
