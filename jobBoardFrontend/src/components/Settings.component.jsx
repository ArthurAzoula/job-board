import React, { useEffect, useState } from "react";
import { accountService } from "../services/account.service";
import formatDate from "../utils/function";
import axios from "axios";
import { FaEnvelope, FaUser, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

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
        <div className="p-4 border border-gray-300 rounded shadow-md w-full max-w-xs overflow-auto ml-4">
          <ul className="list-none p-0 whitespace-normal text-justify">
            {localStorage.getItem('type') === 'user' && (
              <>
                <li className="flex items-center text-lg mb-4">
                  <FaEnvelope className="mr-2" />
                  <span>{user.email}</span>
                </li>
                <li className="flex items-center text-lg mb-4">
                  <FaUser className="mr-2" />
                  <span>{user.prenom} - {user.nom}</span>
                </li>
                <li className="flex items-center text-lg mb-4">
                  <FaPhone className="mr-2" />
                  <span>{user.telephone}</span>
                </li>
                <li className="flex items-center text-lg mb-4">
                  <FaCalendarAlt className="mr-2" />
                  <span>{formatDate(user.createdAt)}</span>
                </li>
              </>
            )}
            {localStorage.getItem('type') === 'company' && (
              <>
                <li className="flex items-center text-lg mb-4">
                  <FaEnvelope className="mr-2" />
                  <span>{user.email}</span>
                </li>
                <li className="flex items-center text-lg mb-4">
                  <FaUser className="mr-2" />
                  <span>{user.nom}</span>
                </li>
                <li className="flex items-center text-lg mb-4">
                  <FaPhone className="mr-2" />
                  <span>{user.telephone}</span>
                </li>
                <li className="flex items-center text-lg mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{user.adresse}</span>
                </li>
                <li className="flex items-center text-lg mb-4">
                  <FaInfoCircle className="mr-2" />
                  <span>{user.description}</span>
                </li>
                <li className="flex items-center text-lg mb-4">
                  <FaCalendarAlt className="mr-2" />
                  <span>{formatDate(user.createdAt)}</span>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : (
        <p>Veuillez vous connecter pour accéder à cette page.</p>
      )}
    </div>
  );
};

export default Settings;