import { FileText, CalendarDays, CalendarRange, Users, MapPin, UserCheck, ClipboardList } from 'lucide-react';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorState } from '@/components/common/ErrorState';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { AdminComplaintActivity } from '@/features/dashboard/components/AdminComplaintActivity';
import { VillageDashboardCharts } from '@/features/dashboard/components/VillageDashboardCharts';
import { useAuthStore } from '@/stores/auth.store';
import { ROLES } from '@/constants/roles';
import { cn } from '@/lib/utils';

const statStyles = [
  { accent: 'border-l-rsp-saffron', icon: 'text-rsp-saffron' },
  { accent: 'border-l-amber-500', icon: 'text-amber-600' },
  { accent: 'border-l-rsp-green', icon: 'text-rsp-green' },
  { accent: 'border-l-rsp-navy', icon: 'text-rsp-navy' },
];

export function DashboardHomePage() {
  const { data, isLoading, isError, refetch } = useDashboard();
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === ROLES.ADMIN;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const stats = isAdmin
    ? [
        { label: 'Total Villages', value: data?.totalVillages ?? 0, icon: MapPin },
        { label: 'Active Preraks', value: data?.activePreraks ?? 0, icon: UserCheck },
        { label: 'Work Entries', value: data?.totalWorkEntries ?? 0, icon: ClipboardList },
        { label: 'Total Complaints', value: data?.totalComplaints ?? 0, icon: FileText },
        { label: 'Today', value: data?.todayComplaints ?? 0, icon: CalendarDays },
        { label: 'This Month', value: data?.monthComplaints ?? 0, icon: CalendarRange },
        { label: 'Families Surveyed', value: data?.totalFamiliesSurveyed ?? 0, icon: Users },
        { label: 'Active Employees', value: data?.activeUsers ?? 0, icon: Users },
      ]
    : [
        { label: 'Total Villages', value: data?.totalVillages ?? 0, icon: MapPin },
        { label: 'Active Preraks', value: data?.activePreraks ?? 0, icon: UserCheck },
        { label: 'Work Entries', value: data?.totalWorkEntries ?? 0, icon: ClipboardList },
        { label: 'My Complaints', value: data?.totalComplaints ?? 0, icon: FileText },
        { label: 'Filed Today', value: data?.todayComplaints ?? 0, icon: CalendarDays },
        { label: 'Filed This Month', value: data?.monthComplaints ?? 0, icon: CalendarRange },
      ];

  return (
    <PageContainer>
      <PageHeader
        title={`Welcome, ${user?.fullName ?? 'User'}`}
        description={
          isAdmin
            ? 'Overview of village management, field activities and complaints'
            : 'Overview of villages, preraks and your complaint activity'
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const style = statStyles[index % statStyles.length];
          return (
            <Card key={stat.label} className={cn('border-l-4 shadow-sm', style.accent)}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-rsp-navy">{stat.label}</CardTitle>
                <Icon className={cn('h-4 w-4', style.icon)} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-rsp-navy">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isAdmin && data?.villageWiseActivities && data?.monthlyWorkTrend && (
        <VillageDashboardCharts
          villageWiseActivities={data.villageWiseActivities}
          monthlyWorkTrend={data.monthlyWorkTrend}
        />
      )}

      {isAdmin && (
        <AdminComplaintActivity
          userStats={data?.userComplaintStats ?? []}
          recentComplaints={data?.recentComplaints ?? []}
        />
      )}
    </PageContainer>
  );
}
