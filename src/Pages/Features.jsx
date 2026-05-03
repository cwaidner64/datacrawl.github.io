import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Landing/Header";
import { usePageMeta } from "../utils/usePageMeta";

const solutionCards = [
	{
		to: "/solutions/agency-automation-reliability",
		title: "Agency Automation Reliability",
		subtitle: "For client delivery teams",
		description:
			"Stabilize webhook-heavy client automations across Make, n8n, and Zapier without spending every week in incident triage.",
		bullets: [
			"Reduce recurring debugging overhead",
			"Detect schema drift before client impact",
			"Auto-correct known payload breakpoints",
		],
	},
	{
		to: "/solutions/internal-ops-automation-guardrails",
		title: "Internal Ops Automation Guardrails",
		subtitle: "For ops and revenue teams",
		description:
			"Protect lead routing, CRM sync, and handoff workflows from silent payload issues that create missed actions and bad data.",
		bullets: [
			"Catch data drift at intake",
			"Protect SLA-critical workflows",
			"Shorten time-to-resolution on incidents",
		],
	},
];

export default function Features() {
	usePageMeta({
		title: "Solutions",
		description:
			"Explore DataCrawl solutions for agency automation reliability and internal operations guardrails.",
		canonical: "https://www.datacrawl.org/solutions",
	});

	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
			<div className="max-w-6xl mx-auto flex flex-col items-center">
				<section className="flex flex-col items-center mt-6 sm:mt-10 mb-10 sm:mb-16 text-center">
					<Header
						label="Solutions"
						title="Reliability Paths For Teams Running Real Automations"
						subtext="Choose the operating model that matches your workload. Both are designed to prevent silent failures before they become customer-facing incidents."
					/>
					<p className="text-[#d1d5db] max-w-3xl mt-6 leading-7">
						Whether you run client automations or internal operations pipelines, DataCrawl helps you keep webhook-driven systems stable as upstream APIs evolve.
					</p>
				</section>

				<section className="w-full max-w-6xl mb-16 sm:mb-20">
					<div className="grid gap-6 md:grid-cols-2">
						{solutionCards.map((card) => (
							<article
								key={card.to}
								className="rounded-2xl p-8 border border-[#2a2a2a] bg-[#181818] hover:border-[#3b82f6] transition-colors"
							>
								<p className="text-blue-400 text-xs font-semibold tracking-wide uppercase mb-3">{card.subtitle}</p>
								<h2 className="text-[#E3E3E3] font-bold text-2xl mb-3">{card.title}</h2>
								<p className="text-[#9a9a9a] leading-7 mb-6">{card.description}</p>
								<ul className="space-y-2 mb-8">
									{card.bullets.map((item) => (
										<li key={item} className="text-[#cfcfcf] text-sm flex items-start gap-2">
											<span className="text-green-400 mt-0.5">✓</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
								<button
									onClick={() => navigate(card.to)}
									className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
								>
									View Solution
								</button>
							</article>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
