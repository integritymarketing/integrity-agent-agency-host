import React, { createContext, useEffect } from "react";
import { useFetch, useAgentProfile } from "@/hooks";
import {
  AgentAvailability,
  AgentAvailabilityContextType,
} from "./AgentAvailabilityTypes";
import { useAgentAvailabilitySignalR } from "@/contexts";

export const AgentAvailabilityContext = createContext<
  AgentAvailabilityContextType | undefined
>(undefined);

export const AgentAvailabilityProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { Get, data, loading, error } = useFetch<AgentAvailability>(
    "/ae-agent-service/api/v1.0/AgentMobile/Available"
  );

  const { agentId } = useAgentProfile();
  const { setIsAvailable } = useAgentAvailabilitySignalR();

  const refetch = async () => {
    if (!agentId) return;
    try {
      const result = await Get({ id: agentId }); // this updates `data` internally
      console.log("Agent availability result", result);
      if (result && "isAvailable" in result) {
        setIsAvailable((result as AgentAvailability).isAvailable);
      }
    } catch {
      console.log("Error fetching agent availability", error);
      // error is already handled in useFetch
    }
  };

  useEffect(() => {
    refetch();
  }, [agentId]);

  return (
    <AgentAvailabilityContext.Provider
      value={{
        data,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </AgentAvailabilityContext.Provider>
  );
};
