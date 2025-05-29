import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AgentRoutes from "./AgentRoutes";
import AgencyRoutes from "./AgencyRoutes";
import AuthRoutes from "./AuthRoutes";
import { AgentGlobalProvider } from "@/contexts";
import { CircularProgress, Box } from "@mui/material";
import { useRole } from "@/contexts";

const RouterSwitch: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { role } = useRole();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <AuthRoutes />;
  }

  if (role === "agency") {
    return (
      <AgentGlobalProvider>
        <AgencyRoutes />
      </AgentGlobalProvider>
    );
  }

  // Default to agent
  return (
    <AgentGlobalProvider>
      <AgentRoutes />
    </AgentGlobalProvider>
  );
};

export default RouterSwitch;
