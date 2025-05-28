import React from "react";
import { AgentAvailabilityProvider } from "./agentAvailabilityProvider/AgentAvailabilityContext";
import { AgentDetailsProvider } from "./agentDetailsProvider/AgentDetailsContext";
import { AgentAvailabilitySignalRProvider } from "./agentAvailabilitySignalRProvider/AgentAvailabilitySignalRContext";
import { LeadStatusProvider } from "./leadStatusProvider/LeadStatusContext";
import { AgentProfileProvider } from "./agentProfileProvider/AgentProfileContext";

interface Props {
  children: React.ReactNode;
}

const AgentGlobalProvider: React.FC<Props> = ({ children }) => {
  return (
    <LeadStatusProvider>
      <AgentDetailsProvider>
        <AgentAvailabilitySignalRProvider>
          <AgentProfileProvider>
            <AgentAvailabilityProvider>
              {children}
            </AgentAvailabilityProvider>
          </AgentProfileProvider>
        </AgentAvailabilitySignalRProvider>
      </AgentDetailsProvider>
    </LeadStatusProvider>
  );
};

export default AgentGlobalProvider;
