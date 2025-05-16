import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- import BrowserRouter
// import { AuthProvider } from "./contexts/auth0Provider/AuthContext";
import "./index.css";
import AppRoutes from "@/routes/AppRoutes.tsx";
import ErrorBoundary from "@/components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        {/* <AuthProvider> */}
        <AppRoutes />
        {/* </AuthProvider> */}
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
