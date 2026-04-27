/**
 * usePageMeta — sets document title, description, and OG meta tags
 * for each route in the SPA. Call at the top of each Page component.
 *
 * @param {object} opts
 * @param {string} opts.title       — <title> and og:title
 * @param {string} opts.description — meta description and og:description
 * @param {string} [opts.canonical] — canonical URL (optional)
 */
import { useEffect } from "react";

const BASE_TITLE = "DataCrawl";
const SITE_URL = "https://www.datacrawl.org";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export function usePageMeta({ title, description, canonical }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${BASE_TITLE}` : BASE_TITLE;

    // <title>
    document.title = fullTitle;

    // Helper to upsert a <meta> tag
    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrValue] = selector.replace("[", "").replace("]", "").split("=");
        el.setAttribute(attrName.trim(), attrValue.replace(/"/g, "").trim());
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);

    if (canonical) {
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", canonical);
    }
  }, [title, description, canonical]);
}
