import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// @ts-ignore
// @ts-ignore
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
        "./userState": "./src/store/userState.tsx",
      },
      remotes: {
        IntegrityAgentDashboard: "http://localhost:5002/assets/integrityAgentDashboard.js",
      },
      shared: ['react', 'react-dom', '@auth0/auth0-react', 'jotai'],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
