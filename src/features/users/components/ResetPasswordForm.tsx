import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {
  resetUserPasswordSchema,
  type ResetUserPasswordFormValues,
} from '@/features/users/schemas/user.schema';
import { useResetUserPassword } from '@/features/users/hooks/useUsers';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { FormSection } from '@/components/forms/FormSection';
import { FormActions } from '@/components/forms/FormActions';

interface ResetPasswordFormProps {
  userId: string;
  cancelHref: string;
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === 'string') return message;
  }
  return 'Failed to update password. Please try again.';
}

export function ResetPasswordForm({ userId, cancelHref }: ResetPasswordFormProps) {
  const resetPassword = useResetUserPassword(userId);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<ResetUserPasswordFormValues>({
    resolver: zodResolver(resetUserPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  return (
    <div id="password-section">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            setSuccessMessage(null);
            resetPassword.mutate(values.newPassword, {
              onSuccess: (response) => {
                form.reset();
                setSuccessMessage(response.message ?? 'Password updated successfully.');
              },
            });
          })}
          className="space-y-6"
        >
          <FormSection
            title="Change Password"
            description="Set a new password for this user. They will be signed out of all devices."
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      autoComplete="new-password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      autoComplete="new-password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          {successMessage && <p className="text-sm text-rsp-green">{successMessage}</p>}
          {resetPassword.isError && (
            <p className="text-sm text-destructive">{getErrorMessage(resetPassword.error)}</p>
          )}

          <FormActions
            isSubmitting={resetPassword.isPending}
            submitLabel="Update Password"
            cancelHref={cancelHref}
          />
        </form>
      </Form>
    </div>
  );
}
