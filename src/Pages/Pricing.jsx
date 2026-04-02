import React from "react";
import Header from "../Components/Landing/Header";
import { useNavigate } from "react-router-dom";

export default function Pricing() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

      {/* Header */}
      <section className="flex flex-col items-center mt-6 sm:mt-10 mb-12 sm:mb-24 text-center">
        <Header
          label="Pricing"
          title="Usage-Based Infrastructure Pricing"
          subtext="Scale your data pipelines and AI training workloads without fixed limits."
        />

        <p className="text-[#d1d5db] max-w-2xl mt-6">
          DataCrawl pricing is based on actual usage. You only pay for the
          queries executed and the data transferred through the network.
        </p>
      </section>

      {/* Core Pricing Table */}
      <section className="max-w-4xl w-full mb-16 sm:mb-32">

        <h2 className="text-2xl font-semibold mb-8 text-center">
          Platform Usage
        </h2>

        <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-5 sm:p-8">

          <div className="flex flex-wrap justify-between gap-4 text-white mb-6">
            <span>API Queries</span>
            <span>$0.40 per 10,000 queries</span>
          </div>

          <div className="flex flex-wrap justify-between gap-4 text-white mb-6">
            <span>Data Transfer</span>
            <span>$0.09 per GB</span>
          </div>

          <div className="flex flex-wrap justify-between gap-4 text-white mb-6">
            <span>Dataset Streaming</span>
            <span>$0.12 per GB</span>
          </div>

          <div className="flex flex-wrap justify-between gap-4 text-white">
            <span>Dedicated Nodes</span>
            <span>Custom Pricing</span>
          </div>

        </div>

      </section>


      {/* Why DataCrawl */}
      <section className="max-w-3xl text-center mb-16 sm:mb-32">

        <h2 className="text-2xl font-semibold mb-6">
          Built for AI Training Pipelines
        </h2>

        <p className="text-[#d1d5db] mb-6">
          DataCrawl allows developers and researchers to query datasets
          directly through APIs without downloading large archives.
        </p>

        <p className="text-[#d1d5db] mb-6">
          Instead of managing storage infrastructure, DataCrawl provides
          distributed nodes that deliver structured datasets directly into
          machine learning workflows, robotics systems, and analytics
          platforms.
        </p>

        <p className="text-[#d1d5db]">
          This allows teams to train models faster while reducing storage,
          infrastructure, and data engineering overhead.
        </p>

      </section>


      {/* Infrastructure Capabilities */}
      <section className="max-w-5xl w-full mb-16 sm:mb-32">

        <h2 className="text-2xl font-semibold text-center mb-10">
          Platform Capabilities
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8">
            <h3 className="font-semibold text-lg mb-3">
              Dataset APIs
            </h3>
            <p className="text-[#d1d5db]">
              Access structured datasets through scalable APIs designed for
              machine learning and robotics applications.
            </p>
          </div>

          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8">
            <h3 className="font-semibold text-lg mb-3">
              Distributed Data Nodes
            </h3>
            <p className="text-[#d1d5db]">
              Query datasets through DataCrawl nodes that handle crawling,
              indexing, and delivery automatically.
            </p>
          </div>

          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8">
            <h3 className="font-semibold text-lg mb-3">
              Streaming Data Pipelines
            </h3>
            <p className="text-[#d1d5db]">
              Stream data directly into training pipelines without downloading
              large datasets.
            </p>
          </div>

        </div>

      </section>


      {/* Enterprise */}
      <section className="text-center max-w-3xl mb-16 sm:mb-32">

        <h2 className="text-2xl font-semibold mb-6">
          Enterprise Infrastructure
        </h2>

        <p className="text-[#d1d5db] mb-8">
          Organizations training large AI models or operating robotics fleets
          can deploy private DataCrawl nodes and dedicated dataset pipelines.
        </p>

        <button
          className="px-6 sm:px-12 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          onClick={() => navigate("/Contact")}
        >
          Contact Enterprise Sales
        </button>

      </section>

      </div>
    </div>
  );
}