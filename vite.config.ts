import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    react(),
    federation({
      name: "agentSharedContext",
      filename: "remoteEntry.js",
      exposes: {
        "./AppGlobalProvider": "./src/contexts/AgentGlobalProvider.tsx",
      },
      remotes: {
        IntegrityAgentDashboard:
          "http://localhost:5002/assets/integrityAgentDashboard.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
