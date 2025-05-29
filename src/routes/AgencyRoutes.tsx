import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";

const TestPage = lazy(() => import("@/pages/TestPage"));
const MainLayout = lazy(() => import("@/layouts/MainLayout.tsx"));

const UnderConstruction = lazy(() => import("@/pages/UnderConstruction"));

const AgencyRoutes: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {/* Auth-related routes */}
      <Route path="/*" element={<AuthRoutes />} />

      {/* Main app routes with layout */}
      <Route element={<MainLayout />}>
        <Route path="/agencyDashboard" element={<UnderConstruction />} />
        {/* Add more main app routes here */}
      </Route>
    </Routes>
  </Suspense>
);

export default AgencyRoutes;
