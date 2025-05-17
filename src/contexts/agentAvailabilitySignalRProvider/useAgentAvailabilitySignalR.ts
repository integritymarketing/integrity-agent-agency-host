import { useContext } from "react";
import { AgentAvailabilitySignalRContext } from "./AgentAvailabilitySignalRContext";

const useAgentAvailabilitySignalR = () => {
  const context = useContext(AgentAvailabilitySignalRContext);

  if (!context) {
    throw new Error(
      "useAgentAvailabilitySignalR must be used within an AgentAvailabilitySignalRProvider"
    );
  }

  return context;
};
export default useAgentAvailabilitySignalR;
