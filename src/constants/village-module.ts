import type { WorkCategory, WorkStatus, MaritalStatus } from '@/types';

export const RECORD_STATUS_LABELS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
} as const;

export const MARITAL_STATUS_LABELS: Record<MaritalStatus, string> = {
  SINGLE: 'Single',
  MARRIED: 'Married',
  WIDOWED: 'Widowed',
  DIVORCED: 'Divorced',
  OTHER: 'Other',
};

export const WORK_CATEGORY_LABELS: Record<WorkCategory, string> = {
  FAMILY_SURVEY: 'Family Survey',
  COMPLAINT_COLLECTION: 'Complaint Collection',
  HEALTH_CAMP: 'Health Camp',
  EDUCATION_CAMPAIGN: 'Education Campaign',
  VILLAGE_MEETING: 'Village Meeting',
  WOMEN_MEETING: 'Women Meeting',
  YOUTH_MEETING: 'Youth Meeting',
  GOVERNMENT_SCHEME_AWARENESS: 'Government Scheme Awareness',
  TREE_PLANTATION: 'Tree Plantation',
  CLEANLINESS_DRIVE: 'Cleanliness Drive',
  BLOOD_DONATION: 'Blood Donation',
  OTHER: 'Other',
};

export const WORK_STATUS_LABELS: Record<WorkStatus, string> = {
  COMPLETED: 'Completed',
  ONGOING: 'Ongoing',
  PLANNED: 'Planned',
};

export const GENDER_LABELS = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
} as const;
