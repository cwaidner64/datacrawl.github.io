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
            subtext="The reliability layer for Make, n8n, and Zapier automations that can't afford silent failure"
          />
        </section>

        {/* Mission & Values */}
        <section className="grid md:grid-cols-2 gap-6 mb-8 sm:mb-16">
          
          {/* Our Mission */}
          <div className="bg-[#1f1f1f] border border-blue-500/30 rounded-2xl p-5 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl" />
            <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-4 block pl-4 sm:pl-6">Our Mission</span>
            <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed pl-4 sm:pl-6">
              Stop teams from constantly debugging broken automations instead of building value for their clients.
            </p>
          </div>

          {/* Our Values */}
          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">What We Prevent</h2>
            <ul className="space-y-4 text-[#d1d5db]">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Hours lost every week finding why a client's workflow silently stopped working</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Bad CRM data caused by payload changes no one was notified about</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Schema drift that becomes a client-visible incident before you catch it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Broken field mappings that skip steps, lose leads, and corrupt downstream records</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Debugging work that compounds as each new client adds another set of fragile integrations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-xl">•</span>
                <span>Discovering automation failures only after a client reports missing data or broken routing</span>
              </li>
            </ul>
          </div>

        </section>

        {/* Why DataCrawl */}
        <section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10 mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">Why DataCrawl Exists</h2>
          <div className="max-w-3xl mx-auto text-[#d1d5db] space-y-6 text-center">
            <p>
              Agencies using Make, n8n, and Zapier were constantly firefighting. A webhook would stop working. A field would vanish from a payload. A client would report missing leads three days after the automation quietly broke. The debugging loop repeated itself every few weeks, across every client.
            </p>
            <p>
              The problem wasn't a missing feature. It was that nothing existed at the point where workflows first receive data, before execution, before bad data flows downstream. Existing tools detect failures too late, surface alerts without context, and leave teams to do the operational work themselves.
            </p>
            <p>
              We didn't build another automation tool. We built the layer teams end up needing after workflows start breaking in production, the intake layer that catches schema drift, fixes known breakpoints, and flags new ones before clients see the damage.
            </p>
          </div>
        </section>

        {/* What Makes Us Different */}
<section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-10 mb-8 sm:mb-16">
  <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
    What other tools get wrong
  </h2>

  <div className="grid md:grid-cols-3 gap-6 text-left">

    <div>
      <h3 className="font-semibold mb-2 text-[#f2f2f2]">
        Most tools assume failures are visible
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Observability dashboards and error alerts only fire when something crashes loudly. Silent failures, bad data passing through as valid, and skipped steps don't trigger alerts. They just corrupt records quietly.
      </p>

      <h3 className="font-semibold mt-4 mb-2 text-[#60a5fa]">
        DataCrawl catches failures before workflow execution
      </h3>
      <p className="text-[#d1d5db] text-sm">
        DataCrawl operates at the ingestion layer, validating every incoming payload before it reaches your Make, n8n, or Zapier steps. Silent failures get caught before they become invisible damage.
      </p>
    </div>

    <div>
      <h3 className="font-semibold mb-2 text-[#f2f2f2]">
        Most tools stop at detection
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Alerting tools tell you something broke. They don't tell you what changed in the payload, which field is missing, or whether the issue is a new pattern or a known rename. Your team still has to figure that out.
      </p>

      <h3 className="font-semibold mt-4 mb-2 text-[#60a5fa]">
        DataCrawl fixes known issues automatically
      </h3>
      <p className="text-[#d1d5db] text-sm">
        Known field renames, type changes, and safe normalizations are rewritten at intake. New or ambiguous issues are flagged with enough context to resolve quickly instead of debugging from a blank log.
      </p>
    </div>

    <div>
      <h3 className="font-semibold mb-2 text-[#f2f2f2]">
        Most tools ignore silent data corruption
      </h3>
      <p className="text-[#d1d5db] text-sm">
        A workflow that runs successfully but writes wrong data to a CRM won't trigger an alert. It will surface as a client complaint days later when the damage is already done and undoing it is manual work.
      </p>

      <h3 className="font-semibold mt-4 mb-2 text-[#60a5fa]">
        DataCrawl prevents bad data from reaching downstream systems
      </h3>
      <p className="text-[#d1d5db] text-sm">
        DataCrawl rejects or flags payloads that don't match expected structure before they flow into CRMs, databases, or downstream automations. The failure is surfaced at intake, not discovered in a client report.
      </p>
    </div>

  </div>
</section>

        {/* CTA */}
        <section className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold mb-4">If your automations are already breaking in production, this is the layer you're missing.</h2>
          <p className="text-[#d1d5db] max-w-md mb-8">
            If you're debugging client workflows every week, that's not bad luck — it's missing infrastructure. DataCrawl is built to stop it from happening again.
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