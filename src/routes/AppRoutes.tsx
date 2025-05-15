import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "@/pages/Welcome"; // Your updated WelcomePage
import Dashboard from "@/pages/Dashboard"; // Your dashboard component

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Landing page */}
    <Route path="/" element={<WelcomePage />} />

    {/* Protected landing after login */}
    <Route path="/dashboard" element={<Dashboard />} />

    {/* Optional: catch-all redirect */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
