import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { ErrorState } from '@/components/common/ErrorState';
import { ROUTES } from '@/constants/routes';
import { useUsers } from '@/features/users/hooks/useUsers';
import { userColumns } from '@/features/users/components/UserTableColumns';
import { useServerPagination, useSyncPaginationMeta } from '@/hooks/useServerPagination';

export function UserListPage() {
  const [search, setSearch] = useState('');
  const { page, limit, onPaginationChange, applyMeta, resetPage, toTablePagination } =
    useServerPagination();

  const { data, isLoading, isFetching, isError, refetch } = useUsers({
    page,
    limit,
    search: search || undefined,
  });

  useSyncPaginationMeta(data?.meta, applyMeta);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch((prev) => {
        if (prev !== value) {
          resetPage();
        }
        return value;
      });
    },
    [resetPage]
  );

  if (isError) {
    return (
      <PageContainer>
        <ErrorState onRetry={() => refetch()} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="User Management"
        description="Manage employees and administrators"
        actions={
          <Button asChild>
            <Link to={ROUTES.USERS.CREATE}>
              <Plus className="mr-2 h-4 w-4" />
              Create User
            </Link>
          </Button>
        }
      />
      <DataTable
        columns={userColumns}
        data={data?.data ?? []}
        isLoading={isLoading && !data}
        isFetching={isFetching}
        emptyMessage="No users found."
        serverPagination={toTablePagination(data?.meta)}
        onPaginationChange={onPaginationChange}
        toolbar={{
          onSearchChange: handleSearchChange,
          searchPlaceholder: 'Search users...',
        }}
      />
    </PageContainer>
  );
}
