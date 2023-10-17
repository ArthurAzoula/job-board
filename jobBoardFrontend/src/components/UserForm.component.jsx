import { useState } from 'react';

import react from 'react'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const [credentials, setCredentials] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
    });

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    };

    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        axios.post('http://localhost:3000/api/users', credentials, {
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow CORS
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                console.log(res);
                toast.success('Inscription client réussie!');
                window.setTimeout(() => {
                    navigate('/signin');
                    window.location.reload();
                }, 3000);
            })
            .catch((err) => {
                console.log(err.response);
                toast.error('Inscription client échouée!');
            })
    };

    return (
        <form className='mt-6' onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="nom" className="block text-gray-700 font-bold mb-2">
                        Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={credentials.nom}
                        placeholder='Doe'
                        onChange={onChange}
                        required
                        maxLength={50}
                    />
                    <p className="text-gray-500 text-sm mt-1">Veuillez entrer votre nom complet.</p>
                </div>
                <div>
                    <label htmlFor="prenom" className="block text-gray-700 font-bold mb-2">
                        Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={credentials.surname}
                        placeholder='John'
                        onChange={onChange}
                        required
                        maxLength={50}
                    />
                    <p className="text-gray-500 text-sm mt-1">Veuillez entrer votre prénom complet.</p>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.email}
                    placeholder='jonhdoe@mail.com'
                    onChange={onChange}
                    required
                />
                <p className="text-gray-500 text-sm mt-1">Veuillez entrer une adresse email valide.</p>
            </div>
            <div className="mb-4">
                <label htmlFor="telephone" className="block text-gray-700 font-bold mb-2">
                    Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.telephone}
                    placeholder='0778794962'
                    onChange={onChange}
                    required
                    pattern="[0-9]{10}"
                />
                <p className="text-gray-500 text-sm mt-1">Veuillez entrer un numéro de téléphone valide (10 chiffres).</p>
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                    Mot de passe <span className="text-red-500">*</span>
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.password}
                    placeholder='********'
                    onChange={onChange}
                    required
                    maxLength={50}
                    minLength={8}
                />
                <p className="text-gray-500 text-sm mt-1">Veuillez Entrez un mot de passe avec au moins 8 caractères.</p>
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

export default UserForm;