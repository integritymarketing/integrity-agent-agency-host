export interface AgentStateLicense {
  stateCode: string;
  licenseNumber: string;
}

export interface AgentNPN {
  npn: string;
  businessUnitCode: string | null;
  businessUnitName: string | null;
  isAgency: number;
}

export interface AgentStatus {
  agentStatusId: number;
  statusName: string | null;
  inactive: number;
}

export interface AgentDetails {
  agentID: number;
  userId: string;
  agentFirstName: string;
  agentLastName: string;
  agentMiddleName: string | null;
  email: string;
  role: string | null;
  agentBio: string;
  phone: string;
  inactive: number;
  isTrainingComplete: boolean;
  agentNPNs: AgentNPN[];
  agentStateLicenses: AgentStateLicense[];
  agentAttestations: any[];
  agentStatus: AgentStatus;
  agentStatusId: number;
  agentPassword: string | null;
  clientId: string;
  virtualPhoneNumber: string;
  callForwardNumber: string;
  caLicense: string;
  profileImageUrl: string;
  aboutMeApprovalStatus: string;
  aboutMeApprovalNote: string;
  profileImageApprovalStatus: string;
  profileImageApprovalNote: string | null;
  productClassificationNames: string[];
}

export interface AgentDetailsContextType {
  data: AgentDetails | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isLifeNonRTS: boolean | null;
}
