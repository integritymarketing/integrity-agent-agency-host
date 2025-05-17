import { useContext } from "react";
import { AgentAvailabilityContext } from "./AgentAvailabilityContext";

const useAgentAvailability = () => {
  const context = useContext(AgentAvailabilityContext);
  if (!context) {
    throw new Error(
      "useAgentAvailability must be used within an AgentAvailabilityProvider"
    );
  }
  return context;
};

export default useAgentAvailability;
