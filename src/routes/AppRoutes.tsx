import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const WelcomePage = lazy(() => import("@/pages/Welcome"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Test = lazy(() => import("@/pages/Test"));
const Logout = lazy(() => import("@/auth/pages/Logout"));
const RedirectToAppropriateRoute = lazy(
  () => import("@/routes/RedirectToAppropriateRoute")
);

const AppRoutes: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<RedirectToAppropriateRoute />} />
      <Route path="/welcome" element={<WelcomePage />} />

      {/* Private Routes */}

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/test" element={<Test />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
