import React from "react";
import Header from "../Components/Landing/Header";
import { usePageMeta } from "../utils/usePageMeta";

export default function About() {
  usePageMeta({
    title: "About",
    description: "Learn about DataCrawl — the team building self-healing API infrastructure to stop webhook breakages and schema drift before they hit production.",
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
            subtext="Stopping broken pipelines since 2026"
          />
        </section>

        {/* Mission & Values */}
        <section className="grid md:grid-cols-2 gap-6 mb-8 sm:mb-16">
          
          {/* Our Mission */}
          <div className="bg-[#1f1f1f] border border-blue-500/30 rounded-2xl p-5 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl" />
            <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-4 block pl-4 sm:pl-6">Our Mission</span>
            <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed pl-4 sm:pl-6">
            Build world-class infrastructure that simplifies data pipelines and accelerate automation.
            </p>
          </div>

          {/* Our Values */}
          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Our Goals</h2>
            <ul className="space-y-4 text-[#d1d5db]">
              <li className="flex items-start gap-3">
          
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Become the tool that is irresponsible NOT to use</span>
              </li>
              <li className="flex items-start gap-3">
          
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Build self healing schemas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Accelerate automation across all data workflows</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Ensure data quality and reliability at every step</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Empower developers with intuitive tools and seamless integrations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Foster a community of innovation and collaboration</span>
              </li>
            </ul>
          </div>

        </section>

        {/* Why DataCrawl */}
        <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10 mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">Why DataCrawl</h2>
          <div className="max-w-3xl mx-auto text-[#d1d5db] space-y-6 text-center">
            <p>
            DataCrawl was born out of frustration with brittle data pipelines and the lack of tools to ensure data quality and reliability. We set out to build a platform that not only simplifies pipeline management but also empowers developers to automate and innovate with confidence.
            </p>
            <p>
            Our team is passionate about solving real-world data challenges and creating infrastructure that makes a tangible difference in how organizations manage their data workflows. We believe in building tools that are not only powerful but also intuitive and accessible to developers of all levels.
            </p>
          </div>
        </section>

        {/* What Makes Us Different */}
<section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10 mb-8 sm:mb-16">
  <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
    Why DataCrawl is different from existing API tools
  </h2>

  <div className="grid md:grid-cols-3 gap-6 text-left">

    <div>
      <h3 className="font-semibold mb-2 text-[#f2f2f2]">
        Others: Detect broken APIs
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Tools like Monte Carlo and Bigeye only flag issues after data breaks.
        Engineers still have to debug and fix everything manually.
      </p>

      <h3 className="font-semibold mt-4 mb-2 text-[#60a5fa]">
        DataCrawl: Fixes API data in real time
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Validates every request at the HTTP layer and prevents bad data from entering your system.
      </p>
    </div>

    <div>
      <h3 className="font-semibold mb-2 text-[#f2f2f2]">
        Others: Static or rule-based validation
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Great Expectations and Soda require manual rule definitions that break as APIs evolve.
      </p>

      <h3 className="font-semibold mt-4 mb-2 text-[#60a5fa]">
        DataCrawl: Learns schemas automatically
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Learns structure from live traffic and adapts validation without manual rules.
      </p>
    </div>

    <div>
      <h3 className="font-semibold mb-2 text-[#f2f2f2]">
        Others: Observe or monitor APIs
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Fivetran and Datadog-style tools operate after ingestion or within closed systems.
      </p>

      <h3 className="font-semibold mt-4 mb-2 text-[#60a5fa]">
        DataCrawl: Sits at the API entry point
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Works with any API or webhook before data enters pipelines — not after.
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