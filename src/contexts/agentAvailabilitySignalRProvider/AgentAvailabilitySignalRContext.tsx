import React, { createContext, useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAgentProfile } from "@/hooks";
import { useSignalRConnection } from "@/hooks";
import { useFetch } from "@/hooks";

interface AgentAvailabilityContextType {
  isAvailable: boolean;
  updateAvailability: (available: boolean) => Promise<void>;
  setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AgentAvailabilitySignalRContext = createContext<
  AgentAvailabilityContextType | undefined
>(undefined);

export const AgentAvailabilitySignalRProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  const { agentId } = useAgentProfile();
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const { Post: postAvailability } = useFetch(
    "/ae-agent-service/api/v1.0/AgentMobile/Availability"
  );

  const updateAvailability = useCallback(
    async (available: boolean) => {
      setIsAvailable(available);
      try {
        await postAvailability({
          body: {
            agentID: agentId,
            availability: available,
          },
        });
      } catch (err) {
        console.error("Availability update failed", err);
      }
    },
    [agentId, postAvailability]
  );

  useEffect(() => {
    if (isAuthenticated && agentId) {
      const connection = useSignalRConnection(agentId);
      connection.on("AgentAvailabilty", (message: boolean) => {
        setIsAvailable(message);
      });
    }
  }, [isAuthenticated, agentId]);

  return (
    <AgentAvailabilitySignalRContext.Provider
      value={{ isAvailable, updateAvailability, setIsAvailable }}
    >
      {children}
    </AgentAvailabilitySignalRContext.Provider>
  );
};
