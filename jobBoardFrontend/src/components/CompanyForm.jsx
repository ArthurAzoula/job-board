import { useState } from 'react';

const CompanyForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [telephone, setTelephone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                    Nom de l'entreprise
                </label>
                <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                    Description de l'entreprise
                </label>
                <textarea
                    id="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="telephone" className="block text-gray-700 font-bold mb-2">
                    Téléphone de l'entreprise
                </label>
                <input
                    type="tel"
                    id="telephone"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={telephone}
                    onChange={(event) => setTelephone(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                    Adresse de l'entreprise
                </label>
                <input
                    type="text"
                    id="address"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email de l'entreprise
                </label>
                <input
                    type="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    S'inscrire
                </button>
            </div>
        </form>
    );
};

export default CompanyForm;