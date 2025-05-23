import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const WelcomePage = lazy(() => import("@/pages/Welcome"));
const Dashboard = lazy(() => import("IntegrityAgentDashboard/AgentDashboard"));
const Logout = lazy(() => import("@/auth/pages/Logout"));
const RedirectToAppropriateRoute = lazy(
  () => import("@/routes/RedirectToAppropriateRoute")
);
const Register = lazy(() => import("@/auth/pages/RegistrationPage"));

const AppRoutes: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/welcome" element={<WelcomePage />} />

      {/* Private Routes */}

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />

      {/* Redirect to the welcome page if no route matches */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
