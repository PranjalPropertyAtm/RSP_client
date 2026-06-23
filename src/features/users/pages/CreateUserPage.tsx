import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { ROUTES } from '@/constants/routes';
import { CreateUserForm } from '@/features/users/components/UserForm';
import { useCreateUser } from '@/features/users/hooks/useUsers';

export function CreateUserPage() {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  return (
    <PageContainer>
      <PageHeader title="Create User" description="Add a new employee or administrator" />
      <CreateUserForm
        isSubmitting={createUser.isPending}
        cancelHref={ROUTES.USERS.LIST}
        onSubmit={(values) => {
          createUser.mutate(values, {
            onSuccess: () => navigate(ROUTES.USERS.LIST),
          });
        }}
      />
    </PageContainer>
  );
}
