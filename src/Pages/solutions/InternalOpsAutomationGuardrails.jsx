import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Landing/Header";
import { usePageMeta } from "../../utils/usePageMeta";

const pillars = [
  {
    title: "Data Quality At Intake",
    text: "Validate webhook payloads before they enter downstream CRM, finance, or routing systems where bad data is expensive to unwind.",
  },
  {
    title: "Fast Incident Containment",
    text: "When payload contracts shift, isolate and flag the exact mismatch so operations teams can resolve issues before SLA impact.",
  },
  {
    title: "Consistent Cross-Team Guardrails",
    text: "Apply one reliability standard across revenue ops, support ops, and internal tooling workflows that depend on automation.",
  },
];

const scenarios = [
  "Lead form payload changes that break CRM assignment logic",
  "Billing or entitlement webhooks with missing or malformed fields",
  "Support automation rules misfiring because event structures changed",
  "Operational alerts that should trigger but silently skip due to drift",
];

export default function InternalOpsAutomationGuardrails() {
  usePageMeta({
    title: "Internal Ops Automation Guardrails",
    description:
      "A reliability solution for internal operations workflows that depend on webhook and API payload integrity.",
    canonical: "https://www.datacrawl.org/solutions/internal-ops-automation-guardrails",
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
            label="Operations Solution"
            title="Internal Ops Automation Guardrails"
            subtext="Protect revenue and operations workflows from silent failures caused by payload mismatch and schema drift."
          />
          <p className="text-[#d1d5db] max-w-3xl mt-6 leading-7">
            Built for teams where automation errors create immediate business impact, from missed lead handoffs to broken support escalations.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3 mb-12 sm:mb-16">
          {pillars.map((item) => (
            <article key={item.title} className="rounded-2xl p-6 border border-[#2a2a2a] bg-[#181818]">
              <h2 className="text-[#E3E3E3] font-semibold text-lg mb-3">{item.title}</h2>
              <p className="text-[#9a9a9a] text-sm leading-7">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl p-8 border border-[#2a2a2a] bg-[#151515] mb-12 sm:mb-16">
          <h3 className="text-[#E3E3E3] font-bold text-2xl mb-4">Common Failure Scenarios Covered</h3>
          <ul className="space-y-3">
            {scenarios.map((scenario) => (
              <li key={scenario} className="flex items-start gap-3 text-[#cfcfcf] leading-7">
                <span className="text-green-400 mt-1">✓</span>
                <span>{scenario}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="text-center rounded-2xl p-8 border border-blue-700/40 bg-[#162038]">
          <h4 className="text-2xl font-bold text-white mb-3">Need stronger reliability across operations workflows?</h4>
          <p className="text-[#c7d2fe] mb-6">
            Add webhook guardrails before bad payloads create downstream cleanup work.
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
