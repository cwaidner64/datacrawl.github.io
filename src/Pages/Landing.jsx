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
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', role: '', intent: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
            const subject = encodeURIComponent(`Early Access Request - ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Role: ${formData.role}\n` +
                `Intent: ${formData.intent}\n\n` +
                `Message:\nEarly access request from ${formData.name} (${formData.email}).`
            );

            window.location.href = `mailto:contact@datacrawl.org?subject=${subject}&body=${body}`;

            setSubmitSuccess(true);
            setShowForm(false);
            setFormData({ name: '', email: '', role: '', intent: '' });
        } catch (error) {
            console.error('Error preparing email:', error);
            setSubmitError('Unable to open your email client. Please email contact@datacrawl.org manually.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
        {
            label: "Enterprise",
            title: "Source Large-Scale Data",
            subtext: "Built for teams with high-volume data procurement needs"
        },
    ]

    const navLinks = [
        { to: '/about', label: 'About' },
        { to: '/vendor/information', label: 'Vendors' },
        { to: '/investors', label: 'Investors' },
    ];

    const handleMobileNavigate = (to) => {
        navigate(to);
        setMenuOpen(false);
    };

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
                        <img src={`${import.meta.env.BASE_URL}landing/Spider.svg`} className="absolute mr-5 mt-5 w-64 sm:w-80 md:w-auto" />
                        <SparkOverlay />
                    </div>


                    {/* NAVIGATION */}
                    <nav className="flex justify-between py-6 md:py-10 *:text-[#E3E3E3] text-md absolute w-full left-0 box-border px-4 sm:px-6 md:px-10 xl:px-35 top-0 z-20">

                        <span className="flex items-center gap-4">
                            <img src={`${import.meta.env.BASE_URL}landing/Logo.svg`} className="w-8" />
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
                            aria-label="Toggle navigation menu"
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                    </nav>

                    {menuOpen && (
                        <div className="md:hidden absolute top-[82px] left-4 right-4 z-30 rounded-xl border border-[#2b2b2b] bg-[#171717]/95 backdrop-blur-sm p-4 shadow-2xl">
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.to}
                                        onClick={() => handleMobileNavigate(link.to)}
                                        className="w-full text-left px-3 py-3 rounded-lg text-[#E3E3E3] font-[500] hover:bg-[#232323] transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-[#2b2b2b] flex flex-col gap-2">
                                {isLoggedIn ? (
                                    <>
                                        <span className="px-3 text-sm text-[#bdbdbd] truncate">{loggedInEmail}</span>
                                        <button
                                            className="w-full px-3 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                                            onClick={() => handleMobileNavigate(`/profile/${userId}`)}
                                        >
                                            Profile
                                        </button>
                                        <button
                                            className="w-full px-3 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
                                            onClick={() => {
                                                handleLogout();
                                                setMenuOpen(false);
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="w-full px-3 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                                        onClick={() => {
                                            setShowForm(true);
                                            setMenuOpen(false);
                                        }}
                                    >
                                        Get Started
                                    </button>
                                )}
                            </div>
                        </div>
                    )}


                    {/* HERO TEXT */}
                    <div className="flex flex-col items-start w-full sm:w-[85%] md:w-[60%] lg:w-[45%] xl:w-[35%] relative top-18 sm:top-16 md:top-5 xl:top-1 z-10">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="font-['Roboto'] font-bold text-4xl md:text-5xl text-[#E3E3E3] mb-5 leading-tight">
                                AI and Large Data Infrastructure for Robotics, Automotive, and Autonomous Systems
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
                                onClick={() => setShowForm(true)}
                            >
                                Get Started
                            </button>
                            <p className="text-sm text-[#888] mt-3">
                            Used by robotics teams, AI startups, and data engineers
                            </p>
                        </motion.div>

                    </div>

                </main>

            </motion.div>



            {/* FEATURES */}
            <section className="flex flex-col bg-[#111111] items-center justify-center px-6 md:px-10 xl:px-35 py-40">

                <Header {...headers[0]} />

                <div className="mt-30 grid grid-cols-1 md:grid-cols-2 gap-12 w-full justify-items-center">


                    <FeatureCard
                        icon={<img src={`${import.meta.env.BASE_URL}landing/Expand.svg`} className="w-10" />}
                        name="Dataset Discovery"
                        description="Search robotics, vehicle telemetry, and sensor datasets from a growing network of data providers."
                        glow={true}
                        glowClass="left-[43px] top-[37px]"
                    />

                    <FeatureCard
                        icon={<img src={`${import.meta.env.BASE_URL}landing/Security Shield.svg`} className="w-12" />}
                        name="Secure Training"
                        description="Stream, structure, and use distributed datasets from robots, fleets, and sensors directly in your ML pipelines"
                    />

                    <FeatureCard
                        icon={<img src={`${import.meta.env.BASE_URL}landing/Settings.svg`} className="w-12" />}
                        name="AI Model Training"
                        description="Build perception, navigation, and predictive models using robotics datasets and real-world vehicle data."
                    />

                    <FeatureCard
                        icon={<img src={`${import.meta.env.BASE_URL}landing/API.svg`} className="w-12" />}
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

                    <Need img={`${import.meta.env.BASE_URL}landing/usage/development.svg`} text="Robotics AI Training" />
                    <Need img={`${import.meta.env.BASE_URL}landing/usage/data-science.svg`} text="Autonomous Vehicle Data" />
                    <Need img={`${import.meta.env.BASE_URL}landing/usage/marketing.svg`} text="Fleet Analytics" />

                </div>

                <div className="flex flex-col md:flex-row gap-16">

                    <Need img={`${import.meta.env.BASE_URL}landing/usage/e-commerce.svg`} text="Sensor Dataset Discovery" />
                    <Need img={`${import.meta.env.BASE_URL}landing/usage/content.svg`} text="Mobility Platforms" />
                    <Need img={`${import.meta.env.BASE_URL}landing/usage/seo.svg`} text="Industrial Robotics" />

                </div>

                <div className="flex flex-col md:flex-row gap-16">

                    <Need img={`${import.meta.env.BASE_URL}landing/Earth Globe.svg`} text="Geospatial Drone Data" />
                    <Need img={`${import.meta.env.BASE_URL}landing/Sparkles.svg`} text="Remote Sensing" />
                    <Need img={`${import.meta.env.BASE_URL}landing/Audio Wave.svg`} text="Spatial Analytics" />

                </div>

            </div>



            {/* ENTERPRISE DATA BUYERS */}

            <section className="flex flex-col bg-[#0d0d0d] items-center justify-center px-6 md:px-10 xl:px-35 py-40 border-t border-[#1e1e1e]">

                <Header {...headers[5]} />

                <p className="text-[#969696] mt-6 text-center max-w-2xl text-base font-[Heebo]">
                    Connect directly with verified large-scale data suppliers. Source custom datasets,
                    negotiate volume contracts, and integrate data pipelines at enterprise scale.
                </p>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 w-full justify-items-center">

                    <FeatureCard
                        icon={<img src={`${import.meta.env.BASE_URL}landing/Done.svg`} className="w-10" />}
                        name="Supplier Directory"
                        description="Browse a curated network of pre-vetted data suppliers with proven track records across robotics, geospatial, and automotive domains."
                    />

                    <FeatureCard
                        icon={<img src={`${import.meta.env.BASE_URL}landing/User.svg`} className="w-10" />}
                        name="Supplier Matching"
                        description="Describe your data requirements and get matched with suppliers who specialize in your domain — from aerial drone surveys to autonomous driving logs."
                    />

                    <FeatureCard
                        icon={<img src={`${import.meta.env.BASE_URL}landing/Expand.svg`} className="w-10" />}
                        name="Volume"
                        description="License petabyte-scale datasets with flexible volume pricing, SLA guarantees, and dedicated support for enterprise procurement workflows."
                        glow={true}
                        glowClass="left-[43px] top-[37px]"
                    />

                    <FeatureCard
                        icon={<img src={`${import.meta.env.BASE_URL}landing/Security Shield.svg`} className="w-12" />}
                        name="Compliance"
                        description="Full data lineage, privacy compliance, and licensing clarity on every dataset. Meet GDPR, CCPA, and sector-specific regulatory requirements."
                    />

                </div>

                <button
                    className="mt-16 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                    onClick={() => setShowForm(true)}
                >
                    Connect with Suppliers
                </button>

            </section>



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
                        onClick={() => setShowForm(true)}
                    >
                        Get Started
                    </button>

                </div>

            </section>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">

                    <div className="bg-[#1a1a1a] p-8 rounded-xl w-[90%] max-w-md">

                        <h2 className="text-white text-xl font-bold mb-6">
                            Request Early Access
                        </h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            {submitError && (
                                <div className="bg-red-600/20 border border-red-600 text-red-400 p-3 rounded text-sm">
                                    {submitError}
                                </div>
                            )}

                            {submitSuccess && (
                                <div className="bg-green-600/20 border border-green-600 text-green-400 p-3 rounded text-sm">
                                    Thank you! Your request has been sent to contact@datacrawl.org
                                </div>
                            )}

                            <input
                                type="text"
                                name="name"
                                placeholder="Preferred name"
                                value={formData.name}
                                required
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="p-3 rounded bg-[#111] text-white disabled:opacity-50"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                required
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="p-3 rounded bg-[#111] text-white disabled:opacity-50"
                            />

                            <select
                                name="role"
                                value={formData.role}
                                required
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="p-3 rounded bg-[#111] text-white disabled:opacity-50"
                            >
                                <option value="">Select role</option>
                                <option>Robotics Engineer</option>
                                <option>ML Engineer</option>
                                <option>Founder</option>
                                <option>Other</option>
                            </select>

                            <select
                                name="intent"
                                value={formData.intent}
                                required
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="p-3 rounded bg-[#111] text-white disabled:opacity-50"
                            >
                                <option value="">What are you trying to do?</option>
                                <option>Train models</option>
                                <option>Access datasets</option>
                                <option>Build pipelines</option>
                                <option>Explore</option>
                            </select>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed p-3 rounded text-white font-bold"
                            >
                                {isSubmitting ? 'Sending...' : 'Submit'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setSubmitError('');
                                    setSubmitSuccess(false);
                                }}
                                disabled={isSubmitting}
                                className="text-gray-400 mt-2 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}