import React, { useState, useEffect } from "react";
import axios from "axios";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

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
        }
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-4">
        {companies.map((company) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg"
            key={company.id}
          >
            <img src={company.imageURL} alt={company.nom} className="w-full" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Nom: {company.nom}</div>
              <p className="text-gray-700 text-base font-bold">Description:</p>
              <p className="text-gray-700 text-base"> {company.description}</p>
              <p className="text-gray-700 text-base font-bold">Adresse:</p>
              <span> {company.adresse}</span>
              <p className="text-gray-700 text-base font-bold">Mail: </p>{" "}
              <span>{company.email}</span>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {company.category}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {company.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
