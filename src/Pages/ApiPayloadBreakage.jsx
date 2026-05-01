import React from "react";
import SeoLandingPage from "../Components/SeoLandingPage";

const sections = [
  {
    id: "what-is-happening",
    title: "What is happening",
    paragraphs: [
      "API payload breakage happens when the sender keeps returning successful responses, but the structure of the data is no longer what your automation, webhook consumer, or downstream service expects.",
      "The integration looks healthy at the HTTP level, yet production jobs start dropping fields, misrouting logic, or silently writing the wrong data.",
    ],
  },
  {
    id: "why-it-breaks",
    title: "Why it breaks (schema drift / payload changes)",
    paragraphs: [
      "Most systems fail because they trust the API payload shape to stay stable. Once schema drift introduces a new envelope, a renamed field, or a different type, the receiving system keeps running old assumptions against new data.",
    ],
    items: [
      { title: "Contract changed without versioning", description: "The provider ships a breaking payload change without moving to a new endpoint or versioned schema." },
      { title: "Runtime validation is missing", description: "The receiver does not validate incoming payloads against the structure production logic depends on." },
      { title: "Payload mismatch spreads downstream", description: "One upstream schema change can break multiple automations, syncs, and analytics jobs at once." },
    ],
  },
  {
    id: "manual-fix",
    title: "How to fix it manually (pain)",
    steps: [
      "Log the raw payloads from the sender and compare them to a known-good sample or documented schema.",
      "Update transformation logic, field mappings, validation code, and tests everywhere the changed fields are referenced.",
      "Replay the affected events or jobs to repair downstream systems after the integration logic is fixed.",
      "Keep watching for the next unannounced payload change because the root issue is still the lack of runtime contract enforcement.",
    ],
    callout: {
      title: "Typical payload breakage incident",
      body: "Version before\n{ \"amount\": \"42.00\" }\n\nVersion after\n{ \"order\": { \"amount\": 42 } }\n\nResult\nThe sync succeeds at the transport layer but your automation cannot find the field path or type it expects.",
    },
  },
  {
    id: "automatic-fix",
    title: "How DataCrawl fixes it automatically",
    paragraphs: [
      "DataCrawl validates API payloads at intake, compares them to the contract your workflows rely on, and applies safe normalization when the breakage is known. That means one upstream payload change does not immediately ripple through every downstream automation.",
      "When the change is unknown, you get a clear failure boundary and payload-level visibility instead of discovering the issue later from corrupted records or missing actions.",
    ],
  },
  {
    id: "cta",
    title: "Start free trial",
    paragraphs: [
      "If API payload breakage is turning routine vendor updates into production incidents, start with a validation layer that catches schema drift at the boundary instead of after downstream damage is done.",
    ],
  },
];

export default function ApiPayloadBreakage() {
  return (
    <SeoLandingPage
      metaTitle="API Payload Breakage | Prevent Schema Drift in Webhooks and Automations"
      metaDescription="Prevent API payload breakage caused by schema drift, field renames, and webhook payload changes. Validate and normalize incoming data before automations fail."
      canonical="https://www.datacrawl.org/api-payload-breakage"
      badge="API Payloads · Breakage"
      title="How to fix automation breakage caused by API payload changes"
      intro="API payload breakage is one of the most common root causes behind silent workflow failures. The sender still returns successful responses, but the receiving system is now reading a different schema than the one it was built for."
      sections={sections}
      ctaTitle="Want API payload changes caught before they break downstream systems?"
      ctaCopy="Put DataCrawl at the webhook or API intake boundary so schema drift, field renames, and safe corrections are handled before business logic starts failing."
    />
  );
}