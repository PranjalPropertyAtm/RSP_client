import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/login.schema';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

export function LoginForm() {
  const { login, isLoggingIn, loginError } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Card className="overflow-hidden border-rsp-navy/10 shadow-lg">
      <div className="tricolor-bar-thin" />
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="font-brand text-xl text-rsp-navy">Sign In</CardTitle>
        <CardDescription>Enter your credentials to access Samasya Manch</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => login(values))} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rsp-navy">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="admin@example.com"
                      autoComplete="email"
                      className="border-rsp-navy/15 focus-visible:ring-rsp-saffron"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rsp-navy">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="border-rsp-navy/15 focus-visible:ring-rsp-saffron"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loginError && (
              <p className="text-sm text-destructive">Invalid email or password. Please try again.</p>
            )}
            <Button
              type="submit"
              className="w-full bg-rsp-saffron font-semibold hover:bg-rsp-saffron/90"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
