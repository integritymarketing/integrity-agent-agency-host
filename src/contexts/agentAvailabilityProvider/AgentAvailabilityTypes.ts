export interface ProductSpecialty {
  agentProfessionalInfoId: number;
  productSpecialityId: number;
  isActive: boolean;
  createDate: string;
  modifyDate: string | null;
  productSpeciality: string;
  productClassification: {
    ProductClassificationId: number;
    classificationName: string;
    createDate: string;
  };
}

export interface AgentAvailability {
  assignedBUs: Array<{
    buCode: string;
    buName: string;
  }>;
  agentID: number;
  agentFirstName: string;
  agentLastName: string;
  agentMiddleName: string | null;
  email: string;
  phone: string;
  callForwardNumber: string;
  agentVirtualPhoneNumber: string;
  isAvailable: boolean;
  agentPurl: string;
  presentationName: string;
  agentNPN: string;
  isTrainingComplete: boolean;
  hasActiveCampaign: boolean;
  activeCampaign: {
    hasActiveLifeCallCampaign: boolean;
    hasActiveHealthCallCampaign: boolean;
  };
  leadPreference: {
    data: boolean;
    call: boolean;
    leadCenter: boolean;
    medicareEnroll: boolean;
    medicareEnrollPurl: boolean;
    isAgentMobilePopUpDismissed: boolean;
    isAgentMobileBannerDismissed: boolean;
    isCheckInUpdateModalDismissed: boolean;
    leadCenterLife: boolean;
    planEnrollPurl: boolean;
    shouldHideSpecialistPrompt: boolean;
    hideHealthQuote: boolean;
    hideLifeQuote: boolean;
    taskListDateRange: string;
    taskListTileSelection: string;
    policySnapshotDateRange: string;
    policySnapshotTileSelection: string;
  };
  agentStateLicenses: Array<{
    stateCode: string;
    licenseNumber: string;
  }>;
  caLicense: string;
  profileImageUrl: string | null;
  agentBio: string;
  latitude: number;
  longitude: number;
  officeStreetAddress: string | null;
  officeCity: string | null;
  officeState: string | null;
  officeZip: string | null;
  languages: string[];
  sourceId: string;
  enableContracts: boolean;
  enableMyAgents: boolean;
  productClassificationNames: string[];
  agentProductSpecialties: ProductSpecialty[];
  agentAvailabilitySessionId: number;
}

export interface AgentAvailabilityContextType {
  data: AgentAvailability | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  toggleAvailability: (isAvailable: boolean) => Promise<void>;
}
