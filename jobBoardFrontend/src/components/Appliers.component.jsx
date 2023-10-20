import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserConnected } from '../api/calls.api';
import { accountService } from '../services/account.service';
import { Link } from 'react-router-dom';
import { FaEye, FaLocationArrow } from 'react-icons/fa';
import ContractIcon from '../icons/Contract.icon';
import LocalisationIcon from '../icons/Localisation.icon';


const JobApplications = () => {
    const [jobApplications, setJobApplications] = useState([]);
    const [role, setRole] = useState(localStorage.getItem('type')) || null;
    const [login, setLogin] = useState(accountService.isLogged());
    const [userConnected, setUserConnected] = useState([]);
    const [advertissements, setAdvertissements] = useState([]);
    const [peoples, setPeoples] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [filteredAdverts, setFilteredAdverts] = useState([]);

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
                        setJobApplications(jobApplicationsByAdvert[0]);
                    }

                    if (advertsByCompany.data.length > 0) {
                        setAdvertissements(advertsByCompany.data);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, []);

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
                return jobApplications?.jobApplications?.some((apply) => apply.advertissement_id === advert.advertissement_id);
            });
            setFilteredAdverts(filteredAdverts);
        }
    }, [advertissements, jobApplications]);

    console.log(filteredAdverts);

    return (
        <div className="container mx-auto px-4 py-8">
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
        </div>
    );
};

export default JobApplications;