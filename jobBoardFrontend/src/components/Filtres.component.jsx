import { useState } from "react";
import LocalisationIcon from "../icons/Localisation.icon";
import KeyWordsIcon from "../icons/KeyWords.icon";
import LoopIcon from "../icons/Loop.icon";
import ContractIcon from "../icons/Contract.icon";
import axios from "axios";

const Filtres = () => {
  const [credentials, setCredentials] = useState({
    titre: "",
    type_contrat: "",
  });
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(credentials);
  
    try {
      const response = axios.get(`http://localhost:3000/api/advertissements/filters?keywords=${credentials.titre}&type_contrat=${credentials.type_contrat}`)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    

    
  };

  return (
    <div className="flex flex-col md:flex-row pt-4 pb-4 w-2/3 justify-center items-center bg-grisclair rounded-lg">
      <form className="flex space-x-4" onSubmit={handleSubmit}>
        <div className="elative flex items-center pr-8">
          <KeyWordsIcon className="absolute left-2 bg-gray-400 text-gray-400" />
          <span className="ml-2"></span>
          <input
            type="text"
            name="titre"
            id="titre"
            placeholder="Rechercher des mots clés (Développeur, Full-Stack, Back-end)"
            className="pl-2 pr-2 py-2 w-96 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={credentials.titre}
            onChange={onChange}
          />
        </div>

        <div className="relative flex items-center pr-8">
          <ContractIcon className="absolute left-2 text-gray-400" />
          <span className="ml-2"></span>
          <select
            className="pl-2 pr-2 py-2 w-48 rounded-md bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="type_contrat"
            id="type_contrat"
            value={credentials.type_contrat}
            onChange={onChange}
          >
            <option disabled value="">Type de contrat</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
            <option value="Alternance">Alternance</option>
          </select>
        </div>

        <div className="relative flex items-center">
          <LocalisationIcon className="absolute left-2 text-gray-400" />

          <span className="ml-1"></span>
          <input
            type="text"
            placeholder="Ville"
            name="lieu"
            id="lieu"
            className="pl-2 pr-2 py-2 w-48 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={city}
            onChange={handleCityChange}
          />
        </div>
        <div className="relative items-center">
          {suggestions.length > 0 && city.length > 0 && (
            <ul
              className="absolute z-10 w-72 py-1 bg-white rounded-md shadow-lg border border-gray-300"
              style={{ top: "40px", left: "-250px" }}
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
        <div className="relative flex items-center">
          <button className="bg-bleugris p-2 mr-2 rounded-full hover:scale-110 duration-200 text-white font-bold">
            <LoopIcon className="inline-block" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filtres;