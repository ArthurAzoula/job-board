import React, { useEffect, useState } from "react";
import { accountService } from "../services/account.service";
import formatDate from "../utils/function";
import axios from "axios";

const Settings = () => {
  const [logged, setLogged] = useState(accountService.isLogged());
  const [user, setUser] = useState([]);
  const token = accountService.getToken() || null;

  useEffect(() => {
    if (logged) {
      axios({
        method: "GET",
        url: `http://localhost:3000/api/auth/me/${token}`,
        responseType: "json",
      })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [logged, token]);

  return (
    <div className="h-screen flex items-start justify-center">
      {logged ? (
        <div
          className="p-4 border border-gray-300 rounded shadow-md w-full max-w-xs overflow-auto ml-4"
        >
          {localStorage.getItem("type") === "user" ? (
            <ul className="list-none p-0">
              <li className="text-left text-lg">
                <strong>Email:</strong> {user.email}
              </li>
              <li className="text-left text-lg">
                <strong>Prénom:</strong> {user.prenom}
              </li>
              <li className="text-left text-lg">
                <strong>Nom:</strong> {user.nom}
              </li>
              <li className="text-left text-lg">
                <strong>Téléphone:</strong> {user.telephone}
              </li>
              <li className="text-left text-lg">
                <strong>Date de création:</strong> {formatDate(user.createdAt)}
              </li>
            </ul>
          ) : (
            <ul className="list-none p-0">
              <li className="text-left text-lg">
                <strong>Entreprise:</strong> {user.nom}
              </li>
              <li className="text-left text-lg">
                <strong>Email:</strong> {user.email}
              </li>
              <li className="text-left text-lg">
                <strong>Téléphone:</strong> {user.telephone}
              </li>
              <li className="text-left text-lg">
                <strong>Adresse:</strong> {user.adresse}
              </li>
              <li className="text-left text-lg">
                <strong>Description:</strong> {user.description}
              </li>
              <li className="text-left text-lg">
                <strong>Date de création:</strong> {formatDate(user.createdAt)}
              </li>
            </ul>
          )}
        </div>
      ) : (
        <p className="text-red-500">
          Veuillez vous connecter pour voir les informations.
        </p>
      )}
    </div>
  );
};

export default Settings;
