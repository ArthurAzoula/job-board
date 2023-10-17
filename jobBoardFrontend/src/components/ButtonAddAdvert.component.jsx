import { useState, useEffect } from 'react';
import PlusIcon from "../icons/Plus.icon";
import Modal from './Modal.component';
import axios from 'axios'; import { accountService } from '../services/account.service';
import { getUserConnected } from '../api/calls.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa";

const ButtonAddAdvert = () => {
    const [showModal, setShowModal] = useState(false);
    const [logged, isLogged] = useState(accountService.isLogged());
    const [id, setId] = useState(0);

    let navigate = useNavigate();

    useEffect(() => {
        if (logged) {
            const userConnectedPromise = getUserConnected(localStorage.getItem('token'));

            userConnectedPromise.then((user) => {
                if (user && user.company_id) {
                    setId(user.company_id);
                }
            });
        }
    }, [logged]);

    const [credentials, setCredentials] = useState({
        titre: '',
        description: '',
        type_contrat: '',
        company_id: 0,
        remuneration: '',
        working_time: '',
        lieu: '',
    });

    const token = accountService.getToken() || null;

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3000/api/advertissements', credentials, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type_contrat': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then((res) => {
                toast.success('Annonce ajoutée avec succès!');
                closeModal();
                window.setInterval(() => {
                    navigate('/annonces');
                    window.location.reload();
                }, 3000);
            })
            .catch((err) => {
                console.log(err.response)
                toast.error('Erreur lors de l\'ajout de l\'annonce!');
            });
    };

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            company_id: id,
            [e.target.name]: e.target.value,
        })
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
      <>
        <button
          className="bg-white border hover:scale-110 duration-300 border-black text-gunmetal px-4 py-2 rounded-md flex items-center"
          onClick={openModal}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          <span className='hidden lg:inline'>
            Ajouter une annonce
          </span>
        </button>
        {showModal && (
          <Modal closeModal={closeModal}>
            <form onSubmit={onSubmit}>
              <h1 className="text-gray-700 font-bold mb-4 text-center uppercase">
                Ajouter une annonce
              </h1>
              <div className="mb-4">
                <label
                  htmlFor="titre"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Titre
                </label>
                <input
                  type="text"
                  id="titre"
                  name="titre"
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="type_contrat"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Type de contrat
                </label>
                <select
                  id="type_contrat"
                  name="type_contrat"
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="stage">Stage</option>
                  <option value="cdd">CDD</option>
                  <option value="cdi">CDI</option>
                  <option value="alternance">Alternance</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="remuneration"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Rémunération
                </label>
                <input
                  type="text"
                  id="remuneration"
                  name="remuneration"
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="working_time"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Temps de travail
                </label>
                <input
                  type="text"
                  id="working_time"
                  name="working_time"
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lieu"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Lieu
                </label>
                <input
                  type="text"
                  id="lieu"
                  name="lieu"
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-bleugris text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Créer
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={closeModal}
                >
                  Annuler
                </button>
              </div>
            </form>
          </Modal>
        )}
        <ToastContainer />
      </>
    );
};

export default ButtonAddAdvert;