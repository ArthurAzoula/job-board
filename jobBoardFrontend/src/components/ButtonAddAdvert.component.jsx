import { useState } from 'react';
import PlusIcon from "../icons/Plus.icon";
import Modal from './Modal.component';

const ButtonAddAdvert = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <button
                className="bg-white border border-black text-gunmetal px-4 py-2 rounded-md flex items-center"
                onClick={openModal}
            >
                <PlusIcon className="w-4 h-4 mr-2" />
                <span>Ajouter une annonce</span>
            </button>
            {showModal && (
                <Modal closeModal={closeModal}>
                    <form>
                        <h1 className='text-gray-700 font-bold mb-4 text-center uppercase'>Ajouter une annonce</h1>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                                Titre
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                                Type de contrat
                            </label>
                            <select
                                id="type"
                                name="type"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="stage">Stage</option>
                                <option value="cdd">CDD</option>
                                <option value="cdi">CDI</option>
                                <option value="alternance">Alternance</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="start_date" className="block text-gray-700 font-bold mb-2">
                                Date de début
                            </label>
                            <input
                                type="date"
                                id="start_date"
                                name="start_date"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="end_date" className="block text-gray-700 font-bold mb-2">
                                Date de fin
                            </label>
                            <input
                                type="date"
                                id="end_date"
                                name="end_date"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-bleugris text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Créer
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={closeModal}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
};

export default ButtonAddAdvert;