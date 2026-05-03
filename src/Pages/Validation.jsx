import React, { useState } from "react";
import Header from "../Components/Landing/Header";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../utils/usePageMeta";

const pricingPlans = [
  {
    name: "Starter",
    subtitle: "Monitored Coverage",
    price: "$99",
    period: "/mo",
    description: "For individual developers running a few critical automations",
    features: [
      "Up to 3 monitored pipelines",
      "Webhook schema validation layer",
      "Basic schema drift detection",
      "Rule-based payload normalization",
      "Human review for critical failures (best effort)",
      "Email alerts when issues are detected",
      "14-day free trial",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Pro",
    subtitle: "Managed Reliability",
    price: "$349",
    period: "/mo",
    description: "For teams where automation downtime directly impacts revenue or ops",
    features: [
      "Up to 10 monitored pipelines",
      "Everything in Starter",
      "Priority failure triage",
      "Custom validation & correction rules",
      "Webhook replay + audit logs",
      "Slack incident notifications",
      "Faster manual resolution of edge cases",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Reliability+",
    subtitle: "High-Trust Coverage",
    price: "$1,000",
    period: "/mo",
    description: "For production systems where failures are expensive and immediate response matters",
    features: [
      "Up to 25 monitored pipelines (contracted scope)",
      "Proactive monitoring of schema drift",
      "Guaranteed incident response window",
      "Manual intervention for critical failures",
      "Advanced correction rules + system tuning",
      "Priority support channel",
    ],
    cta: "Upgrade to Reliability+",
    highlight: false,
  },
  {
    name: "Enterprise",
    subtitle: "Reliability SLA Coverage",
    price: "Custom",
    period: "",
    description: "For mission-critical infrastructure with strict uptime requirements",
    features: [
      "Unlimited pipeline coverage (scoped contract)",
      "Dedicated reliability monitoring",
      "SLA-backed response times",
      "On-premise or VPC deployment option",
      "SSO / SAML support",
      "Custom integrations + onboarding",
      "Dedicated account coverage",
    ],
    cta: "Contact Us",
    highlight: false,
  },
];

export default function Validation() {
  usePageMeta({
    title: "Webhook & API Validation Layer",
    description: "See how the validation layer supports webhook and API reliability work by catching contract issues, drift, and malformed payloads before they disrupt downstream services.",
    canonical: "https://www.datacrawl.org/validation",
  });

  const navigate = useNavigate();
  const capabilities = [
    {
      title: "Catch Schema Drift Before Workflows Break",
      description:
        "When an upstream API renames a field or changes a payload structure, DataCrawl catches it at intake — before Make, n8n, or Zapier tries to map a field that no longer exists.",
    },
    {
      title: "Fix Known Breakpoints Automatically",
      description:
        "Known field renames, type mismatches, and safe normalizations are rewritten before they hit production logic. No manual replay. No chasing logs to find what changed.",
    },
    {
      title: "Flag New Issues Before Clients Notice",
      description:
        "When a new payload pattern appears that doesn't match the expected schema, it's flagged with context — not discovered three days later in a client complaint.",
    },
  ];

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", role: "", intent: "", comment: "", plan: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const selectedPlan = pricingPlans.find((plan) => formData.plan.startsWith(plan.name));
  const modalActionLabel = selectedPlan?.cta || "Request Access";

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

  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
  
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-8 rounded-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-white text-xl font-bold mb-1">{modalActionLabel}</h2>
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
                  {isSubmitting ? "Sending..." : modalActionLabel}
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
            title="What The Validation Layer Handles"
            subtext="Prevent webhook and API failures before they break automations in Make, n8n, Zapier, and custom systems."
          />

          <p className="text-[#d1d5db] max-w-2xl mt-6 text-base sm:text-lg leading-8">
            DataCrawl sits in front of your webhook intake and catches schema drift, malformed payloads, and broken field mappings before they reach your automations. Known issues are fixed automatically. New ones are flagged before they cause client-visible damage.
          </p>
        </section>

        <section className="w-full max-w-4xl mb-12">
          <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#E3E3E3] mb-4">
              Automation breaks are usually silent — until they're expensive
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 text-[#b8b8b8] text-sm leading-relaxed">
              <p>• An API renames a field and your CRM stops receiving lead data</p>
              <p>• A payload wraps differently and downstream steps silently skip</p>
              <p>• A type changes from string to integer and the mapping fails with no alert</p>
              <p>• You find out days later because a client reports missing records</p>
            </div>
          </div>
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
              How It Prevents Failures
            </h2>
            <p className="text-[#d1d5db] leading-8 max-w-2xl mx-auto">
              DataCrawl intercepts every incoming webhook payload before it reaches Make, n8n, Zapier, or your custom logic. Schema drift is caught at ingestion, known breakpoints are fixed automatically, and anything new is flagged with enough context to resolve quickly — not discovered after bad data is already downstream.
            </p>
          </div>
        </section>

        <section className="w-full max-w-5xl mb-16 sm:mb-20">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#7dd3fc] uppercase border border-[#1e4a6e] bg-[#0d2133] px-4 py-1.5 rounded-full mb-4">
              Service Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F2F2F2] mb-3">
              Reliability Coverage Around The Validation Layer
            </h2>
            <p className="text-[#9f9f9f] max-w-xl mx-auto text-sm sm:text-base leading-7">
              These plans describe the level of monitoring, intervention, and response wrapped around the validation service.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-[#39FF14] text-sm font-semibold">✓</span>
              <span className="text-[#a3a3a3] text-sm">14-day free trial for the managed service layer &mdash; no credit card required</span>
            </div>
          </div>

          <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-6 sm:p-8 mb-10 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-[#E3E3E3] mb-4 text-center">Who this is for</h3>
            <ul className="space-y-3 text-[#b8b8b8] text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">•</span> Automation agencies managing client workflows in Make, n8n, or Zapier</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">•</span> Teams running production automations where silent failures mean lost revenue or bad CRM data</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">•</span> Healthcare, insurance, and fintech integrations with fragile API schemas that can't corrupt downstream records</li>
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => {
              const planLabel = plan.price === "Custom" ? plan.name : `${plan.name} - ${plan.price}${plan.period}`;

              return (
                <div
                  key={plan.name}
                  className={[
                    "rounded-2xl p-6 sm:p-8 flex flex-col relative",
                    plan.highlight
                      ? "bg-[#191f2e] border-2 border-[#3b82f6]"
                      : "bg-[#181818] border border-[#2f2f2f]",
                  ].join(" ")}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#3b82f6] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                        Popular
                      </span>
                    </div>
                  )}

                  <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${plan.highlight ? "text-[#93c5fd]" : "text-[#9ca3af]"}`}>
                    {plan.name}
                  </p>
                  <p className="text-sm text-[#7dd3fc] mb-4">{plan.subtitle}</p>

                  <div className="flex items-end gap-1 mb-3">
                    <span className={`text-4xl font-bold ${plan.highlight ? "text-[#93c5fd]" : "text-[#7dd3fc]"}`}>{plan.price}</span>
                    {plan.period && <span className="text-[#9f9f9f] text-sm mb-1">{plan.period}</span>}
                  </div>

                  <p className="text-[#d1d5db] text-sm leading-6 mb-6">{plan.description}</p>

                  <ul className="space-y-3 text-sm text-[#d1d5db] mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-0.5 text-[#39FF14] select-none">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => (plan.name === "Enterprise" ? navigate("/contact") : openForm(planLabel))}
                    className={`block w-full text-center text-white transition font-semibold rounded-lg px-6 py-2.5 text-sm mt-auto ${plan.highlight ? "bg-[#3b82f6] hover:bg-[#2563eb]" : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="w-full max-w-3xl mb-16 text-center">
          <h2 className="text-2xl font-bold text-[#E3E3E3] mb-3">Stop debugging broken automations after they fail</h2>
          <p className="text-[#9a9a9a] mb-6 text-sm">Add a reliability layer in front of your workflows in minutes.</p>
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