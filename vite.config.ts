import { cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  server: { port: 4173 },
  preview: { port: 4173 },
  plugins: [
    {
      name: "copy-existing-assets",
      apply: "build",
      writeBundle() {
        const output = resolve("dist");
        mkdirSync(resolve(output, "assets"), { recursive: true });
        cpSync(resolve("assets/exercises"), resolve(output, "assets/exercises"), { recursive: true });
        cpSync(resolve("icon.svg"), resolve(output, "icon.svg"));
      },
    },
    VitePWA({
      registerType: "autoUpdate",
      manifest: false,
      workbox: {
        globPatterns: ["**/*.{html,js,css,svg,jpg,webmanifest}"],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    }),
  ],
});