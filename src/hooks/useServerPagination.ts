import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/components/data-table';
import type { PaginationMeta } from '@/types';

export function useServerPagination(initialLimit = DEFAULT_PAGE_SIZE) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const applyMeta = useCallback((meta?: PaginationMeta) => {
    if (!meta) return;
    setPage((current) => (current === meta.page ? current : meta.page));
    setLimit((current) => (current === meta.limit ? current : meta.limit));
  }, []);

  const onPaginationChange = useCallback(
    ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
      setPage(pageIndex + 1);
      setLimit(pageSize);
    },
    []
  );

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  const toTablePagination = (meta?: PaginationMeta) => ({
    pageIndex: (meta?.page ?? page) - 1,
    pageSize: meta?.limit ?? limit,
    pageCount: meta?.totalPages ?? 1,
    totalRows: meta?.total ?? 0,
  });

  return {
    page,
    limit,
    onPaginationChange,
    applyMeta,
    resetPage,
    toTablePagination,
  };
}

export function useSyncPaginationMeta(
  meta: PaginationMeta | undefined,
  applyMeta: (meta?: PaginationMeta) => void
) {
  useEffect(() => {
    applyMeta(meta);
  }, [meta, applyMeta]);
}
