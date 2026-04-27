import React, { useState } from "react";
import Header from "../Components/Landing/Header";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../utils/usePageMeta";

export default function Validation() {
  usePageMeta({
    title: "Webhook & API Validation Layer",
    description: "Test DataCrawl's live webhook validation layer. Paste any JSON payload and see real-time schema validation, drift detection, and auto-correction in action.",
    canonical: "https://www.datacrawl.org/validation",
  });

  const navigate = useNavigate();
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

  const validatorCoverage = [
    ["TC-01", "Simple rename", "Schema evolution", "Key remapping", "PASS"],
    ["TC-02", "Multiple renames", "Schema evolution", "Parallel remapping", "PASS"],
    ["TC-03", "Rename conflict", "Schema conflict", "Original key wins", "PASS"],
    ["TC-04", "Unix -> ISO timestamp", "Type normalization", "Format conversion", "PASS"],
    ["TC-05", "Boolean string -> bool", "Type normalization", '"true" -> true', "PASS"],
    ["TC-06", "Number string -> number", "Type normalization", '"45" -> 45', "PASS"],
    ["TC-07", "Numeric object -> array", "Structural normalization", "Object -> array", "PASS"],
    ["TC-08", "Deep nested flattening", "Structural ambiguity", "Not handled", "SKIP"],
    ["TC-09", "Q&A label rename", "Semantic mapping", "Not handled", "SKIP"],
    ["TC-10", "Envelope unwrap", "Structural normalization", "data.* removed", "PASS"],
    ["TC-11", "Single-item array unwrap", "Structural normalization", "[x] -> x", "PASS"],
    ["TC-12", "Empty required field", "Data quality", "Flag anomaly", "PASS (anomaly)"],
    ["TC-13", "Whitespace field", "Data quality", "Flag anomaly", "PASS (anomaly)"],
    ["TC-14", "ISO offset -> UTC Z", "Time normalization", "Standardize timezone", "PASS"],
    ["TC-15", "Far future date", "Data validation", "Flag only", "PASS (flagged)"],
    ["TC-16", "Duplicate question keys", "Data consistency", "Flag duplicates", "PASS (flagged)"],
    ["TC-17", "XSS payload", "Security detection", "Detect only", "PASS"],
    ["TC-18", "SQL injection", "Security detection", "Detect only", "PASS"],
    ["TC-19", "Prompt injection", "Security detection", "Flag only", "PASS"],
    ["TC-20", "Oversized payload", "Transport validation", "Reject (413)", "PASS"],
    ["TC-21", "Unicode normalization", "Encoding normalization", "Normalize text", "PASS"],
    ["TC-22", "Out-of-order delivery", "Ordering logic", "Sort by timestamp", "PASS"],
    ["TC-23", "Malformed JSON", "Transport validation", "Reject (400)", "PASS"],
    ["TC-24", "Duplicate delivery", "Idempotency", "Reject duplicate (409)", "PASS"],
    ["TC-25", "Airtable failure handling", "Integration", "Track success metadata", "PASS"],
    ["TC-26", "Full schema change", "Schema drift", "Flag change", "PASS"],
    ["TC-27", "Drift velocity", "Schema drift", "Flag trend", "PASS"],
    ["TC-28", "Confidence gaming", "Out of scope", "Not handled", "SKIP"],
  ];

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", role: "", intent: "", comment: "", plan: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("https://hook.us2.make.com/5jpdk7qebo4irz6ip4u7hyjjyajvs4j3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          role: formData.role,
          intent: formData.intent,
          comment: formData.comment.trim(),
          plan: formData.plan,
          source: "validator-pricing",
          submitted_at: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error(`Webhook failed: ${response.status}`);
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Validator contact form error:", err);
      setSubmitError("Unable to send your request right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const openForm = (plan) => {
    setFormData({ name: "", email: "", company: "", role: "", intent: "", comment: "", plan });
    setSubmitError("");
    setSubmitSuccess(false);
    setShowForm(true);
  };

  const getOutcomeClass = (outcome) => {
    if (outcome.startsWith("PASS")) {
      return "text-[#39FF14]";
    }
    if (outcome.startsWith("SKIP")) {
      return "text-[#facc15]";
    }
    return "text-[#d1d5db]";
  };

  const getBehaviorClass = (behavior, outcome) => {
    const behaviorLower = behavior.toLowerCase();
    const outcomeLower = outcome.toLowerCase();
    const isTagOnly =
      behaviorLower.includes("flag") ||
      behaviorLower.includes("detect only") ||
      behaviorLower.includes("not handled") ||
      outcomeLower.includes("flagged") ||
      outcomeLower.includes("anomaly") ||
      outcomeLower.startsWith("skip");

    return isTagOnly
      ? "text-[#facc15] bg-[#2a2300]"
      : "text-[#86efac] bg-[#052e16]";
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
      {/* Back nav */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center gap-4">
        <button onClick={() => navigate("/")} className="text-[#9a9a9a] hover:text-[#E3E3E3] text-sm transition-colors">
          ← Home
        </button>
        <span className="text-[#3a3a3a]">·</span>
        <button onClick={() => navigate("/pricing")} className="text-blue-400 hover:underline text-sm">
          View Pricing
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-8 rounded-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-white text-xl font-bold mb-1">Request Access</h2>
            {formData.plan && (
              <p className="text-[#7dd3fc] text-sm mb-6">Plan: {formData.plan}</p>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {submitError && (
                <div className="bg-red-600/20 border border-red-600 text-red-400 p-3 rounded text-sm">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="bg-green-600/20 border border-green-600 text-green-400 p-3 rounded text-sm">
                  Thank you! Your request has been sent to contact@datacrawl.org
                </div>
              )}
              <input
                type="text"
                name="name"
                placeholder="Preferred name"
                value={formData.name}
                required
                onChange={handleChange}
                disabled={isSubmitting || submitSuccess}
                className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                required
                onChange={handleChange}
                disabled={isSubmitting || submitSuccess}
                className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50"
              />
              <input
                type="text"
                name="company"
                placeholder="Company name"
                value={formData.company}
                required
                onChange={handleChange}
                disabled={isSubmitting || submitSuccess}
                className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50"
              />
              <select
                name="role"
                value={formData.role}
                required
                onChange={handleChange}
                disabled={isSubmitting || submitSuccess}
                className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50"
              >
                <option value="">What best describes you?</option>
                <option value="dev-individual">Individual Developer</option>
                <option value="dev-team">Developer (on a team)</option>
                <option value="data-engineer">Data / Backend Engineer</option>
                <option value="ml-engineer">ML / AI Engineer</option>
                <option value="founder">Founder / Startup</option>
                <option value="product">Product / Engineering Manager</option>
                <option value="enterprise">Enterprise / Architect</option>
                <option value="other">Other</option>
              </select>
              <select
                name="intent"
                value={formData.intent}
                required
                onChange={handleChange}
                disabled={isSubmitting || submitSuccess}
                className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50"
              >
                <option value="">What problem are you trying to solve?</option>
                <option value="debugging">Spending too much time debugging broken APIs</option>
                <option value="schema-breaks">Schema changes / payload mismatches breaking systems</option>
                <option value="bad-data">Bad or inconsistent API data causing downstream issues</option>
                <option value="automation">Fixing unreliable webhooks / automation workflows</option>
                <option value="preventative">Looking for a preventative validation layer</option>
                <option value="exploring">Just exploring / learning about the product</option>
                <option value="buying">Evaluating for team or company use</option>
                <option value="demo">Want a demo / walkthrough</option>
              </select>
              <textarea
                name="comment"
                placeholder="Optional comment"
                value={formData.comment}
                onChange={handleChange}
                disabled={isSubmitting || submitSuccess}
                rows={3}
                className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50 resize-y"
              />
              {!submitSuccess && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed p-3 rounded text-white font-bold"
                >
                  {isSubmitting ? "Sending..." : "Submit Request"}
                </button>
              )}
              <button
                type="button"
                onClick={() => { setShowForm(false); setSubmitError(""); setSubmitSuccess(false); }}
                disabled={isSubmitting}
                className="text-gray-400 mt-2 disabled:opacity-50 hover:text-gray-200 transition"
              >
                {submitSuccess ? "Close" : "Cancel"}
              </button>
            </form>
          </div>
        </div>
      )}
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

        <section className="w-full max-w-5xl mb-16 sm:mb-20">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#7dd3fc] uppercase border border-[#1e4a6e] bg-[#0d2133] px-4 py-1.5 rounded-full mb-4">
              Validator Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F2F2F2] mb-3">
              Access the Validation Layer
            </h2>
            <p className="text-[#9f9f9f] max-w-xl mx-auto text-sm sm:text-base leading-7">
              Contact us to get started. Both plans require an access request — we onboard teams directly.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-[#39FF14] text-sm font-semibold">✓</span>
              <span className="text-[#a3a3a3] text-sm">14-day free trial + demo &mdash; no credit card required</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Starter */}
            <div className="bg-[#181818] border border-[#2f2f2f] rounded-2xl p-6 sm:p-8 flex flex-col">
              <p className="text-xs font-semibold tracking-widest text-[#9ca3af] uppercase mb-3">Starter</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold text-[#7dd3fc]">$49</span>
                <span className="text-[#9f9f9f] text-sm mb-1">/mo</span>
              </div>
              <p className="text-[#6b7280] text-sm italic mb-6">Stop common pipeline issues</p>
              <ul className="space-y-3 text-sm text-[#d1d5db] mb-8 flex-1">
                {[
                  "50,000 requests / month",
                  "3 pipelines",
                  "Rule-based fixes",
                  "Basic anomaly detection",
                  "Email alerts",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#39FF14] select-none">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openForm("Starter — $49/mo")}
                className="block w-full text-center bg-transparent border border-[#7dd3fc] text-[#7dd3fc] hover:bg-[#7dd3fc] hover:text-[#111111] transition font-semibold rounded-lg px-6 py-2.5 text-sm mt-auto"
              >
                Contact to Access
              </button>
            </div>

            {/* Pro */}
            <div className="bg-[#191f2e] border-2 border-[#3b82f6] rounded-2xl p-6 sm:p-8 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#3b82f6] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                  Popular
                </span>
              </div>
              <p className="text-xs font-semibold tracking-widest text-[#93c5fd] uppercase mb-3">Pro</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold text-[#93c5fd]">$149</span>
                <span className="text-[#9f9f9f] text-sm mb-1">/mo</span>
              </div>
              <p className="text-[#6b7280] text-sm italic mb-6">Run production workflows without silent failures</p>
              <ul className="space-y-3 text-sm text-[#d1d5db] mb-8 flex-1">
                {[
                  "250,000 requests / month",
                  "Up to 20 pipelines",
                  "Full auto-correction (rules)",
                  "Priority processing",
                  "Advanced drift detection",
                  "Logs + insights",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#39FF14] select-none">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openForm("Pro — $149/mo")}
                className="block w-full text-center bg-[#3b82f6] hover:bg-[#2563eb] text-white transition font-semibold rounded-lg px-6 py-2.5 text-sm mt-auto"
              >
                Contact to Access
              </button>
            </div>
          </div>
        </section>

        <section className="w-full max-w-6xl mb-12">
          <div className="bg-[#181818] border border-[#303030] rounded-3xl p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-[#F2F2F2] text-center">
              Validator Coverage
            </h2>
            <p className="text-[#a3a3a3] text-sm sm:text-base text-center mb-6">
              The following conditions are currently covered by the validator.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-[#2f2f2f]">
              <table className="w-full min-w-[980px] text-left text-sm sm:text-base">
                <thead className="bg-[#202020] text-[#e5e5e5]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">ID</th>
                    <th className="px-4 py-3 font-semibold">Test Case (TC-#)</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Behavior</th>
                    <th className="px-4 py-3 font-semibold">Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {validatorCoverage.map((row, index) => (
                    <tr
                      key={row[0]}
                      className={`border-t border-[#2b2b2b] ${
                        index % 2 === 0 ? "bg-[#151515]" : "bg-[#121212]"
                      }`}
                    >
                      <td className="px-4 py-3 text-[#f3f4f6] whitespace-nowrap">{row[0]}</td>
                      <td className="px-4 py-3 text-[#e5e7eb] whitespace-nowrap">{row[1]}</td>
                      <td className="px-4 py-3 text-[#cbd5e1] whitespace-nowrap">{row[2]}</td>
                      <td
                        className={`px-4 py-3 whitespace-nowrap ${getBehaviorClass(
                          row[3],
                          row[4]
                        )}`}
                      >
                        {row[3]}
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap font-semibold ${getOutcomeClass(row[4])}`}>
                        {row[4]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full max-w-3xl mb-16 text-center">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-3">Ready to protect your production webhooks?</h2>
          <p className="text-[#9a9a9a] mb-6 text-sm">Start your 14-day free trial and validate real payloads from day one.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/pricing")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200"
            >
              View Pricing
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3 border border-[#3a3a3a] text-[#E3E3E3] hover:bg-[#1e1e1e] rounded-xl font-semibold transition-all duration-200"
            >
              Talk to Us
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}