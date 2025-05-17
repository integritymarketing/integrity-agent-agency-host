import React, { createContext, useEffect, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import {
  LeadStatus,
  LeadStatusOption,
  SubStatusOption,
  LeadStatusContextType,
} from "./LeadStatusContextTypes";

export const LeadStatusContext = createContext<LeadStatusContextType>({
  allStatuses: [],
  statusOptions: [],
  lostSubStatusesOptions: [],
});

export const LeadStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allStatuses, setAllStatuses] = useState<LeadStatus[]>([]);
  const { Get } = useFetch<LeadStatus[]>(
    "/ae-leads-api/api/v3.0/Leads/statuses"
  );

  const statusOptions = useMemo<LeadStatusOption[]>(
    () =>
      allStatuses.map(({ statusName, hexValue, leadStatusId }) => ({
        value: statusName,
        label: statusName,
        color: hexValue,
        statusId: leadStatusId,
      })),
    [allStatuses]
  );

  const lostSubStatusesOptions = useMemo<SubStatusOption[]>(() => {
    const lostStatus = allStatuses.find(
      (status) => status.statusName === "Lost"
    );
    return (
      lostStatus?.leadSubStatus?.map(({ leadStatusId, statusName }) => ({
        value: leadStatusId,
        label: statusName,
      })) || []
    );
  }, [allStatuses]);

  const fetchStatuses = async () => {
    try {
      const result = await Get();
      if (Array.isArray(result)) {
        setAllStatuses(result);
      }
    } catch (err) {
      console.error("Failed to fetch lead statuses", err);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return (
    <LeadStatusContext.Provider
      value={{ allStatuses, statusOptions, lostSubStatusesOptions }}
    >
      {children}
    </LeadStatusContext.Provider>
  );
};
