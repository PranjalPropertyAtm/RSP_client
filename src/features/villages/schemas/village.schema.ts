import { z } from 'zod';

export const villageSchema = z.object({
  villageName: z.string().min(1, 'Village name is required'),
  gramPanchayat: z.string().optional(),
  wardOrMohalla: z.string().optional(),
  block: z.string().min(1, 'Block is required'),
  tehsil: z.string().min(1, 'Tehsil is required'),
  district: z.string().min(1, 'District is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be exactly 6 digits'),
  totalPopulation: z.string().optional(),
  totalFamilies: z.string().optional(),
});

export type VillageFormInput = z.input<typeof villageSchema>;
export type VillageFormValues = z.output<typeof villageSchema>;
