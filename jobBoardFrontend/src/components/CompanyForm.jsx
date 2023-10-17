import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyForm = () => {
    const [credentials, setCredentials] = useState({
        nom: '',
        description: '',
        telephone: '',
        adresse: '',
        email: '',
        password: ''
    });

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(credentials);
        axios
            .post('http://localhost:3000/api/companies', credentials, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                console.log(res);
                toast.success('Inscription entreprise réussie!');
                window.setTimeout(() => {
                    navigate('/signin');
                    window.location.reload();
                }, 3000);
            })
            .catch((err) => {
                console.log(err.response);
                toast.error('Inscription entreprise échouée!');
            });
    };

    return (
        <form className="mt-6" onSubmit={onSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                    Nom de l'entreprise
                </label>
                <input
                    type="text"
                    id="name"
                    name="nom"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.nom}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.description}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="telephone" className="block text-gray-700 font-bold mb-2">
                    Téléphone
                </label>
                <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.telephone}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="adress" className="block text-gray-700 font-bold mb-2">
                    Adresse
                </label>
                <input
                    type="text"
                    id="adresse"
                    name="adresse"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.adresse}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.email}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                    Mot de passe
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.password}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-gunmetal hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    S'inscrire
                </button>
            </div>
            <ToastContainer />
        </form>
    );
};

export default CompanyForm;