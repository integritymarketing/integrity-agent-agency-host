import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";
import { AgentGlobalProvider } from "@/contexts";
import { CircularProgress, Box } from "@mui/material";

const RouterSwitch: React.FC = () => {
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
};

export default RouterSwitch;