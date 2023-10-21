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
        //onsole.log(credentials);
        axios
            .post('http://localhost:3000/api/companies', credentials, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                //console.log(res);
                toast.success('Inscription entreprise réussie!');
                window.setTimeout(() => {
                    navigate('/signin');
                    window.location.reload();
                }, 3000);
            })
            .catch((err) => {
                //console.log(err.response);
                toast.error('Inscription entreprise échouée!');
            });
    };

    return (
        <form className="mt-6" onSubmit={onSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                    Nom de l'entreprise <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="nom"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.nom}
                    onChange={onChange}
                    required
                    maxLength={50}
                    placeholder="Entrez le nom de votre entreprise"
                />
                <p className="text-gray-500 text-sm mt-1">Maximum 50 caractères.</p>
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.description}
                    onChange={onChange}
                    required
                    placeholder="Entrez une description de votre entreprise"
                />
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
                    onChange={onChange}
                    pattern="[0-9]{10}"
                    required
                    placeholder="Entrez le numéro de téléphone de votre entreprise"
                />
                <p className="text-gray-500 text-sm mt-1">Veuillez entrer un numéro de téléphone valide (10 chiffres).</p>
            </div>
            <div className="mb-4">
                <label htmlFor="adresse" className="block text-gray-700 font-bold mb-2">
                    Adresse <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="adresse"
                    name="adresse"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.adresse}
                    onChange={onChange}
                    required
                    placeholder="Entrez l'adresse de votre entreprise"
                />
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
                    onChange={onChange}
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    placeholder="Entrez l'adresse email de votre entreprise"
                />
                <p className="text-gray-500 text-sm mt-1">Veuillez entrer une adresse email valide.</p>
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
                    onChange={onChange}
                    required
                    minLength={8}
                    placeholder="Entrez un mot de passe sécurisé (au moins 8 caractères)"
                />
                <p className="text-gray-500 text-sm mt-1">Veuillez entrer un mot de passe sécurisé (au moins 8 caractères).</p>
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