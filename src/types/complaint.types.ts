import type {
  AffectedPeople,
  ContactedAuthority,
  Gender,
  ProblemCategory,
} from './api.types';

export interface ComplaintCreator {
  id: string;
  fullName: string;
  email: string;
}

export interface Complaint {
  id: string;
  caseId: string;
  fullName: string;
  fatherName?: string | null;
  age?: number | null;
  gender: Gender;
  mobile: string;
  email?: string | null;
  education?: string | null;
  occupation?: string | null;
  familyMembers: number;
  pincode: string;
  state: string;
  district: string;
  postOffice: string;
  village?: string | null;
  tehsil?: string | null;
  problemCategory: ProblemCategory;
  problemDescription: string;
  affectedPeople: AffectedPeople;
  contactedAuthority: ContactedAuthority;
  authorityDetails?: string | null;
  suggestedSolution?: string | null;
  declarationAccepted: boolean;
  submittedDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  creator?: ComplaintCreator;
}

export interface CreateComplaintPayload {
  fullName: string;
  fatherName?: string | null;
  age?: number | null;
  gender: Gender;
  mobile: string;
  email?: string;
  education?: string;
  occupation?: string;
  familyMembers: number;
  pincode: string;
  state: string;
  district: string;
  postOffice: string;
  villageId?: string;
  village?: string;
  tehsil?: string;
  problemCategory: ProblemCategory;
  problemDescription: string;
  affectedPeople: AffectedPeople;
  contactedAuthority: ContactedAuthority;
  authorityDetails?: string;
  suggestedSolution?: string;
  declarationAccepted: true;
}

export interface UpdateComplaintPayload extends Partial<Omit<CreateComplaintPayload, 'declarationAccepted'>> {
  declarationAccepted?: true;
}

export interface ComplaintListParams {
  page?: number;
  limit?: number;
  search?: string;
  problemCategory?: ProblemCategory;
  pincode?: string;
  district?: string;
}
