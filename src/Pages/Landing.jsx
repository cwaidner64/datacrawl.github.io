import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import FeatureCard from "../Components/Landing/FeatureCard";
import SparkOverlay from "../Components/SparkOverlay";
import Need from "../Components/Landing/Need";
import { usePageMeta } from "../utils/usePageMeta";
import "../App.css";

export default function Landing() {
  usePageMeta({
    title: "Webhook/Data Validation for Make, n8n & Zapier | Prevent Schema Drift Failures",
    description:
      "Detect and fix broken automations caused by webhook schema changes in Make.com, n8n, and Zapier. Auto-correct payload drift before workflows fail.",
    canonical: "https://www.datacrawl.org/",
    appendBaseTitle: false,
  });

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
    { to: "/solutions", label: "Solutions" },
    { to: "/about", label: "About" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/validation", label: "Webhook Validator" },
  ];

  const seoPages = [
    {
      to: "/make-webhook-errors",
      label: "Fix Make.com webhook errors",
      description: "Field renames, payload mismatch incidents, and broken scenario mappings.",
    },
    {
      to: "/n8n-schema-drift",
      label: "Fix n8n schema drift issues",
      description: "Runtime schema drift and expression failures inside production workflows.",
    },
    {
      to: "/zapier-webhook-failures",
      label: "Zapier automation troubleshooting",
      description: "Find webhook failures, missing fields, and broken trigger payloads faster.",
    },
    {
      to: "/api-payload-breakage",
      label: "API payload breakage",
      description: "Understand why upstream API payload changes break downstream automations.",
    },
    {
      to: "/automation-failure-monitoring",
      label: "Automation failure monitoring",
      description: "Add runtime checks before webhook errors turn into customer-facing incidents.",
    },
  ];

  const competitiveLandscape = [
  {
    competitor: "Manual Debugging (Status Quo)",
    funding: "Your time",
    detects: false,
    corrects: false,
    learnsSchema: false,
    makeN8n: true,
    pricing: "Hours every week",
    gap: "You find out from clients. Then you dig through logs, replay runs, and guess what changed."
  },
  {
    competitor: "Custom Error Handling",
    funding: "Internal effort",
    detects: "partial",
    corrects: false,
    learnsSchema: false,
    makeN8n: true,
    pricing: "Dev time",
    gap: "Catches failures, not silent data issues. Every workflow needs custom logic."
  },
  {
    competitor: "Zapier / Make Built-in Alerts",
    funding: "Included",
    detects: "partial",
    corrects: false,
    learnsSchema: false,
    makeN8n: true,
    pricing: "Included",
    gap: "Only triggers on hard failures. Silent bad data still flows through."
  },
  {
    competitor: "Internal Monitoring Scripts",
    funding: "Engineering time",
    detects: true,
    corrects: false,
    learnsSchema: false,
    makeN8n: "partial",
    pricing: "High maintenance",
    gap: "Breaks constantly. Becomes another system to maintain."
  },
  {
    competitor: "DataCrawl",
    funding: "Early",
    detects: true,
    corrects: true,
    learnsSchema: true,
    makeN8n: true,
    pricing: "$99/mo+",
    gap: "Purpose-built reliability layer for automation teams. Detects drift, fixes known breakpoints, and reduces repeated debugging work."
  }
];

  const faqs = [
  {
    q: "Who is this actually for?",
    a: "Teams and agencies running client automations on Make, n8n, Zapier, or custom APIs. Especially if you're managing multiple workflows and dealing with breakages, bad data, or constant debugging."
  },
  {
    q: "What problem does this actually solve?",
    a: "It reduces the time you spend figuring out why automations broke. Instead of digging through logs or waiting for clients to report issues, DataCrawl detects payload changes early and either fixes them or shows exactly what changed."
  },
  {
    q: "How is this different from error handling inside Make or Zapier?",
    a: "Those tools react after something fails. DataCrawl sits before your workflow runs and checks incoming data, so issues are caught before they break mappings or create bad downstream data."
  },
  {
    q: "Do I need to rebuild my automations?",
    a: "No. You route your webhook through DataCrawl, and everything else stays the same. It sits in front of your existing workflows."
  },
  {
    q: "What actually gets automated vs handled manually?",
    a: "Known issues like field renames or type mismatches can be corrected automatically. New or ambiguous changes are flagged with clear context so you can fix them quickly instead of debugging from scratch. "
  },
  {
    q: "When does this become worth paying for?",
    a: "When you're managing multiple automations or clients and spending hours every week fixing breakages, re-running workflows, or dealing with silent failures. #1 problem with scaling automations is maintaining them, we solve that problem."
  }
];

const pricingPlans = [
  {
    name: "Starter",
    subtitle: "For small automation setups",
    price: "$99",
    period: "/mo",
    description: "For freelancers or small teams running a few client automations",
    features: [
      "Up to 3 active workflows",
      "Webhook validation layer",
      "Schema drift detection",
      "Basic auto-correction rules",
      "Email alerts for issues",
      "14-day free trial"
    ],
    cta: "Start Free Trial",
    highlight: false,
  },

  {
    name: "Pro",
    subtitle: "For agencies managing multiple clients",
    price: "$349",
    period: "/mo",
    description: "Reduce debugging time across multiple client automations",
    features: [
      "Up to 15 active workflows",
      "Everything in Starter",
      "Custom validation & correction rules",
      "Priority issue detection",
      "Webhook replay + audit logs",
      "Slack alerts for failures",
      "Faster resolution support"
    ],
    cta: "Start Free Trial",
    highlight: true,
  },

  {
    name: "Reliability+",
    subtitle: "For high-stakes automation systems",
    price: "$1,000",
    period: "/mo",
    description: "For teams where automation failures directly impact revenue",
    features: [
      "25+ workflows (custom scope)",
      "Proactive drift monitoring",
      "Manual intervention for critical issues",
      "Advanced correction logic",
      "Guaranteed response time",
      "Dedicated support channel"
    ],
    cta: "Talk to Sales",
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
                Data validation service for Make, n8n, and Zapier
              </span>
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-[#E3E3E3] mb-5 max-w-4xl">
                Stop your client automations from silently breaking
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            >
              <p className="text-[#AFAFAF] text-base md:text-lg max-w-2xl mb-2 leading-relaxed">
                Data validation service for automations.
              </p>
              <p className="text-[#888] text-sm md:text-base max-w-2xl mb-4 leading-relaxed">
                We detect and fix broken automations, and ensure it doesn't happend again
              </p>
              <p className="text-[#666] text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
                Built for agencies managing multiple client automations. 
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
                  See Where Your Automations Are Breaking
                </button>
                <button
                  onClick={() => navigate("/validation")}
                  className="px-10 py-4 border border-[#2f63d7] text-[#dbeafe] hover:bg-[#1a2750] font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105"
                >
                  See How It Works
                </button>
              </div>
              <p className="text-sm text-[#888] mt-4 tracking-wide">
                14-day free trial — no credit card required
              </p>
              <div className="flex flex-wrap gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-sm text-[#a3a3a3]">
                  <span className="text-[#39FF14] font-semibold">✓</span> Webhook validation coverage
                </span>
                <span className="flex items-center gap-1.5 text-sm text-[#a3a3a3]">
                  <span className="text-[#39FF14] font-semibold">✓</span> Schema drift alerts before workflows fail
                </span>
                <span className="flex items-center gap-1.5 text-sm text-[#a3a3a3]">
                  <span className="text-[#39FF14] font-semibold">✓</span> Payload mismatch correction for known breakpoints
                </span>
              </div>
            </motion.div>
          </div>
        </main>
      </motion.div>

      {/* PROBLEM */}
      <section className="bg-[#0d0d0d] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] text-center mb-6">
            It’s not the build that breaks. It’s everything after.
          </h2>

          <p className="text-[#9a9a9a] text-center text-lg max-w-2xl mx-auto mb-12">
            Agencies spend{" "}
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-500/15 text-blue-300 font-extrabold tracking-tight shadow-[0_0_18px_rgba(59,130,246,0.45)]">
              30-50%
            </span>{" "}
            of their time maintaining automations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "APIs change without warning",
                desc: "A field gets renamed, removed, or wrapped differently. Your workflow still runs, but the data is wrong.",
              },
              {
                title: "Failures aren’t obvious",
                desc: "Nothing crashes. Steps get skipped, bad data flows through, and no one notices immediately.",
              },
              {
                title: "You find out too late",
                desc: "A client reports missing leads, broken routing, or incorrect data, after damage is already done.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-6">
                <h3 className="text-[#E3E3E3] font-semibold text-lg mb-3">{item.title}</h3>
                <p className="text-[#888] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[#888] mt-10 max-w-xl mx-auto">
            Now you’re debugging something that’s already been broken for days.
          </p>
        </div>
      </section>

      {/* PROBLEM-FIRST SEO */}
      <section className="bg-[#111111] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] text-center mb-6">
            This is why automation work doesn’t scale
          </h2>

          <p className="text-[#9a9a9a] text-center text-lg max-w-3xl mx-auto mb-12">
            You can add validation, logging, and error handling, but it doesn’t solve the real problem.
          </p>

          <div className="max-w-3xl mx-auto text-[#b8b8b8] text-base leading-relaxed space-y-4">
            <p>1) You’re still reacting after something breaks</p>
            <p>2) You’re still manually figuring out what changed</p>
            <p>3) Every new client adds more surface area for failure</p>
          </div>

          <p className="text-center text-[#9a9a9a] mt-12 max-w-2xl mx-auto">
            So instead of scaling cleanly, you end up spending more time maintaining automations than building them.
          </p>

          <p className="text-center text-white font-semibold mt-6">
            The real bottleneck isn’t building workflows. It’s keeping them reliable.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}

    <section className="bg-[#111111] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] text-center mb-4">
          How agencies stop automation breakage 
        </h2>

        <p className="text-[#9a9a9a] text-center text-lg max-w-2xl mx-auto mb-16">
          Get back to building, less time debugging.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {[
            {
              step: "01",
              title: "Route your client webhooks through DataCrawl",
              desc: "You place DataCrawl between incoming data (forms, APIs, webhooks) and your automations. No rebuilds — just change the endpoint and everything keeps running.",
            },
            {
              step: "02",
              title: "Catch the exact changes that usually break your workflows",
              desc: "When a field is renamed, removed, or changed, DataCrawl flags it immediately. Our service works so you don't have to.",
            },
            {
              step: "03",
              title: "Fix known issues automatically and surface the rest clearly",
              desc: "We see known breakpoints all the time. Our service thrives on adversity.",
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
            See how it catches real failures
          </button>
        </div>
      </div>
    </section>

     {/* FEATURES */}
<section className="bg-[#0d0d0d] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] text-center mb-4">
      Built for teams managing real client automations
    </h2>

    <p className="text-[#9a9a9a] text-center text-lg max-w-2xl mx-auto mb-16">
      This is not another monitoring tool. We actively work on stopping breakages, preventing outages, and recovering lost client data. 
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full justify-items-center">

      <FeatureCard
        icon={<img src={`${import.meta.env.BASE_URL}landing/Expand.svg`} className="w-10" alt="" />}
        name="Stop silent failures"
        description="Catch missing fields, bad payloads, and schema changes before they turn into lost leads, broken automations, or client complaints."
        glow={true}
        glowClass="left-[43px] top-[37px]"
      />

      <FeatureCard
        icon={<img src={`${import.meta.env.BASE_URL}landing/Security Shield.svg`} className="w-12" alt="" />}
        name="Reduce debugging"
        description="No more digging through logs or replaying workflows to figure out what changed. See exactly what broke and why, instantly."
      />

      <FeatureCard
        icon={<img src={`${import.meta.env.BASE_URL}landing/Settings.svg`} className="w-12" alt="" />}
        name="Auto-fix breaks"
        description="Handle known issues like field renames and type mismatches automatically so your workflows keep running without manual intervention."
      />

      <FeatureCard
        icon={<img src={`${import.meta.env.BASE_URL}landing/API.svg`} className="w-12" alt="" />}
        name="Cloud support"
        description="Make.com, n8n, Zapier, custom APIs — if it uses webhooks, it can be protected without rebuilding your automations."
        glow={true}
        glowClass="bottom-[20px] right-[161px]"
      />

    </div>

    <div className="flex justify-center mt-12">
      <button
        onClick={() => setShowForm(true)}
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200"
      >
        Start protecting your automations
      </button>
    </div>
  </div>
</section>

      {/* WHO IT'S FOR */}
      <section className="bg-[#111111] px-4 sm:px-6 md:px-10 xl:px-35 py-24 md:py-32">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] mb-4">
              Built for agencies running client automations
            </h2>
            <p className="text-[#9a9a9a] text-lg max-w-2xl mx-auto">
              If you're managing multiple client workflows in Make, Zapier, or n8n, you’ve already dealt with silent failures, schema drift, and debugging chaos. DataCrawl exists to stop that cycle.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12 mt-4">
            <Need img="landing/usage/development.svg" text="Easy Integration" />
            <Need img="landing/usage/data-science.svg" text="Multiple Workflows" />
            <Need img="landing/usage/marketing.svg" text="Scale your revenue" />
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
            Most SaaS tools alert after the damage starts. The operational gap is catching webhook errors, schema drift, and payload mismatch at intake before bad data spreads through downstream automations.
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
            Pricing includes webhook validation, schema drift monitoring, and payload correction coverage for production workflows.
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
            Common questions about webhook validation, schema drift, payload changes, and preventing automation failures.
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
            {seoPages.map((page) => (
              <button
                key={page.to}
                onClick={() => navigate(page.to)}
                className="text-left bg-[#151515] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3b82f6] transition-colors"
              >
                <p className="text-[#E3E3E3] font-semibold text-sm mb-2">{page.label}</p>
                <p className="text-[#888] text-xs leading-relaxed">{page.description}</p>
              </button>
            ))}
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
            When API payloads change, Make.com, n8n, and Zapier workflows break fast. DataCrawl adds webhook validation, schema drift detection, and payload correction before those failures hit customers or operations.
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
              Try our service
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
                <option value="auto-agency">Automation Agency</option>
                <option value="ai-auto-agency">AI Automation Agency</option>
                <option value="no-code-dev">n8n/Zapier/Make developer</option>
                <option value="other">Other (please specify)</option>

              </select>
              <select name="intent" value={formData.intent} required onChange={handleChange} disabled={isSubmitting} className="p-3 rounded bg-[#111] text-white border border-[#333] focus:border-[#7dd3fc] outline-none disabled:opacity-50">
                <option value="">What problem are you trying to solve?</option>
                <option value="debugging">Silent failures in automations</option>
                <option value="monitoring">Better monitoring and alerts</option>
                <option value="auto-fix">Automatic fixes for known breakpoints</option>
                <option value="scaling">Scaling client automations without debugging</option>
                <option value="reliability">Reliability engineering</option>
                <option value="other">Other (please specify)</option>
               
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
