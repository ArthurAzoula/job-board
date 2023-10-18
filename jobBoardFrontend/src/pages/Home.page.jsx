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
                            Find your dream job with EpiJob
                        </h1>
                        <p className="text-lg mb-8 animate-pulse">
                            EpiJob is the best platform to find your dream job. With our
                            advanced search algorithms and personalized recommendations,
                            you'll be able to find the perfect job in no time.
                        </p>
                        <Link
                            to="/annonces"
                            className="bg-bleugris rounded-full px-4 py-2 font-bold text-center  text-white hover:underline decoration-white"
                        >
                            Browse Jobs
                        </Link>
                    </div>
                    <div className="relative">
                        <img
                            src={Job3}
                            alt="Job search"
                            className="rounded-xl animate-fade-in"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-xl"></div>
                    </div>
                </div>
            </div>
            <div className="bg-lightblue">
                <div className="mx-auto container py-16">
                    <h2 className="text-3xl font-bold mb-8 text-black animate__animated animate__fadeInUp">
                        Why EpiJob?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Add some animations or transitions for the items below */}
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">Advanced Search</h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Our advanced search algorithms allow you to find the perfect job
                                based on your skills, experience, and preferences.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">
                                Personalized Recommendations
                            </h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Our personalized recommendations help you discover new job
                                opportunities that match your interests and career goals.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">
                                Easy Application Process
                            </h3>
                            <p className="text-lg mb-8 animate-pulse">
                                Our easy application process allows you to apply for jobs with
                                just a few clicks, so you can spend more time focusing on your
                                career.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4 animate-bounce">Trusted Employers</h3>
                            <p className="text-lg mb-8 animate-pulse">
                                We partner with trusted employers to bring you the best job
                                opportunities in your field.
                            </p>
                        </div>
                    </div>
                    <p className="text-lg mb-8 animate-pulse">
                        EpiJob is not only a great platform for job seekers, but also for
                        companies looking to hire top talent. With our advanced search
                        algorithms and personalized recommendations, we help companies find
                        the best candidates for their open positions. Our easy application
                        process also makes it simple for companies to receive and review
                        applications, so they can quickly fill their open positions.
                    </p>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="mx-8 container py-16">
                    <h2 className="text-3xl font-bold mb-8 text-bleugris animate__animated animate__fadeInUp">Featured Jobs</h2>
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
                                    alt="Job 1"
                                    className="rounded-xl"
                                />
                                <p className="legend text-bleugris">Job 1</p>
                            </div>
                            <div className="animate__animated animate__fadeIn">
                                <img
                                    src={Job2}
                                    alt="Job 2"
                                    className="rounded-xl"
                                />
                                <p className="legend text-bleugris">Job 2</p>
                            </div>
                            <div className="animate__animated animate__fadeIn">
                                <img
                                    src={Job4}
                                    alt="Job 3"
                                    className="rounded-xl"
                                />
                                <p className="legend text-bleugris">Job 3</p>
                            </div>
                            <div className="animate__animated animate__fadeIn">
                                <img
                                    src={Job5}
                                    alt="Job 4"
                                    className="rounded-xl"
                                />
                                <p className="legend text-bleugris">Job 3</p>
                            </div>
                            <div className="animate__animated animate__fadeIn">
                                <img
                                    src={Job6}
                                    alt="Job 5"
                                    className="rounded-xl"
                                />
                                <p className="legend text-bleugris">Job 3</p>
                            </div>
                            <div className="animate__animated animate__fadeIn">
                                <img
                                    src={Job7}
                                    alt="Job 6"
                                    className="rounded-xl"
                                />
                                <p className="legend text-bleugris">Job 3</p>
                            </div>
                        </Carousel>
                    </div>
                    <Link
                        to="/annonces"
                        className="bg-bleugris rounded-full px-4 py-2 text-white hover:underline decoration-white"
                    >
                        Browse All Jobs
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;