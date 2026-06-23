import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { BulkActionBar } from './bulk-action-bar';
import { DataTablePagination, DEFAULT_PAGE_SIZE } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import {
  getStickyLeft,
  getStickyLeftForCell,
  isLastStickyColumn,
  stickyCellClassName,
  stickyHeadClassName,
} from './sticky-column';
import { cn } from '@/lib/utils';

const ROW_HEIGHT = 40;
const VIRTUAL_THRESHOLD = 15;

export interface ServerPagination {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalRows: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  isFetching?: boolean;
  emptyMessage?: string;
  serverPagination?: ServerPagination;
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  bulkActions?: React.ReactNode;
  onRowClick?: (row: TData) => void;
  stickyFirstColumn?: boolean;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  hidePagination?: boolean;
  skeletonColumns?: number;
  toolbar?: {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    filters?: React.ReactNode;
    actions?: React.ReactNode;
    onExport?: () => void;
    showColumnToggle?: boolean;
  };
}

function SelectionHeader<TData>({ table }: { table: ReturnType<typeof useReactTable<TData>> }) {
  const ref = useRef<HTMLInputElement>(null);
  const isSomeSelected = table.getIsSomePageRowsSelected();
  const isAllSelected = table.getIsAllPageRowsSelected();

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = isSomeSelected && !isAllSelected;
    }
  }, [isSomeSelected, isAllSelected]);

  return (
    <Checkbox
      ref={ref}
      role="checkbox"
      aria-label="Select all"
      checked={isAllSelected}
      onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
    />
  );
}

function SelectionCell({ row }: { row: { getIsSelected: () => boolean; toggleSelected: (v: boolean) => void } }) {
  return (
    <Checkbox
      role="checkbox"
      aria-label="Select row"
      checked={row.getIsSelected()}
      onChange={(e) => row.toggleSelected(e.target.checked)}
      onClick={(e) => e.stopPropagation()}
    />
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  isFetching,
  emptyMessage = 'No records found.',
  serverPagination,
  onPaginationChange,
  enableRowSelection = false,
  rowSelection: controlledRowSelection,
  onRowSelectionChange,
  bulkActions,
  onRowClick,
  stickyFirstColumn = false,
  columnVisibility: controlledColumnVisibility,
  onColumnVisibilityChange,
  hidePagination = false,
  skeletonColumns,
  toolbar,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>({});
  const [internalColumnVisibility, setInternalColumnVisibility] = useState<VisibilityState>({});

  const rowSelection = controlledRowSelection ?? internalRowSelection;
  const columnVisibility = controlledColumnVisibility ?? internalColumnVisibility;

  const selectionColumn: ColumnDef<TData, unknown> = {
    id: 'select',
    header: ({ table }) => <SelectionHeader table={table} />,
    cell: ({ row }) => <SelectionCell row={row} />,
    enableSorting: false,
    enableHiding: false,
    size: 40,
  };

  const tableColumns = enableRowSelection ? [selectionColumn, ...columns] : columns;
  const isServerPaginated = Boolean(serverPagination);

  const table = useReactTable({
    data,
    columns: tableColumns,
    pageCount: serverPagination?.pageCount ?? -1,
    defaultColumn: {
      size: 120,
      minSize: 80,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: serverPagination
        ? { pageIndex: serverPagination.pageIndex, pageSize: serverPagination.pageSize }
        : { pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE },
    },
    enableRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: onColumnVisibilityChange ?? setInternalColumnVisibility,
    onRowSelectionChange: onRowSelectionChange ?? setInternalRowSelection,
    onPaginationChange: (updater) => {
      if (!onPaginationChange) return;
      const current = serverPagination
        ? { pageIndex: serverPagination.pageIndex, pageSize: serverPagination.pageSize }
        : { pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE };
      const next = typeof updater === 'function' ? updater(current) : updater;
      onPaginationChange(next);
    },
    getCoreRowModel: getCoreRowModel(),
    ...(isServerPaginated
      ? { manualPagination: true as const, autoResetPageIndex: false }
      : {
          getSortedRowModel: getSortedRowModel(),
          getFilteredRowModel: getFilteredRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
        }),
  });

  const parentRef = useRef<HTMLDivElement>(null);
  const rows = table.getRowModel().rows;
  const useVirtual = !isServerPaginated && rows.length > VIRTUAL_THRESHOLD;
  const effectivePageSize = serverPagination?.pageSize ?? table.getState().pagination.pageSize;

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 8,
    enabled: useVirtual,
  });

  if (isLoading) {
    return (
      <TableSkeleton
        columns={skeletonColumns ?? tableColumns.length}
        rows={effectivePageSize}
      />
    );
  }

  const headerGroup = table.getHeaderGroups()[0];

  const renderStickyCell = (
    cellKey: string,
    cellIndex: number,
    columnId: string,
    columnSize: number,
    children: React.ReactNode
  ) => {
    const stickyLeft = headerGroup
      ? getStickyLeftForCell(
          headerGroup.headers.map((header) => header.column),
          columnId,
          stickyFirstColumn
        )
      : undefined;
    const isLastSticky = headerGroup
      ? isLastStickyColumn(headerGroup.headers, cellIndex, stickyFirstColumn)
      : false;

    return (
      <TableCell
        key={cellKey}
        className={cn(stickyLeft !== undefined && stickyCellClassName(isLastSticky))}
        style={
          stickyLeft !== undefined
            ? { left: stickyLeft, minWidth: columnSize, maxWidth: columnSize }
            : undefined
        }
      >
        {children}
      </TableCell>
    );
  };

  const renderRows = () => {
    if (!rows.length) {
      return (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={tableColumns.length} className="h-32 text-center text-xs text-muted-foreground">
            {emptyMessage}
          </TableCell>
        </TableRow>
      );
    }

    if (!useVirtual) {
      return rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() ? 'selected' : undefined}
          className={cn('group', onRowClick && 'cursor-pointer')}
          style={{ height: ROW_HEIGHT }}
          onClick={() => onRowClick?.(row.original)}
        >
          {row.getVisibleCells().map((cell, cellIndex) =>
            renderStickyCell(
              cell.id,
              cellIndex,
              cell.column.id,
              cell.column.getSize(),
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )
          )}
        </TableRow>
      ));
    }

    const virtualRows = virtualizer.getVirtualItems();
    const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
    const paddingBottom =
      virtualRows.length > 0 ? virtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end : 0;

    return (
      <>
        {paddingTop > 0 && (
          <tr>
            <td colSpan={tableColumns.length} style={{ height: paddingTop }} />
          </tr>
        )}
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() ? 'selected' : undefined}
              className={cn('group', onRowClick && 'cursor-pointer')}
              style={{ height: ROW_HEIGHT }}
              onClick={() => onRowClick?.(row.original)}
            >
              {row.getVisibleCells().map((cell, cellIndex) =>
                renderStickyCell(
                  cell.id,
                  cellIndex,
                  cell.column.id,
                  cell.column.getSize(),
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                )
              )}
            </TableRow>
          );
        })}
        {paddingBottom > 0 && (
          <tr>
            <td colSpan={tableColumns.length} style={{ height: paddingBottom }} />
          </tr>
        )}
      </>
    );
  };

  return (
    <div className="w-full min-w-0 space-y-3">
      {toolbar && <DataTableToolbar table={table} {...toolbar} />}
      {enableRowSelection && <BulkActionBar table={table}>{bulkActions}</BulkActionBar>}

      <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card shadow-card">
        {isFetching && !isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/50 backdrop-blur-[1px]">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-rsp-saffron border-t-transparent" />
          </div>
        )}
        <div
          ref={parentRef}
          className={cn('overflow-x-auto', useVirtual && 'max-h-[min(70vh,720px)] overflow-y-auto')}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-border/60 hover:bg-transparent">
                  {headerGroup.headers.map((header, headerIndex) => {
                    const stickyLeft = getStickyLeft(headerGroup.headers, headerIndex, stickyFirstColumn);
                    const isLastSticky = isLastStickyColumn(
                      headerGroup.headers,
                      headerIndex,
                      stickyFirstColumn
                    );

                    return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        stickyLeft !== undefined && stickyHeadClassName(isLastSticky)
                      )}
                      style={{
                        ...(stickyLeft !== undefined
                          ? {
                              left: stickyLeft,
                              minWidth: header.getSize(),
                              maxWidth: header.getSize(),
                            }
                          : {}),
                        ...(header.getSize() !== 120 ? { width: header.getSize() } : {}),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>{renderRows()}</TableBody>
          </Table>
        </div>
      </div>

      {!hidePagination && (
        <DataTablePagination
          table={table}
          totalRows={serverPagination?.totalRows}
        />
      )}
    </div>
  );
}

export { useReactTable };
export type { Table } from '@tanstack/react-table';
