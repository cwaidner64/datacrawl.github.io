import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "/";
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

function githubPagesFallbackPlugin() {
  return {
    name: "github-pages-fallback",
    closeBundle() {
      const distDir = resolve(process.cwd(), "dist");
      const indexPath = resolve(distDir, "index.html");
      const fallbackPath = resolve(distDir, "404.html");

      if (existsSync(indexPath)) {
        copyFileSync(indexPath, fallbackPath);
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = normalizeBasePath(env.VITE_BASE_PATH || "/");

  return {
    plugins: [tailwindcss(), react(), githubPagesFallbackPlugin()],
    assetsInclude: ["**/*.php"],
    base,
  };
});