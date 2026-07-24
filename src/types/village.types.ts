export type RecordStatus = 'ACTIVE' | 'INACTIVE';

export interface Village {
  id: string;
  villageCode: string;
  villageName: string;
  gramPanchayat?: string | null;
  wardOrMohalla?: string | null;
  block: string;
  tehsil: string;
  district: string;
  state: string;
  pincode: string;
  totalPopulation?: number | null;
  totalFamilies?: number | null;
  status: RecordStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  creator?: { id: string; fullName: string; email: string };
  sankalpPreraks?: Array<{
    id: string;
    employeeCode: string;
    fullName: string;
    mobileNumber: string;
    status: RecordStatus;
    joiningDate?: string;
    designation?: string;
  }>;
}

export interface VillageDetails extends Village {
  stats: {
    totalSurveys: number;
    totalComplaints: number;
    totalVolunteers: number;
    recentActivities: Array<{
      id: string;
      workDate: string;
      workCategory: string;
      workTitle: string;
      familiesCovered?: number | null;
      peopleBenefited?: number | null;
      status: string;
      sankalpPrerak: { id: string; fullName: string; employeeCode: string };
    }>;
  };
}

export interface VillageListParams {
  page?: number;
  limit?: number;
  search?: string;
  district?: string;
  block?: string;
  status?: RecordStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateVillagePayload {
  villageName: string;
  gramPanchayat?: string;
  wardOrMohalla?: string;
  block: string;
  tehsil: string;
  district: string;
  state: string;
  pincode: string;
  totalPopulation?: number;
  totalFamilies?: number;
}

export type UpdateVillagePayload = Partial<CreateVillagePayload>;

export interface VillageFilterOption {
  id: string;
  villageName: string;
  district: string;
  block: string;
  tehsil: string;
}
