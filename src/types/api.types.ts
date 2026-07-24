export type Role = 'ADMIN' | 'EMPLOYEE';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type RecordStatus = 'ACTIVE' | 'INACTIVE';

export type ProblemCategory =
  | 'WATER_IRRIGATION'
  | 'ELECTRICITY'
  | 'ROAD_TRANSPORT'
  | 'EDUCATION'
  | 'HEALTH'
  | 'EMPLOYMENT'
  | 'CORRUPTION_ADMINISTRATIVE'
  | 'OTHER';

export type AffectedPeople = 'ONLY_ME' | 'MY_VILLAGE_MOHALLA' | 'ENTIRE_AREA_BLOCK';

export type ContactedAuthority = 'YES' | 'NO';

export type ComplaintStatus = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Shape returned by backend `ApiResponse.paginated()` */
export interface ServerPaginatedApiResponse<T> {
  success: true;
  message: string;
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
