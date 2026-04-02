import React from "react";
import Header from "../Components/Landing/Header";

export default function Investors() {
  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

      {/* Header */}
      <section className="flex flex-col items-center mt-8 sm:mt-20 mb-12 sm:mb-32">

        <Header
          label="Investors"
          title="Invest in the Future of Data Infrastructure"
          subtext="DataCrawl is building the infrastructure that powers robotics and autonomous systems."
        />

        <div className="flex flex-wrap justify-center gap-6 mt-12 sm:mt-20">

          {/* Market Opportunity */}
          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 w-full sm:w-80 flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-white mb-4">Massive Market Opportunity</h2>
            <p className="text-[#d1d5db] mb-6">
              Bridging unused data repositories with the growing demand for high-quality AI training data.
            </p>
            <ul className="text-left space-y-2 text-[#d1d5db]">
              <li>• Robotics & autonomous vehicle data</li>
              <li>• AI training datasets</li>
              <li>• Sensor and fleet telemetry</li>
            </ul>
          </div>

          {/* Technology */}
          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 w-full sm:w-80 flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-white mb-4">Breakthrough Infrastructure</h2>
            <p className="text-[#d1d5db] mb-6">
              Train AI models on distributed datasets with zero infrastructure overhead.
            </p>
            <ul className="text-left space-y-2 text-[#d1d5db]">
              <li>• Distributed data repositories</li>
              <li>• Secure dataset access controls</li>
              <li>• API-driven data marketplace</li>
            </ul>
          </div>

          {/* Growth */}
          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 w-full sm:w-80 flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-white mb-4">Scalable Platform</h2>
            <p className="text-[#d1d5db] mb-6">
              Built for rapid growth and recurring revenue.
            </p>
            <ul className="text-left space-y-2 text-[#d1d5db]">
              <li>• Global developer ecosystem</li>
              <li>• Recurring data access revenue</li>
              <li>• Highly scalable infrastructure</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Why Invest */}
      <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 sm:p-10 w-full max-w-4xl mb-8 sm:mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Why Invest in DataCrawl?
        </h2>
        <div className="space-y-6 text-[#d1d5db] text-center">
          <p>
            The next wave of AI and web applications — autonomous vehicles, robotics, and industrial systems — 
            requires large, diverse, and continuously updated datasets.
          </p>
          <p>
            Through our novel sdk infrastructure and data marketplace, we are uniquely positioned to capture this demand by connecting data providers with AI teams in a secure, scalable way.
          </p>
          <p>
            This creates a win-win: data owners can safely monetize their assets while AI and developer teams 
            gain access to high-quality, real-world data at scale.
          </p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 sm:p-10 w-full max-w-4xl mb-8 sm:mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Product Roadmap</h2>
        <p className="text-[#d1d5db] text-center mb-8">
          We are building key components to expand the platform’s capabilities and market reach.
        </p>
        <ul className="max-w-2xl mx-auto space-y-4 text-[#d1d5db]">
          <li className="flex gap-3">
            <span className="text-blue-400 font-bold">01</span>
            Automatic API generation for datasets, enabling seamless integration into DataCrawl infrastructure.
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400 font-bold">02</span>
            Distributed API nodes for secure, low-latency access to datasets without centralizing data storage.
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400 font-bold">03</span>
            Developer tools and open-source integrations for easy dataset discovery.
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400 font-bold">04</span>
            Enterprise solutions for organizations with large internal data systems.
          </li>
        </ul>
      </section>

      {/* Contact */}
      <section className="flex flex-col items-center text-center mb-12 sm:mb-20">
        <h2 className="text-2xl font-bold text-white mb-4">Investor Contact</h2>
        <p className="text-[#d1d5db] max-w-lg">
          Interested in investment opportunities or strategic partnerships? 
          We’d love to hear from you.
        </p>
        <p className="mt-6 text-[#aaa]">
          Reach out at{" "}
          <a 
            href="mailto:contact@datacrawl.org" 
            className="text-blue-500 hover:underline"
          >
            contact@datacrawl.org
          </a>
        </p>
      </section>

    </div>
    </div>
  );
}