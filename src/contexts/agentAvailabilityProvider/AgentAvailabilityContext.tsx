import React, { createContext, useContext, useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { AgentAvailability, AgentAvailabilityContextType } from "./AgentAvailabilityTypes";
import { useAgentProfile } from "@/contexts";

export const AgentAvailabilityContext = createContext<AgentAvailabilityContextType | undefined>(undefined);

export const useAgentAvailability = () => {
  const context = useContext(AgentAvailabilityContext);
  if (!context) {
    throw new Error("useAgentAvailability must be used within an AgentAvailabilityProvider");
  }
  return context;
};

export const AgentAvailabilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AgentAvailability | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: profile } = useAgentProfile();

  const { Get } = useFetch<AgentAvailability>("/ae-agent-service/api/v1.0/AgentMobile/Available");
  const { Post } = useFetch<AgentAvailability>("/ae-agent-service/api/v1.0/AgentMobile/Availability");

  const fetchAvailability = async () => {
    if (!profile?.agentID) return;
    
    try {
      setLoading(true);
      const response = await Get({ id: profile.agentID });
      if (response) {
        setData(response as AgentAvailability);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch availability");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (isAvailable: boolean) => {
    if (!profile?.agentID) return;

    try {
      setLoading(true);
      const response = await Post({ 
        body: { 
          isAvailable,
          agentID: profile.agentID,
          agentAvailabilitySessionId: data?.agentAvailabilitySessionId
        }
      });
      if (response) {
        // After successful update, fetch the latest availability
        await fetchAvailability();
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update availability");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile?.agentID) {
      fetchAvailability();
    }
  }, [profile?.agentID]);

  const value = {
    data,
    loading,
    error,
    refetch: fetchAvailability,
    toggleAvailability,
  };

  return (
    <AgentAvailabilityContext.Provider value={value}>
      {children}
    </AgentAvailabilityContext.Provider>
  );
};
