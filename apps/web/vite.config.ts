import { fileURLToPath } from "node:url";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true, target: "react" }),
    react(),
    tailwindcss(),
    VitePWA({
      filename: "sw.ts",
      includeAssets: ["favicon.svg"],
      injectManifest: {
        globPatterns: ["**/*.{css,html,js}"],
      },
      manifest: {
        background_color: "#f3faf7",
        description: "A Cloudflare-first searchable items example",
        display: "standalone",
        icons: [
          {
            purpose: "any",
            sizes: "192x192",
            src: "/pwa-192x192.svg",
            type: "image/svg+xml",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "/pwa-512x512.svg",
            type: "image/svg+xml",
          },
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "/pwa-maskable-512x512.svg",
            type: "image/svg+xml",
          },
        ],
        name: "Edge Stack",
        scope: "/",
        short_name: "Edge Stack",
        start_url: "/",
        theme_color: "#087f5b",
      },
      registerType: "prompt",
      srcDir: "src",
      strategies: "injectManifest",
    }),
    cloudflare({
      auxiliaryWorkers: [
        { configPath: "../../workers/api/wrangler.jsonc" },
        { configPath: "../../workers/jobs/wrangler.jsonc" },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
