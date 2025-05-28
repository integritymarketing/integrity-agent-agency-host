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
  agentID: number;
  agentFirstName: string;
  agentLastName: string;
  email: string;
  isAvailable: boolean;
  leadPreference: any;
  activeCampaign: any;
  agentProductSpecialties: ProductSpecialty[];
  agentAvailabilitySessionId?: number;
  [key: string]: any;
}

export interface AgentAvailabilityContextType {
  data: AgentAvailability | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  toggleAvailability: (isAvailable: boolean) => Promise<void>;
}
