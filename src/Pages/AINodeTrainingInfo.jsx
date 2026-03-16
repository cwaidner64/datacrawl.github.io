import React from "react";
import Header from "../Components/Landing/Header";

const sectionStyle = {
	background: "#1f1f1f",
	border: "1px solid #333",
	borderRadius: "10px",
	padding: "2rem",
	marginBottom: "2rem",
	maxWidth: "900px"
};

export default function AINodeTrainingInfo() {
	return (
		<div className="min-h-screen bg-[#111111] flex flex-col items-center font-[Heebo] px-4 py-12">

			{/* Header */}
			<section className="flex flex-col items-center bg-[#111111] mt-20 mb-32">

				<Header
					label={"AI Node Training"}
					title={"Train AI on Distributed Data Without Moving It"}
					subtext={"A shared infrastructure model for data vendors and model buyers."}
				/>

				<div className="flex flex-wrap justify-center gap-8 items-start mx-12 mt-20">

					{/* Vendor Value */}
					<div className="bg-[#222] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">

						<h2 className="text-xl font-bold text-white mb-4">
							For Vendors
						</h2>

						<p className="text-white mb-4 text-center">
							Keep datasets in your environment while making them available for
							secure AI training through policy-based node access.
						</p>

						<ul className="text-white text-left list-disc pl-5">
							<li>Data stays in your infrastructure</li>
							<li>Granular controls for who can train</li>
							<li>Monetize compute and data access</li>
						</ul>

					</div>

					{/* Buyer Value */}
					<div className="bg-[#222] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">

						<h2 className="text-xl font-bold text-white mb-4">
							For Buyers
						</h2>

						<p className="text-white mb-4 text-center">
							Train and evaluate models against high-value private datasets
							without waiting for exports or risky file transfers.
						</p>

						<ul className="text-white text-left list-disc pl-5">
							<li>Faster access to private data domains</li>
							<li>Consistent training interfaces</li>
							<li>Auditability for compliance teams</li>
						</ul>

					</div>

					{/* Shared Network */}
					<div className="bg-[#222] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">

						<h2 className="text-xl font-bold text-white mb-4">
							Shared Node Network
						</h2>

						<p className="text-white mb-4 text-center">
							DataCrawl nodes coordinate secure jobs across distributed systems,
							enabling repeatable model training workflows at scale.
						</p>

						<ul className="text-white text-left list-disc pl-5">
							<li>Job orchestration across trusted nodes</li>
							<li>Standardized API-based execution</li>
							<li>Measurable usage and billing events</li>
						</ul>

					</div>

				</div>

			</section>

			{/* How It Works For Vendors */}
			<section style={sectionStyle}>

				<h1 className="text-2xl font-bold text-white mb-6 text-center">
					How It Works for Vendors
				</h1>

				<p className="text-white mb-6 text-center">
					Vendors connect a DataCrawl node to approved datasets and define what
					can be used for training. Access is configured through policy rules,
					including model type restrictions, runtime limits, and usage pricing.
					This gives vendors a way to participate in AI development while
					preserving control of sensitive data.
				</p>

				<ul className="text-white list-disc pl-8 space-y-2">
					<li>Register node infrastructure and dataset endpoints.</li>
					<li>Define permissions, pricing tiers, and policy guardrails.</li>
					<li>Approve buyer training jobs based on your governance settings.</li>
					<li>Track usage, performance, and revenue through node reporting.</li>
				</ul>

			</section>

			{/* How It Works For Buyers */}
			<section style={sectionStyle}>

				<h2 className="text-xl font-bold text-white mb-4 text-center">
					How It Works for Buyers
				</h2>

				<p className="text-white mb-4 text-center">
					Buyers select vendor-connected datasets and submit training jobs
					against node-accessible compute targets. Instead of moving raw data,
					buyers send model logic to the node where training executes under
					vendor-defined policies.
				</p>

				<ul className="text-white list-disc pl-8 space-y-2">
					<li>Discover suitable datasets and node capabilities.</li>
					<li>Request access and configure training job parameters.</li>
					<li>Run jobs in secure vendor environments with policy checks.</li>
					<li>Receive metrics, model artifacts, and training logs.</li>
				</ul>

			</section>

			{/* Shared Lifecycle */}
			<section style={sectionStyle}>

				<h2 className="text-xl font-bold text-white mb-4 text-center">
					End-to-End Training Lifecycle
				</h2>

				<p className="text-white mb-4 text-center">
					AI node training creates a balanced workflow: vendors keep ownership
					and governance, buyers gain practical access and speed, and both sides
					operate through a transparent, metered system.
				</p>

				<ul className="text-white list-disc pl-8 space-y-2">
					<li>Dataset and node onboarding</li>
					<li>Policy and contract enforcement</li>
					<li>Secure execution and model feedback</li>
					<li>Usage analytics, settlement, and optimization</li>
				</ul>

			</section>

			{/* Contact */}
			<section className="flex flex-col items-center bg-[#111111] mt-12 mb-20">

				<h2 className="text-xl font-bold text-white mb-4">
					AI Node Program Contact
				</h2>

				<p className="text-white text-center max-w-xl">
					Want to join as a vendor node operator or run pilot training workloads
					as a buyer?
					<br /><br />
					Reach out to our team at
					<br /><br />
					<a
						href="mailto:contact@datacrawl.org"
						className="text-blue-500 underline"
					>
						contact@datacrawl.org
					</a>
				</p>

			</section>

		</div>
	);
}
