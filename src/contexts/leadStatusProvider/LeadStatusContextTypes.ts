export interface LeadSubStatus {
  leadStatusId: number;
  statusName: string;
}

export interface LeadStatus {
  leadStatusId: number;
  statusName: string;
  hexValue: string;
  leadSubStatus?: LeadSubStatus[];
}

export interface LeadStatusOption {
  value: string;
  label: string;
  color: string;
  statusId: number;
}

export interface SubStatusOption {
  value: number;
  label: string;
}

export interface LeadStatusContextType {
  allStatuses: LeadStatus[];
  statusOptions: LeadStatusOption[];
  lostSubStatusesOptions: SubStatusOption[];
}
