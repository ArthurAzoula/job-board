import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { accountService } from '../services/account.service';


const AuthentificationForm = () => {
    const[logged, setLogged] = useState(accountService.isLogged());

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',   
    });

    const onChange = (e) => {
        setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(credentials);
        axios.post('http://localhost:3000/api/auth/login', credentials)
            .then(res => {
                console.log(res.data.accessToken);
                accountService.saveToken(res.data.accessToken, res.data.type);
                toast.success('Connection successful!');
                window.setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 3000);
            })
            .catch(err => {
                console.log(err.response);
                toast.error('Connection failed!');
            });
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name='email'
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.email}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="password"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name='password'
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={credentials.password}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-gunmetal hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Se connecter
                </button>
                <a
                    href="#"
                    className="inline-block align-baseline font-bold text-sm ml-2 text-bleugris hover:text-blue-800"
                >
                    Mot de passe oublié ?
                </a>
            </div>
            <ToastContainer />
        </form>
    );
};

export default AuthentificationForm;