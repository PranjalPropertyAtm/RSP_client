import type { Gender, RecordStatus } from './api.types';

export type MaritalStatus = 'SINGLE' | 'MARRIED' | 'WIDOWED' | 'DIVORCED' | 'OTHER';

export interface SankalpPrerak {
  id: string;
  employeeCode: string;
  fullName: string;
  fatherOrHusbandName?: string | null;
  gender?: Gender | null;
  dateOfBirth?: string | null;
  age?: number | null;
  mobileNumber: string;
  alternateMobile?: string | null;
  email?: string | null;
  houseNumber?: string | null;
  address?: string | null;
  villageId: string;
  wardOrMohalla?: string | null;
  pincode?: string | null;
  education?: string | null;
  occupation?: string | null;
  maritalStatus?: MaritalStatus | null;
  joiningDate?: string | null;
  designation: string;
  status: RecordStatus;
  profilePhoto?: string | null;
  aadhaarNumber?: string | null;
  aadhaarFront?: string | null;
  aadhaarBack?: string | null;
  emergencyContactName?: string | null;
  emergencyContactMobile?: string | null;
  relationship?: string | null;
  remarks?: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  village?: {
    id: string;
    villageCode: string;
    villageName: string;
    district: string;
    block: string;
  };
  creator?: { id: string; fullName: string; email: string };
}

export interface SankalpPrerakProfile extends SankalpPrerak {
  stats: {
    workHistory: WorkLog[];
    surveyCount: number;
    complaintCount: number;
  };
}

export type WorkCategory =
  | 'FAMILY_SURVEY'
  | 'COMPLAINT_COLLECTION'
  | 'HEALTH_CAMP'
  | 'EDUCATION_CAMPAIGN'
  | 'VILLAGE_MEETING'
  | 'WOMEN_MEETING'
  | 'YOUTH_MEETING'
  | 'GOVERNMENT_SCHEME_AWARENESS'
  | 'TREE_PLANTATION'
  | 'CLEANLINESS_DRIVE'
  | 'BLOOD_DONATION'
  | 'OTHER';

export type WorkStatus = 'COMPLETED' | 'ONGOING' | 'PLANNED';

export interface WorkLog {
  id: string;
  sankalpPrerakId: string;
  villageId: string;
  workDate: string;
  workCategory: WorkCategory;
  workTitle: string;
  description?: string | null;
  familiesCovered?: number | null;
  peopleBenefited?: number | null;
  status: WorkStatus;
  photos: string[];
  documents: string[];
  latitude?: number | null;
  longitude?: number | null;
  createdBy: string;
  createdAt: string;
  sankalpPrerak?: {
    id: string;
    employeeCode: string;
    fullName: string;
    mobileNumber: string;
  };
  village?: {
    id: string;
    villageCode: string;
    villageName: string;
    district: string;
    block: string;
  };
  creator?: { id: string; fullName: string; email: string };
}

export interface SankalpPrerakListParams {
  page?: number;
  limit?: number;
  search?: string;
  villageId?: string;
  status?: RecordStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateSankalpPrerakPayload {
  fullName: string;
  mobileNumber: string;
  villageId: string;
  fatherOrHusbandName?: string;
  gender?: Gender;
  dateOfBirth?: string;
  age?: number;
  alternateMobile?: string;
  email?: string;
  houseNumber?: string;
  address?: string;
  wardOrMohalla?: string;
  pincode?: string;
  education?: string;
  occupation?: string;
  maritalStatus?: MaritalStatus;
  joiningDate?: string;
  designation?: string;
  profilePhoto?: string;
  aadhaarNumber?: string;
  aadhaarFront?: string;
  aadhaarBack?: string;
  emergencyContactName?: string;
  emergencyContactMobile?: string;
  relationship?: string;
  remarks?: string;
}

export type UpdateSankalpPrerakPayload = Partial<Omit<CreateSankalpPrerakPayload, 'villageId'>>;

export interface TransferSankalpPrerakPayload {
  villageId: string;
  remarks?: string;
}

export interface WorkLogListParams {
  page?: number;
  limit?: number;
  sankalpPrerakId?: string;
  villageId?: string;
  workCategory?: WorkCategory;
  status?: WorkStatus;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateWorkLogPayload {
  sankalpPrerakId: string;
  villageId: string;
  workDate: string;
  workCategory: WorkCategory;
  workTitle: string;
  description?: string;
  familiesCovered?: number;
  peopleBenefited?: number;
  status?: WorkStatus;
  photos?: string[];
  documents?: string[];
  latitude?: number;
  longitude?: number;
}

export type UpdateWorkLogPayload = Partial<CreateWorkLogPayload>;
