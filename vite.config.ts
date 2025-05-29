import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// @ts-ignore
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
      shared: [{
        react: {
          singleton: true,
          requiredVersion: '^18.3.1',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.3.1',
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.21.1',
        },
        '@auth0/auth0-react': {
          singleton: true,
          requiredVersion: '^2.2.4',
        },
      }]
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
    sourcemap: true,
  },
});
