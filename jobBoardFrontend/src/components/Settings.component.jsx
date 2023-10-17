import React, { useEffect, useState } from "react";
import { accountService } from "../services/account.service";
import formatDate from "../utils/function";
import axios from "axios";
import { FaEnvelope, FaUser, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import Modal from './Modal.component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [logged, setLogged] = useState(accountService.isLogged());
  const [user, setUser] = useState([]);
  const token = accountService.getToken() || null;

  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("");

  const [credentialsUser, setCredentialsUser] = useState({
    prenom: user.prenom,
    nom: user.nom,
    email: user.email,
    telephone: user.telephone,
  });

  const [credentialsCompany, setCredentialsCompany] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    description: "",
  });

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

  const handleUserChange = (event) => {
    setCredentialsUser({
      ...credentialsUser,
      [event.target.name]: event.target.value,
    });
  }

  const handleCompanyChange = (event) => {
    setCredentialsCompany({
      ...credentialsCompany,
      [event.target.name]: event.target.value,
    });
  }

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    try {
      if (user && user.people_id) {
        // Validate form fields
        if (!credentialsUser.prenom || !credentialsUser.nom || !credentialsUser.email || !credentialsUser.telephone) {
          toast.error('Veuillez remplir tous les champs.');
          return;
        }
        const response = await axios.put(`http://localhost:3000/api/users/${user.people_id}`, credentialsUser);
        if (response.status === 200) {
          toast.success('Votre compte a été mis à jour avec succès !');
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue, veuillez réessayer plus tard.');
    }
  }

  const handleCompanySubmit = async (event) => {
    event.preventDefault();
    try {
      if (user && user.company_id) {
        // Validate form fields
        if (!credentialsCompany.nom || !credentialsCompany.email || !credentialsCompany.telephone || !credentialsCompany.adresse || !credentialsCompany.description) {
          toast.error('Veuillez remplir tous les champs.');
          return;
        }
        const response = await axios.put(`http://localhost:3000/api/companies/${user.company_id}`, credentialsCompany);
        if (response.status === 200) {
          toast.success('Votre compte a été mis à jour avec succès !');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue, veuillez réessayer plus tard.');
    }
  }

  return (
    <div className="h-screen flex items-start justify-center">
      {logged ? (
        <div className="p-4 border border-gray-300 rounded shadow-md w-full overflow-x ml-4">
          <ul className="list-none p-0 whitespace-normal text-justify">
            {localStorage.getItem('type') === 'user' && (
              <>
                <li className="flex sm:text-sm md:text-sm lg:text-lg xl:text-lg 2xl:text-lg mb-4">
                  <FaEnvelope className="mr-2 shrink-0" />
                  <span>{user.email}</span>
                </li>
                <li className="flex sm:text-sm md:text-sm lg:text-lg xl:text-lg 2xl:text-lg mb-4">
                  <FaUser className="mr-2" />
                  <span>{user.nom}</span>
                </li>
                <li className="flex items-center text-lg mb-4">
                  <FaUser className="mr-2" />
                  <span>{user.prenom}</span>
                </li>
                <li className="flex sm:text-sm md:text-sm lg:text-lg xl:text-lg 2xl:text-lg mb-4">
                  <FaPhone className="mr-2" />
                  <span>{user.telephone}</span>
                </li>
                <li className="flex sm:text-sm md:text-sm lg:text-lg xl:text-lg 2xl:text-lg mb-4">
                  <FaCalendarAlt className="mr-2" />
                  <span>{formatDate(user.createdAt)}</span>
                </li>
              </>
            )}
            {localStorage.getItem("type") === "company" && (
              <>
                <li className="flex sm:text-sm md:text-sm lg:text-lg xl:text-lg 2xl:text-lg mb-4">
                  <FaEnvelope className="mr-2 shrink-0" />
                  <span>{user.email}</span>
                </li>
                <li className="flex sm:text-sm md:text-sm lg:text-lg xl:text-lg 2xl:text-lg mb-4">
                  <FaUser className="mr-2" />
                  <span>{user.nom}</span>
                </li>
                <li className="flex sm:text-sm md:text-sm lg:text-lg xl:text-lg 2xl:text-lg mb-4">
                  <FaPhone className="mr-2" />
                  <span>{user.telephone}</span>
                </li>
                <li className="flex sm:text-sm md:text-sm lg:text-lg xl:text-lg 2xl:text-lg mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{user.adresse}</span>
                </li>
                <li className="flex sm:text-sm md:text-sm lg:text-lg xl:text-lg 2xl:text-lg mb-4">
                  <FaInfoCircle className="mr-2" />
                  <span>{user.description}</span>
                </li>
                <li className="flex sm:text-sm md:text-sm lg:text-lg xl:text-lg 2xl:text-lg mb-4">
                  <FaCalendarAlt className="mr-2" />
                  <span>{formatDate(user.createdAt)}</span>
                </li>
              </>
            )}
          </ul>
          <button className="bg-bleugris px-4 py-2 rounded-lg text-white" onClick={() => {
            setShowModal(true);
            setFormType(localStorage.getItem('type') === 'user' ? "user" : "company");
          }}>Modifier</button>
          {showModal && (
            <Modal closeModal={() => setShowModal(false)} className="bg-gray-100 p-4 rounded-lg">
              {formType === "user" ? (
                <form onSubmit={handleUserSubmit}>
                  <h1 className="p-2 text-gray-700 font-bold mb-2">Modifier votre compte user</h1>
                  <hr className="mb-2"></hr>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="prenom">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="prenom"
                      onChange={handleUserChange}
                      placeholder="Entrez votre prénom"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="nom">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="nom"
                      onChange={handleUserChange}
                      placeholder="Entrez votre nom"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="email"
                      name="email"
                      onChange={handleUserChange}
                      placeholder="Entrez votre email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="telephone">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="tel"
                      name="telephone"
                      onChange={handleUserChange}
                      placeholder="Entrez votre numéro de téléphone"
                      required
                    />
                  </div>
                  <button className="bg-bleugris hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sauvegarder
                  </button>
                </form>
              ) : (
                <form onSubmit={handleCompanySubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="nom">
                      Nom de l'entreprise <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="nom"
                      onChange={handleCompanyChange}
                      placeholder="Entrez le nom de l'entreprise"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="email"
                      name="email"
                      onChange={handleCompanyChange}
                      placeholder="Entrez l'email de l'entreprise"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="telephone">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="tel"
                      name="telephone"
                      onChange={handleCompanyChange}
                      placeholder="Entrez le numéro de téléphone de l'entreprise"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="adresse">
                      Adresse <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="adresse"
                      onChange={handleCompanyChange}
                      placeholder="Entrez l'adresse de l'entreprise"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="description"
                      onChange={handleCompanyChange}
                      placeholder="Entrez la description de l'entreprise"
                      required
                    ></textarea>
                  </div>
                  <button className="bg-bleugris text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sauvegarder
                  </button>
                </form>
              )}
            </Modal>
          )}
        </div>
      ) : (
        <p>Veuillez vous connecter pour accéder à cette page.</p>
      )}
    </div>
  );
};

export default Settings;