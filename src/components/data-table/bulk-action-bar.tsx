import type { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BulkActionBarProps<TData> {
  table: Table<TData>;
  children?: React.ReactNode;
  className?: string;
}

export function BulkActionBar<TData>({ table, children, className }: BulkActionBarProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  if (selectedCount === 0) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-4 py-2',
        className
      )}
    >
      <p className="text-sm font-medium text-foreground">
        {selectedCount} row{selectedCount !== 1 ? 's' : ''} selected
      </p>
      <div className="flex items-center gap-2">
        {children}
        <Button
          variant="ghost"
          size="sm"
          className="h-8"
          onClick={() => table.resetRowSelection()}
        >
          <X className="mr-1.5 h-3.5 w-3.5" />
          Clear
        </Button>
      </div>
    </div>
  );
}
