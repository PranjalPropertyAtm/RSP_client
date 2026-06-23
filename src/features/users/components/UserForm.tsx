import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormValues,
  type UpdateUserFormValues,
} from '@/features/users/schemas/user.schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { FormSection } from '@/components/forms/FormSection';
import { FormActions } from '@/components/forms/FormActions';
import type { UseFormReturn } from 'react-hook-form';
import type { User } from '@/types';

interface CreateUserFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: CreateUserFormValues) => void;
  cancelHref: string;
}

interface EditUserFormProps {
  defaultValues: User;
  isSubmitting?: boolean;
  onSubmit: (values: UpdateUserFormValues) => void;
  cancelHref: string;
}

export function CreateUserForm({ isSubmitting, onSubmit, cancelHref }: CreateUserFormProps) {
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: 'EMPLOYEE',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <UserFields form={form} includePassword />
        <FormActions isSubmitting={isSubmitting} submitLabel="Create User" cancelHref={cancelHref} />
      </form>
    </Form>
  );
}

export function EditUserForm({ defaultValues, isSubmitting, onSubmit, cancelHref }: EditUserFormProps) {
  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: defaultValues.fullName,
      email: defaultValues.email,
      role: defaultValues.role,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <UserFields form={form as unknown as UseFormReturn<CreateUserFormValues>} />
        <FormActions isSubmitting={isSubmitting} submitLabel="Update User" cancelHref={cancelHref} />
      </form>
    </Form>
  );
}

function UserFields({
  form,
  includePassword = false,
}: {
  form: ReturnType<typeof useForm<CreateUserFormValues>>;
  includePassword?: boolean;
}) {
  return (
    <FormSection title="User Details" description="Basic account information">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter full name" {...field} />
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
              <Input type="email" placeholder="user@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {includePassword && (
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role</FormLabel>
            <FormControl>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={field.value}
                onChange={field.onChange}
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
}
