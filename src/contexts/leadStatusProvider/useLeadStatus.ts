import { useContext } from "react";
import { LeadStatusContext } from "./LeadStatusContext";
import { LeadStatusContextType } from "./LeadStatusContextTypes";

const useLeadStatus = (): LeadStatusContextType => {
  const context = useContext(LeadStatusContext);

  if (!context) {
    throw new Error("useLeadStatus must be used within a LeadStatusProvider");
  }

  return context;
};

export default useLeadStatus;
