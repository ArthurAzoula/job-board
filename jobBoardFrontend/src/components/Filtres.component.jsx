const Filtres = () => {
  return (
    <div className="flex flex-col md:flex-row p-4 m-4 justify-around items-center bg-grisclair">
      <form className="flex space-x-4">
        <div className="flex items-center">
          <label className="bg-dogwood"></label>
          <input type="text" placeholder="Rechercher un mot" />
        </div>

        <div className="flex items-center">
          <label className="bg-dogwood"></label>
          <input type="text" placeholder="Type de contrat" />
        </div>

        <div className="flex items-center">
          <label className="bg-dogwood"></label>
          <input type="text" placeholder="Durée du contrat" />
        </div>
      </form>

      <button className="bg-bleugris p-2 m-2 rounded-full">Filtrer</button>
    </div>
  );
};

export default Filtres;
