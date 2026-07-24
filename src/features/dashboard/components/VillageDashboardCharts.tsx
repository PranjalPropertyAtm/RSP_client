import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardStats } from '@/features/dashboard/api/dashboard.api';

interface VillageDashboardChartsProps {
  villageWiseActivities: NonNullable<DashboardStats['villageWiseActivities']>;
  monthlyWorkTrend: NonNullable<DashboardStats['monthlyWorkTrend']>;
}

export function VillageDashboardCharts({
  villageWiseActivities,
  monthlyWorkTrend,
}: VillageDashboardChartsProps) {
  const maxVillageCount = Math.max(...villageWiseActivities.map((v) => v.activityCount), 1);
  const maxMonthCount = Math.max(...monthlyWorkTrend.map((m) => m.count), 1);

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-rsp-navy">Village Wise Activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {villageWiseActivities.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity data yet.</p>
          ) : (
            villageWiseActivities.map((item) => (
              <div key={item.village?.id ?? item.activityCount} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="truncate font-medium text-rsp-navy">
                    {item.village?.villageName ?? 'Unknown'}
                  </span>
                  <span className="text-muted-foreground">{item.activityCount}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-rsp-saffron transition-all"
                    style={{ width: `${(item.activityCount / maxVillageCount) * 100}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base text-rsp-navy">Monthly Work Trend</CardTitle>
        </CardHeader>
        <CardContent>
          {monthlyWorkTrend.length === 0 ? (
            <p className="text-sm text-muted-foreground">No work trend data yet.</p>
          ) : (
            <div className="flex h-48 items-end gap-2">
              {monthlyWorkTrend.map((item) => (
                <div key={item.month} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-rsp-navy transition-all"
                    style={{ height: `${(item.count / maxMonthCount) * 100}%`, minHeight: item.count > 0 ? '8px' : '2px' }}
                    title={`${item.count} entries`}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {item.month.slice(5)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
