import React from "react";
import Header from "../Components/Landing/Header";

export default function VendorInformation() {

  const currentVendors = [
    {
      name: "DataCrawl",
      description: "Core API infrastructure and marketplace operator. Reach out for custom APIs, private listings, or data sources not yet available in the marketplace.",
      contact: "contact@datacrawl.org",
      contactUrl: "mailto:contact@datacrawl.org"
    },
    {
      name: "Voltair",
      description: "Geospatial and infrastructure imaging APIs. High-resolution lidar, thermal, and RGB data of electrical assets. Available via request.",
      contact: "Contact DataCrawl for access",
      contactUrl: "/contact"
    },
    {
      name: "MarketCheck",
      description: "Automotive and mobility APIs. Real-time and historical vehicle sensor data, telematics, and fleet intelligence. Easily integrable with one-click SDK generation.",
      contact: "info@marketcheck.com",
      contactUrl: "mailto:info@marketcheck.com"
    }
    // Add more vendors easily here
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
      <div className="max-w-6xl mx-auto">

        <section className="flex flex-col items-center text-center mb-10 sm:mb-16 mt-6 sm:mt-10">
          <Header
            label="For API Providers"
            title="Become an API Vendor"
            subtext="Join DataCrawl’s API Marketplace — publish once, reach thousands of developers and enterprises, and earn recurring revenue with zero infrastructure hassle."
          />
        </section>

        <div className="max-w-3xl mx-auto">

          {/* Why Become a Vendor */}
          <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-2xl font-semibold mb-6">Why Sell Your APIs on DataCrawl</h2>

            <p className="text-[#d1d5db] mb-6">
              Turn your APIs into scalable revenue streams. DataCrawl provides a complete marketplace 
              with built-in billing, usage analytics, secure authentication, and an instant SDK generator 
              that makes your API instantly accessible to developers in any language.
            </p>

            <ul className="space-y-2 mb-8 text-[#d1d5db]">
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Monetize through usage-based/subscription billing</li>
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Reach individual developers, startups, and enterprise teams</li>
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>SDK generation with visual mapping interface</li>
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Keep full control over pricing, access, and documentation</li>
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>We handle discovery, marketing, payments, and customer support</li>
            </ul>

            <a
              href="/contact"
              className="text-blue-400 font-semibold hover:underline"
            >
              Apply to List Your API →
            </a>

            <h3 className="text-xl font-semibold mt-12 mb-4">How It Works for Providers</h3>
            <p className="text-[#d1d5db] mb-6">
              Connect your existing API once. Our platform automatically generates beautiful, 
              language-specific SDKs with custom response mapping. Buyers can discover your API, 
              subscribe instantly, and integrate it in minutes — whether they are solo developers or large B2B teams.
            </p>

            <ul className="space-y-2 text-[#d1d5db]">
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>SDK generation in multiple languages</li>
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Visual mapping tool </li>
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>B2C / B2B billing and access control</li>
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Real-time usage analytics and revenue dashboard</li>
            </ul>

            <h3 className="text-xl font-semibold mt-10 mb-4">Vendor Requirements</h3>
            <ul className="space-y-2 text-[#d1d5db]">
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Public or private REST/GraphQL API endpoint</li>
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Clear documentation and usage examples</li>
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Defined pricing model (we support flexible tiers)</li>
              <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Compliance with security and data privacy standards</li>
            </ul>

            <p className="text-[#d1d5db] mt-6 text-sm">
              All APIs are reviewed for quality, reliability, and security before going live on the marketplace.
            </p>
          </section>

          {/* Current Vendors / API Providers */}
          <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8">
            <h2 className="text-2xl font-semibold mb-6">Featured API Providers</h2>

            <div className="space-y-6">
              {currentVendors.map((vendor, index) => (
                <div
                  key={index}
                  className="bg-[#222] border border-[#333] rounded-2xl p-4 sm:p-6"
                >
                  <div className="font-bold mb-2">{vendor.name}</div>
                  <p className="text-[#d1d5db] mb-4">
                    {vendor.description}
                  </p>
                  <a 
                    href={vendor.contactUrl} 
                    className="text-blue-400 font-semibold hover:underline"
                  >
                    {vendor.contact}
                  </a>
                </div>
              ))}
            </div>

            <p className="text-[#888] text-sm mt-8 text-center">
              More APIs and providers are being added regularly. 
              Want to see your API here? <a href="/contact" className="text-blue-400 hover:underline">Apply now</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}