import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocalisationIcon from "../icons/Localisation.icon";
import KeyWordsIcon from "../icons/KeyWords.icon";
import LoopIcon from "../icons/Loop.icon";
import axios from "axios";
import Modal from "./Modal.component";
import HiringImage from "../assets/images/hiring.jpg";
import ContractIcon from "../icons/Contract.icon";
import { Link } from "react-router-dom";

const Filtres = () => {
  const [credentials, setCredentials] = useState({
    titre: "",
    type_contrat: "",
    city: "",
  });
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdvert, setSelectedAdvert] = useState(null);

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${e.target.value}&type=municipality`
    )
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.features.map((feature) => feature.properties.city));
      });
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:3000/api/advertissements/filters?keywords=${credentials.titre}&city=${city}&contract=${credentials.type_contrat}`
      );
      console.log(response.data);
      if (response.data.length > 0) {
        setAdvertisements(response.data);
        setShowModal(true);
      } else {
        toast.error("No matching adverts found");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching adverts");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col sm:flex-row pt-4 pb-4 w-2/3 justify-center items-center bg-grisclair rounded-lg">
      <form className="flex flex-col 2xl:flex-row sm:space-x-4 w-full sm:items-center" onSubmit={handleSubmit}>
        <div className="relative flex md:ml-4 justify-center items-center mb-4 w-full sm:w-2/3 2xl:w-full 2xl:mb-0">
          <KeyWordsIcon className="absolute left-2 ml-2 bg-gray-400 text-gray-400" />
          <span className="ml-2"></span>
          <input
            type="text"
            name="titre"
            id="titre"
            placeholder="Rechercher des mots clés (Développeur, Full-Stack, Back-end)"
            className="pl-2 pr-2 py-2 w-full rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={credentials.titre}
            onChange={onChange}
          />
        </div>

        <div className="relative flex justify-center items-center w-full sm:w-2/3 2xl:w-full mb-4 2xl:mb-0">
          <ContractIcon className="absolute left-2 ml-2 bg-gray-400 text-gray-400" />
          <span className="ml-2"></span>
          <select
            className="pl-2 py-2 w-full rounded-md bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="type_contrat"
            id="type_contrat"
            value={credentials.type_contrat}
            onChange={onChange}
          >
            <option value="">
              Type de contrat
            </option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
            <option value="Alternance">Alternance</option>
          </select>
        </div>

        <div className="relative flex justify-center items-center w-full sm:w-2/3 mb-4 md:mb-0">
          <LocalisationIcon className="absolute left-2 text-gray-400" />

          <span className="ml-1"></span>
          <input
            type="text"
            placeholder="Ville"
            name="city"
            id="city"
            className="pl-2 pr-2 py-2 w-full rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={city}
            onChange={handleCityChange}
          />
          {suggestions.length > 0 && city.length > 0 && (
            <ul
              className="absolute z-10 w-full py-1 bg-white rounded-md shadow-lg border border-gray-300"
              style={{ top: "40px", left: "0" }}
            >
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative flex justify-center items-center">
          <button className="bg-bleugris p-2 mr-4 mt-4 2xl:mt-0 rounded-full hover:scale-110 duration-200 text-white font-bold">
            <LoopIcon className="inline-block" />
          </button>
        </div>
      </form>
      {advertisements.length > 0 && showModal && (
        <Modal closeModal={closeModal}>
          <div className="flex flex-col items-center mt-4 w-full">
            <h2 className="text-2xl font-bold mb-2">{advertisements.length} annonce(s) trouvée(s)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {advertisements.map((advert) => (
                <div key={advert.advertissement_id}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={HiringImage} alt={advert.titre} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-2">{advert.titre}</h2>
                      <p className="text-gray-700 mb-2">{advert.description}</p>
                      <div className="flex items-center">
                        <LocalisationIcon />
                        <p className="text-gray-700 ml-1">{advert.lieu}</p>
                      </div>
                      <div className="flex items-center mt-2">
                        <ContractIcon />
                        <p className="text-gray-700 ml-1">{advert.type_contrat}</p>
                      </div>
                      <div className="mt-4">
                        <Link to={`/annonces/${advert.advertissement_id}`} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
                          <span>Voir l'annonce</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Filtres;


