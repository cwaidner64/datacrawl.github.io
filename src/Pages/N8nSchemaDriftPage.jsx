import React from "react";
import SeoLandingPage from "../Components/SeoLandingPage";

const sections = [
  {
    id: "what-is-happening",
    title: "What is happening",
    paragraphs: [
      "Your n8n workflow worked yesterday, but today the webhook trigger or HTTP node is producing undefined values and broken expressions. That usually means the upstream API changed its payload shape and the workflow is now reading the wrong keys.",
      "Because many schema drift incidents still return HTTP 200, the workflow can keep running while quietly producing bad data.",
    ],
  },
  {
    id: "why-it-breaks",
    title: "Why it breaks (schema drift / payload changes)",
    paragraphs: [
      "n8n expressions rely on exact JSON paths. When schema drift moves name to user.name or changes active from \"true\" to true, expressions and conditions stop matching what the workflow expects.",
    ],
    items: [
      { title: "Expression path drift", description: "A payload mismatch changes the field path, so existing expressions evaluate to undefined." },
      { title: "Type coercion issues", description: "String-to-number or string-to-boolean changes break filters, branches, and downstream node assumptions." },
      { title: "Envelope changes", description: "A provider wraps the same event inside a new parent object, causing runtime automation failure across multiple nodes." },
    ],
  },
  {
    id: "manual-fix",
    title: "How to fix it manually (pain)",
    steps: [
      "Open the failed execution in n8n and compare the live input data against the expressions used in your workflow nodes.",
      "Update every affected expression path, condition, and transformation node to reflect the new payload shape.",
      "Replay test data to confirm you did not fix one branch while leaving another branch broken.",
      "Document the new schema yourself and wait for the next payload change to repeat the same manual repair cycle.",
    ],
    callout: {
      title: "Common n8n incident",
      body: "Expected expression\n{{ $json[\"user_id\"] }}\n\nLive payload\n{ \"userId\": 42 }\n\nResult\nThe workflow does not crash immediately, but downstream nodes receive undefined and produce corrupted output or skipped actions.",
    },
  },
  {
    id: "automatic-fix",
    title: "How DataCrawl fixes it automatically",
    paragraphs: [
      "DataCrawl validates incoming n8n webhook traffic before it reaches your business logic. Known field renames and safe type conversions are normalized into a stable internal shape that your workflow can rely on.",
      "Unknown schema drift is surfaced with clear payload-level context, so you spend less time reverse engineering what changed and more time deciding whether the change should be accepted.",
    ],
  },
  {
    id: "cta",
    title: "Start free trial",
    paragraphs: [
      "If schema drift keeps breaking n8n workflows, start with a validation layer that catches payload changes before they spread through expressions, branches, and downstream actions.",
    ],
  },
];

export default function N8nSchemaDriftPage() {
  return (
    <SeoLandingPage
      metaTitle="n8n Schema Drift | Fix Webhook and API Payload Changes"
      metaDescription="Fix n8n schema drift caused by webhook payload changes, field renames, and API response changes. Catch payload mismatch before workflows fail."
      canonical="https://www.datacrawl.org/n8n-schema-drift"
      badge="n8n · Schema Drift"
      title="How to fix n8n schema drift caused by webhook and API payload changes"
      intro="n8n schema drift shows up when a workflow still executes but the data paths inside it no longer match what the sender is delivering. That is why field-level payload changes often look like random workflow breakage instead of a clear upstream issue."
      sections={sections}
      ctaTitle="Want n8n schema drift caught before it breaks live workflows?"
      ctaCopy="Put DataCrawl in front of your n8n intake layer to validate incoming payloads, normalize safe changes, and surface real drift before it becomes production noise."
    />
  );
}