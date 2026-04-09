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
            title="Custom API Integration Solutions"
            subtext="Powerful visual mapping and instant SDK generation to simplify API integration for developers and enterprises."
          />
        </section>

        {/* Core Services */}
        <section className="mb-10 sm:mb-20">
          <div className="grid md:grid-cols-3 gap-8">

            {/* Custom Mapping */}
            <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">Custom Mapping</h2>
              <p className="text-[#d1d5db] mb-6 flex-grow">
                Transform complex API responses into your exact data model using our intuitive visual mapping interface.
              </p>
              <ul className="space-y-3 text-[#d1d5db]">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Visual field mapping
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Real-time preview
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Nested object support
                </li>
              </ul>
            </div>

            {/* Instant SDK Generation */}
            <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">Instant SDK Generation</h2>
              <p className="text-[#d1d5db] mb-6 flex-grow">
                Generate production-ready SDKs in multiple languages with your custom mappings applied automatically.
              </p>
              <ul className="space-y-3 text-[#d1d5db]">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  JavaScript, Python, TypeScript & more
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Automatic types & docs
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Built-in auth & error handling
                </li>
              </ul>
            </div>

            {/* Marketplace Integration */}
            <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">Marketplace Access</h2>
              <p className="text-[#d1d5db] mb-6 flex-grow">
                Discover and integrate APIs effortlessly with custom mapping and unified B2C/B2B support.
              </p>
              <ul className="space-y-3 text-[#d1d5db]">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Usage-based billing
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Enterprise security
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  Flexible access controls
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* How It Works */}
        <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 sm:p-10 mb-8 sm:mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">How Custom Mapping Works</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-[#d1d5db] text-center">
            <p>
              Stop writing boilerplate code to reshape API responses. Our visual mapping tool lets you 
              transform any API output into your preferred data structure instantly.
            </p>
            <p>
              Connect an API, map fields visually, and generate a clean, type-safe SDK tailored to your application — 
              perfect for both individual developers and enterprise teams.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 sm:p-10 mb-8 sm:mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">What We Offer</h2>
          <p className="text-[#cbd5e1] text-center mb-10 max-w-2xl mx-auto">
            Accelerate API integration with intelligent mapping and SDK tools.
          </p>
          
          <ul className="max-w-3xl mx-auto space-y-6 text-[#d1d5db]">
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold text-xl shrink-0">01</span>
              <span>Visual mapping to reshape API responses into your exact data model.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold text-xl shrink-0">02</span>
              <span>Instant SDK generation with your custom mappings included.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold text-xl shrink-0">03</span>
              <span>Support for complex nested structures and transformations.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold text-xl shrink-0">04</span>
              <span>Enterprise features with version control and team collaboration.</span>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Simplify API Integrations?</h2>
          <p className="text-[#d1d5db] max-w-lg mb-6">
            Let our custom mapping tools handle the heavy lifting.
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