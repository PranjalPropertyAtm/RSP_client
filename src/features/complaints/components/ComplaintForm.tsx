import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AFFECTED_PEOPLE_OPTIONS,
  createComplaintSchema,
  defaultComplaintFormValues,
  GENDER_OPTIONS,
  PROBLEM_CATEGORY_OPTIONS,
  type CreateComplaintFormValues,
} from '@/features/complaints/schemas/complaint.schema';
import { usePincodeLookup } from '@/features/locations/hooks/usePincodeLookup';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormSection } from '@/components/forms/FormSection';
import { cn } from '@/lib/utils';

interface ComplaintFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: CreateComplaintFormValues) => void;
}

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children} <span className="text-destructive">*</span>
    </>
  );
}

function RadioOption({
  id,
  name,
  value,
  label,
  checked,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2.5 text-sm transition-colors',
        checked ? 'border-primary bg-primary/5' : 'border-input hover:bg-muted/50'
      )}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="accent-primary"
      />
      {label}
    </label>
  );
}

export function ComplaintForm({ isSubmitting, onSubmit }: ComplaintFormProps) {
  const form = useForm<CreateComplaintFormValues>({
    resolver: zodResolver(createComplaintSchema),
    defaultValues: defaultComplaintFormValues as CreateComplaintFormValues,
  });

  const pincode = form.watch('pincode');
  const contactedAuthority = form.watch('contactedAuthority');
  const { data: locationData, isFetching: isPincodeLoading, isError: isPincodeError } = usePincodeLookup(pincode);

  useEffect(() => {
    if (!locationData) return;

    form.setValue('state', locationData.state, { shouldValidate: true });
    form.setValue('district', locationData.district, { shouldValidate: true });

    if (locationData.postOffices.length === 1) {
      form.setValue('postOffice', locationData.postOffices[0].name, { shouldValidate: true });
    } else {
      form.setValue('postOffice', '', { shouldValidate: true });
    }
  }, [locationData, form]);

  const handleReset = () => {
    form.reset(defaultComplaintFormValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: Personal Information */}
        <FormSection title="Personal Information">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel><RequiredLabel>Full Name</RequiredLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fatherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel><RequiredLabel>Father/Husband Name</RequiredLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Enter father/husband name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel><RequiredLabel>Age</RequiredLabel></FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={120}
                    placeholder="Enter age"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(e.target.value === '' ? undefined : e.target.valueAsNumber)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel><RequiredLabel>Gender</RequiredLabel></FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GENDER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel><RequiredLabel>Mobile Number</RequiredLabel></FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit Indian mobile (starts with 6-9)"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education</FormLabel>
                <FormControl>
                  <Input placeholder="Enter education" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
                <FormControl>
                  <Input placeholder="Enter occupation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="familyMembers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Family Members Count</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="Number of family members"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(e.target.value === '' ? undefined : e.target.valueAsNumber)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        {/* Section 2: Address Information */}
        <FormSection title="Address Information">
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel><RequiredLabel>Pincode</RequiredLabel></FormLabel>
                <FormControl>
                  <Input
                    placeholder="6-digit pincode"
                    maxLength={6}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      field.onChange(value);
                      if (value.length < 6) {
                        form.setValue('state', '');
                        form.setValue('district', '');
                        form.setValue('postOffice', '');
                      }
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
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input readOnly placeholder="Auto-populated" {...field} />
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
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input readOnly placeholder="Auto-populated" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postOffice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Office</FormLabel>
                {locationData && locationData.postOffices.length > 1 ? (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select post office" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locationData.postOffices.map((po) => (
                        <SelectItem key={po.name} value={po.name}>
                          {po.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <FormControl>
                    <Input readOnly placeholder="Auto-populated" {...field} />
                  </FormControl>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="village"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Village</FormLabel>
                <FormControl>
                  <Input placeholder="Enter village" {...field} />
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
                <FormLabel>Tehsil</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tehsil" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        {/* Section 3: Problem Information */}
        <FormSection title="Problem Information">
          <FormField
            control={form.control}
            name="problemCategory"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Problem Category</FormLabel>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {PROBLEM_CATEGORY_OPTIONS.map((option) => (
                    <RadioOption
                      key={option.value}
                      id={`category-${option.value}`}
                      name="problemCategory"
                      value={option.value}
                      label={option.label}
                      checked={field.value === option.value}
                      onChange={field.onChange}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="problemDescription"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Problem Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the problem in detail..."
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="affectedPeople"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Affected People</FormLabel>
                <div className="grid gap-2 sm:grid-cols-3">
                  {AFFECTED_PEOPLE_OPTIONS.map((option) => (
                    <RadioOption
                      key={option.value}
                      id={`affected-${option.value}`}
                      name="affectedPeople"
                      value={option.value}
                      label={option.label}
                      checked={field.value === option.value}
                      onChange={field.onChange}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        {/* Section 4: Authority Information */}
        <FormSection title="Authority Information">
          <FormField
            control={form.control}
            name="contactedAuthority"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Have you contacted any authority?</FormLabel>
                <div className="flex flex-wrap gap-3">
                  <RadioOption
                    id="contacted-yes"
                    name="contactedAuthority"
                    value="YES"
                    label="Yes"
                    checked={field.value === 'YES'}
                    onChange={field.onChange}
                  />
                  <RadioOption
                    id="contacted-no"
                    name="contactedAuthority"
                    value="NO"
                    label="No"
                    checked={field.value === 'NO'}
                    onChange={(value) => {
                      field.onChange(value);
                      if (value === 'NO') {
                        form.setValue('authorityDetails', '');
                      }
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {contactedAuthority === 'YES' && (
            <FormField
              control={form.control}
              name="authorityDetails"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Authority Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details about the authority you contacted..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </FormSection>

        {/* Section 5: Suggested Solution */}
        <FormSection title="Suggested Solution">
          <FormField
            control={form.control}
            name="suggestedSolution"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Suggested Solution</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your suggested solution (optional)..."
                    className="min-h-28"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        {/* Section 6: Declaration */}
        <FormSection title="Declaration">
          <FormField
            control={form.control}
            name="declarationAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3 space-y-0 md:col-span-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal">
                    I hereby declare that the information provided above is true and correct to the best of my
                    knowledge. <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </FormSection>

        <div className="flex items-center justify-end gap-3 border-t pt-6">
          <Button type="button" variant="outline" onClick={handleReset} disabled={isSubmitting}>
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
