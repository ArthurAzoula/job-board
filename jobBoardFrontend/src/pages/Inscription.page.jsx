import { useState } from 'react';
import UserForm from '../components/UserForm.component';
import CompanyForm from '../components/CompanyForm';

const InscriptionPage = () => {
    const [isCompanyFormVisible, setIsCompanyFormVisible] = useState(false);
    const [isUserFormVisible, setIsUserFormVisible] = useState(false);

    const toggleCompanyForm = () => {
        setIsCompanyFormVisible(!isCompanyFormVisible);
        setIsUserFormVisible(false);
    };

    const toggleUserForm = () => {
        setIsUserFormVisible(!isUserFormVisible);
        setIsCompanyFormVisible(false);
    };

    return (
        <>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-100 py-8 px-4 shadow-lg sm:rounded-lg">
                    <div className="flex justify-center">
                        <button
                            className={`${
                                isCompanyFormVisible ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'
                            } py-2 px-4 font-medium rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                            onClick={toggleCompanyForm}
                        >
                            Entreprise
                        </button>
                        <button
                            className={`${
                                isUserFormVisible ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'
                            } py-2 px-4 font-medium rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                            onClick={toggleUserForm}
                        >
                            Client
                        </button>
                    </div>

                    {isCompanyFormVisible && (
                            <CompanyForm />
                    )}

                    {isUserFormVisible && (
                            <UserForm />

                    )}
                </div>
            </div>
        </>
    );
};

export default InscriptionPage;