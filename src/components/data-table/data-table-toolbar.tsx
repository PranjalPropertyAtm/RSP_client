import type { Table } from '@tanstack/react-table';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableColumnToggle } from './data-table-column-toggle';
import { DataTableFilters } from './data-table-filters';
import { DataTableSearch } from './data-table-search';
import { cn } from '@/lib/utils';

interface DataTableToolbarProps<TData> {
  table?: Table<TData>;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  onExport?: () => void;
  showColumnToggle?: boolean;
  className?: string;
}

export function DataTableToolbar<TData>({
  table,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters,
  actions,
  onExport,
  showColumnToggle = true,
  className,
}: DataTableToolbarProps<TData>) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {onSearchChange && (
            <DataTableSearch
              value={searchValue}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
            />
          )}
          <DataTableFilters>{filters}</DataTableFilters>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {actions}
          {onExport && (
            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={onExport}>
              <Download className="mr-1.5 h-3 w-3" />
              Export
            </Button>
          )}
          {showColumnToggle && table && <DataTableColumnToggle table={table} />}
        </div>
      </div>
    </div>
  );
}
