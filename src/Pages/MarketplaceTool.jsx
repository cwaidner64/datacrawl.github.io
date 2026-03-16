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

export default function MarketplaceTool() {
	return (
		<div className="min-h-screen bg-[#111111] flex flex-col items-center font-[Heebo] px-4 py-12">

			{/* Header */}
			<section className="flex flex-col items-center bg-[#111111] mt-20 mb-32">

				<Header
					label={"Marketplace"}
					title={"A Data Marketplace Built for Robotics and AI Teams"}
					subtext={"Discover, evaluate, and license high-value datasets through one secure platform."}
				/>

				<div className="flex flex-wrap justify-center gap-8 items-start mx-12 mt-20">

					{/* For Data Buyers */}
					<div className="bg-[#222] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">

						<h2 className="text-xl font-bold text-white mb-4">
							For Data Buyers
						</h2>

						<p className="text-white mb-4 text-center">
							Teams can quickly find the datasets they need for model
							development, validation, and benchmarking.
						</p>

						<ul className="text-white text-left list-disc pl-5">
							<li>Advanced dataset search and filtering</li>
							<li>Preview metadata before purchase</li>
							<li>Standardized licensing workflow</li>
						</ul>

					</div>

					{/* For Data Providers */}
					<div className="bg-[#222] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">

						<h2 className="text-xl font-bold text-white mb-4">
							For Data Providers
						</h2>

						<p className="text-white mb-4 text-center">
							Providers can monetize valuable data assets while maintaining
							ownership, visibility, and control over access.
						</p>

						<ul className="text-white text-left list-disc pl-5">
							<li>Dataset listing and profile tools</li>
							<li>Flexible pricing and access rules</li>
							<li>Usage tracking and revenue reporting</li>
						</ul>

					</div>

					{/* Trust & Delivery */}
					<div className="bg-[#222] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">

						<h2 className="text-xl font-bold text-white mb-4">
							Secure Delivery Layer
						</h2>

						<p className="text-white mb-4 text-center">
							The marketplace is backed by API-driven controls that simplify
							procurement and support enterprise-grade security requirements.
						</p>

						<ul className="text-white text-left list-disc pl-5">
							<li>Policy-based dataset access</li>
							<li>Audit-ready activity history</li>
							<li>Integration-ready API endpoints</li>
						</ul>

					</div>

				</div>

			</section>

			{/* What The Marketplace Will Be */}
			<section style={sectionStyle}>

				<h1 className="text-2xl font-bold text-white mb-6 text-center">
					What the Marketplace Will Be
				</h1>

				<p className="text-white mb-6 text-center">
					DataCrawl Marketplace will be a centralized interface for discovering
					robotics, autonomous systems, and industrial AI datasets offered by
					verified providers. Rather than relying on fragmented, hard-to-compare
					sources, teams will be able to search across structured listings with
					clear metadata, quality indicators, and licensing terms.
				</p>

				<p className="text-white mb-6 text-center">
					The goal is to make dataset procurement as reliable as modern software
					procurement: transparent options, predictable workflows, and fast
					integration. Buyers will be able to identify fit quickly, and
					providers will have the tooling to package and distribute data as a
					reusable product.
				</p>

				<p className="text-white mb-6 text-center">
					Over time, the marketplace will evolve into an ecosystem where data,
					tooling, and access governance work together, helping organizations
					accelerate AI development without sacrificing security or ownership.
				</p>

			</section>

			{/* How It Works */}
			<section style={sectionStyle}>

				<h2 className="text-xl font-bold text-white mb-4 text-center">
					Marketplace Workflow
				</h2>

				<p className="text-white mb-4 text-center">
					The marketplace is designed around a simple flow that supports both
					experimentation and enterprise procurement.
				</p>

				<ul className="text-white list-disc pl-8 space-y-2">
					<li>
						Providers publish datasets with structured metadata, sample details,
						and licensing options.
					</li>

					<li>
						Buyers search by domain, modality, geography, or sensor type to find
						relevant data faster.
					</li>

					<li>
						Access is requested and approved through policy controls rather than
						manual email-based workflows.
					</li>

					<li>
						Teams integrate datasets into pipelines through standardized APIs for
						repeatable model development and testing.
					</li>
				</ul>

			</section>

			{/* Contact */}
			<section className="flex flex-col items-center bg-[#111111] mt-12 mb-20">

				<h2 className="text-xl font-bold text-white mb-4">
					Marketplace Partnerships
				</h2>

				<p className="text-white text-center max-w-xl">
					Interested in listing datasets, joining as a launch partner, or
					shaping early marketplace capabilities?
					<br /><br />
					Reach us at
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
