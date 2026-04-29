import React from "react";
import Header from "../Components/Landing/Header";
import { usePageMeta } from "../utils/usePageMeta";

export default function About() {
  usePageMeta({
    title: "About",
    description: "Learn about DataCrawl — the team building monitored reliability coverage for webhook and API workflows so schema drift, payload mismatches, and failures are caught before they spread downstream.",
    canonical: "https://www.datacrawl.org/about",
  });
  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <section className="flex flex-col items-center text-center mb-10 sm:mb-20">
          <Header
            label="About Us"
            title="Meet DataCrawl"
            subtext="Building monitored reliability for critical webhook and API workflows"
          />
        </section>

        {/* Mission & Values */}
        <section className="grid md:grid-cols-2 gap-6 mb-8 sm:mb-16">
          
          {/* Our Mission */}
          <div className="bg-[#1f1f1f] border border-blue-500/30 rounded-2xl p-5 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl" />
            <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-4 block pl-4 sm:pl-6">Our Mission</span>
            <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed pl-4 sm:pl-6">
            Help teams keep webhook and API automations reliable by combining validation, drift detection, and response coverage around the flows they depend on.
            </p>
          </div>

          {/* Our Values */}
          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">What We Optimize For</h2>
            <ul className="space-y-4 text-[#d1d5db]">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Prevent silent failures before they reach downstream systems or customers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Turn recurring schema and payload problems into manageable, monitored rules</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Support teams whose revenue or operations depend on reliable automation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Reduce time spent debugging drift, malformed payloads, and integration breakage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Pair automation with human review where edge cases still need intervention</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Give teams clearer operational coverage as their workflows become more critical</span>
              </li>
            </ul>
          </div>

        </section>

        {/* Why DataCrawl */}
        <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10 mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">Why DataCrawl</h2>
          <div className="max-w-3xl mx-auto text-[#d1d5db] space-y-6 text-center">
            <p>
            DataCrawl started from a simple problem: teams were losing time and money to webhook failures, schema drift, and payload mismatches that were only discovered after something downstream broke. The gap was not just validation software, but reliable coverage around the flows that matter most.
            </p>
            <p>
            We focus on the layer between incoming data and production operations, where malformed requests, renamed fields, and ambiguous edge cases can either be corrected, flagged, or escalated before they become bigger incidents. That is the operating model reflected across our monitored coverage, managed reliability, and higher-trust plans.
            </p>
          </div>
        </section>

        {/* What Makes Us Different */}
<section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10 mb-8 sm:mb-16">
  <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
    Why DataCrawl is different from typical API tooling
  </h2>

  <div className="grid md:grid-cols-3 gap-6 text-left">

    <div>
      <h3 className="font-semibold mb-2 text-[#f2f2f2]">
        Others: Alert after something breaks
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Many tools are useful for observability, but they mainly surface problems after the bad payload has already moved downstream.
      </p>

      <h3 className="font-semibold mt-4 mb-2 text-[#60a5fa]">
        DataCrawl: Adds monitored reliability at the entry point
      </h3>
      <p className="text-[#d1d5db] text-sm">
        We focus on the point where requests first enter the workflow, so validation, correction, and response can happen before failures spread.
      </p>
    </div>

    <div>
      <h3 className="font-semibold mb-2 text-[#f2f2f2]">
        Others: Rely on static validation alone
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Static rules help, but they still leave teams owning every new edge case, schema change, and ambiguous mismatch themselves.
      </p>

      <h3 className="font-semibold mt-4 mb-2 text-[#60a5fa]">
        DataCrawl: Combines rules with active reliability work
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Known issues can be normalized automatically, while new or critical failures can be flagged and handled as part of an ongoing monitoring process.
      </p>
    </div>

    <div>
      <h3 className="font-semibold mb-2 text-[#f2f2f2]">
        Others: Stop at software features
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Most products sell tooling. Teams still need someone to define priorities, respond to incidents, and manage the operational fallout.
      </p>

      <h3 className="font-semibold mt-4 mb-2 text-[#60a5fa]">
        DataCrawl: Sells coverage around the workflow
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Our pricing and service model are built around coverage levels: monitored pipelines, managed reliability, and stronger response guarantees as systems become more business-critical.
      </p>
    </div>

  </div>
</section>

        {/* CTA */}
        <section className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold mb-4">Need reliability coverage for your workflows?</h2>
          <p className="text-[#d1d5db] max-w-md mb-8">
            If your team depends on webhook or API automations that cannot fail silently, we can help scope the right level of monitoring, intervention, and response.
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