import { useContext } from "react";
import { AgentDetailsContext } from "./AgentDetailsContext";
import { AgentDetailsContextType } from "./AgentDetailsTypes";

const useAgentDetails = (): AgentDetailsContextType => {
  const context = useContext(AgentDetailsContext);
  if (!context) {
    throw new Error(
      "useAgentDetails must be used within an AgentDetailsProvider"
    );
  }
  return context;
};

export default useAgentDetails;
