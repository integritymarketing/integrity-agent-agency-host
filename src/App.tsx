import { BrowserRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";
import AppRoutes from "@/routes/AppRoutes";
import AuthRoutes from "@/routes/AuthRoutes";
import { AuthProvider } from "@/contexts/auth0Provider/AuthContext";
import { AgentGlobalProvider } from "@/contexts";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CircularProgress, Box } from "@mui/material";

function RouterSwitch() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isAuthenticated) {
    return (
      <AgentGlobalProvider>
        <AppRoutes />
      </AgentGlobalProvider>
    );
  }
  return <AuthRoutes />;
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <RouterSwitch />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;