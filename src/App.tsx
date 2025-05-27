import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

import "./App.css";
import AppRoutes from "@/routes/AppRoutes.tsx";
import { AuthProvider } from "./contexts/auth0Provider/AuthContext";
import { AgentGlobalProvider } from "@/contexts";
import ErrorBoundary from "@/components/ErrorBoundary";

/**
 * List or array of microfrontend route prefixes or full paths
 * Adjust this list to include all routes served by your micro frontends
 */
const MICROFRONTEND_ROUTE_PREFIXES = [
  "/dashboard",
  "/microfrontend1",
  "/microfrontend2",
  // add more microfrontend routes here
];

/**
 * Returns true if current path matches any microfrontend route prefix
 */
const isMicrofrontendRoute = (pathname: string) => {
  return MICROFRONTEND_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
};

/**
 * Conditionally wrap microfrontend routes with AgentGlobalProvider
 */
const ConditionalAgentProviderWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const location = useLocation();

  if (isMicrofrontendRoute(location.pathname)) {
    return <AgentGlobalProvider>{children}</AgentGlobalProvider>;
  }

  return <>{children}</>;
};

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <BrowserRouter>
          <AuthProvider>
            <ConditionalAgentProviderWrapper>
              <AppRoutes />
            </ConditionalAgentProviderWrapper>
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
