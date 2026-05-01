import React from "react";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../../utils/usePageMeta";

export default function N8nSchemaDrift() {
  usePageMeta({
    title: "Fixing n8n Schema Drift: Webhook and API Payload Changes",
    description: "n8n workflows break when upstream APIs change their payload schema. Learn how to detect schema drift, repair broken webhook nodes, and reduce future failures with stronger validation and intake controls.",
    canonical: "https://www.datacrawl.org/guides/n8n-schema-drift",
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
          <span className="text-[#c8c8c8]">n8n Schema Drift</span>
        </div>

        <span className="inline-block mb-4 px-3 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-wide uppercase">
          n8n · Schema Drift
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] mb-4 leading-tight">
          Fixing n8n Schema Drift: Webhook and API Payload Changes
        </h1>

        <p className="text-[#9a9a9a] text-lg mb-10 leading-relaxed">
          n8n workflows break silently when an API provider changes their payload schema. A field rename, a type change, or a structural envelope shift can stop your entire workflow — and n8n's error messages rarely tell you exactly what changed.
        </p>

        {/* TOC */}
        <nav className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6 mb-12">
          <p className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-3">In this guide</p>
          <ol className="flex flex-col gap-2 text-sm text-blue-400">
            <li><a href="#what-is-schema-drift" className="hover:underline">1. What is API schema drift?</a></li>
            <li><a href="#n8n-impact" className="hover:underline">2. How schema drift breaks n8n workflows</a></li>
            <li><a href="#detection" className="hover:underline">3. How to detect schema drift in n8n</a></li>
            <li><a href="#fix" className="hover:underline">4. Fixing broken n8n webhook nodes</a></li>
            <li><a href="#prevent" className="hover:underline">5. Reducing schema drift risk in production</a></li>
          </ol>
        </nav>

        <section id="what-is-schema-drift" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">What is API schema drift?</h2>
          <p className="text-[#b8b8b8] mb-4 leading-relaxed">
            Schema drift happens when an API provider changes the structure, field names, or data types of their responses without updating their documentation or notifying integrators. It is one of the most common causes of silent integration failures.
          </p>
          <p className="text-[#b8b8b8] leading-relaxed">
            Unlike a hard API error (which returns a 4xx or 5xx status code), schema drift usually returns a 200 OK — with different data than your n8n workflow expects. The workflow runs, but produces wrong or incomplete output.
          </p>
        </section>

        <section id="n8n-impact" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">How schema drift breaks n8n workflows</h2>
          <p className="text-[#b8b8b8] mb-6 leading-relaxed">
            n8n nodes reference specific fields using expressions like <code className="bg-[#1e1e1e] px-1.5 py-0.5 rounded text-blue-300 text-sm">{`{{ $json["user_id"] }}`}</code>. When the field is renamed to <code className="bg-[#1e1e1e] px-1.5 py-0.5 rounded text-blue-300 text-sm">userId</code>, the expression returns <code className="bg-[#1e1e1e] px-1.5 py-0.5 rounded text-blue-300 text-sm">undefined</code>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { type: "Field rename", example: "user_id → userId", impact: "All downstream references return undefined or empty" },
              { type: "Nested wrapping", example: "payload.name → payload.user.name", impact: "The field exists but at a different path" },
              { type: "Type coercion", example: '"active": "true" → "active": true', impact: "Boolean conditions evaluate incorrectly" },
              { type: "Array vs object", example: "Single item as object → wrapped in array", impact: "Array operations fail on unexpected object type" },
            ].map((row) => (
              <div key={row.type} className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-4">
                <p className="text-[#E3E3E3] font-semibold text-sm mb-1">{row.type}</p>
                <p className="text-blue-400 text-xs font-mono mb-2">{row.example}</p>
                <p className="text-[#888] text-xs">{row.impact}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="detection" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">How to detect schema drift in n8n</h2>
          <ol className="flex flex-col gap-4 text-[#b8b8b8] text-sm leading-relaxed">
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">1.</span> Open the failed workflow execution and click the <strong className="text-[#E3E3E3]">error node</strong>. Inspect the input data to see what the API actually returned.</li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">2.</span> Compare the current response keys against the field references in your workflow expressions.</li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">3.</span> Add a <strong className="text-[#E3E3E3]">Set node</strong> after the trigger to log all incoming keys — this helps catch drift faster when you add logging before it matters.</li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold shrink-0">4.</span> Check the API provider's changelog or webhook docs for recent updates. Many providers change silently without versioning.</li>
          </ol>
          <div className="mt-6 bg-[#181818] border border-[#2a2a2a] rounded-xl p-5">
            <p className="text-blue-300 text-sm font-semibold mb-2">Example execution data</p>
            <pre className="text-xs text-[#9a9a9a] whitespace-pre-wrap leading-relaxed font-mono">{`Node input:
{
  "userId": 42,
  "status": true
}

Workflow expression:
{{ $json["user_id"] }}

Observed result:
undefined

This is a classic schema drift incident: the webhook is healthy, but the workflow still depends on the old key.`}</pre>
          </div>
        </section>

        <section id="fix" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">Fixing broken n8n webhook nodes</h2>
          <p className="text-[#b8b8b8] mb-4 leading-relaxed">Once you have identified the schema change, update every downstream node that references the changed field:</p>
          <ul className="flex flex-col gap-3 text-[#b8b8b8] text-sm">
            {[
              "Update all field references in expressions to use the new key name.",
              "Re-test with pinned test data that reflects the current payload structure.",
              "Use n8n's 'Rename Keys' node to normalize field names before they reach downstream logic — this reduces brittleness.",
              "Document the expected schema in a 'Set node' comment so future changes are easier to catch.",
            ].map((point, i) => (
              <li key={i} className="flex gap-2"><span className="text-green-400 mt-0.5 shrink-0">✓</span>{point}</li>
            ))}
          </ul>
          <div className="mt-6 bg-[#1a1f30] border border-blue-500/30 rounded-xl p-5">
            <p className="text-blue-300 text-sm font-semibold mb-1">The fragility problem</p>
            <p className="text-[#9a9a9a] text-sm">Renaming fields in workflow expressions works, but it does not change the operating model. If the upstream payload changes again, the workflow stays fragile unless you add a stable normalization or validation step ahead of it.</p>
          </div>
        </section>

        <section id="prevent" className="mb-12">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">Reducing schema drift risk in production</h2>
          <p className="text-[#b8b8b8] mb-6 leading-relaxed">
            Durable n8n workflows usually rely on a stable intake pattern instead of trusting every upstream provider to preserve field names and shapes forever.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { step: "01", title: "Validate", desc: "Check incoming payloads for required fields, expected types, and known structural assumptions before downstream nodes execute." },
              { step: "02", title: "Normalize", desc: "Translate renamed keys, envelope changes, and type inconsistencies into a stable internal shape used by the workflow." },
              { step: "03", title: "Version + Alert", desc: "Track schema changes explicitly and alert on unknown drift so teams can review changes before production damage spreads." },
            ].map((item) => (
              <div key={item.step} className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-5">
                <span className="text-4xl font-black text-[#1e2a45]">{item.step}</span>
                <p className="text-[#E3E3E3] font-semibold mt-2 mb-1">{item.title}</p>
                <p className="text-[#888] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[#b8b8b8] leading-relaxed">
            Teams often implement this with a lightweight middleware service, a gateway worker, or explicit normalization nodes in front of business logic. If you want that coverage without maintaining it yourself, DataCrawl can provide it as a managed layer in front of n8n.
          </p>
        </section>

        {/* CTA */}
        <div className="bg-[#1a233a] border border-blue-500/40 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[#E3E3E3] mb-3">Need a managed way to handle schema drift?</h3>
          <p className="text-[#9a9a9a] mb-6">You can build your own validation and normalization layer, or use DataCrawl to manage drift detection, correction, and response in front of n8n.</p>
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
            <button onClick={() => navigate("/n8n-schema-drift")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors flex-1">
              <p className="text-blue-400 text-xs mb-1">SEO page</p>
              <p className="text-[#E3E3E3] text-sm font-semibold">Fix n8n schema drift issues</p>
            </button>
            <button onClick={() => navigate("/guides/make-webhook-breakage")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors flex-1">
              <p className="text-blue-400 text-xs mb-1">Make.com</p>
              <p className="text-[#E3E3E3] text-sm font-semibold">Fixing Make.com Webhook Breakages</p>
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
