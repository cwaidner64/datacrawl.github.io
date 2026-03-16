import React from "react";
import Header from "../Components/Landing/Header";

const sectionStyle = {
  background: "#1f1f1f",
  border: "1px solid #333",
  borderRadius: "10px",
  padding: "2rem",
  marginBottom: "2rem",
  maxWidth: "900px"
};

export default function Investors() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center font-[Heebo] px-4 py-12">

      {/* Header */}
      <section className="flex flex-col items-center bg-[#111111] mt-20 mb-32">

        <Header
          label={"Investors"}
          title={"Invest in the Future of AI Data Infrastructure"}
          subtext={"DataCrawl is building the infrastructure that powers robotics and autonomous systems."}
        />

        <div className="flex flex-wrap justify-center gap-8 items-start mx-12 mt-20">

          {/* Market Opportunity */}
          <div className="bg-[#222] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">

            <h2 className="text-xl font-bold text-white mb-4">
              Massive Market Opportunity
            </h2>

            <p className="text-white mb-4 text-center">
              Robotics, autonomous vehicles, and AI systems require massive
              amounts of real-world data. DataCrawl connects data providers
              with companies that need it.
            </p>

            <ul className="text-white text-left list-disc pl-5">
              <li>Robotics & autonomous vehicle data</li>
              <li>AI training datasets</li>
              <li>Sensor and fleet telemetry</li>
            </ul>

          </div>

          {/* Technology */}
          <div className="bg-[#222] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">

            <h2 className="text-xl font-bold text-white mb-4">
              Breakthrough Infrastructure
            </h2>

            <p className="text-white mb-4 text-center">
              DataCrawl enables organizations to train AI models on private
              datasets without exposing the underlying data.
            </p>

            <ul className="text-white text-left list-disc pl-5">
              <li>Distributed training nodes</li>
              <li>Secure dataset access</li>
              <li>API-driven data marketplace</li>
            </ul>

          </div>

          {/* Growth */}
          <div className="bg-[#222] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">

            <h2 className="text-xl font-bold text-white mb-4">
              Scalable Platform
            </h2>

            <p className="text-white mb-4 text-center">
              Our platform connects developers, companies, and data providers
              through a growing network of distributed nodes.
            </p>

            <ul className="text-white text-left list-disc pl-5">
              <li>Global developer ecosystem</li>
              <li>Recurring data access revenue</li>
              <li>Scalable infrastructure model</li>
            </ul>

          </div>

        </div>

      </section>

      {/* Why Invest */}
      <section style={sectionStyle}>

        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Why Invest in DataCrawl?
        </h1>

        <p className="text-white mb-6 text-center">
          The next generation of AI systems — from autonomous vehicles to
          robotics platforms — depends on access to large, diverse, and
          continuously updated datasets. However, most valuable data is locked
          behind privacy, security, and ownership constraints.
        </p>

        <p className="text-white mb-6 text-center">
          DataCrawl solves this problem by allowing AI models to train directly
          on distributed datasets without the data ever leaving its original
          environment. This approach unlocks new opportunities for companies
          that want to monetize data while maintaining full control and
          security.
        </p>

        <p className="text-white mb-6 text-center">
          By connecting data providers, developers, and AI companies through
          secure APIs and distributed infrastructure, DataCrawl aims to become
          a foundational layer in the emerging AI data economy.
        </p>

      </section>

      {/* Roadmap */}
      <section style={sectionStyle}>

        <h2 className="text-xl font-bold text-white mb-4 text-center">
          Product Roadmap
        </h2>

        <p className="text-white mb-4 text-center">
          DataCrawl is currently developing several key components that will
          expand the platform's capabilities and market reach.
        </p>

        <ul className="text-white list-disc pl-8 space-y-2">
          <li>
            A distributed DataCrawl Node system for secure AI training on
            private datasets.
          </li>

          <li>
            A marketplace for robotics and automotive datasets accessible
            through standardized APIs.
          </li>

          <li>
            Developer tools and open-source applications for dataset discovery
            and integration.
          </li>

          <li>
            Enterprise-grade solutions for organizations managing large
            internal data systems.
          </li>
        </ul>

      </section>

      {/* Contact */}
      <section className="flex flex-col items-center bg-[#111111] mt-12 mb-20">

        <h2 className="text-xl font-bold text-white mb-4">
          Investor Contact
        </h2>

        <p className="text-white text-center max-w-xl">
          If you are interested in investment opportunities, strategic
          partnerships, or learning more about DataCrawl's vision for the
          future of AI data infrastructure, please reach out to us at
          <br /><br />
          <a
            href="mailto:contact@datacrawl.org"
            className="text-blue-500 underline"
          >
            contact@datacrawl.org
          </a>
        </p>

      </section>

    </div>
  );
}