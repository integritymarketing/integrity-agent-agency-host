import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import ErrorBoundary from "@/components/ErrorBoundary";

/*const TestPage = lazy(() => import("@/pages/TestPage"));*/
const Dashboard = lazy(() => import("IntegrityAgentDashboard/AgentDashboard"));
const MainLayout = lazy(() => import("@/layouts/MainLayout.tsx"));
const IntegrityAgents = lazy(() => import("IntegrityClients/App"));

const AgentRoutes: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {/* Auth-related routes */}
      <Route path="/*" element={<AuthRoutes />} />

      {/* Main app routes with layout */}
      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          }
        />
        {/* Add more main app routes here */}
      </Route>
      <Route element={<MainLayout />}>
        <Route
          path="/agents"
          element={
            <ErrorBoundary>
              <IntegrityAgents />
            </ErrorBoundary>
          }
        />
        {/* Add more main app routes here */}
      </Route>
    </Routes>
  </Suspense>
);

export default AgentRoutes;
