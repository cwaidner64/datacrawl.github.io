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
import {
    Menu,
    X,
} from 'lucide-react';



export default function Landing() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', company: '', email: '', role: '', intent: '', comment: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
            const response = await fetch('https://hook.us2.make.com/5jpdk7qebo4irz6ip4u7hyjjyajvs4j3', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    company: formData.company.trim(),
                    email: formData.email.trim(),
                    role: formData.role,
                    intent: formData.intent,
                    comment: formData.comment.trim(),
                    submitted_at: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error(`Webhook failed: ${response.status}`);
            }

            setSubmitSuccess(true);
            setShowForm(false);
            setFormData({ name: '', company: '', email: '', role: '', intent: '', comment: '' });
        } catch (error) {
            console.error('Failed to send early access request:', error);
            setSubmitError('Unable to submit right now. Please try again in a moment.');
        } finally {
            setIsSubmitting(false);
        }
    };
    const renderCheck = (value) => {
    if (value === true)
        return <span className="text-green-400 font-bold text-lg">✔</span>;
    if (value === "partial")
        return <span className="text-yellow-400 font-bold text-lg">~</span>;
    return <span className="text-red-500 font-bold text-lg">✘</span>;
};
    const headers = [
        {
            label: "Features",
            title: "Self healing API Infrastructure",
        },
        {
            label: "Usage",
            title: "Built for Developers & Enterprises"
        },
        {
            label: "Demo",
            title: "Try Our API Platform"
        },
        {
            label: "Pricing",
            link: "/Pricing",
            title: "Choose Your Plan",
            subtext: "Flexible pricing for B2C and B2B"
        },
        {
            label: "Start Using DataCrawl",
            title: "Stop Breakages Before They Happen",
            subtext: "Get early access to our self-healing API layer and experience data pipelines that fix themselves before anything breaks downstream."
        },
        {
            label: "Enterprise",
            title: "Enterprise-Grade API Infrastructure",
            subtext: "High-volume access, custom SLAs, and dedicated support"
        },
    ];

    const navLinks = [
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
        {to: '/validation', label: 'Validation Layer'},
    ];

   const competitiveLandscape = [
    {
        competitor: "Monte Carlo",
        funding: "$200M+",
        detects: true,
        corrects: false,
        learnsSchema: false,
        makeN8n: false,
        pricing: "$100K+/yr",
        gap: "Alerts only. Humans fix everything.",
    },
    {
        competitor: "Datafold",
        funding: "Well funded",
        detects: true,
        corrects: false,
        learnsSchema: false,
        makeN8n: false,
        pricing: "$500+/mo",
        gap: "Only works at deploy time. Blind at runtime.",
    },
    {
        competitor: "Great Expectations / Soda",
        funding: "OSS / $30M",
        detects: true,
        corrects: false,
        learnsSchema: false,
        makeN8n: false,
        pricing: "Free / $500+",
        gap: "Manual rules. No automation. High maintenance.",
    },
    {
        competitor: "Bigeye",
        funding: "$17M",
        detects: true,
        corrects: false,
        learnsSchema: "partial",
        makeN8n: false,
        pricing: "$5K–$15K/mo",
        gap: "Auto monitors, but still no action taken.",
    },
    {
        competitor: "Datadog (Metaplane)",
        funding: "$36B company",
        detects: true,
        corrects: false,
        learnsSchema: "partial",
        makeN8n: false,
        pricing: "Enterprise",
        gap: "Reactive + expensive. Built for ops, not data fixing.",
    },
    {
        competitor: "Fivetran",
        funding: "$5.6B",
        detects: "partial",
        corrects: "partial",
        learnsSchema: false,
        makeN8n: false,
        pricing: "$$$",
        gap: "Only works inside its own connectors.",
    },
    {
        competitor: "Acceldata",
        funding: "$50M",
        detects: true,
        corrects: "partial",
        learnsSchema: false,
        makeN8n: false,
        pricing: "Enterprise",
        gap: "Still early + no HTTP-level correction.",
    },
    {
        competitor: "DataCrawl",
        funding: "Early",
        detects: true,
        corrects: true,
        learnsSchema: true,
        makeN8n: true,
        pricing: "$99/mo",
        gap: "Only platform that fixes data before it breaks anything downstream.",
    },
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
                    <div className="transform absolute right-[-20%] sm:right-[-15%] md:-right-[10%] top-18 md:top-3 scale-[0.75] sm:scale-[0.72] md:scale-75 lg:scale-90 flex justify-center items-center pointer-events-none opacity-80 md:opacity-100">
                        <img src={`${import.meta.env.BASE_URL}landing/Spider.svg`} className="absolute mr-5 mt-5 w-64 sm:w-80 md:w-auto" />
                        <SparkOverlay />
                    </div>


                    {/* NAVIGATION */}
                    <nav className="flex justify-between py-6 md:py-10 *:text-[#E3E3E3] text-md absolute w-full left-0 box-border px-4 sm:px-6 md:px-10 xl:px-35 top-0 z-20">

                        <span className="flex items-center gap-4">
                            <img src={`${import.meta.env.BASE_URL}landing/Logo.svg`} className="w-8 h-8" />
                            <p className="font-[500]">DataCrawl</p>
                        </span>

                        <div className="hidden md:flex gap-6 items-center *:transition-all *:duration-200 *:hover:cursor-pointer *:hover:text-[#b5b5b5] *:font-[500]">
                            {navLinks.map((link) => (
                                <p key={link.to} onClick={() => navigate(link.to)}>{link.label}</p>
                            ))}
                        </div>

                        <div className="hidden md:flex gap-4 lg:gap-6 items-center">
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
                                <button
                                    className="w-full px-3 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                                    onClick={() => {
                                        setShowForm(true);
                                        setMenuOpen(false);
                                    }}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}


                  {/* HERO TEXT */}
                    <div className="flex flex-col items-start w-full sm:w-[85%] md:w-[60%] lg:w-[45%] xl:w-[35%] 
                                   relative top-20 sm:top-16 md:top-8 lg:top-4 z-10">

                        {/* Main Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                        >
                            <h1 className="font-bold text-7xl md:text-6xl lg:text-7xl xl:text-[5.5rem] 
                                           leading-none tracking-tighter text-[#E3E3E3] mb-4">
                                DataCrawl
                            </h1>
                        </motion.div>

                        {/* Tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                        >
                            <div className="mb-10">
                                <p className="text-[#BFBFBF] text-xl md:text-2xl font-light tracking-wide">
                                    Self-healing API layer
                                </p>
                                <p className="mt-2 text-sm md:text-base italic text-[#9F9F9F]">
                                    Data made easier
                                </p>
                            </div>
                        </motion.div>

                        {/* Sub-tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
                        >
                            <p className="text-[#AFAFAF] text-lg md:text-xl max-w-lg mb-10">
                               Real-time validation • Schema learning •
Error correction before downstream failure • Works with any API or webhook • N8N & Make integrations
                            </p>
                        </motion.div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
                            className="flex flex-col items-start"
                        >
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="px-10 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
                                           text-white font-semibold text-lg rounded-xl transition-all 
                                           duration-200 hover:scale-105 shadow-lg shadow-blue-900/30"
                                >
                                    Contact Us
                                </button>

                                <button
                                    onClick={() => navigate('/validation')}
                                    className="px-10 py-4 border border-[#2f63d7] text-[#dbeafe] hover:bg-[#1a2750] 
                                           font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105"
                                >
                                    Try the validator
                                </button>
                            </div>

                            <p className="text-sm text-[#888] mt-4 tracking-wide">
                                Trusted by developers, data engineers, and enterprises worldwide.
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
                        name="Universal usage"
                        description="Works with any API, webhook, or data source. "
                        glow={true}
                        glowClass="left-[43px] top-[37px]"
                    />

                    <FeatureCard
                        icon={<img src={`${import.meta.env.BASE_URL}landing/Security Shield.svg`} className="w-12" />}
                        name="Validation Layer"
                        description="Stop breakages before they happen."
                    />

                    <FeatureCard
                        icon={<img src={`${import.meta.env.BASE_URL}landing/Settings.svg`} className="w-12" />}
                        name="Schema Learning"
                        description="System that gets smarter with every API call."
                    />

                    <FeatureCard
                        icon={<img src={`${import.meta.env.BASE_URL}landing/API.svg`} className="w-12" />}
                        name="Connect Anywhere"
                        description="N8N, Make, or custom APIs"
                        glow={true}
                        glowClass="bottom-[20px] right-[161px]"
                    />

                </div>

                <button
                    className="mt-16 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                    onClick={() => navigate('/validation')}
                >
                    Use the validator
                </button>

               <div className="w-full mt-16 bg-[#181818] border border-[#2d2d2d] rounded-2xl p-4 sm:p-6 md:p-8">
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#F2F2F2] text-center">
                    Competitive landscape — everyone detects, only one fixes
                </h3>
                <p className="text-[#b8b8b8] text-center mt-3 mb-6">
                    Most tools stop at alerts. DataCrawl prevents failures entirely.
                </p>

                <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
                    <table className="w-full min-w-[1300px] text-left text-sm text-[#e5e5e5]">
                        <thead className="bg-[#202020] text-[#f2f2f2]">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Company</th>
                                <th className="px-4 py-3 font-semibold">Scale</th>
                                <th className="px-4 py-3 font-semibold">Detects</th>
                                <th className="px-4 py-3 font-semibold">Auto-fixes</th>
                                <th className="px-4 py-3 font-semibold">Learns schema</th>
                                <th className="px-4 py-3 font-semibold">Make / n8n</th>
                                <th className="px-4 py-3 font-semibold">Pricing</th>
                                <th className="px-4 py-3 font-semibold">Reality</th>
                            </tr>
                        </thead>
                        <tbody>
                            {competitiveLandscape.map((row, index) => {
                                const isYou = row.competitor === "DataCrawl";

                                return (
                                    <tr
                                        key={row.competitor}
                                        className={`border-t border-[#2a2a2a] ${
                                            isYou
                                                ? "bg-[#1a233a] border-blue-500"
                                                : index % 2 === 0
                                                ? "bg-[#151515]"
                                                : "bg-[#121212]"
                                        }`}
                                    >
                                        <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">
                                    
                                            {row.competitor}
                                        </td>

                                        <td className="px-4 py-3 text-[#d4d4d8] whitespace-nowrap">
                                            {row.funding}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {renderCheck(row.detects)}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {renderCheck(row.corrects)}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {renderCheck(row.learnsSchema)}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {renderCheck(row.makeN8n)}
                                        </td>

                                        <td className="px-4 py-3 whitespace-nowrap text-[#d4d4d8]">
                                            {row.pricing}
                                        </td>

                                        <td className="px-4 py-3 text-[#c8c8c8] min-w-[320px]">
                                            {row.gap}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            </section>

            {/* INDUSTRY USE CASES / WHO IT'S FOR */}

            <div className="w-screen px-6 md:px-10 xl:px-35 pt-20 pb-40 flex flex-col text-[#E3E3E3] bg-[#111111] items-center gap-16">

                <Header {...headers[1]} />

                <div className="flex flex-col md:flex-row gap-16 mt-20">

                    <Need img="landing/usage/development.svg" text="Individual Developers & Startups" />
                    <Need img="landing/usage/data-science.svg" text="Automation & AI Teams" />
                    <Need img="landing/usage/marketing.svg" text="SaaS Product Builders" />

                </div>

                <div className="flex flex-col md:flex-row gap-16">

                    <Need img="landing/usage/e-commerce.svg" text="Enterprise Integration Teams" />
                    <Need img="landing/usage/content.svg" text="API-First Companies" />
                    <Need img="landing/usage/seo.svg" text="Data & Analytics Platforms" />

                </div>

                <div className="flex flex-col md:flex-row gap-16">

                    <Need img="landing/Earth Globe.svg" text="Robotics & Autonomous Systems" />
                    <Need img="landing/Sparkles.svg" text="IoT & Sensor Networks" />
                    <Need img="landing/Audio Wave.svg" text="Geospatial & Mobility Solutions" />

                </div>

            </div>


            {/* REGISTER / GET STARTED CTA */}

            <section className="flex flex-col bg-[#111111] items-center px-10 xl:px-35 pb-20">

                <Header {...headers[4]} />

              
                <div className="py-16">

                    <button
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                        onClick={() => setShowForm(true)}
                    >
                        Get Started Now
                    </button>

                </div>

            </section>

            {/* Early Access Modal - unchanged */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">

                    <div className="bg-[#1a1a1a] p-8 rounded-xl w-[90%] max-w-md">

                        <h2 className="text-white text-xl font-bold mb-6">
                            Easy contact form
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

                            <input
                                type="text"
                                name="company"
                                placeholder="Company name"
                                value={formData.company}
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
                                <option value="">What best describes you?</option>

                                <option value="dev-individual">Individual Developer</option>
                                <option value="dev-team">Developer (on a team)</option>

                                <option value="data-engineer">Data / Backend Engineer</option>
                                <option value="ml-engineer">ML / AI Engineer</option>

                                <option value="founder">Founder / Startup</option>
                                <option value="product">Product / Engineering Manager</option>

                                <option value="enterprise">Enterprise / Architect</option>

                                <option value="other">Other</option>
                            </select>

                            <select
                                name="intent"
                                value={formData.intent}
                                required
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="p-3 rounded bg-[#111] text-white disabled:opacity-50"
                            >
                                <option value="">What problem are you trying to solve?</option>

                                <option value="debugging">Spending too much time debugging broken APIs</option>

                                <option value="schema-breaks">Schema changes / payload mismatches breaking systems</option>

                                <option value="bad-data">Bad or inconsistent API data causing downstream issues</option>

                                <option value="automation">Fixing unreliable webhooks / automation workflows</option>

                                <option value="preventative">Looking for a preventative validation layer</option>

                                <option value="exploring">Just exploring / learning about the product</option>

                                <option value="buying">Evaluating for team or company use</option>

                                <option value="demo">Want a demo / walkthrough</option>
                            </select>

                            <textarea
                                name="comment"
                                placeholder="Optional comment"
                                value={formData.comment}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                rows={3}
                                className="p-3 rounded bg-[#111] text-white disabled:opacity-50 resize-y"
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed p-3 rounded text-white font-bold"
                            >
                                {isSubmitting ? 'Sending...' : 'Submit Request'}
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