import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import hiringImage from '../assets/images/hiring.jpg';
import Breadcrumb from './FilArianne.component';
import Modal from './Modal.component';
import { accountService } from '../services/account.service';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaUser, FaInfoCircle } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { IoMdCash } from 'react-icons/io';
import { RiTimeFill } from 'react-icons/ri';
import formatDate from '../utils/function';
import { getAnonymousUserByEmail, getUserConnected } from '../api/calls.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Annonce = () => {
    const { id } = useParams();
    const [annonce, setAnnonce] = useState(null);
    const [company, setCompany] = useState(null);
    const [logged, setLogged] = useState(accountService.isLogged());
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [user, setUser] = useState(null);
    const [anonymous, setAnonymous] = useState(null);

    const items = [
        { label: "Home", path: "/" },
        { label: "Annonces", path: "/annonces" },
        { label: `${id}`, path: `/annonces/${id}` }
    ];

    useEffect(() => {
        if (id) {
            const fetchAnnonce = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/advertissements/${id}`);
                    setAnnonce(response.data);
                    //console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchAnnonce();
        }
    }, [id]);

    useEffect(() => {
        if (annonce && annonce.company_id) {
            const fetchCompany = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/companies/${annonce.company_id}`);
                    setCompany(response.data);
                    //console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchCompany();
        }
    }, [annonce]);

    const handleApply = () => {

        setShowModal(true);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (logged) {
            const userConnectedPromise = getUserConnected(localStorage.getItem('token'));

            userConnectedPromise.then((user) => {
                if (user && user.people_id) {
                    setUser(user);
                    // Send message to the company
                    const data = {
                        advertissement_id: id,
                        people_id: user.people_id,
                        status: 'pending',
                        message: message,
                    };
                    axios.post('http://localhost:3000/api/jobapplications', data)
                        .then(res => {
                            toast.success(`Merci pour votre candidature ${user.prenom} ${user.nom} !`);
                            closeModal()
                        })
                        .catch(err => {
                            toast.error('Erreur lors de l\'envoi de votre candidature !');
                        });
                }
            });
        } else {
            // Create the anonymous user
            axios.post('http://localhost:3000/api/anonymous', { nom: nom, prenom: prenom, email: email, telephone: telephone })
                .then((res) => {
                    const anonymous = res.data.anonymous;

                    const anonymousPromise = getAnonymousUserByEmail(email);

                    anonymousPromise.then((res) => {
                        if (res && res.anonymous) {
                            setAnonymous(res.anonymous);

                            const data = {
                                advertissement_id: id,
                                anonymous_id: res.anonymous.anonymous_id,
                                message: message,
                                status: 'pending',
                            };

                            axios.post('http://localhost:3000/api/jobapplications', data)
                                .then(res => {
                                    toast.success(`Merci pour votre candidature anonyme ${anonymous.prenom} ${anonymous.nom} !`);
                                    closeModal()
                                })
                                .catch(err => {
                                    toast.error('Erreur lors de l\'envoi de votre candidature anonyme !');
                                });
                        } else {
                            console.log('Error: anonymous user not found');
                        }
                    });
                })
                .catch((err) => {
                    //console.log(err)
                });
        }

        // Close the modal
        setShowModal(false);
    };

    return (
        <>
            <Breadcrumb items={items} />
            <div className="bg-white rounded-lg mx-12 h-2/3 shadow-xl border  hover:scale-95 duration-300 overflow-hidden">
                {annonce ? (
                    <>
                        <div className="relative border-b-2 border-gray-400">
                            <img src={hiringImage} alt={annonce.titre} className="w-full h-48 object-cover" />
                            <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-bl-lg">{annonce.type_contrat}</div>
                        </div>
                        <div className="p-4 block md:flex justify-between">
                            <div className="w-full md:w-1/2 pr-4">
                                <h2 className="text-3xl bg-gunmetal text-white p-2 rounded-lg mb-2">{annonce.titre}</h2>
                                <p className="text-gray-700 text-base">{annonce.description}</p>
                                <div className="flex items-center mt-4">
                                    <MdDateRange className="text-gray-700 mr-2" />
                                    <p className="text-gray-700 text-base">Publiée le <b>{formatDate(annonce.createdAt)}</b></p>
                                </div>
                                <div className="flex items-center mt-4">
                                    <IoMdCash className="text-gray-700 mr-2" />
                                    <p className="text-gray-700 text-base">{annonce.remuneration}</p>
                                </div>
                                <div className="flex items-center mt-4">
                                    <RiTimeFill className="text-gray-700 mr-2" />
                                    <p className="text-gray-700 text-base">{annonce.working_time}</p>
                                </div>
                                <div className="flex items-center mt-4">
                                    <FaMapMarkerAlt className="text-gray-700 mr-2" />
                                    <p className="text-gray-700 text-base">{annonce.lieu}</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 pl-0 md:pl-4 border-t md:border-t-0 md:border-l border-gray-300">
                                <h2 className="text-lg font-bold mb-2">À propos de l'entreprise</h2>
                                <div className="flex items-center mt-4">
                                    <FaUser className="text-gray-700 mr-2" />
                                    <p className="text-gray-700 text-base">{company?.nom}</p>
                                </div>
                                <div className="flex items-center mt-4">
                                    <FaInfoCircle className="text-gray-700 mr-2" />
                                    <p className="text-gray-700 text-base">{company?.description}</p>
                                </div>
                                <div className="flex items-center mt-4">
                                    <FaMapMarkerAlt className="text-gray-700 mr-2" />
                                    <p className="text-gray-700 text-base">{company?.adresse}</p>
                                </div>
                                <div className="flex items-center mt-4">
                                    <FaPhoneAlt className="text-gray-700 mr-2" />
                                    <p className="text-gray-700 text-base">{company?.telephone}</p>
                                </div>
                                <div className="flex items-center mt-4">
                                    <FaEnvelope className="text-gray-700 mr-2" />
                                    <p className="text-gray-700 text-base">{company?.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            {((localStorage.getItem('type') === 'user') || !localStorage.getItem('type')) ? (
                                <button onClick={handleApply} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">Postuler</button>
                            ) : (
                                <button disabled className="bg-green-200 text-white px-4 py-2 rounded-lg transition-colors duration-300">Postuler</button>
                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-700 text-base py-4">Chargement en cours...</p>
                )}
            </div>
            {showModal && (
                <Modal closeModal={closeModal}>
                    <h2 className="text-lg font-bold mb-2">Envoyer un message à l'entreprise</h2>
                    {logged ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message:</label>
                                <textarea id="message" name="message" value={message} onChange={(event) => setMessage(event.target.value)} className="w-full border border-gray-400 p-2 rounded-lg" rows="5" required></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-500 transition-colors duration-300">Annuler</button>
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">Envoyer</button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="nom" className="block text-gray-700 font-bold mb-2">Nom:</label>
                                <input id="nom" name="nom" value={nom} onChange={(event) => setNom(event.target.value)} type="text" className="w-full border border-gray-400 p-2 rounded-lg" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="prenom" className="block text-gray-700 font-bold mb-2">Prénom:</label>
                                <input id="prenom" name="prenom" value={prenom} onChange={(event) => setPrenom(event.target.value)} type="text" className="w-full border border-gray-400 p-2 rounded-lg" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
                                <input id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="w-full border border-gray-400 p-2 rounded-lg" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="telephone" className="block text-gray-700 font-bold mb-2">Téléphone:</label>
                                <input id="telephone" name="telephone" value={telephone} onChange={(event) => setTelephone(event.target.value)} type="tel" className="w-full border border-gray-400 p-2 rounded-lg" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message:</label>
                                <textarea id="message" name="message" value={message} onChange={(event) => setMessage(event.target.value)} className="w-full border border-gray-400 p-2 rounded-lg" rows="5" required></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-500 transition-colors duration-300">Annuler</button>
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">Envoyer</button>
                            </div>
                        </form>
                    )}
                </Modal>

            )}
            <ToastContainer />
        </>
    );
};

export default Annonce