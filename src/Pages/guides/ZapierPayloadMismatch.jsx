import React from "react";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../../utils/usePageMeta";

export default function ZapierPayloadMismatch() {
  usePageMeta({
    title: "Troubleshooting Zapier Payload Mismatches",
    description: "Zapier zaps fail when webhook payloads do not match what the Zap expects. Learn how to diagnose payload mismatches, repair mappings, and reduce future breakage with better validation and change handling.",
    canonical: "https://www.datacrawl.org/guides/zapier-payload-mismatch",
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111111] text-white px-4 sm:px-6 md:px-10 xl:px-35 py-16 font-[Heebo]">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#888] mb-8">
          <button onClick={() => navigate("/")} className="hover:text-[#E3E3E3] transition-colors">Home</button>
          <span>›</span>
          <span className="text-[#c8c8c8]">Guides</span>
          <span>›</span>
          <span className="text-[#c8c8c8]">Zapier Payload Mismatches</span>
        </div>

        <span className="inline-block mb-4 px-3 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-wide uppercase">
          Zapier · Payload Mismatch
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] mb-4 leading-tight">
          Troubleshooting Zapier Payload Mismatches
        </h1>

        <p className="text-[#9a9a9a] text-lg mb-10 leading-relaxed">
          Zapier zaps rely on consistent field names from webhook triggers. When an API provider changes their payload structure — even slightly — your zap either errors out or silently maps the wrong data. Here is how to diagnose, fix, and prevent Zapier payload mismatches.
        </p>

        {/* TOC */}
        <nav className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6 mb-12">
          <p className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-3">In this guide</p>
          <ol className="flex flex-col gap-2 text-sm text-blue-400">
            <li><a href="#how-zapier-uses-payloads" className="hover:underline">1. How Zapier uses webhook payloads</a></li>
            <li><a href="#types-of-mismatch" className="hover:underline">2. Types of payload mismatches in Zapier</a></li>
            <li><a href="#diagnose" className="hover:underline">3. How to diagnose a Zapier payload mismatch</a></li>
            <li><a href="#fix" className="hover:underline">4. Fixing field mapping errors</a></li>
            <li><a href="#prevent" className="hover:underline">5. Preventing future mismatches in production</a></li>
          </ol>
        </nav>

        <section id="how-zapier-uses-payloads" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">How Zapier uses webhook payloads</h2>
          <p className="text-[#b8b8b8] mb-4 leading-relaxed">
            When Zapier receives a webhook, it uses the field names from the <em>sample payload</em> you provided during setup to build the field map for downstream action steps. If the live payload has different field names than the sample, Zapier either fails to map the field (returning empty) or errors the action step.
          </p>
          <p className="text-[#b8b8b8] leading-relaxed">
            Unlike n8n or Make.com, Zapier does not let you easily inspect incoming raw payloads per-run. This makes payload mismatches harder to detect and slower to debug.
          </p>
        </section>

        <section id="types-of-mismatch" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">Types of payload mismatches in Zapier</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                title: "Field name change",
                desc: 'The API renames a field (e.g., contact_email → email). Your Zap action that mapped "contact_email" now receives an empty value.',
                severity: "High",
              },
              {
                title: "Missing required field",
                desc: "A field that was always present stops being included in some event types. The Zap action receives null for that field.",
                severity: "High",
              },
              {
                title: "Nested field path change",
                desc: 'A flat field moves into a nested object (e.g., name → user.name). Zapier maps "name" but the data is now under "user__name".',
                severity: "Medium",
              },
              {
                title: "Data type change",
                desc: 'A numeric field is sent as a string ("42" instead of 42). Zapier\'s action may reject the value or format it incorrectly.',
                severity: "Medium",
              },
              {
                title: "Extra fields added",
                desc: "New fields appear in the payload. Usually harmless, but can break Zaps that use a filter step checking for an exact field count.",
                severity: "Low",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-5 flex gap-4">
                <div className="flex-1">
                  <p className="text-[#E3E3E3] font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-[#888] text-sm">{item.desc}</p>
                </div>
                <span className={`text-xs font-bold shrink-0 px-2 py-1 rounded-full h-fit ${item.severity === "High" ? "bg-red-900/40 text-red-400" : item.severity === "Medium" ? "bg-yellow-900/40 text-yellow-400" : "bg-green-900/40 text-green-400"}`}>
                  {item.severity}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="diagnose" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">How to diagnose a Zapier payload mismatch</h2>
          <ol className="flex flex-col gap-4 text-[#b8b8b8] text-sm leading-relaxed">
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">1.</span> Go to Zapier's <strong className="text-[#E3E3E3]">Zap History</strong> and find the failed run. Open the error details for the failing action step.</li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">2.</span> Check which field the action step is mapping. Look for any fields showing as empty that should have data.</li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">3.</span> Go back to the <strong className="text-[#E3E3E3]">trigger step</strong> and click "Find New Records" to re-sample the webhook with a fresh payload. Compare the new sample field names to the original sample.</li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">4.</span> If field names have changed, update the action step mappings to use the new field name from the refreshed sample.</li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">5.</span> Re-test the Zap with "Test &amp; Review" to confirm the fix before turning it back on.</li>
          </ol>
          <div className="mt-6 bg-[#181818] border border-[#2a2a2a] rounded-xl p-5">
            <p className="text-blue-300 text-sm font-semibold mb-2">Example trigger mismatch</p>
            <pre className="text-xs text-[#9a9a9a] whitespace-pre-wrap leading-relaxed font-mono">{`Original trigger sample:
contact_email

Live trigger payload:
email

Observed result:
The CRM action still maps contact_email, receives an empty string, and the Zap run fails with a missing required field.`}</pre>
          </div>
          <div className="mt-6 bg-[#1a1f30] border border-blue-500/30 rounded-xl p-5">
            <p className="text-blue-300 text-sm font-semibold mb-1">Why this keeps happening</p>
            <p className="text-[#9a9a9a] text-sm">Zapier has limited schema-change awareness at the trigger level. If providers change field names or nesting without notice, teams usually end up re-sampling, re-mapping, and re-testing by hand unless they add stronger intake validation upstream.</p>
          </div>
        </section>

        <section id="fix" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">Fixing field mapping errors</h2>
          <p className="text-[#b8b8b8] mb-4 leading-relaxed">After refreshing the trigger sample with the new payload:</p>
          <ul className="flex flex-col gap-3 text-[#b8b8b8] text-sm">
            {[
              "Re-map every action field that referenced the old field name to the new name.",
              "Check downstream Zaps that may use the output of this action — payload changes can cascade.",
              "Use a Formatter step to normalize field names (e.g., always lowercase) before downstream actions, to make the Zap more resilient.",
              "Test with multiple sample payloads that cover edge cases (empty fields, null values, optional fields).",
              "Turn error notifications on so Zapier emails you if the Zap fails again.",
            ].map((point, i) => (
              <li key={i} className="flex gap-2"><span className="text-green-400 mt-0.5 shrink-0">✓</span>{point}</li>
            ))}
          </ul>
        </section>

        <section id="prevent" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">Preventing future mismatches in production</h2>
          <p className="text-[#b8b8b8] mb-4 leading-relaxed">
            The most reliable fix is not repeated manual remapping. It is adding process and guardrails before Zapier becomes the first place schema changes are discovered.
          </p>
          <ul className="flex flex-col gap-3 text-[#b8b8b8] text-sm mb-6">
            {[
              "Version webhook payloads when possible so downstream Zaps are not surprised by breaking changes.",
              "Keep a known-good sample payload library and re-test critical Zaps whenever upstream providers ship changes.",
              "Add a normalization step before sensitive actions so renamed or reformatted fields are translated into a stable internal shape.",
              "Route payloads through a small intake service or middleware that validates required fields, rejects malformed requests, and logs raw payloads for debugging.",
              "Turn on Zapier error alerts and maintain a runbook for re-sampling triggers, updating mappings, and verifying downstream actions.",
            ].map((point, i) => (
              <li key={i} className="flex gap-2"><span className="text-green-400 mt-0.5 shrink-0">✓</span>{point}</li>
            ))}
          </ul>
          <p className="text-[#b8b8b8] leading-relaxed">
            If you do not want to build and operate that intake layer yourself, DataCrawl can handle that validation, normalization, drift detection, and alerting for you before payloads ever reach Zapier.
          </p>
        </section>

        {/* CTA */}
        <div className="bg-[#1a233a] border border-blue-500/40 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[#E3E3E3] mb-3">Want this handled for you?</h3>
          <p className="text-[#9a9a9a] mb-6">You can build your own validation and normalization layer, or use DataCrawl to manage that reliability coverage in front of your Zaps.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/pricing")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => navigate("/validation")}
              className="px-8 py-3 border border-[#2f63d7] text-[#dbeafe] hover:bg-[#1a2750] font-semibold rounded-xl transition-all duration-200"
            >
              Try the Validator
            </button>
          </div>
        </div>

        {/* Related guides */}
        <div className="mt-12">
          <p className="text-[#888] text-sm mb-4">Related guides</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button onClick={() => navigate("/zapier-webhook-failures")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors flex-1">
              <p className="text-blue-400 text-xs mb-1">SEO page</p>
              <p className="text-[#E3E3E3] text-sm font-semibold">Zapier automation troubleshooting</p>
            </button>
            <button onClick={() => navigate("/guides/make-webhook-breakage")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors flex-1">
              <p className="text-blue-400 text-xs mb-1">Make.com</p>
              <p className="text-[#E3E3E3] text-sm font-semibold">Fixing Make.com Webhook Breakages</p>
            </button>
            <button onClick={() => navigate("/guides/n8n-schema-drift")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors flex-1">
              <p className="text-blue-400 text-xs mb-1">n8n</p>
              <p className="text-[#E3E3E3] text-sm font-semibold">Fixing n8n Schema Drift</p>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
