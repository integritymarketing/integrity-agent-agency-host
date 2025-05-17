// context/AgentDetailsContext.tsx

import React, { createContext, useEffect } from "react";
import { useFetch } from "@/hooks";
import { AgentDetails, AgentDetailsContextType } from "./AgentDetailsTypes";

export const AgentDetailsContext = createContext<
  AgentDetailsContextType | undefined
>(undefined);

export const AgentDetailsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    Get: GetDetails,
    data,
    loading,
    error,
  } = useFetch<AgentDetails>("/ae-agent-service/api/v1.0/Agents");
  const { Get: GetIsLifeNonRTS, data: isLifeNonRTS } = useFetch<boolean>(
    "/ae-agent-service/api/v1.0/AgentsSelfService/isLifeNonRTS"
  );

  const refetch = async () => {
    try {
      const details = await GetDetails({ id: 435 });
      if (
        details &&
        "agentNPNs" in details &&
        Array.isArray(details.agentNPNs) &&
        details.agentNPNs[0]?.npn
      ) {
        const npn = details.agentNPNs[0].npn;
        await GetIsLifeNonRTS({ id: npn });
      }
    } catch {
      // error already managed
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <AgentDetailsContext.Provider
      value={{
        data,
        loading,
        error,
        refetch,
        isLifeNonRTS,
      }}
    >
      {children}
    </AgentDetailsContext.Provider>
  );
};
