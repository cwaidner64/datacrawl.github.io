import React from "react";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../../utils/usePageMeta";

export default function MakeWebhookBreakage() {
  usePageMeta({
    title: "How to Fix Make.com Webhook Breakages",
    description: "Make.com webhook scenarios break when an API provider renames a field, adds a required key, or changes a payload structure. Learn how to detect, repair, and reduce future breakages with better validation and normalization.",
    canonical: "https://www.datacrawl.org/guides/make-webhook-breakage",
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
          <span className="text-[#c8c8c8]">Make.com Webhook Breakages</span>
        </div>

        <span className="inline-block mb-4 px-3 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-wide uppercase">
          Make.com · Webhook Validation
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] mb-4 leading-tight">
          How to Fix Make.com Webhook Breakages
        </h1>

        <p className="text-[#9a9a9a] text-lg mb-10 leading-relaxed">
          Make.com scenarios depend on a predictable payload structure. When an upstream API renames a field, removes a required key, or changes a data type, your scenario silently stops processing — or worse, passes bad data downstream.
        </p>

        {/* TOC */}
        <nav className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6 mb-12">
          <p className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-3">In this guide</p>
          <ol className="flex flex-col gap-2 text-sm text-blue-400">
            <li><a href="#why-break" className="hover:underline">1. Why Make.com webhooks break</a></li>
            <li><a href="#common-causes" className="hover:underline">2. The most common payload mismatch causes</a></li>
            <li><a href="#debugging" className="hover:underline">3. How to debug a broken scenario</a></li>
            <li><a href="#prevention" className="hover:underline">4. Preventing breakages with schema validation</a></li>
            <li><a href="#datacrawl" className="hover:underline">5. Managed alternative to handling it yourself</a></li>
          </ol>
        </nav>

        <section id="why-break" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">Why Make.com webhooks break</h2>
          <p className="text-[#b8b8b8] mb-4 leading-relaxed">
            Make.com scenarios map incoming webhook data to actions using field-level references like <code className="bg-[#1e1e1e] px-1.5 py-0.5 rounded text-blue-300 text-sm">{`{{1.payload.user_id}}`}</code>. When the field name changes to <code className="bg-[#1e1e1e] px-1.5 py-0.5 rounded text-blue-300 text-sm">userId</code>, every downstream module that references <code className="bg-[#1e1e1e] px-1.5 py-0.5 rounded text-blue-300 text-sm">user_id</code> returns null or errors.
          </p>
          <p className="text-[#b8b8b8] leading-relaxed">
            The scenario may still run — it just processes incomplete or wrong data, inserting null values into your CRM, sending empty emails, or silently skipping records.
          </p>
        </section>

        <section id="common-causes" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">The most common payload mismatch causes</h2>
          <ul className="flex flex-col gap-4">
            {[
              { title: "Field renames", desc: 'Provider renames user_id to userId or contact_email to email. Make cannot automatically detect the mapping change.' },
              { title: "Type changes", desc: 'A field previously sent as a string ("42") is now sent as a number (42). Downstream modules may fail type validation.' },
              { title: "Structural changes", desc: "A flat payload is wrapped in an envelope ({\"data\": {...}}) or a nested object is flattened. Field paths break." },
              { title: "Required fields going missing", desc: "A field that was always present starts being omitted for some event types, causing conditional branches to route incorrectly." },
              { title: "New required fields", desc: "The provider adds required input fields for new features. Existing Make modules do not send those fields, causing 400 errors on downstream webhooks." },
            ].map((item) => (
              <li key={item.title} className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-5">
                <p className="text-[#E3E3E3] font-semibold mb-1">{item.title}</p>
                <p className="text-[#888] text-sm">{item.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="debugging" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">How to debug a broken Make.com scenario</h2>
          <ol className="flex flex-col gap-4 text-[#b8b8b8] text-sm leading-relaxed">
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">1.</span> Open the scenario, click the failed module, and inspect the <strong className="text-[#E3E3E3]">Input/Output</strong> bundle in the execution log.</li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">2.</span> Compare the incoming bundle keys against what the module expects. Look for null values where you expect data.</li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">3.</span> Check the webhook trigger module for the <strong className="text-[#E3E3E3]">raw payload</strong> tab to see what the provider actually sent.</li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">4.</span> If fields are missing or renamed, update the downstream module field mappings to match the new keys.</li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">5.</span> Re-run the scenario with <strong className="text-[#E3E3E3]">Run Once</strong> to confirm the fix, then enable automatic scheduling.</li>
          </ol>
          <div className="mt-6 bg-[#181818] border border-[#2a2a2a] rounded-xl p-5">
            <p className="text-blue-300 text-sm font-semibold mb-2">Example incident log</p>
            <pre className="text-xs text-[#9a9a9a] whitespace-pre-wrap leading-relaxed font-mono">{`Webhook bundle received:
{
  "email": "buyer@example.com",
  "order_total": 189.00
}

Expected by mapped module:
customer_email

Observed failure:
The email field in the downstream module resolves to empty because the sender renamed customer_email to email.`}</pre>
          </div>
          <div className="mt-6 bg-[#1a1f30] border border-blue-500/30 rounded-xl p-5">
            <p className="text-blue-300 text-sm font-semibold mb-1">The problem with manual debugging</p>
            <p className="text-[#9a9a9a] text-sm">This works for the current incident, but it does not remove the underlying fragility. If providers keep changing payloads without notice, teams need a repeatable validation and normalization layer, not just better firefighting.</p>
          </div>
        </section>

        <section id="prevention" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">Preventing breakages with schema validation</h2>
          <p className="text-[#b8b8b8] mb-4 leading-relaxed">
            The root cause of most Make.com webhook breakages is the absence of a contract between the sender and the receiver. Schema validation enforces that contract:
          </p>
          <ul className="flex flex-col gap-3 text-[#b8b8b8] text-sm">
            {[
              "Define the expected payload structure (field names, types, required/optional).",
              "Validate every incoming request against that structure before it reaches your scenario.",
              "Alert your team immediately when a mismatch is detected — not hours later when a customer reports a problem.",
              "Auto-correct known field renames and type coercions so the scenario keeps running without manual intervention.",
            ].map((point, i) => (
              <li key={i} className="flex gap-2"><span className="text-green-400 mt-0.5 shrink-0">✓</span>{point}</li>
            ))}
          </ul>
          <p className="text-[#b8b8b8] mt-6 leading-relaxed">
            In practice, teams usually implement this with one of three patterns: a small middleware service in front of the webhook, a gateway worker that validates and rewrites payloads, or a Make intake scenario dedicated to normalization before business logic runs.
          </p>
        </section>

        <section id="datacrawl" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">Managed alternative to handling it yourself</h2>
          <p className="text-[#b8b8b8] mb-6 leading-relaxed">
            If you do not want to build and operate that validation layer yourself, DataCrawl can sit in front of your Make.com webhook trigger, detect schema drift, normalize known issues, and alert on changes that still need human review.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { icon: "🔍", title: "Drift detection", desc: "Watch for renamed fields, shape changes, and missing required data before scenarios break." },
              { icon: "⚡", title: "Intake validation", desc: "Check each request before it reaches the modules that depend on a stable payload shape." },
              { icon: "🔧", title: "Normalization", desc: "Rewrite known field and type issues into a consistent format for downstream steps." },
              { icon: "🔔", title: "Operational alerts", desc: "Escalate changes that should not be auto-corrected so teams can review safely." },
            ].map((item) => (
              <div key={item.title} className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-5 flex gap-3">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <p className="text-[#E3E3E3] font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-[#888] text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#1a233a] border border-blue-500/40 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[#E3E3E3] mb-3">Want someone else to operate that layer?</h3>
          <p className="text-[#9a9a9a] mb-6">Build the validation and normalization workflow yourself, or use DataCrawl if you want managed coverage around your Make.com automations.</p>
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
            <button onClick={() => navigate("/make-webhook-errors")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors flex-1">
              <p className="text-blue-400 text-xs mb-1">Make</p>
              <p className="text-[#E3E3E3] text-sm font-semibold">Make.com webhook errors</p>
            </button>
            <button onClick={() => navigate("/guides/n8n-schema-drift")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors flex-1">
              <p className="text-blue-400 text-xs mb-1">n8n</p>
              <p className="text-[#E3E3E3] text-sm font-semibold">Fixing n8n Schema Drift</p>
            </button>
            <button onClick={() => navigate("/guides/zapier-payload-mismatch")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors flex-1">
              <p className="text-blue-400 text-xs mb-1">Zapier</p>
              <p className="text-[#E3E3E3] text-sm font-semibold">Troubleshooting Zapier Payload Mismatches</p>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
