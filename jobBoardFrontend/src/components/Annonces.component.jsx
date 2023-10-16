import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Filtres from './Filtres.component';
import hiringImage from '../assets/images/hiring.jpg';
import formatDate from "../utils/function";
import Breadcrumb from './FilArianne.component';


const Annonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [logged, setLogged] = useState(false);

  const items = [
    { label: 'Home', path: '/' },
    { label: "Annonces", path: '/annonces'}
  ]

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/advertissements');
        setAnnonces(response.data);
        //console.log(response.data);
      } catch (error) {
        //console.error(error);
      }
    };

    fetchAnnonces();
  }, []);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/companies');
        setCompanies(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCompanies();
  }, []);

  const getCompanyName = (companyId) => {
    const company = companies.find((c) => c.company_id === companyId);
    return company ? company.nom : '';
  };

  return (
    <>
      <Breadcrumb items={items} />
      <div className="flex justify-center mt-12">
        <Filtres />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-12 ml-2 px-4">
        {annonces.map((annonce) => (
          <div key={annonce.advertissement_id} className="bg-white border rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition duration-300">
            <div className="relative">
              <img src={hiringImage} alt={annonce.titre} className="w-full h-48 object-cover" />
              <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-bl-lg">{annonce.type_contrat}</div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{annonce.titre}</h2>
              <p className="text-gray-700 text-base">{annonce.description}</p>
              <p className="text-gray-700 text-base mt-2">Posté par <b>{getCompanyName(annonce.company_id)}</b></p>
              <div className="flex justify-between items-center mt-4">
                <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-base">
                  <span className="font-bold">Publié le : </span> {formatDate(annonce.createdAt)}
                </div>
                <div>
                  <Link to={`/annonces/${annonce.advertissement_id}`} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">Voir l'annonce</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Annonces;