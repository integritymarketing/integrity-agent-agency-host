import React, { createContext, useState, useEffect } from "react";
import { useFetch, useAgentProfile } from "@/hooks";
import {
  AgentAvailability,
  AgentAvailabilityContextType,
} from "./AgentAvailabilityTypes";
import { useAgentAvailabilitySignalR } from "@/contexts";
import { useAuth0 } from "@auth0/auth0-react";

export const AgentAvailabilityContext = createContext<
  AgentAvailabilityContextType | undefined
>(undefined);

export const AgentAvailabilityProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [data, setData] = useState<AgentAvailability | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { agentId } = useAgentProfile();
  const { setIsAvailable } = useAgentAvailabilitySignalR();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();

  const { Get } = useFetch<AgentAvailability>("/ae-agent-service/api/v1.0/AgentMobile/Available");
  const { Post } = useFetch<AgentAvailability>("/ae-agent-service/api/v1.0/AgentMobile/Availability");

  const fetchAvailability = async () => {
    if (!agentId) return;
    
    try {
      setLoading(true);
      const response = await Get({ id: agentId });
      if (response) {
        setData(response as AgentAvailability);
        if ("isAvailable" in response) {
          setIsAvailable((response as AgentAvailability).isAvailable);
        }
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching agent availability:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch availability");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (isAvailable: boolean) => {
    if (!agentId) return;

    try {
      setLoading(true);
      // First make the POST call to update availability
      await Post({ 
        body: { 
          isAvailable,
          agentID: agentId,
          agentAvailabilitySessionId: data?.agentAvailabilitySessionId
        }
      });

      // Then fetch the latest availability
      await fetchAvailability();
      setError(null);
    } catch (err) {
      console.error("Error toggling agent availability:", err);
      setError(err instanceof Error ? err.message : "Failed to update availability");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch when provider mounts and agentId is available
  useEffect(() => {
    if (agentId) {
      fetchAvailability();
    }
  }, [agentId]);

  // Make initial API call when provider mounts and auth is ready
  useEffect(() => {
    if (!isAuthLoading && isAuthenticated && agentId) {
      fetchAvailability();
    }
  }, [isAuthLoading, isAuthenticated, agentId]);

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

