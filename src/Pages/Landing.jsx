import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import FeatureCard from "../Components/Landing/FeatureCard";
import SparkOverlay from "../Components/SparkOverlay";
import Need from "../Components/Landing/Need";
import "../App.css";

export default function Landing() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    role: "",
    intent: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);
    try {
      const response = await fetch(
        "https://hook.us2.make.com/5jpdk7qebo4irz6ip4u7hyjjyajvs4j3",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            company: formData.company.trim(),
            email: formData.email.trim(),
            role: formData.role,
            intent: formData.intent,
            comment: formData.comment.trim(),
            submitted_at: new Date().toISOString(),
          }),
        }
      );
      if (!response.ok) throw new Error("Webhook failed: " + response.status);
      setSubmitSuccess(true);
      setShowForm(false);
      setFormData({ name: "", company: "", email: "", role: "", intent: "", comment: "" });
    } catch (error) {
      console.error("Failed to send early access request:", error);
      setSubmitError("Unable to submit right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCheck = (value) => {
    if (value === true) return <span className="text-green-400 font-bold text-lg">✔</span>;
    if (value === "partial") return <span className="text-yellow-400 font-bold text-lg">~</span>;
    return <span className="text-red-500 font-bold text-lg">✘</span>;
  };

  const handleMobileNavigate = (to) => {
    navigate(to);
    setMenuOpen(false);
  };

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/validation", label: "Validation Layer" },
  ];

  const competitiveLandscape = [
    { competitor: "Monte Carlo", funding: "$200M+", detects: true, corrects: false, learnsSchema: false, makeN8n: false, pricing: "$100K+/yr", gap: "Alerts only. Humans fix everything." },
    { competitor: "Datafold", funding: "Well funded", detects: true, corrects: false, learnsSchema: false, makeN8n: false, pricing: "$500+/mo", gap: "Only works at deploy time. Blind at runtime." },
    { competitor: "Great Expectations / Soda", funding: "OSS / $30M", detects: true, corrects: false, learnsSchema: false, makeN8n: false, pricing: "Free / $500+", gap: "Manual rules. No automation. High maintenance." },
    { competitor: "Bigeye", funding: "$17M", detects: true, corrects: false, learnsSchema: "partial", makeN8n: false, pricing: "$5K-$15K/mo", gap: "Auto monitors, but still no action taken." },
    { competitor: "Datadog (Metaplane)", funding: "$36B company", detects: true, corrects: false, learnsSchema: "partial", makeN8n: false, pricing: "Enterprise", gap: "Reactive + expensive. Built for ops, not data fixing." },
    { competitor: "Fivetran", funding: "$5.6B", detects: "partial", corrects: "partial", learnsSchema: false, makeN8n: false, pricing: "$$$", gap: "Only works inside its own connectors." },
    { competitor: "Acceldata", funding: "$50M", detects: true, corrects: "partial", learnsSchema: false, makeN8n: false, pricing: "Enterprise", gap: "Still early + no HTTP-level correction." },
    { competitor: "DataCrawl", funding: "Early", detects: true, corrects: true, learnsSchema: true, makeN8n: true, pricing: "$99/mo+", gap: "Managed reliability service that fills the gap between SaaS alerting tools and the operational work required to keep webhook workflows stable." },
  ];

  const faqs = [
    {
      q: "What is webhook validation and why does it matter?",
      a: "Webhook validation checks every incoming payload against an expected schema before it reaches your automation or data pipeline. Without it, a single renamed field or unexpected null value can silently break Make.com scenarios, n8n workflows, or Zapier zaps — sometimes for hours before anyone notices. DataCrawl makes sure this doesn't happen by providing a monitored layer that validates, corrects, and flags issues in real time.",
    },
    {
      q: "How is DataCrawl different from just writing JSON Schema rules?",
      a: "Static JSON Schema rules are useful, but they are only one part of a durable setup. Teams still need payload logging, drift detection, normalization for renamed fields or type changes, and an operating process for edge cases. DataCrawl is for teams that want that layer managed rather than building and maintaining it themselves.",
    },
    {
      q: "Does DataCrawl work with Make.com, n8n, and Zapier?",
      a: "Yes. Any HTTP-based automation stack can put a validation or normalization layer in front of its webhook endpoints, including Make, n8n, Zapier, Pipedream, and custom code. DataCrawl works in that position so teams can add monitored validation coverage without changing the sender side of the integration.",
    },
    {
      q: "What happens when a payload mismatch is detected?",
      a: "The right response depends on the mismatch. Some issues should be rejected immediately, some can be normalized safely, and some should be flagged for human review before they flow downstream. A mature intake layer lets you set those behaviors per endpoint instead of discovering problems only after production data is wrong.",
    },
    {
      q: "Is this fully automated or is there a human component?",
      a: "It is usually both. Known issues can be handled automatically, but ambiguous or high-risk changes often need review before they should be trusted in production. That is true whether you run the process internally or use a managed reliability service like DataCrawl.",
    },
    {
      q: "What does the 14-day free trial include?",
      a: "The trial includes monitored validation coverage, drift detection, normalization behavior, and the intake layer used in front of supported webhook workflows. No credit card is required to start.",
    },
  ];

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
  }
];

  return (
    <div className="bg-[#111111] min-h-screen w-full overflow-x-hidden" id="landing">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="flex-grow relative h-full w-full overflow-x-clip"
      >
        <main
          className="w-full min-h-[700px] sm:min-h-[760px] md:min-h-[840px] overflow-x-hidden relative box-border px-4 sm:px-6 md:px-10 xl:px-35 flex flex-col justify-center"
          id="bg-gradient"
        >
          {/* Graphic */}
          <div className="transform absolute right-[-20%] sm:right-[-15%] md:-right-[10%] top-18 md:top-3 scale-[0.75] sm:scale-[0.72] md:scale-75 lg:scale-90 flex justify-center items-center pointer-events-none opacity-80 md:opacity-100">
            <img
              src={`${import.meta.env.BASE_URL}landing/Spider.svg`}
              className="absolute mr-5 mt-5 w-64 sm:w-80 md:w-auto"
              alt=""
            />
            <SparkOverlay />
          </div>

          {/* NAVIGATION */}
          <nav className="flex justify-between py-6 md:py-10 *:text-[#E3E3E3] text-md absolute w-full left-0 box-border px-4 sm:px-6 md:px-10 xl:px-35 top-0 z-20">
            <span className="flex items-center gap-4">
              <img
                src={`${import.meta.env.BASE_URL}landing/Logo.svg`}
                className="w-8 h-8"
                alt="DataCrawl logo"
              />
              <p className="font-[500]">DataCrawl</p>
            </span>
            <div className="hidden md:flex gap-6 items-center *:transition-all *:duration-200 *:hover:cursor-pointer *:hover:text-[#b5b5b5] *:font-[500]">
              {navLinks.map((link) => (
                <p key={link.to} onClick={() => navigate(link.to)}>
                  {link.label}
                </p>
              ))}
            </div>
            <div className="hidden md:flex gap-4 lg:gap-6 items-center">
              <button
                onClick={() => setShowForm(true)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-all duration-200"
              >
                Get Started Free
              </button>
            </div>
            <button
              className="md:hidden text-white p-2 rounded-lg border border-[#2b2b2b] bg-[#151515]/70"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>

          {menuOpen && (
            <div className="md:hidden absolute top-[82px] left-4 right-4 z-30 rounded-xl border border-[#2b2b2b] bg-[#171717]/95 backdrop-blur-sm p-4 shadow-2xl">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.to}
                    onClick={() => handleMobileNavigate(link.to)}
                    className="w-full text-left px-3 py-3 rounded-lg text-[#E3E3E3] font-[500] hover:bg-[#232323] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#2b2b2b] flex flex-col gap-2">
                <button
                  className="w-full px-3 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                  onClick={() => { setShowForm(true); setMenuOpen(false); }}
                >
                  Get Started Free
                </button>
              </div>
            </div>
          )}

          {/* HERO TEXT */}
          <div className="flex flex-col items-start w-full sm:w-[85%] md:w-[60%] lg:w-[50%] xl:w-[42%] relative top-20 sm:top-16 md:top-8 lg:top-4 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <span className="inline-block mb-4 px-3 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-wide uppercase">
                Monitored Webhook Validation Service
              </span>
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-[#E3E3E3] mb-5">
                Stop broken automations
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            >
              <p className="text-[#AFAFAF] text-base md:text-lg max-w-lg mb-2 leading-relaxed">
                Make, n8n, Zapier, custom APIs
              </p>
              <p className="text-[#888] text-sm md:text-base max-w-lg mb-8 leading-relaxed">
                We monitor, validate, and fix your data pipelines so failures don't hit production.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setShowForm(true)}
                  className="px-10 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-900/30"
                >
                  Start Free Trial
                </button>
                <button
                  onClick={() => navigate("/validation")}
                  className="px-10 py-4 border border-[#2f63d7] text-[#dbeafe] hover:bg-[#1a2750] font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105"
                >
                  Try the Validator
                </button>
              </div>
              <p className="text-sm text-[#888] mt-4 tracking-wide">
                14-day free trial — no credit card required
              </p>
              <div className="flex flex-wrap gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-sm text-[#a3a3a3]">
                  <span className="text-[#39FF14] font-semibold">✓</span> Monitored validation coverage
                </span>
                <span className="flex items-center gap-1.5 text-sm text-[#a3a3a3]">
                  <span className="text-[#39FF14] font-semibold">✓</span> No code changes on sender side
                </span>
                <span className="flex items-center gap-1.5 text-sm text-[#a3a3a3]">
                  <span className="text-[#39FF14] font-semibold">✓</span> Rule-based + adaptive correction
                </span>
              </div>
            </motion.div>
          </div>
        </main>
      </motion.div>

      {/* PROBLEM */}
      <section className="bg-[#0d0d0d] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] text-center mb-4">
            One renamed field. Your entire automation, broken.
          </h2>
          <p className="text-[#9a9a9a] text-center text-lg max-w-2xl mx-auto mb-16">
            API providers change schemas without warning. Payloads drift. Required fields go null. Your Make.com scenario quietly fails at 2 AM while orders pile up — and nobody notices until customers complain.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: "68%",
                label: "of automation outages trace back to a payload schema change",
                sub: "Most teams find out hours later, from an angry Slack message.",
              },
              {
                stat: "4.2 hrs",
                label: "average time spent debugging a single webhook mismatch",
                sub: "Cross-referencing logs, re-running scenarios, guessing what changed.",
              },
              {
                stat: "$0",
                label: "in revenue from automations that silently stop running",
                sub: "Zaps that error without retry. n8n flows that halt without alerting anyone.",
              },
            ].map((item) => (
              <div key={item.stat} className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-2">
                <span className="text-4xl font-bold text-blue-400">{item.stat}</span>
                <p className="text-[#E3E3E3] font-semibold text-base">{item.label}</p>
                <p className="text-[#888] text-sm">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#111111] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] text-center mb-4">
            How DataCrawl prevents webhook failures
          </h2>
          <p className="text-[#9a9a9a] text-center text-lg max-w-2xl mx-auto mb-16">
            A monitored validation layer that sits between your API providers and your automations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Route webhooks through DataCrawl",
                desc: "Point your Make.com, n8n, or Zapier webhook trigger at your DataCrawl proxy endpoint. No changes needed on the sending side.",
              },
              {
                step: "02",
                title: "Real-time validation using rules + learned patterns",
                desc: "We validate every incoming payload using established rules and patterns learned from your traffic. When something is uncertain or new, it's flagged for review instead of silently failing.",
              },
              {
                step: "03",
                title: "Auto-correct known issues, flag new ones",
                desc: "Critical mismatches are automatically corrected when rules exist. New or ambiguous cases are handled by our monitoring layer and converted into reusable rules over time.",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative bg-[#181818] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-3">
                <span className="text-5xl font-black text-[#1e2a45] select-none absolute top-4 right-5">{item.step}</span>
                <span className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-1">Step {i + 1}</span>
                <h3 className="text-[#E3E3E3] font-semibold text-lg">{item.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate("/validation")}
              className="px-8 py-3 border border-[#2f63d7] text-[#dbeafe] hover:bg-[#1a2750] font-semibold rounded-xl transition-all duration-200"
            >
              See the Validation Layer in action
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[#0d0d0d] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] text-center mb-4">
            Monitored validation layer
          </h2>
          <p className="text-[#9a9a9a] text-center text-lg max-w-2xl mx-auto mb-16">
            Built for the automation stack you already use.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full justify-items-center">
            <FeatureCard
              icon={<img src={`${import.meta.env.BASE_URL}landing/Expand.svg`} className="w-10" alt="" />}
              name="Universal Compatibility"
              description="Works with any API, webhook, or data source. HTTP-level interception means zero lock-in."
              glow={true}
              glowClass="left-[43px] top-[37px]"
            />
            <FeatureCard
              icon={<img src={`${import.meta.env.BASE_URL}landing/Security Shield.svg`} className="w-12" alt="" />}
              name="Rule-Based Validation"
              description="Stop payload mismatches and schema breakages before they reach your automations using established rules and adaptive patterns."
            />
            <FeatureCard
              icon={<img src={`${import.meta.env.BASE_URL}landing/Settings.svg`} className="w-12" alt="" />}
              name="Schema Drift Detection"
              description="Learns patterns from real traffic and alerts you the moment a provider changes their API. New edge cases are flagged for review."
            />
            <FeatureCard
              icon={<img src={`${import.meta.env.BASE_URL}landing/API.svg`} className="w-12" alt="" />}
              name="Native Integrations"
              description="First-class support for Make.com, n8n, Zapier, Pipedream, and custom REST APIs."
              glow={true}
              glowClass="bottom-[20px] right-[161px]"
            />
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200"
            >
              Get Started Free — No Credit Card
            </button>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-[#111111] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] mb-4">
              Built for developers and enterprise teams
            </h2>
            <p className="text-[#9a9a9a] text-lg max-w-2xl mx-auto">
              Whether you are an individual developer running automation workflows or an enterprise team managing dozens of data pipelines, DataCrawl scales with you.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12 mt-4">
            <Need img="landing/usage/development.svg" text="Individual Developers & Startups" />
            <Need img="landing/usage/data-science.svg" text="Automation & AI Teams" />
            <Need img="landing/usage/marketing.svg" text="SaaS Product Builders" />
          </div>
          <div className="flex flex-col md:flex-row gap-12">
            <Need img="landing/usage/e-commerce.svg" text="Enterprise Integration Teams" />
            <Need img="landing/usage/content.svg" text="API-First Companies" />
            <Need img="landing/usage/seo.svg" text="Data & Analytics Platforms" />
          </div>
        </div>
      </section>

      {/* COMPETITIVE LANDSCAPE */}
      <section className="bg-[#0d0d0d] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] text-center mb-4">
            The reliability gap current SaaS tooling still leaves open
          </h2>
          <p className="text-[#9a9a9a] text-center text-lg max-w-2xl mx-auto mb-12">
            Most SaaS tools help you detect issues, monitor pipelines, or define validation rules. The gap is the service layer that validates intake, normalizes payload changes, and handles operational response before bad data spreads downstream. That is the gap DataCrawl is designed to fill.
          </p>
          <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
            <table className="w-full min-w-[1200px] text-left text-sm text-[#e5e5e5]">
              <thead className="bg-[#202020] text-[#f2f2f2]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Scale</th>
                  <th className="px-4 py-3 font-semibold">Detects</th>
                  <th className="px-4 py-3 font-semibold">Auto-fixes</th>
                  <th className="px-4 py-3 font-semibold">Learns schema</th>
                  <th className="px-4 py-3 font-semibold">Make / n8n</th>
                  <th className="px-4 py-3 font-semibold">Pricing</th>
                  <th className="px-4 py-3 font-semibold">Reality</th>
                </tr>
              </thead>
              <tbody>
                {competitiveLandscape.map((row, index) => {
                  const isYou = row.competitor === "DataCrawl";
                  return (
                    <tr
                      key={row.competitor}
                      className={`border-t border-[#2a2a2a] ${isYou ? "bg-[#1a233a] border-blue-500" : index % 2 === 0 ? "bg-[#151515]" : "bg-[#121212]"}`}
                    >
                      <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">{row.competitor}</td>
                      <td className="px-4 py-3 text-[#d4d4d8] whitespace-nowrap">{row.funding}</td>
                      <td className="px-4 py-3 text-center">{renderCheck(row.detects)}</td>
                      <td className="px-4 py-3 text-center">{renderCheck(row.corrects)}</td>
                      <td className="px-4 py-3 text-center">{renderCheck(row.learnsSchema)}</td>
                      <td className="px-4 py-3 text-center">{renderCheck(row.makeN8n)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-[#d4d4d8]">{row.pricing}</td>
                      <td className="px-4 py-3 text-[#c8c8c8] min-w-[300px]">{row.gap}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-[#111111] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32" id="pricing">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] text-center mb-4">
            Simple, predictable pricing
          </h2>
          <p className="text-[#9a9a9a] text-center text-lg max-w-2xl mx-auto mb-3">
            Start free. Scale as your webhook volume grows. No surprise invoices.
          </p>
          <p className="text-[#888] text-center text-sm max-w-xl mx-auto mb-16">
            Pricing includes managed validation coverage for your pipelines.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 flex flex-col gap-4 border ${plan.highlight ? "bg-[#1a233a] border-blue-500 shadow-xl shadow-blue-900/20" : "bg-[#181818] border-[#2a2a2a]"}`}
              >
                {plan.highlight && (
                  <span className="inline-block self-start px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-semibold tracking-wide mb-1">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-[#E3E3E3] font-bold text-xl">{plan.name}</h3>
                  {plan.subtitle && (
                    <p className="text-[#888] text-xs mt-1">{plan.subtitle}</p>
                  )}
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  {plan.period && <span className="text-[#888] mb-1">{plan.period}</span>}
                </div>
                <p className="text-[#888] text-sm">{plan.description}</p>
                <ul className="flex flex-col gap-2 mt-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#c8c8c8]">
                      <span className="text-green-400 mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => plan.name === "Enterprise" ? navigate("/contact") : setShowForm(true)}
                  className={`mt-auto py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${plan.highlight ? "bg-blue-600 hover:bg-blue-700 text-white" : "border border-[#3a3a3a] text-[#E3E3E3] hover:bg-[#222]"}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-[#888] text-sm mt-8">
            Need more detail?{" "}
            <button onClick={() => navigate("/pricing")} className="text-blue-400 hover:underline">
              See full pricing breakdown
            </button>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0d0d0d] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] text-center mb-4">
            Frequently asked questions
          </h2>
          <p className="text-[#9a9a9a] text-center text-lg mb-12">
            Common questions about webhook validation, drift handling, and how teams usually operate this layer.
          </p>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#181818] border border-[#2a2a2a] rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 text-[#E3E3E3] font-semibold hover:bg-[#1e1e1e] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 shrink-0 text-blue-400" /> : <ChevronDown className="w-5 h-5 shrink-0 text-[#888]" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-[#9a9a9a] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-[#888] mb-4">Still have questions?</p>
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 border border-[#3a3a3a] text-[#E3E3E3] hover:bg-[#1e1e1e] rounded-xl font-semibold transition-all duration-200"
            >
              Talk to us
            </button>
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section className="bg-[#111111] px-4 sm:px-6 md:px-10 xl:px-35 py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] mb-3">
              Troubleshooting guides
            </h2>
            <p className="text-[#9a9a9a] text-base md:text-lg max-w-2xl mx-auto">
              Step-by-step fixes for the most common webhook and schema mismatch failures.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <button
              onClick={() => navigate("/guides/make-webhook-breakage")}
              className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#3b82f6] transition-colors"
            >
              <p className="text-blue-400 text-xs font-semibold tracking-wide uppercase mb-2">Make.com</p>
              <p className="text-[#E3E3E3] font-semibold text-sm mb-2">How to Fix Make.com Webhook Breakages</p>
              <p className="text-[#888] text-xs">Diagnose payload mapping failures and prevent repeat breakage.</p>
            </button>

            <button
              onClick={() => navigate("/guides/n8n-schema-drift")}
              className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#3b82f6] transition-colors"
            >
              <p className="text-blue-400 text-xs font-semibold tracking-wide uppercase mb-2">n8n</p>
              <p className="text-[#E3E3E3] font-semibold text-sm mb-2">Fixing n8n Schema Drift</p>
              <p className="text-[#888] text-xs">Catch drift early and keep workflow expressions stable.</p>
            </button>

            <button
              onClick={() => navigate("/guides/zapier-payload-mismatch")}
              className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#3b82f6] transition-colors"
            >
              <p className="text-blue-400 text-xs font-semibold tracking-wide uppercase mb-2">Zapier</p>
              <p className="text-[#E3E3E3] font-semibold text-sm mb-2">Troubleshooting Zapier Payload Mismatches</p>
              <p className="text-[#888] text-xs">Fix broken field mappings and avoid silent zap failures.</p>
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#111111] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] mb-4">
            Stop debugging webhook failures at 2 AM
          </h2>
          <p className="text-[#9a9a9a] text-lg mb-10">
            Current SaaS tooling rarely covers the operational gap between upstream schema changes and downstream failures. DataCrawl provides that service layer with monitored validation, normalization, and response coverage around your workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-900/30"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => navigate("/validation")}
              className="px-10 py-4 border border-[#2f63d7] text-[#dbeafe] hover:bg-[#1a2750] font-semibold text-lg rounded-xl transition-all duration-200"
            >
              Try the Validator Free
            </button>
          </div>
          <p className="text-[#888] text-sm mt-6">
            14-day free trial · No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      {/* MODAL FORM */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowForm(false); setSubmitError(""); } }}
        >
          <div className="bg-[#1a1a1a] p-8 rounded-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-white text-xl font-bold mb-6">Get Early Access</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {submitError && (
                <div className="bg-red-600/20 border border-red-600 text-red-400 p-3 rounded text-sm">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="bg-green-600/20 border border-green-600 text-green-400 p-3 rounded text-sm">
                  Thank you! We will be in touch soon.
                </div>
              )}
              <input type="text" name="name" placeholder="Your name" value={formData.name} required onChange={handleChange} disabled={isSubmitting} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50" />
              <input type="email" name="email" placeholder="Work email" value={formData.email} required onChange={handleChange} disabled={isSubmitting} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50" />
              <input type="text" name="company" placeholder="Company (optional)" value={formData.company} onChange={handleChange} disabled={isSubmitting} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50" />
              <select name="role" value={formData.role} required onChange={handleChange} disabled={isSubmitting} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50">
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
              <select name="intent" value={formData.intent} required onChange={handleChange} disabled={isSubmitting} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50">
                <option value="">What problem are you trying to solve?</option>
                <option value="debugging">Debugging broken webhooks / APIs</option>
                <option value="schema-breaks">Schema changes breaking my automations</option>
                <option value="bad-data">Inconsistent API payloads causing failures</option>
                <option value="automation">Unreliable Make / n8n / Zapier workflows</option>
                <option value="preventative">Looking for monitored validation coverage</option>
                <option value="exploring">Exploring / evaluating</option>
                <option value="buying">Evaluating for team or company</option>
                <option value="demo">Want a demo</option>
              </select>
              <textarea name="comment" placeholder="Anything else? (optional)" value={formData.comment} onChange={handleChange} disabled={isSubmitting} rows={3} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50 resize-y" />
              <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed p-3 rounded text-white font-bold">
                {isSubmitting ? "Sending..." : "Request Access"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setSubmitError(""); setSubmitSuccess(false); }}
                disabled={isSubmitting}
                className="text-gray-400 mt-1 text-sm hover:text-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
