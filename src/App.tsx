import { BrowserRouter } from "react-router-dom";

import "./App.css";
import AppRoutes from "@/routes/AppRoutes";
import AuthRoutes from "@/routes/AuthRoutes";
import { AuthProvider } from "@/contexts/auth0Provider/AuthContext";
import { AgentGlobalProvider } from "@/contexts";
import ErrorBoundary from "@/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AuthRoutes />
        {/* App (microfrontend) routes wrapped in AgentGlobalProvider */}
        <AgentGlobalProvider>
          <AppRoutes />
        </AgentGlobalProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;