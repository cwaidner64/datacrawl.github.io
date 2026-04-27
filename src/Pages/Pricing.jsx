import React, { useState } from "react";
import Header from "../Components/Landing/Header";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../utils/usePageMeta";

export default function Pricing() {
  usePageMeta({
    title: "Pricing",
    description: "Transparent pricing for webhook validation and API schema drift detection. Starter at $49/mo, Pro at $199/mo, Enterprise custom. 14-day free trial — no credit card required.",
    canonical: "https://www.datacrawl.org/pricing",
  });

  const navigate = useNavigate();
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
          source: "pricing-page",
          submitted_at: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error(`Webhook failed: ${response.status}`);
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Pricing contact form error:", err);
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

      {/* Contact Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-8 rounded-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-white text-xl font-bold mb-1">Start Your Free Trial</h2>
            {formData.plan && (
              <p className="text-[#7dd3fc] text-sm mb-6">Plan: {formData.plan}</p>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {submitError && (
                <div className="bg-red-600/20 border border-red-600 text-red-400 p-3 rounded text-sm">{submitError}</div>
              )}
              {submitSuccess && (
                <div className="bg-green-600/20 border border-green-600 text-green-400 p-3 rounded text-sm">
                  Thank you! Your request has been sent to contact@datacrawl.org
                </div>
              )}
              <input type="text" name="name" placeholder="Preferred name" value={formData.name} required onChange={handleChange} disabled={isSubmitting || submitSuccess} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50" />
              <input type="email" name="email" placeholder="Email" value={formData.email} required onChange={handleChange} disabled={isSubmitting || submitSuccess} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50" />
              <input type="text" name="company" placeholder="Company name" value={formData.company} required onChange={handleChange} disabled={isSubmitting || submitSuccess} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50" />
              <select name="role" value={formData.role} required onChange={handleChange} disabled={isSubmitting || submitSuccess} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50">
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
              <select name="intent" value={formData.intent} required onChange={handleChange} disabled={isSubmitting || submitSuccess} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50">
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
              <textarea name="comment" placeholder="Optional comment" value={formData.comment} onChange={handleChange} disabled={isSubmitting || submitSuccess} rows={3} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50 resize-y" />
              {!submitSuccess && (
                <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed p-3 rounded text-white font-bold">
                  {isSubmitting ? "Sending..." : "Start Free Trial"}
                </button>
              )}
              <button type="button" onClick={() => { setShowForm(false); setSubmitError(""); setSubmitSuccess(false); }} disabled={isSubmitting} className="text-gray-400 mt-2 disabled:opacity-50 hover:text-gray-200 transition">
                {submitSuccess ? "Close" : "Cancel"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Header */}
        <section className="flex flex-col items-center mt-6 sm:mt-10 mb-10 sm:mb-16 text-center">
          <Header
            label="Pricing"
            title="Start Free. No Credit Card Required."
            subtext="14-day free trial on every plan. Full access from day one."
          />
          <p className="text-[#d1d5db] max-w-2xl mt-6 leading-7">
            Try DataCrawl&apos;s validation layer with your real webhooks before you ever pay anything.
          </p>
        </section>

        {/* Plan Cards */}
        <section className="w-full max-w-3xl mb-16 sm:mb-20">
          <div className="grid md:grid-cols-2 gap-6">

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
                  "3 webhook sources",
                  "Rule-based auto-correction",
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
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white transition font-semibold rounded-lg px-6 py-2.5 text-sm mt-auto"
              >
                Start Free Trial
              </button>
              <p className="text-xs text-[#6b7280] mt-3 text-center">14 days free. No credit card required.</p>
            </div>

            {/* Pro */}
            <div className="bg-[#191f2e] border-2 border-[#3b82f6] rounded-2xl p-6 sm:p-8 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#3b82f6] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">Popular</span>
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
                  "Up to 20 webhook sources",
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
                Start Free Trial
              </button>
              <p className="text-xs text-[#6b7280] mt-3 text-center">14 days free. No credit card required.</p>
            </div>

          </div>
        </section>

        {/* How the trial works */}
        <section className="w-full max-w-2xl mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#F2F2F2] text-center mb-10">
            How the trial works
          </h2>
          <div className="flex flex-col gap-6">
            {[
              { day: "1", label: "Day 1", text: "Sign up with email. No credit card needed. Your account is active immediately." },
              { day: "2", label: "Days 1–14", text: "Full access to all features. Test with your real webhooks and API pipelines." },
              { day: "3", label: "Day 11", text: "We email you asking if you want to continue. Add a payment method if yes." },
              { day: "4", label: "Day 15", text: "If you added payment, you're charged. If not, your account pauses — no surprise charges." },
            ].map(({ day, label, text }) => (
              <div key={day} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {day}
                </div>
                <div className="bg-[#181818] border border-[#2f2f2f] rounded-xl px-5 py-4 flex-1">
                  <span className="font-semibold text-[#e5e7eb]">{label}:&nbsp;</span>
                  <span className="text-[#bdbdbd] text-sm leading-6">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enterprise */}
        <section className="text-center max-w-3xl mb-16 sm:mb-24">
          <h2 className="text-2xl font-semibold mb-4 text-[#F2F2F2]">Need more scale?</h2>
          <p className="text-[#d1d5db] mb-8 leading-7">
            For large teams, private nodes, or dedicated pipeline infrastructure,
            reach out directly and we&apos;ll scope a plan around your workload.
          </p>
          <button
            className="px-6 sm:px-12 py-3 bg-transparent border border-[#7dd3fc] text-[#7dd3fc] hover:bg-[#7dd3fc] hover:text-[#111111] transition rounded-lg font-semibold"
            onClick={() => navigate("/contact")}
          >
            Contact Enterprise Sales
          </button>
        </section>

        {/* Try Validator CTA */}
        <section className="w-full max-w-3xl mb-16 text-center">
          <p className="text-[#9a9a9a] text-sm mb-3">Not sure yet? Test the validation layer live — no account needed.</p>
          <button
            onClick={() => navigate("/validation")}
            className="px-6 py-2.5 border border-[#2f63d7] text-[#dbeafe] hover:bg-[#1a2750] font-semibold rounded-lg text-sm transition-all duration-200"
          >
            Try the Validator Free
          </button>
        </section>

      </div>
    </div>
  );
}