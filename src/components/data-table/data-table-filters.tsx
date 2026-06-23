import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DataTableFiltersProps {
  children?: React.ReactNode;
  className?: string;
}

export function DataTableFilters({ children, className }: DataTableFiltersProps) {
  if (!children) return null;

  return <div className={cn('flex flex-wrap items-center gap-2', className)}>{children}</div>;
}

interface FilterButtonProps extends React.ComponentProps<typeof Button> {
  active?: boolean;
}

export function DataTableFilterButton({ active, className, ...props }: FilterButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn('h-9', active && 'border-primary/40 bg-primary/5', className)}
      {...props}
    />
  );
}
