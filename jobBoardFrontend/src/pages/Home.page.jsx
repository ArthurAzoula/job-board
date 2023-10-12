import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Job1 from '../assets/images/job.jpg';
import Job2 from '../assets/images/job2.jpg';
import Job3 from '../assets/images/job3.png';
import Job4 from '../assets/images/job4.jpg';

const Home = () => {
    return (
        <div className="bg-white">
            <div className="mx-auto container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl font-bold mb-4 text-bleugris">
                            Find your dream job with EpiJob
                        </h1>
                        <p className="text-lg mb-8 text-bleugris">
                            EpiJob is the best platform to find your dream job. With our
                            advanced search algorithms and personalized recommendations,
                            you'll be able to find the perfect job in no time.
                        </p>
                        <Link
                            to="/annonces"
                            className="bg-bleugris rounded-full px-4 py-2 text-white hover:underline decoration-white"
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
            <div className="bg-gray-100">
                <div className="mx-auto container py-16">
                    <h2 className="text-3xl font-bold mb-8 text-bleugris">Why EpiJob?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Add some animations or transitions for the items below */}
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">Advanced Search</h3>
                            <p className="text-lg mb-8 text-bleugris">
                                Our advanced search algorithms allow you to find the perfect job
                                based on your skills, experience, and preferences.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">
                                Personalized Recommendations
                            </h3>
                            <p className="text-lg mb-8 text-bleugris">
                                Our personalized recommendations help you discover new job
                                opportunities that match your interests and career goals.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">
                                Easy Application Process
                            </h3>
                            <p className="text-lg mb-8 text-bleugris">
                                Our easy application process allows you to apply for jobs with
                                just a few clicks, so you can spend more time focusing on your
                                career.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">Trusted Employers</h3>
                            <p className="text-lg mb-8 text-bleugris">
                                We partner with trusted employers to bring you the best job
                                opportunities in your field.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="mx-8 container py-16">
                    <h2 className="text-3xl font-bold mb-8 text-bleugris">Featured Jobs</h2>
                    <Carousel
                        showArrows={true}
                        showThumbs={false}
                        showStatus={false}
                        infiniteLoop={true}
                        className="mb-16"
                    >
                        <div>
                            <img
                                src={Job1}
                                alt="Job 1"
                                className="rounded-xl animate-fade-in"
                            />
                            <p className="legend text-bleugris">Job 1</p>
                        </div>
                        <div>
                            <img
                                src={Job2}
                                alt="Job 2"
                                className="rounded-xl animate-fade-in"
                            />
                            <p className="legend text-bleugris">Job 2</p>
                        </div>
                        <div>
                            <img
                                src={Job4}
                                alt="Job 3"
                                className="rounded-xl animate-fade-in"
                            />
                            <p className="legend text-bleugris">Job 3</p>
                        </div>
                    </Carousel>
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
