import { useCallback, useMemo, useState } from 'react';
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
import { useVillages, useVillageFilterOptions } from '@/features/villages/hooks/useVillages';
import { villageColumns } from '@/features/villages/components/VillageTableColumns';
import { useServerPagination, useSyncPaginationMeta } from '@/hooks/useServerPagination';
import { useAuthStore } from '@/stores/auth.store';
import type { RecordStatus } from '@/types';

export function VillageListPage() {
  const isAdmin = useAuthStore((s) => s.user?.role === ROLES.ADMIN);
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState<string>('');
  const [block, setBlock] = useState<string>('');
  const [status, setStatus] = useState<RecordStatus | ''>('');
  const { page, limit, onPaginationChange, applyMeta, resetPage, toTablePagination } =
    useServerPagination();

  const { data: filterOptions } = useVillageFilterOptions();

  const districts = useMemo(
    () => [...new Set(filterOptions?.map((v) => v.district) ?? [])].sort(),
    [filterOptions]
  );
  const blocks = useMemo(() => {
    const source = district
      ? filterOptions?.filter((v) => v.district === district) ?? []
      : filterOptions ?? [];
    return [...new Set(source.map((v) => v.block))].sort();
  }, [filterOptions, district]);

  const { data, isLoading, isFetching, isError, refetch } = useVillages({
    page,
    limit,
    search: search || undefined,
    district: district || undefined,
    block: block || undefined,
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
        title="Village Management"
        description="Manage village master records for surveys, complaints and Sankalp Preraks"
        actions={
          isAdmin ? (
            <Button asChild>
              <Link to={ROUTES.VILLAGES.CREATE}>
                <Plus className="mr-2 h-4 w-4" />
                Create Village
              </Link>
            </Button>
          ) : undefined
        }
      />
      <DataTable
        columns={villageColumns}
        data={data?.data ?? []}
        isLoading={isLoading && !data}
        isFetching={isFetching}
        emptyMessage="No villages found."
        serverPagination={toTablePagination(data?.meta)}
        onPaginationChange={onPaginationChange}
        toolbar={{
          onSearchChange: handleSearchChange,
          searchPlaceholder: 'Search villages...',
          filters: (
            <div className="flex flex-wrap gap-2">
              <Select
                value={district || 'all'}
                onValueChange={(v) => {
                  setDistrict(v === 'all' ? '' : v);
                  setBlock('');
                  resetPage();
                }}
              >
                <SelectTrigger className="h-8 w-[140px]">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {districts.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={block || 'all'}
                onValueChange={(v) => {
                  setBlock(v === 'all' ? '' : v);
                  resetPage();
                }}
              >
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blocks</SelectItem>
                  {blocks.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
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
