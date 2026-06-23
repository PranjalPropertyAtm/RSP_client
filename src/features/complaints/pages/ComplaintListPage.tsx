import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { ErrorState } from '@/components/common/ErrorState';
import { ROUTES } from '@/constants/routes';
import { useComplaints } from '@/features/complaints/hooks/useComplaints';
import { complaintColumns } from '@/features/complaints/components/ComplaintTableColumns';
import { useServerPagination, useSyncPaginationMeta } from '@/hooks/useServerPagination';

export function ComplaintListPage() {
  const [search, setSearch] = useState('');
  const { page, limit, onPaginationChange, applyMeta, resetPage, toTablePagination } =
    useServerPagination();

  const { data, isLoading, isFetching, isError, refetch } = useComplaints({
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
        title="Complaints"
        description="View and manage citizen complaints"
        actions={
          <Button asChild>
            <Link to={ROUTES.COMPLAINTS.CREATE}>
              <Plus className="mr-2 h-4 w-4" />
              New Complaint
            </Link>
          </Button>
        }
      />
      <DataTable
        columns={complaintColumns}
        data={data?.data ?? []}
        isLoading={isLoading && !data}
        isFetching={isFetching}
        emptyMessage="No complaints found."
        serverPagination={toTablePagination(data?.meta)}
        onPaginationChange={onPaginationChange}
        toolbar={{
          onSearchChange: handleSearchChange,
          searchPlaceholder: 'Search complaints...',
        }}
      />
    </PageContainer>
  );
}
