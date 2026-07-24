import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { workLogSchema, type WorkLogFormValues } from '@/features/sankalpPreraks/schemas/sankalpPrerak.schema';
import { useSankalpPreraks } from '@/features/sankalpPreraks/hooks/useSankalpPreraks';
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
import { WORK_CATEGORY_LABELS, WORK_STATUS_LABELS } from '@/constants/village-module';

interface WorkLogFormProps {
  presetPrerakId?: string;
  presetVillageId?: string;
  isSubmitting?: boolean;
  cancelHref: string;
  onSubmit: (values: WorkLogFormValues) => void;
}

export function WorkLogForm({
  presetPrerakId,
  presetVillageId,
  isSubmitting,
  cancelHref,
  onSubmit,
}: WorkLogFormProps) {
  const { data: preraksData } = useSankalpPreraks({ limit: 100, status: 'ACTIVE' });

  const form = useForm<WorkLogFormValues>({
    resolver: zodResolver(workLogSchema),
    defaultValues: {
      sankalpPrerakId: presetPrerakId ?? '',
      villageId: presetVillageId ?? '',
      workDate: new Date().toISOString().slice(0, 10),
      workCategory: 'FAMILY_SURVEY',
      workTitle: '',
      description: '',
      familiesCovered: '',
      peopleBenefited: '',
      status: 'COMPLETED',
      photos: [],
      documents: [],
    },
  });

  const selectedPrerakId = form.watch('sankalpPrerakId');

  useEffect(() => {
    if (!selectedPrerakId || presetVillageId) return;
    const prerak = preraksData?.data.find((p) => p.id === selectedPrerakId);
    if (prerak?.villageId) {
      form.setValue('villageId', prerak.villageId);
    }
  }, [selectedPrerakId, preraksData, form, presetVillageId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Work Entry" description="Record field activity for a Sankalp Prerak">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField control={form.control} name="sankalpPrerakId" render={({ field }) => (
              <FormItem>
                <FormLabel>Sankalp Prerak *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={Boolean(presetPrerakId)}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select prerak" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {preraksData?.data.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.fullName} — {p.village?.villageName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="workDate" render={({ field }) => (
              <FormItem><FormLabel>Work Date *</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="workCategory" render={({ field }) => (
              <FormItem>
                <FormLabel>Work Category *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent>
                    {Object.entries(WORK_CATEGORY_LABELS).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem>
                <FormLabel>Status *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent>
                    {Object.entries(WORK_STATUS_LABELS).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="workTitle" render={({ field }) => (
              <FormItem className="sm:col-span-2"><FormLabel>Work Title *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem className="sm:col-span-2"><FormLabel>Description</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="familiesCovered" render={({ field }) => (
              <FormItem><FormLabel>Families Covered</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="peopleBenefited" render={({ field }) => (
              <FormItem><FormLabel>People Benefited</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <input type="hidden" {...form.register('villageId')} />
          </div>
        </FormSection>
        <FormActions isSubmitting={isSubmitting} submitLabel="Save Work Entry" cancelHref={cancelHref} />
      </form>
    </Form>
  );
}
