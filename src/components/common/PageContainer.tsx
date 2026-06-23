import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn('mx-auto w-full min-w-0 max-w-7xl space-y-6 overflow-x-hidden p-4 md:p-6', className)}>{children}</div>;
}
