import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'No data found',
  message = 'There are no records to display.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <Inbox className="h-10 w-10 text-muted-foreground" />
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      </div>
      {action}
    </div>
  );
}
