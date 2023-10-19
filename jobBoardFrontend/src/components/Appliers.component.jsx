import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserConnected } from '../api/calls.api';
import { accountService } from '../services/account.service';

const JobApplications = ({ user }) => {
    const [jobApplications, setJobApplications] = useState([]);
    const [role, setRole] = useState(localStorage.getItem('type')) || null;
    const [login, setLogin] =  useState(accountService.isLogged());
    const [userConnected, setUserConnected] = useState([]);
    const [advertissements, setAdvertissements] = useState([]);
    const [peoples, setPeoples] = useState([]);
    const [companies, setCompanies] = useState([]);

    const token = localStorage.getItem('token') || null;

    // Get the user (company or user) Connected
    useEffect(() => {

        const fetchUser = async () => {
            try {
                if (!token) return;

                const response = await getUserConnected(token);

                if (response && response.people_id) {

                    setUserConnected(response);
                    const getUserCandidature = await axios.get(`http://localhost:3000/api/jobapplications/user/${response?.people_id}`);

                    if (getUserCandidature.data.length > 0) {
                        //console.log(getUserCandidature);
                        setJobApplications(getUserCandidature.data);
                    }
                }
                else if (response && response.company_id) {

                    setUserConnected(response);
                    const getCompanyCandidature = await axios.get(`http://localhost:3000/api/jobapplications/advert/${response?.advertissement_id}`);

                    if (getCompanyCandidature.data.length > 0) {
                        setJobApplications(getCompanyCandidature.data);
                    }
                }

                if (jobApplications.length > 0) {
                    
                    const getAdverts = await axios.get(`http://localhost:3000/api/advertissements`);

                    if (getAdverts.data.length > 0) {
                        // Get the advertissemnts where id is in the jobApplications
                        const advert = getAdverts.data.filter((advert) => {
                            return jobApplications.some((jobApplication) => jobApplication.advertissement_id === advert.advertissement_id);
                        });

                        if (advert.length > 0) {
                            setAdvertissements(advert);
                        }
                    }

                    

                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Candidatures</h1>
            {jobApplications.length === 0 && <p>Aucune candidatures</p>}
            {jobApplications.map((jobApplication) => (
                <div key={jobApplication.id} className="border border-gray-300 rounded-lg p-4 mb-4">
                    
                </div>
            ))}
        </div>
    );
};

export default JobApplications;