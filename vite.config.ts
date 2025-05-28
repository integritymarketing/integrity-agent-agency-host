import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      scss: "/src/scss",
    },
  },
  plugins: [
    react(),
    federation({
      name: "agentSharedContext",
      filename: "remoteEntry.js",
      exposes: {
        "./userState": "./src/store/userState.tsx",
        "./AppGlobalContext": "./src/contexts",
      },
      remotes: {
        IntegrityAgentDashboard:
          "http://localhost:5002/assets/integrityAgentDashboard.js",
        IntegrityAgent: "http://localhost:5003/assets/integrityAgent.js",
      },
      shared: [
        "react",
        "react-dom",
        "@mui/material",
        "@mui/base",
        "@auth0/auth0-react",
        "jotai",
        "@integritymarketing/clients-ui-kit",
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // You can add supported options here, e.g.:
        // additionalData: `@import "@/scss/variables.scss";`,
      },
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
