import type { Column, ColumnDef, Header } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

export function isStickyColumn<TData>(
  columnDef: ColumnDef<TData, unknown>,
  index: number,
  stickyFirstColumn: boolean
): boolean {
  return Boolean(columnDef.meta?.sticky) || (stickyFirstColumn && index === 0);
}

export function getStickyLeft<TData>(
  headers: Header<TData, unknown>[],
  index: number,
  stickyFirstColumn: boolean
): number | undefined {
  const columnDef = headers[index]?.column.columnDef;
  if (!columnDef || !isStickyColumn(columnDef, index, stickyFirstColumn)) {
    return undefined;
  }

  let left = 0;
  for (let i = 0; i < index; i++) {
    if (isStickyColumn(headers[i].column.columnDef, i, stickyFirstColumn)) {
      left += headers[i].getSize();
    }
  }

  return left;
}

export function getStickyLeftForCell<TData>(
  columns: Column<TData, unknown>[],
  columnId: string,
  stickyFirstColumn: boolean
): number | undefined {
  let left = 0;

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.id === columnId) {
      return isStickyColumn(column.columnDef, i, stickyFirstColumn) ? left : undefined;
    }

    if (isStickyColumn(column.columnDef, i, stickyFirstColumn)) {
      left += column.getSize();
    }
  }

  return undefined;
}

export function stickyHeadClassName(isLastSticky: boolean) {
  return cn(
    'sticky z-30 bg-card/95 backdrop-blur-sm shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]',
    isLastSticky && 'border-r border-border/60'
  );
}

export function stickyCellClassName(isLastSticky: boolean) {
  return cn(
    'sticky z-10 bg-card shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] group-hover:bg-muted/40 group-data-[state=selected]:bg-muted/60',
    isLastSticky && 'border-r border-border/60'
  );
}

export function isLastStickyColumn<TData>(
  headers: Header<TData, unknown>[],
  index: number,
  stickyFirstColumn: boolean
): boolean {
  const stickyIndices = headers
    .map((header, headerIndex) =>
      isStickyColumn(header.column.columnDef, headerIndex, stickyFirstColumn) ? headerIndex : -1
    )
    .filter((headerIndex) => headerIndex >= 0);

  return stickyIndices.at(-1) === index;
}
