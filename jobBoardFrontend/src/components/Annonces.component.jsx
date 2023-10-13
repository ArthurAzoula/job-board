import Filtres from "./Filtres.component";
import { useEffect, useState } from "react";
import axios from "axios";

const Annonces = () => {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "localhost:3000/api/advertissements",
      responseType: "json",
    })
      .then((response) => {
        if (response.status === 200) {
          setAnnonces(response.data);
        } else {
          console.error("Erreur lors de la récupération des données de l'API");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête API : " + error);
      });
  }, []);

  return (
    <>
      <div className="flex justify-center mt-12">
        <Filtres />
      </div>
      <div></div>
    </>
  );
};

export default Annonces;
