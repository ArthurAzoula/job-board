import React from "react";

const Sidebar = () => {
  return (
    <div className="Sidebar flex">
      <div className="w-1/5 bg-bleugris h-screen p-4 text-white">
        {/* Cet élément a un arrière-plan bleu et occupe 20% de la largeur */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <p>Mon espace</p>
            <p className="ml-2">LOGO FLECHE</p>
          </div>

          <div className="flex items-center mb-4">
            <p>Mes Candidatures</p>
            <p className="ml-2">Mon compte</p>
          </div>

          <div className="flex flex-col">
            <p>En cours</p>
            <p>Refusé</p>
            <p>Admis</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-4/5">
        {/* Contenu de la sidebar */}
      </div>
    </div>
  );
};

export default Sidebar;
