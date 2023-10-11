import { useState } from 'react';

const UserForm = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                    Nom
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
                <label htmlFor="surname" className="block text-gray-700 font-bold mb-2">
                    Prénom
                </label>
                <input
                    type="text"
                    id="surname"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={telephone}
                    onChange={(event) => setTelephone(event.target.value)}
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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

export default UserForm;