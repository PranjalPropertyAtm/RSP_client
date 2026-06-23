import { z } from 'zod';

const genderEnum = z.enum(['MALE', 'FEMALE', 'OTHER']);

const categoryEnum = z.enum([
  'WATER_IRRIGATION',
  'ELECTRICITY',
  'ROAD_TRANSPORT',
  'EDUCATION',
  'HEALTH',
  'EMPLOYMENT',
  'CORRUPTION_ADMINISTRATIVE',
  'OTHER',
]);

const affectedEnum = z.enum(['ONLY_ME', 'MY_VILLAGE_MOHALLA', 'ENTIRE_AREA_BLOCK']);
const contactedEnum = z.enum(['YES', 'NO']);

export const createComplaintSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(3, 'Full name must be at least 3 characters'),
    fatherName: z.string().min(2, 'Father/Husband name is required'),
    age: z
      .number({ error: 'Age is required' })
      .int()
      .min(1, 'Age must be at least 1')
      .max(120, 'Age must be at most 120'),
    gender: genderEnum,
    mobile: z
      .string()
      .min(1, 'Mobile number is required')
      .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
    email: z.string().email('Enter a valid email address').optional().or(z.literal('')),
    education: z.string().optional(),
    occupation: z.string().optional(),
    familyMembers: z.number().int().min(1, 'Must be at least 1').optional(),
    pincode: z
      .string()
      .min(1, 'Pincode is required')
      .regex(/^\d{6}$/, 'Pincode must be 6 digits'),
    state: z.string().min(1, 'State is required'),
    district: z.string().min(1, 'District is required'),
    postOffice: z.string().min(1, 'Post office is required'),
    village: z.string().optional(),
    tehsil: z.string().optional(),
    problemCategory: categoryEnum,
    problemDescription: z
      .string()
      .min(1, 'Problem description is required')
      .min(10, 'Description must be at least 10 characters'),
    affectedPeople: affectedEnum,
    contactedAuthority: contactedEnum,
    authorityDetails: z.string().optional(),
    suggestedSolution: z.string().optional(),
    declarationAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the declaration',
    }),
  })
  .refine(
    (data) => data.contactedAuthority !== 'YES' || Boolean(data.authorityDetails?.trim()),
    {
      message: 'Authority details are required when you have contacted an authority',
      path: ['authorityDetails'],
    }
  );

const baseComplaintFields = z.object({
  fullName: z.string().min(3),
  fatherName: z.string().min(1),
  age: z.number().int().min(1).max(120),
  gender: genderEnum,
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  education: z.string().optional(),
  occupation: z.string().optional(),
  familyMembers: z.number().int().min(1).optional(),
  pincode: z.string().regex(/^\d{6}$/),
  state: z.string().min(1),
  district: z.string().min(1),
  postOffice: z.string().min(1),
  village: z.string().optional(),
  tehsil: z.string().optional(),
  problemCategory: categoryEnum,
  problemDescription: z.string().min(10),
  affectedPeople: affectedEnum,
  contactedAuthority: contactedEnum,
  authorityDetails: z.string().optional(),
  suggestedSolution: z.string().optional(),
  declarationAccepted: z.literal(true).optional(),
});

export const updateComplaintSchema = baseComplaintFields.partial();

export type CreateComplaintFormValues = z.infer<typeof createComplaintSchema>;
export type UpdateComplaintFormValues = z.infer<typeof updateComplaintSchema>;

export const PROBLEM_CATEGORY_OPTIONS = [
  { value: 'WATER_IRRIGATION', label: 'Water' },
  { value: 'ELECTRICITY', label: 'Electricity' },
  { value: 'ROAD_TRANSPORT', label: 'Road' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'HEALTH', label: 'Health' },
  { value: 'EMPLOYMENT', label: 'Employment' },
  { value: 'CORRUPTION_ADMINISTRATIVE', label: 'Corruption' },
  { value: 'OTHER', label: 'Other' },
] as const;

export const AFFECTED_PEOPLE_OPTIONS = [
  { value: 'ONLY_ME', label: 'Only Me' },
  { value: 'MY_VILLAGE_MOHALLA', label: 'My Village/Mohalla' },
  { value: 'ENTIRE_AREA_BLOCK', label: 'Entire Area/Block' },
] as const;

export const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
] as const;

export const defaultComplaintFormValues = {
  fullName: '',
  fatherName: '',
  age: undefined as number | undefined,
  gender: 'MALE' as const,
  mobile: '',
  email: '',
  education: '',
  occupation: '',
  familyMembers: undefined as number | undefined,
  pincode: '',
  state: '',
  district: '',
  postOffice: '',
  village: '',
  tehsil: '',
  problemCategory: 'OTHER' as const,
  problemDescription: '',
  affectedPeople: 'ONLY_ME' as const,
  contactedAuthority: 'NO' as const,
  authorityDetails: '',
  suggestedSolution: '',
  declarationAccepted: false,
};
