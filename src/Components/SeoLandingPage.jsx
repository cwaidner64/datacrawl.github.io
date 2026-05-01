import React from "react";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../utils/usePageMeta";

export default function SeoLandingPage({
  metaTitle,
  metaDescription,
  canonical,
  badge,
  title,
  intro,
  sections,
  ctaTitle,
  ctaCopy,
}) {
  usePageMeta({
    title: metaTitle,
    description: metaDescription,
    canonical,
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111111] text-white px-4 sm:px-6 md:px-10 xl:px-35 py-16 font-[Heebo]">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-[#888] mb-8">
          <button onClick={() => navigate("/")} className="hover:text-[#E3E3E3] transition-colors">Home</button>
          <span>›</span>
          <span className="text-[#c8c8c8]">SEO Pages</span>
          <span>›</span>
          <span className="text-[#c8c8c8]">{title}</span>
        </div>

        <span className="inline-block mb-4 px-3 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-wide uppercase">
          {badge}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-[#E3E3E3] mb-4 leading-tight">
          {title}
        </h1>

        <p className="text-[#9a9a9a] text-lg mb-10 leading-relaxed">{intro}</p>

        <nav className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6 mb-12">
          <p className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-3">On this page</p>
          <ol className="flex flex-col gap-2 text-sm text-blue-400">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="hover:underline">{index + 1}. {section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        {sections.map((section) => (
          <section id={section.id} key={section.id} className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#E3E3E3] mb-4">{section.title}</h2>
            {section.paragraphs?.map((paragraph, index) => (
              <p key={index} className="text-[#b8b8b8] mb-4 leading-relaxed">{paragraph}</p>
            ))}
            {section.callout && (
              <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-5 mb-4">
                <p className="text-blue-300 text-sm font-semibold mb-2">{section.callout.title}</p>
                <p className="text-[#9a9a9a] text-sm leading-relaxed whitespace-pre-line">{section.callout.body}</p>
              </div>
            )}
            {section.items && (
              <div className="flex flex-col gap-4">
                {section.items.map((item) => (
                  <div key={item.title} className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-5">
                    <p className="text-[#E3E3E3] font-semibold mb-1">{item.title}</p>
                    <p className="text-[#888] text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
            {section.steps && (
              <ol className="flex flex-col gap-4 text-[#b8b8b8] text-sm leading-relaxed">
                {section.steps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="text-blue-400 font-bold shrink-0">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        ))}

        <div className="bg-[#1a233a] border border-blue-500/40 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[#E3E3E3] mb-3">{ctaTitle}</h3>
          <p className="text-[#9a9a9a] mb-6">{ctaCopy}</p>
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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={() => navigate("/")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors">
            <p className="text-blue-400 text-xs mb-1">Homepage</p>
            <p className="text-[#E3E3E3] text-sm font-semibold">Return to webhook validation overview</p>
          </button>
          <button onClick={() => navigate("/validation")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors">
            <p className="text-blue-400 text-xs mb-1">Validator</p>
            <p className="text-[#E3E3E3] text-sm font-semibold">See the validation layer in action</p>
          </button>
          <button onClick={() => navigate("/pricing")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors">
            <p className="text-blue-400 text-xs mb-1">Pricing</p>
            <p className="text-[#E3E3E3] text-sm font-semibold">Compare plans for production coverage</p>
          </button>
        </div>

        <div className="mt-12">
          <p className="text-[#888] text-sm mb-4">Related guides</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={() => navigate("/guides/make-webhook-breakage")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors">
              <p className="text-blue-400 text-xs mb-1">Make.com</p>
              <p className="text-[#E3E3E3] text-sm font-semibold">Fix Make.com webhook errors</p>
            </button>
            <button onClick={() => navigate("/guides/n8n-schema-drift")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors">
              <p className="text-blue-400 text-xs mb-1">n8n</p>
              <p className="text-[#E3E3E3] text-sm font-semibold">Fix n8n schema drift issues</p>
            </button>
            <button onClick={() => navigate("/guides/zapier-payload-mismatch")} className="text-left bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors">
              <p className="text-blue-400 text-xs mb-1">Zapier</p>
              <p className="text-[#E3E3E3] text-sm font-semibold">Zapier automation troubleshooting</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}