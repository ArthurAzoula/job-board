import React, { useState, useEffect } from "react";
import axios from "axios";
import BreadCrumb from "../components/FilArianne.component";

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
          console.log(response.data);

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
                    { companyId: company.id, adverts: advertsResponse.data },
                  ]);
                }
              })
              .catch((err) => console.log(err));
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <BreadCrumb items={items} />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {companies.map((company) => (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg"
              key={company.id}
            >
              {/* ... Autres détails de l'entreprise ... */}
              <p className="text-gray-700 text-base font-bold">Mail: </p>{" "}
              <span>{company.email}</span>
              {/* Annonces de l'entreprise */}
              <div>
                <h2>Annonces de {company.nom}</h2>
                <ul>
                  {advertsByCompany
                    .find((adverts) => adverts.companyId === company.id)
                    ?.adverts.map((advert) => (
                      <li key={advert.advertissement_id}>{advert.titre}</li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Companies;
