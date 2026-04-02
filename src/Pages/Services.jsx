import React from "react";
import Header from "../Components/Landing/Header";

export default function Services() {
  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <section className="flex flex-col items-center text-center mb-10 sm:mb-20">
          <Header
            label="Services"
            title="Data Pipeline Solutions"
            subtext="We build end-to-end data pipelines that connect data owners with AI and robotics teams. From sourcing the right datasets to finding paying clients for your data — we handle the full flow."
          />
        </section>

        {/* Core Services */}
        <section className="mb-10 sm:mb-20">
          <div className="grid md:grid-cols-3 gap-8">

            {/* Data Sourcing for Clients */}
            <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">Data Sourcing</h2>
              <p className="text-[#d1d5db] mb-6 flex-grow">
                We help AI developers, robotics engineers, and research teams find and access the exact real-world datasets they need.
              </p>
              <ul className="space-y-3 text-[#d1d5db]">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Curated robotics & sensor data
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Autonomous vehicle telemetry
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Custom dataset matching
                </li>
              </ul>
            </div>

            {/* Client Acquisition for Data Owners */}
            <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">Client Acquisition</h2>
              <p className="text-[#d1d5db] mb-6 flex-grow">
                We find and connect qualified buyers (AI teams, robotics companies, researchers) to your datasets so you can monetize effectively.
              </p>
              <ul className="space-y-3 text-[#d1d5db]">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Targeted buyer outreach
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Secure deal facilitation
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Usage-based revenue opportunities
                </li>
              </ul>
            </div>

            {/* End-to-End Data Pipelines */}
            <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">End-to-End Pipelines</h2>
              <p className="text-[#d1d5db] mb-6 flex-grow">
                We design and manage complete data pipelines — from data discovery and integration to delivery and monetization.
              </p>
              <ul className="space-y-3 text-[#d1d5db]">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Automated API generation
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Secure distributed access
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Full pipeline monitoring & analytics
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* How It Works */}
        <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 sm:p-10 mb-8 sm:mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">How Our Data Pipelines Work</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-[#d1d5db] text-center">
            <p>
              We act as the bridge between data owners and data consumers. Our platform finds the right matches, builds reliable pipelines, 
              and ensures secure, low-latency data delivery without requiring centralized storage.
            </p>
            <p>
              Whether you own valuable operational data or need high-quality datasets for training AI models, we handle the complex middle layer — 
              sourcing, matching, integration, access control, and monetization.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 sm:p-10 mb-8 sm:mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">What We Offer</h2>
          <p className="text-[#cbd5e1] text-center mb-10 max-w-2xl mx-auto">
            From data owners looking to monetize to AI teams searching for quality datasets — our pipelines scale to your needs.
          </p>
          
          <ul className="max-w-3xl mx-auto space-y-6 text-[#d1d5db]">
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold text-xl shrink-0">01</span>
              <span>Find qualified buyers for your datasets and manage the full monetization pipeline.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold text-xl shrink-0">02</span>
              <span>Source and deliver the right real-world data for AI, robotics, and research projects.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold text-xl shrink-0">03</span>
              <span>Build secure, automated data pipelines with API access and distributed delivery.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold text-xl shrink-0">04</span>
              <span>End-to-end support including matching, integration, billing, and performance tracking.</span>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Build Your Data Pipeline?</h2>
          <p className="text-[#d1d5db] max-w-lg mb-6">
            Whether you're a data owner looking for clients or an AI team needing quality datasets, 
            we can build the right pipeline for you.
          </p>
          <p className="text-[#aaa]">
            Contact us at{" "}
            <a
              href="mailto:contact@datacrawl.org"
              className="text-blue-400 font-semibold hover:underline"
            >
              contact@datacrawl.org
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}