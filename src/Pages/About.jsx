import React from "react";
import Header from "../Components/Landing/Header";

export default function About() {
  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <section className="flex flex-col items-center text-center mb-10 sm:mb-20">
          <Header
            label="About Us"
            title="Meet DataCrawl"
            subtext="The API Marketplace with Instant SDK Generation — making APIs discoverable, integrable, and monetizable for everyone."
          />
        </section>

        {/* Mission & Values */}
        <section className="grid md:grid-cols-2 gap-6 mb-8 sm:mb-16">
          
          {/* Our Mission */}
          <div className="bg-[#1f1f1f] border border-blue-500/30 rounded-2xl p-5 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl" />
            <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-4 block pl-4 sm:pl-6">Our Mission</span>
            <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed pl-4 sm:pl-6">
              Making high-quality APIs instantly usable by removing the biggest barriers: 
              discovery, integration complexity, and monetization friction.
            </p>
          </div>

          {/* Our Values */}
          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Our Values</h2>
            <ul className="space-y-4 text-[#d1d5db]">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Developer experience first — from discovery to production in minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Powerful yet simple SDK generation with visual mapping</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Seamless support for both individual developers (B2C) and enterprises (B2B)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Secure, transparent, and fair monetization for API providers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Building the infrastructure layer that accelerates API innovation</span>
              </li>
            </ul>
          </div>

        </section>

        {/* Why DataCrawl */}
        <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10 mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">Why DataCrawl</h2>
          <div className="max-w-3xl mx-auto text-[#d1d5db] space-y-6 text-center">
            <p>
              Great APIs exist everywhere, but developers waste countless hours on discovery, 
              authentication setup, SDK writing, response mapping, and integration. 
              Meanwhile, API providers struggle to reach customers and monetize effectively.
            </p>
            <p>
              DataCrawl fixes both problems. We operate a modern API marketplace where anyone can 
              discover high-quality APIs, subscribe instantly, and generate custom SDKs with our 
              intuitive visual mapping interface — all in one unified platform that works seamlessly 
              for individual developers (B2C) and large enterprise teams (B2B).
            </p>
            <p>
              For providers, we handle billing, usage tracking, marketing, and distribution, 
              so you can focus on building great APIs while earning recurring revenue.
            </p>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10 mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold mb-3">Instant SDK Generation</h3>
              <p className="text-[#d1d5db] text-sm">
                Generate production-ready SDKs in your preferred language with one click — 
                complete with custom response mapping.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Unified B2C & B2B</h3>
              <p className="text-[#d1d5db] text-sm">
                One marketplace that serves solo developers, startups, and large enterprises 
                with appropriate scaling and controls.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Built-in Monetization</h3>
              <p className="text-[#d1d5db] text-sm">
                Providers earn recurring revenue while we manage billing, authentication, 
                and customer success.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-[#d1d5db] max-w-md mb-8">
            Whether you're an API provider looking to monetize or a developer looking for powerful, 
            easy-to-integrate APIs — we're building the platform for you.
          </p>
          <a 
            href="mailto:contact@datacrawl.org" 
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors"
          >
            Contact Us
          </a>
        </section>

      </div>
    </div>
  );
}