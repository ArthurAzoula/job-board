import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserConnected } from '../api/calls.api';
import { accountService } from '../services/account.service';
import { Link } from 'react-router-dom';
import { FaEye, FaChevronRight, FaUsers, FaPhone, FaEnvelope, FaUserCircle, FaFacebookMessenger } from 'react-icons/fa';
import ContractIcon from '../icons/Contract.icon';
import LocalisationIcon from '../icons/Localisation.icon';
import Modal from './Modal.component';


const JobApplications = () => {
    const [jobApplications, setJobApplications] = useState([]);
    const [role, setRole] = useState(localStorage.getItem('type')) || null;
    const [login, setLogin] = useState(accountService.isLogged());
    const [userConnected, setUserConnected] = useState([]);
    const [advertissements, setAdvertissements] = useState([]);
    const [peoples, setPeoples] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [filteredAdverts, setFilteredAdverts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [appliers, setAppliers] = useState([]);


    const token = localStorage.getItem('token') || null;

    // Get the user (company or user) Connected
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!token) return;

                const response = await getUserConnected(token);

                if (response && response.people_id) {
                    setUserConnected(response);
                    const getUserCandidature = axios.get(`http://localhost:3000/api/jobapplications/user/${response?.people_id}`);
                    const getAdverts = axios.get(`http://localhost:3000/api/advertissements`);

                    const [userCandidatureResponse, advertsResponse] = await Promise.all([getUserCandidature, getAdverts]);

                    if (userCandidatureResponse.data.length > 0) {
                        setJobApplications(userCandidatureResponse.data);
                    }

                    if (advertsResponse.data.length > 0) {
                        setAdvertissements(advertsResponse.data);
                    }
                } else if (response && response.company_id) {
                    setUserConnected(response);

                    const getAllAdvertissements = axios.get(`http://localhost:3000/api/advertissements/company/${response?.company_id}`);

                    const [advertsByCompany] = await Promise.all([getAllAdvertissements]);

                    const jobApplicationsByAdvert = [];

                    for (const advert of advertsByCompany.data) {
                        const getJobApplications = axios.get(`http://localhost:3000/api/jobapplications/advert/${advert.advertissement_id}`);
                        const [jobApplicationsResponse] = await Promise.all([getJobApplications]);

                        if (jobApplicationsResponse.data.length > 0) {
                            jobApplicationsByAdvert.push({
                                advert: advert,
                                jobApplications: jobApplicationsResponse.data
                            });
                        }
                    }

                    if (jobApplicationsByAdvert.length > 0) {
                        setJobApplications(jobApplicationsByAdvert);
                    }

                    if (advertsByCompany.data.length > 0) {
                        setAdvertissements(advertsByCompany.data);
                    }
                }
            } catch (err) {
                //console.log(err);
            }
        };

        fetchUser();
    }, []);


    const handleShowAppliers = async (advertId) => {
        try {
            const jobApplicationsForAdvert = jobApplications.filter((jobApplication) => jobApplication.advert.advertissement_id === advertId);
            const appliers = [];
            for (const application of jobApplicationsForAdvert) {
                if (application && application.jobApplications) {
                    for (const jobApplication of application.jobApplications) {
                        if (jobApplication.people_id) {
                            const response = await axios.get(`http://localhost:3000/api/users/${jobApplication.people_id}`);
                            appliers.push({ ...response.data, message: jobApplication.message }); // add the message to the response data
                        } else if (jobApplication.anonymous_id) {
                            const response = await axios.get(`http://localhost:3000/api/anonymous/${jobApplication.anonymous_id}`);
                            appliers.push({ ...response.data.anonymous, message: jobApplication.message }); // add the message to the response data
                        }
                    }
                }
            }
            setAppliers(appliers);
            setShowModal(true);
        } catch (err) {
            //console.log(err);
        }
    };

    useEffect(() => {
        if (jobApplications.length === 0) return;

        if (role === 'user') {
            const filteredAdverts = advertissements.filter((advert) => {
                return jobApplications.some((jobApplication) => jobApplication.advertissement_id === advert.advertissement_id);
            });
            setFilteredAdverts(filteredAdverts);
        }

        if (role === 'company') {
            const filteredAdverts = advertissements.filter((advert) => {
                const jobApplicationsForAdvert = jobApplications.find((jobApplication) => jobApplication.advert.advertissement_id === advert.advertissement_id);
                return jobApplicationsForAdvert?.jobApplications?.length > 0;
            });
            setFilteredAdverts(filteredAdverts);
        }
    }, [advertissements, jobApplications]);

    return (
        <div className="container mx-auto px-4 py-8">
            {role === 'company' ? (
                <>
                    {advertissements.length > 0 && userConnected.company_id && (
                        <p className="mb-2 flex justify-center items-center gap-1">
                            <span className="font-bold text-red-500">
                                {jobApplications.reduce((total, application) => total + application.jobApplications.length, 0)}
                            </span>
                            <span>candidature{jobApplications.length > 1 ? 's' : ''}</span>
                            <span className="mx-2">
                                <FaChevronRight />
                            </span>
                            <span className="font-bold text-red-500">{advertissements.length}</span>
                            <span>{advertissements.length === 1 ? "annonce" : "annonces"}</span>
                        </p>
                    )}
                    {filteredAdverts.map((advert) => (
                        <div key={advert.advertissement_id} className="border border-gray-300 bg-white shadow-xl rounded-lg p-4 mb-4">
                            <h2 className="text-xl font-bold mb-2">{advert.titre}</h2>
                            <div className="text-gray-500 mb-2 flex justify-center items-center gap-2">
                                <FaUsers />
                                {jobApplications.reduce((total, application) => {
                                    if (application.advert.advertissement_id === advert.advertissement_id) {
                                        return total + application.jobApplications.length;
                                    }
                                    return total;
                                }, 0)} candidature{jobApplications.length > 1 ? 's' : ''}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Link to={`/annonces/${advert?.advertissement_id}`} className="bg-green-500 text-center text-white border hover:scale-110 duration-300 px-4 py-2 rounded-md flex items-center">
                                    <div className='flex items-center gap-4'>
                                        <FaEye />
                                        <span>Voir l'annonce</span>
                                    </div>
                                </Link>
                                <button onClick={() => handleShowAppliers(advert?.advertissement_id)} className="bg-bleugris text-center text-white border hover:scale-110 duration-300 px-4 py-2 rounded-md flex items-center">
                                    <div className='flex items-center gap-4'>
                                        <FaEye />
                                        <span>Voir les candidats</span>
                                    </div>
                                </button>
                                {showModal && (
                                    <Modal closeModal={() => setShowModal(false)}>
                                        {appliers.map((applier) => (
                                            <div key={applier?.people_id ? applier.people_id : applier.anonymous_id} className="border border-gray-300 bg-white shadow-xl rounded-lg p-4 mb-4">
                                                {console.log(applier)}
                                                <div className="flex items-center mb-4">
                                                    <FaUserCircle className="text-gray-500 mr-2" />
                                                    <h2 className="text-xl font-bold">{applier.nom} {applier.prenom}</h2>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <FaEnvelope className="text-gray-500 mr-2" />
                                                    <p className="text-gray-500">{applier.email}</p>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <FaPhone className="text-gray-500 mr-2" />
                                                    <p className="text-gray-500">{applier.telephone}</p>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <FaFacebookMessenger className="text-gray-500 mr-2" />
                                                    <p className="text-gray-500">{applier.message}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </Modal>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            ) : role === 'user' ? (
                <>
                    <h1 className="text-3xl font-bold mb-4">Vos candidatures</h1>
                    {jobApplications.length === 0 && <p>Aucune candidatures</p>}
                    {jobApplications.length > 0 && <p className='mb-2'>Vous avez postulé à <span className='font-bold text-red-500'>{jobApplications.length}</span> offre(s)</p>}
                    {filteredAdverts.map((advert) => (
                        <div key={advert.advertissement_id} className="border border-gray-300 bg-white shadow-xl rounded-lg p-4 mb-4">
                            <h2 className="text-xl font-bold mb-2">{advert.titre}</h2>
                            <p className="text-gray-500 mb-2">{advert.description}</p>
                            <div className='flex justify-center'>
                                <LocalisationIcon />
                                <p className="text-gray-500 mb-2">{advert.lieu}</p>
                            </div>
                            <div className='flex justify-center'>
                                <ContractIcon />
                                <p className="text-gray-500 mb-2">{advert.type_contrat}</p>
                            </div>
                            <Link to={`/annonces/${advert.advertissement_id}`} className="bg-green-500 text-center text-white border hover:scale-110 duration-300 px-4 py-2 rounded-md flex items-center">
                                <div className='flex items-center gap-4'>
                                    <FaEye />
                                    <span>Voir l'annonce</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </>
            ) : (
                <p>Connecter vous ou crée un compte pour acceder à cette page.</p>
            )
            }
        </div>
    );
};

export default JobApplications; 