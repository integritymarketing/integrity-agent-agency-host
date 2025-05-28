export interface AgentProfile {
  agentID: number;
  userId: string;
  agentFirstName: string;
  agentLastName: string;
  agentMiddleName: string | null;
  email: string;
  role: string;
  agentBio: string;
  phone: string;
  inactive: number;
  isTrainingComplete: boolean;
  agentNPNs: Array<{
    npn: string;
    businessUnitCode: string | null;
    businessUnitName: string | null;
    isAgency: number;
  }>;
  agentStateLicenses: Array<{
    stateCode: string;
    licenseNumber: string;
  }>;
  agentAttestations: any[];
  agentStatus: {
    agentStatusId: number;
    statusName: string | null;
    inactive: number;
  };
  agentStatusId: number;
  agentPassword: string | null;
  clientId: string | null;
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

export interface AgentProfileContextType {
  data: AgentProfile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} 