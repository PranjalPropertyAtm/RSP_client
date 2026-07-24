import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  sankalpPrerakSchema,
  type SankalpPrerakFormValues,
} from '@/features/sankalpPreraks/schemas/sankalpPrerak.schema';
import { useVillageFilterOptions } from '@/features/villages/hooks/useVillages';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormSection } from '@/components/forms/FormSection';
import { FormActions } from '@/components/forms/FormActions';
import { GENDER_LABELS, MARITAL_STATUS_LABELS } from '@/constants/village-module';
import type { SankalpPrerak } from '@/types';

interface SankalpPrerakFormProps {
  defaultValues?: Partial<SankalpPrerak>;
  presetVillageId?: string;
  isSubmitting?: boolean;
  submitLabel: string;
  cancelHref: string;
  onSubmit: (values: SankalpPrerakFormValues) => void;
}

export function SankalpPrerakForm({
  defaultValues,
  presetVillageId,
  isSubmitting,
  submitLabel,
  cancelHref,
  onSubmit,
}: SankalpPrerakFormProps) {
  const { data: villages } = useVillageFilterOptions();

  const form = useForm<SankalpPrerakFormValues>({
    resolver: zodResolver(sankalpPrerakSchema),
    defaultValues: {
      fullName: defaultValues?.fullName ?? '',
      fatherOrHusbandName: defaultValues?.fatherOrHusbandName ?? '',
      gender: defaultValues?.gender ?? undefined,
      dateOfBirth: defaultValues?.dateOfBirth?.slice(0, 10) ?? '',
      age: defaultValues?.age ?? undefined,
      mobileNumber: defaultValues?.mobileNumber ?? '',
      alternateMobile: defaultValues?.alternateMobile ?? '',
      email: defaultValues?.email ?? '',
      houseNumber: defaultValues?.houseNumber ?? '',
      address: defaultValues?.address ?? '',
      villageId: presetVillageId ?? defaultValues?.villageId ?? '',
      wardOrMohalla: defaultValues?.wardOrMohalla ?? '',
      pincode: defaultValues?.pincode ?? '',
      education: defaultValues?.education ?? '',
      occupation: defaultValues?.occupation ?? '',
      maritalStatus: defaultValues?.maritalStatus ?? undefined,
      joiningDate: defaultValues?.joiningDate?.slice(0, 10) ?? '',
      designation: defaultValues?.designation ?? 'Sankalp Prerak',
      emergencyContactName: defaultValues?.emergencyContactName ?? '',
      emergencyContactMobile: defaultValues?.emergencyContactMobile ?? '',
      relationship: defaultValues?.relationship ?? '',
      remarks: defaultValues?.remarks ?? '',
    },
  });

  const dob = form.watch('dateOfBirth');
  useEffect(() => {
    if (dob) {
      const birth = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      if (age >= 18 && age <= 100) form.setValue('age', age);
    }
  }, [dob, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Personal Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField control={form.control} name="fullName" render={({ field }) => (
              <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="fatherOrHusbandName" render={({ field }) => (
              <FormItem><FormLabel>Father / Husband Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="gender" render={({ field }) => (
              <FormItem><FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value ?? ''}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {Object.entries(GENDER_LABELS).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
              <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="age" render={({ field }) => (
              <FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="maritalStatus" render={({ field }) => (
              <FormItem><FormLabel>Marital Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value ?? ''}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {Object.entries(MARITAL_STATUS_LABELS).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select><FormMessage /></FormItem>
            )} />
          </div>
        </FormSection>

        <FormSection title="Contact Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField control={form.control} name="mobileNumber" render={({ field }) => (
              <FormItem><FormLabel>Mobile Number *</FormLabel><FormControl><Input maxLength={10} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="alternateMobile" render={({ field }) => (
              <FormItem><FormLabel>Alternate Mobile</FormLabel><FormControl><Input maxLength={10} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </FormSection>

        <FormSection title="Address & Assignment">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField control={form.control} name="villageId" render={({ field }) => (
              <FormItem><FormLabel>Assigned Village *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={Boolean(presetVillageId)}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select village" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {villages?.map((v) => (
                      <SelectItem key={v.id} value={v.id}>{v.villageName} — {v.district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="houseNumber" render={({ field }) => (
              <FormItem><FormLabel>House Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem className="sm:col-span-2"><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="wardOrMohalla" render={({ field }) => (
              <FormItem><FormLabel>Ward / Mohalla</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="pincode" render={({ field }) => (
              <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input maxLength={6} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </FormSection>

        <FormSection title="Education & Occupation">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField control={form.control} name="education" render={({ field }) => (
              <FormItem><FormLabel>Education</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="occupation" render={({ field }) => (
              <FormItem><FormLabel>Occupation</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="joiningDate" render={({ field }) => (
              <FormItem><FormLabel>Joining Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="designation" render={({ field }) => (
              <FormItem><FormLabel>Designation</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </FormSection>

        <FormSection title="Emergency Contact">
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField control={form.control} name="emergencyContactName" render={({ field }) => (
              <FormItem><FormLabel>Contact Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="emergencyContactMobile" render={({ field }) => (
              <FormItem><FormLabel>Contact Mobile</FormLabel><FormControl><Input maxLength={10} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="relationship" render={({ field }) => (
              <FormItem><FormLabel>Relationship</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="remarks" render={({ field }) => (
              <FormItem className="sm:col-span-3"><FormLabel>Remarks</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </FormSection>

        <FormActions isSubmitting={isSubmitting} submitLabel={submitLabel} cancelHref={cancelHref} />
      </form>
    </Form>
  );
}
