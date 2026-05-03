import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Landing/Header";
import { usePageMeta } from "../../utils/usePageMeta";

const outcomes = [
  {
    title: "Stop Repeated Client Fire Drills",
    text: "Detect incoming payload changes before they break mapped fields, delayed follow-ups, or lead routing logic.",
  },
  {
    title: "Scale Delivery Without Linear Debugging",
    text: "Use one reliability layer across accounts so your team spends less time tracing incidents and more time shipping automations.",
  },
  {
    title: "Protect Trust During API Change Cycles",
    text: "Catch drift as soon as new payload patterns appear and escalate only the cases that need manual review.",
  },
];

const implementation = [
  "Route incoming webhooks through DataCrawl before they enter Make, n8n, or Zapier workflows.",
  "Validate payload contracts against your expected schema shape.",
  "Auto-fix known mismatch patterns like safe renames and type normalizations.",
  "Alert your team when new or ambiguous patterns need manual decisions.",
];

export default function AgencyAutomationReliability() {
  usePageMeta({
    title: "Agency Automation Reliability",
    description:
      "A reliability solution for agencies managing multi-client automations across Make, n8n, and Zapier.",
    canonical: "https://www.datacrawl.org/solutions/agency-automation-reliability",
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate("/solutions")}
            className="text-[#9a9a9a] hover:text-[#E3E3E3] text-sm transition-colors"
          >
            ← Back to Solutions
          </button>
          <span className="text-[#3a3a3a]">·</span>
          <button
            onClick={() => navigate("/validation")}
            className="text-blue-400 hover:underline text-sm"
          >
            See Validation Layer
          </button>
        </div>

        <section className="flex flex-col items-center mt-4 sm:mt-8 mb-10 sm:mb-16 text-center">
          <Header
            label="Agency Solution"
            title="Agency Automation Reliability"
            subtext="Keep client workflows stable as upstream APIs evolve, without adding a full-time debugging burden to your team."
          />
          <p className="text-[#d1d5db] max-w-3xl mt-6 leading-7">
            Solutions designed for agencies supporting multiple webhook-driven systems where debugging and schema drift are the #1 bottlenecks to scaling client automations.
            
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3 mb-12 sm:mb-16">
          {outcomes.map((item) => (
            <article key={item.title} className="rounded-2xl p-6 border border-[#2a2a2a] bg-[#181818]">
              <h2 className="text-[#E3E3E3] font-semibold text-lg mb-3">{item.title}</h2>
              <p className="text-[#9a9a9a] text-sm leading-7">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl p-8 border border-[#2a2a2a] bg-[#151515] mb-12 sm:mb-16">
          <h3 className="text-[#E3E3E3] font-bold text-2xl mb-4">How It Works In Practice</h3>
          <ul className="space-y-3">
            {implementation.map((step) => (
              <li key={step} className="flex items-start gap-3 text-[#cfcfcf] leading-7">
                <span className="text-blue-400 mt-1">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="text-center rounded-2xl p-8 border border-blue-700/40 bg-[#162038]">
          <h4 className="text-2xl font-bold text-white mb-3">Ready to reduce recurring client incidents?</h4>
          <p className="text-[#c7d2fe] mb-6">
            Start with monitored webhook reliability and scale up as your client automation footprint grows.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/pricing")}
              className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              View Pricing
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-7 py-3 rounded-xl border border-[#4a5ea8] text-[#dbeafe] hover:bg-[#1c2d55] font-semibold transition-colors"
            >
              Talk to Sales
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
