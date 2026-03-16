import Login from "../Components/LoginPage"
import React from "react"
import { motion } from 'motion/react';

import { useState } from "react";
import FeatureCard from "../Components/Landing/FeatureCard";

import { useNavigate } from 'react-router-dom';
import SparkOverlay from "../Components/SparkOverlay";
import PricingCard from "../Components/Landing/PricingCard";
import Header from "../Components/Landing/Header";
import Need from "../Components/Landing/Need";
import '../App.css';
import { useAuth } from "../Components/AuthContext";
import {
    Menu,
    X,
} from 'lucide-react';



export default function Landing() {

    const navigate = useNavigate();
    const { isLoggedIn, loggedInEmail, handleLogout } = useAuth();
    const userId = localStorage.getItem('DCuserId');

    const [menuOpen, setMenuOpen] = useState(false);

    const headers = [
        {
            label: "Features",
            title: "Infrastructure for Robotics & Automotive Data",
        },
        {
            label: "Usage",
            title: "Built for Robotics, AI, and Autonomous Systems"
        },
        {
            label: "Demo",
            title: "Try Our Data Platform"
        },
        {
            label: "Pricing",
            link: "/Pricing",
            title: "Choose Your Plan",
            subtext: "Pricing points for all needs"
        },
        {
            label: "Register",
            title: "Start Building with DataCrawl",
            subtext: "Secure access to robotics and automotive datasets"
        },
    ]

    const navLinks = [
        { to: '/about', label: 'About' },
        { to: '/vendor/information', label: 'Vendors' },
        { to: '/investors', label: 'Investors' },
    ];

    return (

        <div className="bg-[#111111] min-h-screen w-full overflow-x-hidden" id="landing">

            {/* HERO */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="flex-grow relative h-full w-full overflow-x-clip"
            >

                <main className="w-full min-h-[700px] sm:min-h-[760px] md:min-h-[840px] overflow-x-hidden relative box-border px-4 sm:px-6 md:px-10 xl:px-35 flex flex-col justify-center" id="bg-gradient">


                    {/* Graphic */}
                    <div className="transform absolute right-[-30%] sm:right-[-20%] md:-right-[10%] top-18 md:top-3 scale-[0.42] sm:scale-[0.55] md:scale-75 lg:scale-90 flex justify-center items-center pointer-events-none opacity-70 md:opacity-100">
                        <img src="/landing/Spider.svg" className="absolute mr-5 mt-5 w-64 sm:w-80 md:w-auto" />
                        <SparkOverlay />
                    </div>


                    {/* NAVIGATION */}
                    <nav className="flex justify-between py-6 md:py-10 *:text-[#E3E3E3] text-md absolute w-full left-0 box-border px-4 sm:px-6 md:px-10 xl:px-35 top-0 z-20">

                        <span className="flex items-center gap-4">
                            <img src="/landing/Logo.svg" className="w-8" />
                            <p className="font-[500]">DataCrawl</p>
                        </span>

                        <div className="hidden md:flex gap-6 items-center *:transition-all *:duration-200 *:hover:cursor-pointer *:hover:text-[#b5b5b5] *:font-[500]">
                            {navLinks.map((link) => (
                                <p key={link.to} onClick={() => navigate(link.to)}>{link.label}</p>
                            ))}
                        </div>

                        <div className="hidden md:flex gap-4 lg:gap-6 items-center">

                            {isLoggedIn ? (
                                <>
                                    <span className="text-white font-semibold max-w-[180px] truncate">{loggedInEmail}</span>

                                    <button
                                        className="px-3 py-1 rounded-3xl bg-red-600 hover:bg-red-700 text-white"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>

                                    <button
                                        className="px-3 py-1 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
                                        onClick={() => navigate(`/profile/${userId}`)}
                                    >
                                        Profile
                                    </button>
                                </>
                            ) : (
                                <>
                                   
                                </>
                            )}

                        </div>

                        <button
                            className="md:hidden text-white p-2 rounded-lg border border-[#2b2b2b] bg-[#151515]/70"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                    </nav>


                    {/* HERO TEXT */}
                    <div className="flex flex-col items-start w-full sm:w-[85%] md:w-[60%] lg:w-[45%] xl:w-[35%] relative top-18 sm:top-16 md:top-5 xl:top-1 z-10">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="font-['Roboto'] font-bold text-4xl md:text-5xl text-[#E3E3E3] mb-5 leading-tight">
                                AI Infrastructure for Robotics & Automotive Data
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <p className="text-[#BFBFBF] text-base mb-8 font-[Heebo] max-w-[34rem]">
                                DataCrawl enables robotics companies, autonomous vehicle developers, and AI teams
                                to train models on distributed datasets while keeping sensitive sensor and fleet
                                data secure. Connect APIs, discover datasets, and build intelligent systems without
                                moving the underlying data.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            <button
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                                onClick={() => navigate('/contact')}
                            >
                                Get Started
                            </button>
                        </motion.div>

                    </div>

                </main>

            </motion.div>



            {/* FEATURES */}
            <section className="flex flex-col bg-[#111111] items-center justify-center px-6 md:px-10 xl:px-35 py-40">

                <Header {...headers[0]} />

                <div className="mt-30 grid grid-cols-1 md:grid-cols-2 gap-12 w-full justify-items-center">


                    <FeatureCard
                        icon={<img src="/landing/Expand.svg" className="w-10" />}
                        name="Dataset Discovery"
                        description="Search robotics, vehicle telemetry, and sensor datasets from a growing network of data providers."
                        glow={true}
                        glowClass="left-[43px] top-[37px]"
                    />

                    <FeatureCard
                        icon={<img src="/landing/Security Shield.svg" className="w-12" />}
                        name="Secure Data Training"
                        description="Train AI models on sensitive robotics and fleet data without the data ever leaving the owner's infrastructure."
                    />

                    <FeatureCard
                        icon={<img src="/landing/Settings.svg" className="w-12" />}
                        name="AI Model Training"
                        description="Build perception, navigation, and predictive models using robotics datasets and real-world vehicle data."
                    />

                    <FeatureCard
                        icon={<img src="/landing/API.svg" className="w-12" />}
                        name="Developer APIs"
                        description="Integrate robotics platforms, sensor systems, and fleet software using powerful APIs."
                        glow={true}
                        glowClass="bottom-[20px] right-[161px]"
                    />

                </div>

                <button
                    className="mt-16 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                    onClick={() => navigate('/market')}
                >
                    Explore Features
                </button>

            </section>



            {/* INDUSTRY USE CASES */}

            <div className="w-screen px-6 md:px-10 xl:px-35 pt-20 pb-40 flex flex-col text-[#E3E3E3] bg-[#111111] items-center gap-16">

                <Header {...headers[1]} />

                <div className="flex flex-col md:flex-row gap-16 mt-20">

                    <Need img={"/landing/usage/development.svg"} text="Robotics AI Training" />
                    <Need img={"/landing/usage/data-science.svg"} text="Autonomous Vehicle Data" />
                    <Need img={"/landing/usage/marketing.svg"} text="Fleet Analytics" />

                </div>

                <div className="flex flex-col md:flex-row gap-16">

                    <Need img={"/landing/usage/e-commerce.svg"} text="Sensor Dataset Discovery" />
                    <Need img={"/landing/usage/content.svg"} text="Mobility Platforms" />
                    <Need img={"/landing/usage/seo.svg"} text="Industrial Robotics" />

                </div>

            </div>



            {/* REGISTER CTA */}

            <section className="flex flex-col bg-[#111111] items-center px-10 xl:px-35 pb-20">

                <Header {...headers[4]} />

                <p className="text-[#969696] mt-4 text-center max-w-xl">
                    Access robotics and automotive datasets, integrate APIs,
                    and begin training AI models on distributed data sources in minutes.
                </p>

                <div className="py-16">

                    <button
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                        onClick={() => navigate('/signup')}
                    >
                        Get Started
                    </button>

                </div>

            </section>

        </div>
    );
}