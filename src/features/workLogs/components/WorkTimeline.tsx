import type { WorkLog } from '@/types';
import { WORK_CATEGORY_LABELS, WORK_STATUS_LABELS } from '@/constants/village-module';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDate } from '@/lib/utils';

interface WorkTimelineProps {
  entries: WorkLog[];
  emptyMessage?: string;
}

export function WorkTimeline({ entries, emptyMessage = 'No work entries yet.' }: WorkTimelineProps) {
  if (entries.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="relative space-y-0">
      {entries.map((entry, index) => (
        <div key={entry.id} className="relative flex gap-4 pb-8 last:pb-0">
          {index < entries.length - 1 && (
            <span className="absolute left-[7px] top-4 h-full w-px bg-border" />
          )}
          <span className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-rsp-saffron bg-white" />
          <div className="min-w-0 flex-1 rounded-lg border bg-card p-4 shadow-sm">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-rsp-navy">{formatDate(entry.workDate)}</p>
              <StatusBadge variant={entry.status === 'COMPLETED' ? 'success' : entry.status === 'ONGOING' ? 'warning' : 'neutral'}>
                {WORK_STATUS_LABELS[entry.status].toLowerCase()}
              </StatusBadge>
            </div>
            <p className="font-medium text-foreground">
              {WORK_CATEGORY_LABELS[entry.workCategory]}
            </p>
            <p className="text-sm text-muted-foreground">{entry.workTitle}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
              {entry.familiesCovered != null && (
                <span>{entry.familiesCovered} Families Covered</span>
              )}
              {entry.peopleBenefited != null && (
                <span>{entry.peopleBenefited} People Benefited</span>
              )}
              {entry.village && <span>{entry.village.villageName}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
