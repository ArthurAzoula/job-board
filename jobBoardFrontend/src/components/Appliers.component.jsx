import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { accountService } from '../services/account.service';

const Appliers = () => {
    const [jobapplications, setJobapplications] = useState([]);
    const [companyId, setCompanyId] = useState(null);
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(accountService.isLogged());
    const [company, setCompany] = useState(null);
    const token = accountService.getToken() || null;
    const [applierUser, setAppplierUser] = useState({});
    const [applierAnonymous, setAppplierAnonymous] = useState({});
    const [advert, setAdvert] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/jobapplications?company_id=${companyId}`);
                console.log(response)
                setJobapplications(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        if (companyId !== null) {
            fetchJobApplications();
        }
    }, [companyId, token]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/auth/me/${token}`);
                setUser(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (logged) {
            fetchUser();
        }
    }, [logged, token]);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/companies/${user.company_id}`);
                setCompany(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (user !== null) {
            fetchCompany();
        }
    }, [user, token]);

    useEffect(() => {
        if (jobapplications.length > 0) {
            const userPromises = [];
            const anonymousPromises = [];
            const advertPromises = [];

            jobapplications.forEach((jobapplication) => {
                if (jobapplication.people_id !== null && jobapplication.anonymous_id === null) {
                    userPromises.push(axios.get(`http://localhost:3000/api/users/${jobapplication.people_id}`));
                }
                if (jobapplication.people_id === null && jobapplication.anonymous_id !== null) {
                    anonymousPromises.push(axios.get(`http://localhost:3000/api/anonymous/${jobapplication.anonymous_id}`));
                }
                if (jobapplication.advertissement_id !== null) {
                    advertPromises.push(axios.get(`http://localhost:3000/api/advertissements/${jobapplication.advertissement_id}`));
                }
            });

            Promise.all([...userPromises, ...anonymousPromises, ...advertPromises])
                .then((responses) => {
                    const users = {};
                    const anonymous = {};
                    const adverts = {};

                    responses.forEach((response) => {
                        if (response.config.url.includes('/users/')) {
                            users[response.data.people_id] = response.data;
                        }
                        if (response.config.url.includes('/anonymous/')) {
                            anonymous[response.data.anonymous_id] = response.data;
                        }
                        if (response.config.url.includes('/advertissements/')) {
                            adverts[response.data.advertissement_id] = response.data;
                        }
                    });

                    setAppplierUser(users);
                    setAppplierAnonymous(anonymous);
                    setAdvert(adverts);
                })
                .catch((err) => console.log(err));
        }
    }, [jobapplications]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Job Applications</h1>
            {jobapplications.length === 0 && <p>No job applications found.</p>}
            {company && jobapplications.length > 0 && (
                <div className="grid grid-cols-1 gap-4 overflow-y-scroll">
                    {jobapplications.map((jobapplication) => {
                        const user = applierUser[jobapplication.people_id] && { ...applierUser[jobapplication.people_id] };
                        const anonymous = applierAnonymous[jobapplication.anonymous_id];
                        const advertisement = advert[jobapplication.advertissement_id];
                        return (
                            <div key={jobapplication.jobapplication_id} className="bg-white rounded-lg shadow-md overflow-y-auto">
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2">{company.nom}</h2>
                                    <p className="text-gray-700 mb-2">{advertisement && advertisement.titre}.</p>
                                    <p className="text-gray-700 mb-2">Status : {jobapplication.status}</p>
                                    {user && (
                                        <p className="text-gray-700 mb-2">{user.prenom} {user.nom}</p>
                                    )}
                                    {anonymous && (
                                        <p className="text-gray-700 mb-2">{anonymous.email}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Appliers;