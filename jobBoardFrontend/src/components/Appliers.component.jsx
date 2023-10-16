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
    const [applierUser, setAppplierUser] = useState(null);
    const [applierAnonymous, setAppplierAnonymous] = useState(null);
    const [advert, setAdvert] = useState(null);

    useEffect(() => {
        const fetchCompanyId = async () => {
            try {
                if (logged) {
                    const response = await axios.get(`http://localhost:3000/api/auth/me/${token}`);
                    if (localStorage.getItem('type') === 'company') {
                        setCompanyId(response.data.company_id);
                    } else if (localStorage.getItem('type') === 'user') {
                        setUser(response.data);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCompanyId();
    }, [logged, token]);

    useEffect(() => {
        if (companyId) {
            axios.get(`http://localhost:3000/api/jobapplications?company_id=${companyId}`)
                .then((response) => {
                    setJobapplications(response.data);
                })
                .catch((err) => console.log(err));
        }
    }, [companyId]);

    useEffect(() => {
        if (companyId) {
            axios.get(`http://localhost:3000/api/companies/${companyId}`)
                .then((response) => {
                    setCompany(response.data);
                })
                .catch((err) => console.log(err));
        }
    }, [companyId]);

    useEffect(() => {
        if (jobapplications.length > 0) {
            jobapplications.forEach((jobapplication) => {
                if (jobapplication.people_id !== null && jobapplication.anonymous_id === null) {
                    axios.get(`http://localhost:3000/api/users/${jobapplication.people_id}`)
                        .then((response) => {
                            setAppplierUser((prevUser) => ({
                                ...prevUser,
                                [jobapplication.id]: response.data,
                            }));
                        })
                        .catch((err) => console.log(err));
                }
                if (jobapplication.people_id === null && jobapplication.anonymous_id !== null) {
                    axios.get(`http://localhost:3000/api/anonymous/${jobapplication.anonymous_id}`)
                        .then((response) => {
                            setAppplierAnonymous((prevAnonymous) => ({
                                ...prevAnonymous,
                                [jobapplication.id]: response.data,
                            }));
                        })
                        .catch((err) => console.log(err));
                }
            });
        }
    }, [jobapplications]);

    useEffect(() => {
        if (jobapplications.length > 0) {
            jobapplications.forEach((jobapplication) => {
                if (jobapplication.advertissement_id) {
                    axios.get(`http://localhost:3000/api/advertissements/${jobapplication.advertissement_id}`)
                        .then((response) => {
                            setAdvert((prevAdvert) => ({
                                ...prevAdvert,
                                [jobapplication.id]: response.data,
                            }));
                        })
                        .catch((err) => console.log(err));
                }
            });
        }
    }, [jobapplications]);



    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Job Applications</h1>
            {jobapplications.length === 0 && <p>No job applications found.</p>}
            {company && jobapplications.length > 0 && (
                <div className="grid grid-cols-1 gap-4 overflow-y-scroll">
                    {jobapplications.map((jobapplication) => {
                        console.log(jobapplication)
                        const user = applierUser && applierUser[jobapplication.people_id] && { ...applierUser[jobapplication.people_id] };
                        const anonymous = applierAnonymous && applierAnonymous[jobapplication.anonymous_id];
                        const advertisement = advert && advert[jobapplication.id];
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
}

export default Appliers;