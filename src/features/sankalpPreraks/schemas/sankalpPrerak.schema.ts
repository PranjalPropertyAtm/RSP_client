import { z } from 'zod';

const mobileSchema = z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number');

export const sankalpPrerakSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  fatherOrHusbandName: z.string().optional().or(z.literal('')),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  dateOfBirth: z.string().optional().or(z.literal('')),
  age: z.string().optional(),
  mobileNumber: mobileSchema,
  alternateMobile: mobileSchema.optional().or(z.literal('')),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  houseNumber: z.string().optional(),
  address: z.string().optional(),
  villageId: z.string().min(1, 'Village is required'),
  wardOrMohalla: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits').optional().or(z.literal('')),
  education: z.string().optional(),
  occupation: z.string().optional(),
  maritalStatus: z.enum(['SINGLE', 'MARRIED', 'WIDOWED', 'DIVORCED', 'OTHER']).optional(),
  joiningDate: z.string().optional().or(z.literal('')),
  designation: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactMobile: mobileSchema.optional().or(z.literal('')),
  relationship: z.string().optional(),
  remarks: z.string().optional(),
});

export type SankalpPrerakFormInput = z.input<typeof sankalpPrerakSchema>;
export type SankalpPrerakFormValues = z.output<typeof sankalpPrerakSchema>;

export const workLogSchema = z.object({
  sankalpPrerakId: z.string().min(1, 'Sankalp Prerak is required'),
  villageId: z.string().min(1, 'Village is required'),
  workDate: z.string().min(1, 'Work date is required'),
  workCategory: z.enum([
    'FAMILY_SURVEY',
    'COMPLAINT_COLLECTION',
    'HEALTH_CAMP',
    'EDUCATION_CAMPAIGN',
    'VILLAGE_MEETING',
    'WOMEN_MEETING',
    'YOUTH_MEETING',
    'GOVERNMENT_SCHEME_AWARENESS',
    'TREE_PLANTATION',
    'CLEANLINESS_DRIVE',
    'BLOOD_DONATION',
    'OTHER',
  ]),
  workTitle: z.string().min(1, 'Work title is required'),
  description: z.string().optional(),
  familiesCovered: z.string().optional(),
  peopleBenefited: z.string().optional(),
  status: z.enum(['COMPLETED', 'ONGOING', 'PLANNED']),
  photos: z.array(z.string()).optional(),
  documents: z.array(z.string()).optional(),
});

export type WorkLogFormInput = z.input<typeof workLogSchema>;
export type WorkLogFormValues = z.output<typeof workLogSchema>;
