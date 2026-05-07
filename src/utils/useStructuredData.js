import { useEffect } from "react";

export function useStructuredData(schemaId, schema) {
  useEffect(() => {
    if (!schemaId || !schema) {
      return;
    }

    const selector = `script[type="application/ld+json"][data-schema-id="${schemaId}"]`;
    let scriptEl = document.querySelector(selector);

    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.setAttribute("data-schema-id", schemaId);
      document.head.appendChild(scriptEl);
    }

    scriptEl.textContent = JSON.stringify(schema);

    return () => {
      const current = document.querySelector(selector);
      if (current) {
        current.remove();
      }
    };
  }, [schemaId, schema]);
}