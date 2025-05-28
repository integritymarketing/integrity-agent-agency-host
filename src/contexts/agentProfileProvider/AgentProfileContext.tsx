import React, { createContext, useEffect } from "react";
import { useFetch } from "@/hooks";
import { AgentProfile, AgentProfileContextType } from "./AgentProfileTypes";
import { useAgentProfile } from "@/hooks";

export const AgentProfileContext = createContext<AgentProfileContextType | undefined>(undefined);

export const AgentProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { Get, data, loading, error } = useFetch<AgentProfile>("/ae-agent-service/api/v1.0/Agents");
  const { agentId } = useAgentProfile();

  const refetch = async () => {
    if (!agentId) return;
    try {
      const result = await Get({ id: agentId });
      console.log("Agent profile result", result);
    } catch {
      console.log("Error fetching agent profile", error);
      // error is already handled in useFetch
    }
  };

  useEffect(() => {
    refetch();
  }, [agentId]);

  return (
    <AgentProfileContext.Provider
      value={{
        data,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </AgentProfileContext.Provider>
  );
}; 