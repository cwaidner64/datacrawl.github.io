import React from "react";

const sectionStyle = {
  background: "#1f1f1f",
  border: "1px solid #333",
  borderRadius: "10px",
  padding: "1.25rem",
  marginBottom: "1.25rem",
};

const vendorCardStyle = {
  border: "1px solid #3a3a3a",
  borderRadius: "8px",
  padding: "0.9rem",
  marginBottom: "0.75rem",
  background: "#151515",
};

const vendorEmailStyle = {
  color: "#60a5fa",
  fontWeight: 600,
  textDecoration: "none",
};

export default function VendorInformation() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111111",
        color: "#ffffff",
        padding: "6rem 2rem 2rem",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>

        <h1 style={{ marginBottom: "1rem", fontSize: "2rem", fontWeight: 700 }}>
          Data Vendors
        </h1>

        <p style={{ color: "#cbd5e1", marginBottom: "1.25rem" }}>
          DataCrawl connects companies with AI developers, robotics engineers,
          and research teams that need reliable datasets to build the next
          generation of intelligent systems. If your organization produces
          valuable data, our platform allows you to distribute it through a
          global network of AI training nodes while maintaining full control
          over access and usage.
        </p>

        {/* Become Vendor */}
        <section style={sectionStyle}>
          <h2 style={{ marginTop: 0, marginBottom: "0.9rem" }}>
            Why Become a DataCrawl Vendor
          </h2>

          <p style={{ color: "#d1d5db", marginBottom: "0.75rem" }}>
            Many organizations collect large volumes of operational data that
            remain unused outside their internal systems. DataCrawl transforms
            these datasets into valuable digital assets by making them
            accessible to developers, AI researchers, and robotics companies
            through secure APIs and distributed training nodes.
          </p>

          <p style={{ color: "#d1d5db", marginBottom: "0.75rem" }}>
            Instead of negotiating individual data licensing agreements,
            vendors can publish datasets once and allow DataCrawl's AI
            infrastructure to deliver that data directly to applications,
            training pipelines, and machine learning models across the
            ecosystem.
          </p>

          <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
            <li>Monetize datasets through usage-based access.</li>
            <li>Distribute data directly to AI developers and robotics companies.</li>
            <li>Allow AI training nodes to securely query your datasets.</li>
            <li>Reach global customers without managing infrastructure.</li>
            <li>Maintain full ownership and control over your data.</li>
          </ul>

          <p style={{ color: "#d1d5db", marginBottom: "0.75rem" }}>
            DataCrawl manages authentication, usage tracking, billing,
            and discovery, allowing your team to focus on maintaining
            high-quality datasets while we handle distribution and
            infrastructure.
          </p>

          <a
            href="/contact"
            style={{
              color: "#60a5fa",
              textDecoration: "underline",
              fontWeight: 600,
            }}
          >
            Apply to Become a Vendor →
          </a>

          {/* AI Nodes */}
          <h2 style={{ marginTop: "1.5rem", marginBottom: "0.9rem" }}>
            AI Training Node Integration
          </h2>

          <p style={{ color: "#d1d5db", marginBottom: "0.75rem" }}>
            DataCrawl operates a distributed network of AI data nodes used by
            developers and organizations to retrieve structured datasets for
            machine learning and robotics applications. Vendors can integrate
            their datasets into this network so that AI systems can query them
            directly during training or analysis workflows.
          </p>

          <p style={{ color: "#d1d5db", marginBottom: "0.75rem" }}>
            This architecture allows your data to become part of a growing
            ecosystem powering modern AI systems without exposing raw
            infrastructure or requiring you to build custom data delivery
            platforms.
          </p>

          <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
            <li>Secure API-based dataset access</li>
            <li>Distributed delivery through DataCrawl nodes</li>
            <li>Optimized for machine learning pipelines</li>
            <li>Usage-based monetization model</li>
          </ul>

          {/* Requirements */}
          <h2 style={{ marginTop: "1.5rem", marginBottom: "0.9rem" }}>
            Vendor Requirements
          </h2>

          <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
            <li>Provide a clear description of the dataset and use cases.</li>
            <li>Ensure compliance with data privacy and licensing regulations.</li>
            <li>Maintain accurate and reliable datasets.</li>
            <li>Support integration through APIs or structured data endpoints.</li>
          </ul>

          <p style={{ color: "#d1d5db", marginTop: "0.75rem" }}>
            DataCrawl reviews vendor applications to maintain a high-quality
            data ecosystem for developers and organizations.
          </p>
        </section>

        {/* Vendor List */}
        <section style={sectionStyle}>
          <h2 style={{ marginTop: 0, marginBottom: "0.9rem" }}>
            Current Vendors
          </h2>

          <div style={vendorCardStyle}>
            <div style={{ fontWeight: 700, marginBottom: "0.3rem" }}>
              DataCrawl
            </div>

            <div style={{ color: "#d1d5db", marginBottom: "0.45rem" }}>
              Initial platform data provider. As our ecosystem grows,
              additional vendors from industries such as robotics,
              mobility, research, and analytics will be listed here.
            </div>

            <a href="mailto:contact@datacrawl.org" style={vendorEmailStyle}>
              contact@datacrawl.org
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}