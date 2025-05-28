import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";

const TestPage = lazy(() => import("@/pages/TestPage"));
const MainLayout = lazy(() => import("@/layouts/MainLayout.tsx"));

const AppRoutes: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {/* Auth-related routes */}
      <Route path="/*" element={<AuthRoutes />} />

      {/* Main app routes with layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<TestPage />} />
        {/* Add more main app routes here */}
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;