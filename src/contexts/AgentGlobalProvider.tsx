import React from "react";
import { AgentAvailabilityProvider } from "./agentAvailabilityProvider/AgentAvailabilityContext";
import { AgentDetailsProvider } from "./agentDetailsProvider/AgentDetailsContext";
import { AgentAvailabilitySignalRProvider } from "./agentAvailabilitySignalRProvider/AgentAvailabilitySignalRContext";
import { LeadStatusProvider } from "./leadStatusProvider/LeadStatusContext";

interface Props {
  children: React.ReactNode;
}

const AgentGlobalProvider: React.FC<Props> = ({ children }) => {
  return (
    <LeadStatusProvider>
      <AgentDetailsProvider>
        <AgentAvailabilitySignalRProvider>
          <AgentAvailabilityProvider>{children}</AgentAvailabilityProvider>
        </AgentAvailabilitySignalRProvider>
      </AgentDetailsProvider>
    </LeadStatusProvider>
  );
};

export default AgentGlobalProvider;
