import React from "react";
import Header from "../Components/Landing/Header";

export default function About() {
  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <section className="flex flex-col items-center text-center mb-10 sm:mb-20">
          <Header
            label="About Us"
            title="Meet DataCrawl"
            subtext="Building secure data pipelines that connect data owners with the AI and robotics teams who need it."
          />
        </section>

        {/* Mission & Values */}
        <section className="grid md:grid-cols-2 gap-6 mb-8 sm:mb-16">
          
          {/* Our Mission */}
          <div className="bg-[#1f1f1f] border border-blue-500/30 rounded-2xl p-5 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl" />
            <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-4 block pl-4 sm:pl-6">Our Mission</span>
            <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed pl-4 sm:pl-6">
              Connecting data owners with AI and robotics teams through secure, plug-and-play pipelines.
            </p>
          </div>

          {/* Our Values */}
          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Our Values</h2>
            <ul className="space-y-4 text-[#d1d5db]">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Security and privacy by design</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Seamless matchmaking between data and demand</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Simplicity and reliability in complex data flows</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Building infrastructure that accelerates innovation</span>
              </li>
            </ul>
          </div>

        </section>

        {/* Why DataCrawl */}
        <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10 mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">Why DataCrawl</h2>
          <div className="max-w-3xl mx-auto text-[#d1d5db] space-y-6 text-center">
            <p>
              Organizations hold valuable real-world data but struggle to share or monetize it safely. 
              AI teams and robotics companies need high-quality datasets but face fragmented sources and integration challenges.
            </p>
            <p>
              DataCrawl solves both sides of the problem. We build secure, end-to-end data pipelines 
              that connect data owners with the right buyers — enabling seamless discovery, access, 
              and monetization while keeping data under full control.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold mb-4">Let's Build Together</h2>
          <p className="text-[#d1d5db] max-w-md mb-6">
            Whether you're a data owner or an AI/robotics team, we're here to help you move faster.
          </p>
          <p className="text-[#aaa]">
            Get in touch at{" "}
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