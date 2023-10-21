import React, { useState, useEffect } from "react";
import axios from "axios";
import BreadCrumb from "../components/FilArianne.component";
import { Carousel } from "react-responsive-carousel";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdError } from "react-icons/md";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Hiringimage from "../assets/images/hiring.jpg";
import { Link } from "react-router-dom";
import ContractIcon from "../icons/Contract.icon";
import LocalisationIcon from "../icons/Localisation.icon";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [advertsByCompany, setAdvertsByCompany] = useState([]);

  const items = [
    { label: "Accueil", href: "/" },
    { label: "Entreprises", href: "/companies" },
  ];

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3000/api/companies`,
      responseType: "json",
    })
      .then((response) => {
        if (response.status === 200) {
          setCompanies(response.data);
          //console.log(response.data);

          // Récupérer les annonces par entreprise
          response.data.forEach((company) => {
            axios({
              method: "GET",
              url: `http://localhost:3000/api/advertissements/company/${company.company_id}`, // Supposons que cette URL existe pour récupérer les annonces par entreprise
              responseType: "json",
            })
              .then((advertsResponse) => {
                if (advertsResponse.status === 200) {
                  setAdvertsByCompany((prevAdverts) => [
                    ...prevAdverts,
                    {
                      companyId: company.company_id,
                      adverts: advertsResponse.data,
                    },
                  ]);
                }
              })
              .catch((err) => {
                //console.log(err)
              });
          });
        }
      })
      .catch((err) => {
        //console.log(err)
      });
  }, []);

  return (
    <>
      <BreadCrumb items={items} />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <div
              className="max-w-md rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
              key={company.company_id}
            >
              <img
                src={Hiringimage}
                alt={company.nom}
                className="w-full h-48 object-cover"
              />
              <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2">{company.nom}</h2>
                <p className="text-gray-700 text-base mb-2">
                  {company.description}
                </p>
                <div className="flex items-center mb-2">
                  <FaEnvelope className="text-gray-700 mr-2" />
                  <span className="text-gray-700">{company.email}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaPhone className="text-gray-700 mr-2" />
                  <span className="text-gray-700">{company.telephone}</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-700 mr-2" />
                  <span className="text-gray-700">{company.adresse}</span>
                </div>
              </div>
              {/* Annonces de l'entreprise */}
              <div className="px-6 py-4">
                <h2 className="font-bold mb-2">
                  Annonces de {company.nom}: (
                  {advertsByCompany.find(
                    (adverts) => adverts.companyId === company.company_id
                  )?.adverts.length || 0}
                  )
                </h2>
                {advertsByCompany.find(
                  (adverts) => adverts.companyId === company.company_id
                )?.adverts.length > 0 ? (
                  <div className="bg-white rounded-lg p-4">
                    <Carousel
                      showArrows={true}
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop={true}
                      className="mb-4"
                      transitionTime={500}
                      interval={5000}
                      autoPlay={true}
                      stopOnHover={true}
                    >
                      {advertsByCompany
                        .find(
                          (adverts) => adverts.companyId === company.company_id
                        )
                        ?.adverts.map((advert) => (
                          <div
                            key={advert.advertissement_id}
                            className="bg-green-50 rounded-lg shadow-lg p-4 mb-4"
                          >
                            <h3 className="font-bold text-lg mb-2">
                              {advert?.titre}
                            </h3>
                            <p className="text-gray-700 mb-2">
                              {advert?.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <ContractIcon />
                                <p className="text-gray-700 ml-2">
                                  {advert?.type_contrat}
                                </p>
                              </div>
                              <div className="flex justify-between items-center">
                                <LocalisationIcon />
                                <p className="text-gray-700 mr-2">
                                  {advert?.lieu}
                                </p>
                              </div>
                            </div>
                            <Link
                              to={`/annonces/${advert.advertissement_id}`}
                              className="bg-green-500 text-white rounded-lg px-4 py-2 mt-4 inline-block hover:bg-green-600 transition-colors duration-300"
                            >
                              Voir l'annonce
                            </Link>
                          </div>
                        ))}
                    </Carousel>
                  </div>
                ) : (
                  <div className="bg-red-100 rounded-lg p-4 flex items-center">
                    <MdError className="text-red-500 mr-2" />
                    <span className="text-red-500">
                      Aucune annonce pour cette entreprise.
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Companies;
