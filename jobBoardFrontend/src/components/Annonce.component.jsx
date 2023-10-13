import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import hiringImage from '../assets/images/hiring.jpg';
import Breadcrumb from './FilArianne.component';

const Annonce = () => {
    const { id } = useParams();
    const [annonce, setAnnonce] = useState(null);
    const [company, setCompany] = useState(null);

    const items = [
        { label: "Home", path: "/" },
        { label: "Annonces", path: "/annonces"},
        { label: `${id}`, path: `/annonces/${id}` }
    ]

    useEffect(() => {
        const fetchAnnonce = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/advertissements/${id}`);
                setAnnonce(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAnnonce();
    }, [id]);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/companies/${annonce?.company_id}`);
                setCompany(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCompany();
    }, [annonce]);

    const handleApply = () => {
        // Lancer une requete post pour ajouter la candidature (si utiisateur type user connecté, ajouté les 
        // infos dynamiquement sinon créer un formulaire pour les utilisateurs non connectés)

        // Etapes
        // Faire un appel post avec Axios pour ajouter la candidature 'http://localhost:3000/api/jobapplications'
        // Passer les données du user dans le body de la requete
        // Si user connecté, envoyé les infos avec le user.nom, user.prenom, user.email, user.telephone, user.adresse etc....
        // Sinon faire le formulaire avec la modale et ajouter la candidature avec les infos du formulaire, ajouter également les infos dans la table anonymous

    };

    return (
        <>
            <Breadcrumb items={items} />
            <div className="bg-white rounded-lg mx-12 pt-12 h-2/3 shadow-xl overflow-hidden">
                {annonce ? (
                    <>
                        <div className="relative">
                            <img src={hiringImage} alt={annonce.titre} className="w-full h-48 object-cover" />
                            <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-bl-lg">{annonce.type_contrat}</div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-bold mb-2">{annonce.titre}</h2>
                            <p className="text-gray-700 text-base">{annonce.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <p className="text-gray-700 text-base">Posté par {company?.nom}</p>
                                    <p className="text-gray-700 text-base">{company?.adresse}</p>
                                    <p className="text-gray-700 text-base">{company?.telephone}</p>
                                    <p className="text-gray-700 text-base">{company?.email}</p>
                                </div>
                                <button onClick={handleApply} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">Postuler</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-700 text-base py-4">Chargement en cours...</p>
                )}
            </div>
        </>
    );
};

export default Annonce;