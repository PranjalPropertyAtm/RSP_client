import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorState } from '@/components/common/ErrorState';
import { ROUTES } from '@/constants/routes';
import { EditUserForm } from '@/features/users/components/UserForm';
import { ResetPasswordForm } from '@/features/users/components/ResetPasswordForm';
import { useUpdateUser, useUser } from '@/features/users/hooks/useUsers';

export function EditUserPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading, isError, refetch } = useUser(id);
  const updateUser = useUpdateUser(id);

  useEffect(() => {
    if (!user || window.location.hash !== '#password') return;
    document.getElementById('password-section')?.scrollIntoView({ behavior: 'smooth' });
  }, [user]);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !user) {
    return (
      <PageContainer>
        <ErrorState title="User not found" onRetry={() => refetch()} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="Edit User" description={`Update details for ${user.fullName}`} />
      <div className="space-y-8">
        <EditUserForm
          defaultValues={user}
          isSubmitting={updateUser.isPending}
          cancelHref={ROUTES.USERS.LIST}
          onSubmit={(values) => {
            updateUser.mutate(values, {
              onSuccess: () => navigate(ROUTES.USERS.LIST),
            });
          }}
        />
        <ResetPasswordForm userId={user.id} cancelHref={ROUTES.USERS.LIST} />
      </div>
    </PageContainer>
  );
}
