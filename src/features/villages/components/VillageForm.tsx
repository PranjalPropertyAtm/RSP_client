import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { villageSchema, type VillageFormInput, type VillageFormValues } from '@/features/villages/schemas/village.schema';
import { usePincodeLookup } from '@/features/locations/hooks/usePincodeLookup';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSection } from '@/components/forms/FormSection';
import { FormActions } from '@/components/forms/FormActions';
import type { Village } from '@/types';

interface VillageFormProps {
  defaultValues?: Partial<Village>;
  isSubmitting?: boolean;
  submitLabel: string;
  cancelHref: string;
  onSubmit: (values: VillageFormValues) => void;
}

export function VillageForm({
  defaultValues,
  isSubmitting,
  submitLabel,
  cancelHref,
  onSubmit,
}: VillageFormProps) {
  const form = useForm<VillageFormInput, unknown, VillageFormValues>({
    resolver: zodResolver(villageSchema),
    defaultValues: {
      villageName: defaultValues?.villageName ?? '',
      gramPanchayat: defaultValues?.gramPanchayat ?? '',
      wardOrMohalla: defaultValues?.wardOrMohalla ?? '',
      block: defaultValues?.block ?? '',
      tehsil: defaultValues?.tehsil ?? '',
      district: defaultValues?.district ?? '',
      state: defaultValues?.state ?? '',
      pincode: defaultValues?.pincode ?? '',
      totalPopulation:
        defaultValues?.totalPopulation != null ? String(defaultValues.totalPopulation) : '',
      totalFamilies:
        defaultValues?.totalFamilies != null ? String(defaultValues.totalFamilies) : '',
    },
  });

  const pincode = form.watch('pincode');
  const { data: pincodeData, isFetching: isPincodeLoading, isError: isPincodeError } =
    usePincodeLookup(pincode);
  const isCreate = !defaultValues;
  const hasPincodeLookup = Boolean(pincodeData && pincode.length === 6);

  useEffect(() => {
    if (!pincodeData) return;
    if (!isCreate && pincode === defaultValues?.pincode) return;

    form.setValue('state', pincodeData.state, { shouldValidate: true });
    form.setValue('district', pincodeData.district, { shouldValidate: true });
    form.setValue('block', pincodeData.block === 'NA' ? '' : pincodeData.block, { shouldValidate: true });
    form.setValue('tehsil', pincodeData.tehsil, { shouldValidate: true });
  }, [pincodeData, pincode, isCreate, defaultValues?.pincode, form]);

  const clearLocationFields = () => {
    form.setValue('state', '');
    form.setValue('district', '');
    form.setValue('block', '');
    form.setValue('tehsil', '');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Village Information" description="Basic village master details">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="6-digit pincode"
                      maxLength={6}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        field.onChange(value);
                        if (value.length < 6) clearLocationFields();
                      }}
                    />
                  </FormControl>
                  {isPincodeLoading && (
                    <p className="text-sm text-muted-foreground">Looking up pincode...</p>
                  )}
                  {isPincodeError && pincode.length === 6 && (
                    <p className="text-sm text-destructive">No data found for this pincode</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Auto-populated from pincode"
                      readOnly={hasPincodeLookup}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Auto-populated from pincode"
                      readOnly={hasPincodeLookup}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="block"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Block *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Auto-populated from pincode"
                      readOnly={hasPincodeLookup && Boolean(field.value)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tehsil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tehsil *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Auto-populated from pincode"
                      readOnly={hasPincodeLookup}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="villageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Village Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter village name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gramPanchayat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gram Panchayat</FormLabel>
                  <FormControl>
                    <Input placeholder="Gram panchayat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wardOrMohalla"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ward / Mohalla</FormLabel>
                  <FormControl>
                    <Input placeholder="Ward or mohalla" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalPopulation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Population</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Population" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalFamilies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Families</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Families" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>
        <FormActions isSubmitting={isSubmitting} submitLabel={submitLabel} cancelHref={cancelHref} />
      </form>
    </Form>
  );
}
