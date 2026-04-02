import React from "react";
import Header from "../Components/Landing/Header";

export default function AINodeTrainingInfo() {
	return (
		<div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
			<div className="max-w-6xl mx-auto">

				{/* Header Section */}
				<section className="flex flex-col items-center text-center mb-12 sm:mb-20 mt-6 sm:mt-10">
					<Header
						label="AI Node Training"
						title="Train AI on Distributed Data Without Moving It"
						subtext="A shared infrastructure model for data vendors and model buyers."
					/>

					<div className="flex flex-wrap justify-center gap-6 mt-12 sm:mt-20">

						{/* Vendor Value */}
						<div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 w-full sm:w-80 flex flex-col items-center">
							<h2 className="text-2xl font-semibold mb-4">For Vendors</h2>
							<p className="text-[#d1d5db] mb-6 text-center">
								Keep datasets in your environment while making them available for
								secure AI training through policy-based node access.
							</p>
							<ul className="text-[#d1d5db] text-left space-y-2">
								<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Data stays in your infrastructure</li>
								<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Granular controls for who can train</li>
								<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Monetize compute and data access</li>
							</ul>
						</div>

						{/* Buyer Value */}
						<div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 w-full sm:w-80 flex flex-col items-center">
							<h2 className="text-2xl font-semibold mb-4">For Buyers</h2>
							<p className="text-[#d1d5db] mb-6 text-center">
								Train and evaluate models against high-value private datasets
								without waiting for exports or risky file transfers.
							</p>
							<ul className="text-[#d1d5db] text-left space-y-2">
								<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Faster access to private data domains</li>
								<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Consistent training interfaces</li>
								<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Auditability for compliance teams</li>
							</ul>
						</div>

						{/* Shared Network */}
						<div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 w-full sm:w-80 flex flex-col items-center">
							<h2 className="text-2xl font-semibold mb-4">Shared Node Network</h2>
							<p className="text-[#d1d5db] mb-6 text-center">
								DataCrawl nodes coordinate secure jobs across distributed systems,
								enabling repeatable model training workflows at scale.
							</p>
							<ul className="text-[#d1d5db] text-left space-y-2">
								<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Job orchestration across trusted nodes</li>
								<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Standardized API-based execution</li>
								<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Measurable usage and billing events</li>
							</ul>
						</div>

					</div>
				</section>

				{/* How It Works For Vendors */}
				<section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto mb-8 sm:mb-12">
					<h2 className="text-2xl font-semibold mb-6 text-center">How It Works for Vendors</h2>
					<p className="text-[#d1d5db] mb-6 text-center">
						Vendors connect a DataCrawl node to approved datasets and define what
						can be used for training. Access is configured through policy rules,
						including model type restrictions, runtime limits, and usage pricing.
						This gives vendors a way to participate in AI development while
						preserving control of sensitive data.
					</p>
					<ul className="max-w-2xl mx-auto space-y-4 text-[#d1d5db]">
						<li className="flex gap-4"><span className="text-blue-400 font-bold text-xl shrink-0">01</span>Register node infrastructure and dataset endpoints.</li>
						<li className="flex gap-4"><span className="text-blue-400 font-bold text-xl shrink-0">02</span>Define permissions, pricing tiers, and policy guardrails.</li>
						<li className="flex gap-4"><span className="text-blue-400 font-bold text-xl shrink-0">03</span>Approve buyer training jobs based on your governance settings.</li>
						<li className="flex gap-4"><span className="text-blue-400 font-bold text-xl shrink-0">04</span>Track usage, performance, and revenue through node reporting.</li>
					</ul>
				</section>

				{/* How It Works For Buyers */}
				<section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto mb-8 sm:mb-12">
					<h2 className="text-2xl font-semibold mb-6 text-center">How It Works for Buyers</h2>
					<p className="text-[#d1d5db] mb-6 text-center">
						Buyers select vendor-connected datasets and submit training jobs
						against node-accessible compute targets. Instead of moving raw data,
						buyers send model logic to the node where training executes under
						vendor-defined policies.
					</p>
					<ul className="max-w-2xl mx-auto space-y-4 text-[#d1d5db]">
						<li className="flex gap-4"><span className="text-blue-400 font-bold text-xl shrink-0">01</span>Discover suitable datasets and node capabilities.</li>
						<li className="flex gap-4"><span className="text-blue-400 font-bold text-xl shrink-0">02</span>Request access and configure training job parameters.</li>
						<li className="flex gap-4"><span className="text-blue-400 font-bold text-xl shrink-0">03</span>Run jobs in secure vendor environments with policy checks.</li>
						<li className="flex gap-4"><span className="text-blue-400 font-bold text-xl shrink-0">04</span>Receive metrics, model artifacts, and training logs.</li>
					</ul>
				</section>

				{/* Shared Lifecycle */}
				<section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto mb-8 sm:mb-12">
					<h2 className="text-2xl font-semibold mb-6 text-center">End-to-End Training Lifecycle</h2>
					<p className="text-[#d1d5db] mb-6 text-center">
						AI node training creates a balanced workflow: vendors keep ownership
						and governance, buyers gain practical access and speed, and both sides
						operate through a transparent, metered system.
					</p>
					<ul className="max-w-2xl mx-auto space-y-4 text-[#d1d5db]">
						<li className="flex gap-4"><span className="text-blue-400 font-bold text-xl shrink-0">01</span>Dataset and node onboarding</li>
						<li className="flex gap-4"><span className="text-blue-400 font-bold text-xl shrink-0">02</span>Policy and contract enforcement</li>
						<li className="flex gap-4"><span className="text-blue-400 font-bold text-xl shrink-0">03</span>Secure execution and model feedback</li>
						<li className="flex gap-4"><span className="text-blue-400 font-bold text-xl shrink-0">04</span>Usage analytics, settlement, and optimization</li>
					</ul>
				</section>

				{/* Contact */}
				<section className="flex flex-col items-center text-center mb-12 sm:mb-20">
					<h2 className="text-2xl font-semibold mb-4">AI Node Program Contact</h2>
					<p className="text-[#d1d5db] max-w-lg">
						Want to join as a vendor node operator or run pilot training workloads as a buyer?
					</p>
					<p className="mt-6 text-[#aaa]">
						Reach out at{" "}
						<a href="mailto:contact@datacrawl.org" className="text-blue-400 font-semibold hover:underline">
							contact@datacrawl.org
						</a>
					</p>
				</section>

			</div>
		</div>
	);
}
