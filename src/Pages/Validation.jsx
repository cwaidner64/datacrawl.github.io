import React from "react";
import Header from "../Components/Landing/Header";

export default function Validation() {
  const capabilities = [
    {
      title: "Schema Validation",
      description:
        "Check request and response structures before they reach production integrations.",
    },
    {
      title: "Contract Consistency",
      description:
        "Detect mismatched fields, required parameters, and formatting issues across endpoints.",
    },
    {
      title: "Integration Readiness",
      description:
        "Give teams a cleaner path to shipping APIs with predictable behavior and fewer downstream errors.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <section className="flex flex-col items-center mt-6 sm:mt-10 mb-12 sm:mb-20 text-center">
          <Header
            label="Validation Layer"
            title="API Validation Layer"
            subtext="A concise validation layer for checking API quality, consistency, and integration readiness."
          />

          <p className="text-[#d1d5db] max-w-2xl mt-6 text-base sm:text-lg leading-8">
            DataCrawl&apos;s API validation layer helps teams verify endpoint structure,
            payload quality, and contract reliability before release.
          </p>
        </section>

        <section className="w-full max-w-5xl mb-14 sm:mb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="bg-[#1a1a1a] border border-[#2f2f2f] rounded-2xl p-6 sm:p-8"
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-3 text-[#EAEAEA]">
                  {capability.title}
                </h2>
                <p className="text-[#bdbdbd] leading-7">{capability.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-4xl mb-12 text-center">
          <div className="bg-[#181818] border border-[#303030] rounded-3xl px-6 py-8 sm:px-10 sm:py-10">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#F2F2F2]">
              Available Now
            </h2>
            <p className="text-[#d1d5db] leading-8 mb-6 max-w-2xl mx-auto">
              The validation layer is available via
              <a
                href="https://api.datacrawl.org/"
                target="_blank"
                rel="noreferrer"
                className="text-[#7dd3fc] hover:text-[#bae6fd] transition ml-2"
              >
                https://api.datacrawl.org/
              </a>
              .
            </p>
            <p className="text-[#9f9f9f] max-w-2xl mx-auto leading-7">
              Use it to validate API definitions early, reduce integration friction,
              and keep downstream systems easier to maintain.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}