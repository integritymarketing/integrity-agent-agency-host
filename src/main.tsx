import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react"; // For React SDK
import BrowserTracing from "@sentry/browser"; // For BrowserTracing integration

import { AuthProvider } from "./contexts/auth0Provider/AuthContext";
import "./index.css";
import AppRoutes from "@/routes/AppRoutes.tsx";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AgentGlobalProvider } from "@/contexts";

// if (import.meta.env.VITE_SENTRY_DSN) {
//   Sentry.init({
//     dsn: import.meta.env.VITE_SENTRY_DSN,
//     environment: import.meta.env.VITE_BUILD_ENV || "Development",
//     release: `portal-app@${import.meta.env.VITE_VERSION}`,
//     integrations: [BrowserTracing],
//     tracesSampleRate: 1.0,
//   });
// }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AgentGlobalProvider>
            <AppRoutes />
          </AgentGlobalProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
