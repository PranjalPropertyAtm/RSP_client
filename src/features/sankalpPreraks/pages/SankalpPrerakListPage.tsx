import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { ErrorState } from '@/components/common/ErrorState';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import { useSankalpPreraks } from '@/features/sankalpPreraks/hooks/useSankalpPreraks';
import { sankalpPrerakColumns } from '@/features/sankalpPreraks/components/SankalpPrerakTableColumns';
import { useVillageFilterOptions } from '@/features/villages/hooks/useVillages';
import { useServerPagination, useSyncPaginationMeta } from '@/hooks/useServerPagination';
import { useAuthStore } from '@/stores/auth.store';
import type { RecordStatus } from '@/types';

export function SankalpPrerakListPage() {
  const isAdmin = useAuthStore((s) => s.user?.role === ROLES.ADMIN);
  const [search, setSearch] = useState('');
  const [villageId, setVillageId] = useState('');
  const [status, setStatus] = useState<RecordStatus | ''>('');
  const { page, limit, onPaginationChange, applyMeta, resetPage, toTablePagination } =
    useServerPagination();
  const { data: villages } = useVillageFilterOptions();

  const { data, isLoading, isFetching, isError, refetch } = useSankalpPreraks({
    page,
    limit,
    search: search || undefined,
    villageId: villageId || undefined,
    status: status || undefined,
  });

  useSyncPaginationMeta(data?.meta, applyMeta);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch((prev) => {
        if (prev !== value) resetPage();
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
        title="Sankalp Prerak Management"
        description="Manage field volunteers assigned to villages"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={ROUTES.WORK_LOGS.CREATE}>Add Work Entry</Link>
            </Button>
            {isAdmin && (
              <Button asChild>
                <Link to={ROUTES.SANKALP_PRERAKS.CREATE}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Prerak
                </Link>
              </Button>
            )}
          </div>
        }
      />
      <DataTable
        columns={sankalpPrerakColumns}
        data={data?.data ?? []}
        isLoading={isLoading && !data}
        isFetching={isFetching}
        emptyMessage="No Sankalp Preraks found."
        serverPagination={toTablePagination(data?.meta)}
        onPaginationChange={onPaginationChange}
        toolbar={{
          onSearchChange: handleSearchChange,
          searchPlaceholder: 'Search by name, mobile, code...',
          filters: (
            <div className="flex flex-wrap gap-2">
              <Select
                value={villageId || 'all'}
                onValueChange={(v) => {
                  setVillageId(v === 'all' ? '' : v);
                  resetPage();
                }}
              >
                <SelectTrigger className="h-8 w-[160px]">
                  <SelectValue placeholder="Village" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Villages</SelectItem>
                  {villages?.map((v) => (
                    <SelectItem key={v.id} value={v.id}>{v.villageName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={status || 'all'}
                onValueChange={(v) => {
                  setStatus(v === 'all' ? '' : (v as RecordStatus));
                  resetPage();
                }}
              >
                <SelectTrigger className="h-8 w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ),
        }}
      />
    </PageContainer>
  );
}
