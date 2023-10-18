import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Job1 from '../assets/images/job.jpg';
import Job2 from '../assets/images/job2.jpg';
import Job3 from '../assets/images/job3.png';
import Job4 from '../assets/images/job4.jpg';
import Job5 from '../assets/images/job5.jpeg';
import Job6 from '../assets/images/job6.jpg';
import Job7 from '../assets/images/job7.jpg';
import Breadcrumb from '../components/FilArianne.component';

const Home = () => {
    const items = [
        { label: "Home", path: "/"}
    ]

    return (
        <div className="bg-white">
            <Breadcrumb items={items} />
            <div className="mx-auto container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-gradient font-extrabold text-5xl animate-pulse mb-4">
                            Trouvez votre emploi de rêve avec EpiJob
                        </h1>
                        <p className="text-lg mb-8 animate-pulse">
                            EpiJob est la meilleure plateforme pour trouver votre emploi de rêve. Avec nos algorithmes de recherche avancés et nos recommandations personnalisées, vous pourrez trouver le travail parfait en un rien de temps.
                        </p>
                        <Link
                            to="/annonces"
                            className="bg-bleugris rounded-full px-4 py-2 font-bold text-center  text-white hover:underline decoration-white"
                        >
                            Parcourir les offres d'emploi
                        </Link>
                    </div>
                    <div className="relative">
                        <img
                            src={Job3}
                            alt="Recherche d'emploi"
                            className="rounded-xl animate-fade-in"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-xl"></div>
                    </div>
                </div>
            </div>
            <div className="bg-lightblue">
                <div className="mx-auto container py-16">
                    <h2 className="text-3xl font-bold mb-8 text-black animate__animated animate__fadeInUp">
                        Pourquoi EpiJob ?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Ajouter des animations ou des transitions pour les éléments ci-dessous */}
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">Recherche avancée</h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Nos algorithmes de recherche avancés vous permettent de trouver l'emploi parfait en fonction de vos compétences, de votre expérience et de vos préférences.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">
                                Recommandations personnalisées
                            </h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Nos recommandations personnalisées vous aident à découvrir de nouvelles opportunités d'emploi qui correspondent à vos intérêts et à vos objectifs de carrière.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">
                                Processus de candidature facile
                            </h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Notre processus de candidature facile vous permet de postuler à des emplois en quelques clics, afin que vous puissiez passer plus de temps à vous concentrer sur votre carrière.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">Employeurs de confiance</h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Nous nous associons à des employeurs de confiance pour vous offrir les meilleures opportunités d'emploi dans votre domaine.
                            </p>
                        </div>
                    </div>
                    <p className="text-lg mb-8 animate-pulse">
                        EpiJob n'est pas seulement une excellente plateforme pour les chercheurs d'emploi, mais aussi pour les entreprises à la recherche de talents exceptionnels. Avec nos algorithmes de recherche avancés et nos recommandations personnalisées, nous aidons les entreprises à trouver les meilleurs candidats pour leurs postes vacants. Notre processus de candidature facile permet également aux entreprises de recevoir et de passer en revue les candidatures rapidement, afin qu'elles puissent pourvoir rapidement leurs postes vacants.
                    </p>
                </div>
            </div>
            <div className="bg-white">
                <div className="mx-auto container py-16">
                    <h2 className="text-3xl font-bold mb-8 text-black animate__animated animate__fadeInUp">
                        Pour les chercheurs d'emploi
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">Trouvez votre emploi de rêve</h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Avec EpiJob, vous pouvez trouver le travail parfait en fonction de vos compétences, de votre expérience et de vos préférences. Utilisez notre recherche avancée et nos recommandations personnalisées pour découvrir de nouvelles opportunités d'emploi.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">
                                Postulez en quelques clics
                            </h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Notre processus de candidature facile vous permet de postuler à des emplois en quelques clics, afin que vous puissiez passer plus de temps à vous concentrer sur votre carrière.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">
                                Recevez des recommandations personnalisées
                            </h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Nos recommandations personnalisées vous aident à découvrir de nouvelles opportunités d'emploi qui correspondent à vos intérêts et à vos objectifs de carrière.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">Trouvez des employeurs de confiance</h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Nous nous associons à des employeurs de confiance pour vous offrir les meilleures opportunités d'emploi dans votre domaine.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-lightblue">
                <div className="mx-auto container py-16">
                    <h2 className="text-3xl font-bold mb-8 text-black animate__animated animate__fadeInUp">
                        Pour les entreprises
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">Trouvez les meilleurs candidats</h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Avec nos algorithmes de recherche avancés et nos recommandations personnalisées, nous aidons les entreprises à trouver les meilleurs candidats pour leurs postes vacants.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">
                                Publiez des offres d'emploi en quelques clics
                            </h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Notre processus de publication d'offres d'emploi facile vous permet de publier des offres d'emploi en quelques clics, afin que vous puissiez pourvoir rapidement vos postes vacants.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">
                                Recevez des candidatures rapidement
                            </h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Notre processus de candidature facile permet aux entreprises de recevoir et de passer en revue les candidatures rapidement, afin qu'elles puissent pourvoir rapidement leurs postes vacants.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">Trouvez des candidats de confiance</h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Nous nous associons à des chercheurs d'emploi de confiance pour vous offrir les meilleurs candidats pour vos postes vacants.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="mx-8 container py-16">
                    <h2 className="text-3xl font-bold mb-8 text-bleugris animate__animated animate__fadeInUp">Offres d'emploi en vedette</h2>
                    <div className="carousel-wrapper max-w-3xl mx-auto">
                        <Carousel
                            showArrows={true}
                            showThumbs={false}
                            showStatus={false}
                            infiniteLoop={true}
                            className="mb-16"
                        >
                            <div className="animate__animated animate__fadeIn">
                                <img
                                    src={Job1}
                                    alt="Emploi 1"
                                    className="rounded-xl"
                                />
                                <p className="legend text-bleugris">En recherche d'emploi</p>
                            </div>
                            <div className="animate__animated animate__fadeIn">
                                <img
                                    src={Job5}
                                    alt="Emploi 4"
                                    className="rounded-xl"
                                />
                                <p className="legend text-bleugris">Développeur</p>
                            </div>
                            <div className="animate__animated animate__fadeIn">
                                <img
                                    src={Job6}
                                    alt="Emploi 5"
                                    className="rounded-xl"
                                />
                                <p className="legend text-bleugris">Community Manager</p>
                            </div>
                            <div className="animate__animated animate__fadeIn">
                                <img
                                    src={Job7}
                                    alt="Emploi 6"
                                    className="rounded-xl"
                                />
                                <p className="legend text-bleugris">Ressources Humaines</p>
                            </div>
                        </Carousel>
                    </div>
                    <Link
                        to="/annonces"
                        className="bg-bleugris rounded-full px-4 py-2 text-white hover:underline decoration-white"
                    >
                        Parcourir toutes les offres d'emploi
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;