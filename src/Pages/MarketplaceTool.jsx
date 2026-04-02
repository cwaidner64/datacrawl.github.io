import React from "react";
import Header from "../Components/Landing/Header";

export default function MarketplaceTool() {
	return (
		<div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
			<div className="max-w-6xl mx-auto flex flex-col items-center">

			{/* Header */}
			<section className="flex flex-col items-center mt-6 sm:mt-10 mb-12 sm:mb-20">

				<Header
					label="Marketplace"
					title="Revolutionary data infrastructure for robotics and industrial AI"
					subtext="Discover, evaluate, and license high-value datasets through one secure platform."
				/>

				<div className="flex flex-wrap justify-center gap-6 mt-12 sm:mt-20">

					{/* For Data Buyers */}
					<div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 w-full sm:w-80 flex flex-col items-center text-center">
						<h2 className="text-2xl font-semibold mb-4">For Data Buyers</h2>
						<p className="text-[#d1d5db] mb-6">
							Find data for model development, application deployments, and R&D projects.
						</p>
						<ul className="text-left space-y-2 text-[#d1d5db]">
							<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Advanced search</li>
							<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Preview metadata before buying</li>
							<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Integrate into your workflow via SDKs via DataCrawl API</li>
						</ul>
					</div>

					{/* For Data Providers */}
					<div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 w-full sm:w-80 flex flex-col items-center text-center">
						<h2 className="text-2xl font-semibold mb-4">For Data Providers</h2>
						<p className="text-[#d1d5db] mb-6">
							Monetize your data easily while keeping full ownership and control.
						</p>
						<ul className="text-left space-y-2 text-[#d1d5db]">
							<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Easy dataset listing tools</li>
							<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Flexible pricing &amp; access rules</li>
							<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Usage tracking and revenue reports</li>
						</ul>
					</div>

					{/* Secure Delivery */}
					<div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-5 sm:p-8 w-full sm:w-80 flex flex-col items-center text-center">
						<h2 className="text-2xl font-semibold mb-4">Secure Delivery Layer</h2>
						<p className="text-[#d1d5db] mb-6">
							Enterprise-grade security with simple, API-driven procurement.
						</p>
						<ul className="text-left space-y-2 text-[#d1d5db]">
							<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Policy-based access control</li>
							<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Full billing and authentication layer</li>
							<li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span>Ready-to-use APIs</li>
						</ul>
					</div>

				</div>
			</section>

			{/* What the Marketplace Will Be */}
			<section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 sm:p-10 w-full max-w-4xl mb-8 sm:mb-12">
				<h2 className="text-2xl font-semibold mb-6 text-center">
					What the Marketplace Will Be
				</h2>
				<div className="space-y-6 text-[#d1d5db] text-center">
					<p>
						DataCrawl Marketplace is a centralized platform for discovering high-quality 
						data from verified providers.
					</p>
					<p>
						Standardized API metadata, delivery infrastructure, secure billing tools, generated SDKs. 
					</p>
					<p>
						First and last platform you'll ever need after need for data discovery
					</p>
				</div>
			</section>

			{/* How It Works */}
			<section className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 sm:p-10 w-full max-w-4xl mb-8 sm:mb-12">
				<h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
				<p className="text-[#d1d5db] text-center mb-8">
					A simple, scalable workflow designed for both rapid experimentation and enterprise use.
				</p>
				<ul className="max-w-2xl mx-auto space-y-4 text-[#d1d5db]">
					<li className="flex gap-3">
						<span className="text-blue-400 font-bold">01</span>
						Providers publish datasets, we standardize it's metadata and make it discoverable.
					</li>
					<li className="flex gap-3">
						<span className="text-blue-400 font-bold">02</span>
						Buyers search by category, or similarity match
					</li>
					<li className="flex gap-3">
						<span className="text-blue-400 font-bold">03</span>
						Generate an easy to use SDK, link to your workflow.
					</li>
					<li className="flex gap-3">
						<span className="text-blue-400 font-bold">04</span>
						Pay per usage or request a quote for enterprise procurement.
					</li>
				</ul>
			</section>

			{/* Contact */}
			<section className="flex flex-col items-center text-center mb-12 sm:mb-20">
				<h2 className="text-2xl font-semibold mb-4">Marketplace Partnerships</h2>
				<p className="text-[#d1d5db] max-w-lg">
					Interested in listing datasets, becoming a launch partner, or helping shape the platform?
				</p>
				<p className="mt-6 text-[#aaa]">
					Reach out at{" "}
					<a
						href="mailto:contact@datacrawl.org"
						className="text-blue-400 font-semibold hover:underline"
					>
						contact@datacrawl.org
					</a>
				</p>
			</section>

			</div>
		</div>
	);
}