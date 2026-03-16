import React from "react";
import Header from "../Components/Landing/Header";

const sectionStyle = {
  background: "#1f1f1f",
  border: "1px solid #333",
  borderRadius: "10px",
  padding: "1.25rem",
  marginBottom: "1.25rem",
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center font-[Heebo] px-4 py-16">
      {/* About: Header Section */}
      <section className="flex flex-col items-center bg-[#111111] mt-20 mb-40">
        <Header
          label={"About Us"}
          title={"Meet DataCrawl"}
          subtext={
            "Building the infrastructure that powers secure AI training, data discovery, and intelligent systems."
          }
        />

        <div className="flex flex-wrap justify-center gap-8 items-start h-full md:h-100 mx-12 mt-30">
          {/* Mission */}
          <div className="bg-[#222] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">
            <h2 className="text-xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white mb-4 text-center">
              To build the infrastructure that allows organizations to unlock
              the value of their data—securely, privately, and intelligently.
              DataCrawl enables AI systems to learn from data without exposing
              the underlying information.
            </p>
          </div>

          {/* Team */}
          <div className="bg-[#222] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">
            <h2 className="text-xl font-bold text-white mb-4">Our Team</h2>
            <p className="text-white mb-4 text-center">
              Our team combines experience in software engineering, AI
              development, distributed systems, and data infrastructure. We are
              passionate about building technology that empowers researchers,
              developers, and organizations to innovate faster.
            </p>
          </div>

          {/* Values */}
          <div className="bg-[#222] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">
            <h2 className="text-xl font-bold text-white mb-4">Our Values</h2>
            <ul className="text-white text-left list-disc pl-5">
              <li>Accessibility — making data tools available to everyone</li>
              <li>Transparency — clear systems and open collaboration</li>
              <li>Innovation — building the next generation of AI infrastructure</li>
              <li>Security — protecting sensitive data by design</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why DataCrawl */}
      <section style={sectionStyle}>
        <h1 className="text-2xl font-bold text-white mb-6">Why DataCrawl?</h1>

        <p className="text-white mb-8 text-center max-w-2xl">
          DataCrawl is building a new layer of infrastructure for the data
          economy. Today, organizations sit on massive amounts of valuable data
          but often cannot share or utilize it due to privacy, security, or
          regulatory constraints. DataCrawl solves this by enabling AI models to
          train directly on private datasets without the data ever leaving its
          source.
        </p>

        <p className="text-white mb-8 text-center max-w-2xl">
          Through built-in APIs, dataset discovery tools, and distributed
          training nodes, DataCrawl connects data providers with developers,
          researchers, and companies that need insights—while preserving full
          control and ownership of the underlying data.
        </p>

        <p className="text-white mb-8 text-center max-w-2xl">
          Whether you're building robotics systems, developing AI models,
          conducting research, or exploring new data-driven opportunities,
          DataCrawl provides the tools to securely access and utilize the
          world's growing ecosystem of data.
        </p>

        <h2 className="text-xl font-bold text-white mb-4">Get Involved</h2>

        <h2 className="text-lg text-white mb-2">Contact Us</h2>
        <p className="text-white mb-4">
          Have questions, feedback, or partnership ideas? We'd love to hear from
          you. Reach out at{" "}
          <a
            href="mailto:contact@datacrawl.org"
            className="text-blue-400 hover:underline"
          >
            contact@datacrawl.org
          </a>.
        </p>
      </section>
    </div>
  );
}