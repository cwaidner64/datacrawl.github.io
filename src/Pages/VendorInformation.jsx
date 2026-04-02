import React from "react";
import Header from "../Components/Landing/Header";

export default function VendorInformation() {
  // Current vendors as a list (easy to extend later)
  const currentVendors = [
    {
      name: "DataCrawl",
      description: "Data Platform Provider, reach out for data sources not listed.",
      contact: "contact@datacrawl.org",
      contactUrl: "mailto:contact@datacrawl.org"
    },
    {
      name: "Voltair",
      description: "Geospatial datasets. Raw lidar, thermal, and RGB imaging of electrical infrastructure. Requestable by region and asset type. Reach out to DataCrawl for data services.",
      contact: "Contact DataCrawl for this vendor",
      contactUrl: "/contact"
    },

    {
      name: "MarketCheck",
      description: "Automotive datasets. Real-time and historical data from millions of vehicles, including sensor data, telematics, and maintenance records.",
      contact: "info@marketcheck.com",
      contactUrl: "mailto:info@marketcheck.com"
    }
    // Add more vendors here in the future like this:
    // {
    //   name: "Another Vendor",
    //   description: "Description goes here...",
    //   contact: "email@example.com",
    //   contactUrl: "mailto:email@example.com"
    // }
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
      <div className="max-w-6xl mx-auto">

        <section className="flex flex-col items-center text-center mb-10 sm:mb-16 mt-6 sm:mt-10">
          <Header
            label="Vendors"
            title="Data Vendors"
            subtext="DataCrawl connects organizations with valuable datasets to AI developers, robotics engineers, and research teams. Publish your data once and reach a global network while keeping full control."
          />
        </section>

        <div className="max-w-3xl mx-auto">

        {/* Why Become a Vendor */}
        <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-2xl font-semibold mb-6">Why Become a DataCrawl Vendor</h2>

          <p className="text-[#d1d5db] mb-6">
            Turn your unused operational data into revenue-generating assets. 
            DataCrawl makes your datasets discoverable and accessible to AI teams 
            through secure APIs and distributed training nodes — without you managing infrastructure.
          </p>

          <ul className="space-y-2 mb-8 text-[#d1d5db]">
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Monetize data through usage-based access</li>
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Reach AI developers and robotics companies globally</li>
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Secure integration with DataCrawl infrastructure</li>
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Maintain full ownership and control</li>
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>We handle discovery, billing, delivery, and marketing</li>
          </ul>

          <a
            href="/contact"
            className="text-blue-400 font-semibold hover:underline"
          >
            Apply to Become a Vendor →
          </a>

          <h3 className="text-xl font-semibold mt-12 mb-4">AI data pipeline integration</h3>
          <p className="text-[#d1d5db] mb-6">
            Integrate your datasets into DataCrawl’s distributed network so AI systems 
            can query them securely during training and inference.
          </p>

          <ul className="space-y-2 text-[#d1d5db]">
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Secure API-based access</li>
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Distributed delivery via DataCrawl infrastructure</li>
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Optimized for ML pipelines</li>
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Usage-based revenue model</li>
          </ul>

          <h3 className="text-xl font-semibold mt-10 mb-4">Vendor Requirements</h3>
          <ul className="space-y-2 text-[#d1d5db]">
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Clear dataset description and use cases</li>
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Compliance with privacy and licensing rules</li>
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Reliable and up-to-date data</li>
            <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>API or structured data endpoint support</li>
          </ul>

          <p className="text-[#d1d5db] mt-6 text-sm">
            All vendors are reviewed to ensure high quality for the ecosystem.
          </p>
        </section>

        {/* Current Vendors */}
        <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8">
          <h2 className="text-2xl font-semibold mb-6">Current Vendors</h2>

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
        </section>

        </div>
      </div>
    </div>
  );
}