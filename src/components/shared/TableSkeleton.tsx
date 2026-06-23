import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
  className?: string;
}

export function TableSkeleton({ columns = 5, rows = 8, className }: TableSkeletonProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-border/80 bg-card shadow-card', className)}>
      <Table>
        <TableHeader>
          <TableRow className="border-border/60 hover:bg-transparent">
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i}>
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-transparent" style={{ height: 40 }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <div
                    className="h-3 animate-pulse rounded bg-muted"
                    style={{ width: `${60 + ((colIndex * 17) % 40)}%` }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
