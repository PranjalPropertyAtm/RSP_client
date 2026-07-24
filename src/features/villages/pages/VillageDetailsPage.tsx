import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Plus, Trash2, UserPlus } from 'lucide-react';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorState } from '@/components/common/ErrorState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import { RECORD_STATUS_LABELS, WORK_CATEGORY_LABELS, WORK_STATUS_LABELS } from '@/constants/village-module';
import {
  useActivateVillage,
  useDeactivateVillage,
  useDeleteVillage,
  useVillageDetails,
} from '@/features/villages/hooks/useVillages';
import { useAuthStore } from '@/stores/auth.store';
import { formatDate } from '@/lib/utils';

export function VillageDetailsPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const isAdmin = useAuthStore((s) => s.user?.role === ROLES.ADMIN);
  const { data, isLoading, isError, refetch } = useVillageDetails(id);
  const deleteVillage = useDeleteVillage();
  const activateVillage = useActivateVillage();
  const deactivateVillage = useDeactivateVillage();

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingSpinner />
      </PageContainer>
    );
  }

  if (isError || !data) {
    return (
      <PageContainer>
        <ErrorState title="Village not found" onRetry={() => refetch()} />
      </PageContainer>
    );
  }

  const activePrerak = data.sankalpPreraks?.find((p) => p.status === 'ACTIVE');

  return (
    <PageContainer>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" asChild>
          <Link to={ROUTES.VILLAGES.LIST}>
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Villages
          </Link>
        </Button>
        {isAdmin && (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to={ROUTES.VILLAGES.EDIT(id)}>
                <Edit className="mr-1.5 h-3.5 w-3.5" />
                Edit
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link to={ROUTES.VILLAGES.ADD_PRERAK(id)}>
                <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                Add Prerak
              </Link>
            </Button>
            {data.status === 'ACTIVE' ? (
              <Button
                size="sm"
                variant="outline"
                disabled={deactivateVillage.isPending}
                onClick={() => deactivateVillage.mutate(id)}
              >
                Deactivate
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                disabled={activateVillage.isPending}
                onClick={() => activateVillage.mutate(id)}
              >
                Activate
              </Button>
            )}
            <Button
              size="sm"
              variant="destructive"
              disabled={deleteVillage.isPending}
              onClick={() => {
                if (confirm('Delete this village permanently?')) {
                  deleteVillage.mutate(id, { onSuccess: () => navigate(ROUTES.VILLAGES.LIST) });
                }
              }}
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <PageHeader
        title={data.villageName}
        description={`${data.villageCode} · ${data.block}, ${data.district}`}
        actions={
          <StatusBadge variant={data.status === 'ACTIVE' ? 'success' : 'danger'}>
            {RECORD_STATUS_LABELS[data.status]}
          </StatusBadge>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Surveys', value: data.stats.totalSurveys },
          { label: 'Total Complaints', value: data.stats.totalComplaints },
          { label: 'Total Volunteers', value: data.stats.totalVolunteers },
          { label: 'Total Families', value: data.totalFamilies ?? '—' },
        ].map((stat) => (
          <Card key={stat.label} className="border-l-4 border-l-rsp-saffron shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-rsp-navy">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-rsp-navy">Village Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
            <Info label="Gram Panchayat" value={data.gramPanchayat} />
            <Info label="Ward / Mohalla" value={data.wardOrMohalla} />
            <Info label="Tehsil" value={data.tehsil} />
            <Info label="State" value={data.state} />
            <Info label="Pincode" value={data.pincode} />
            <Info label="Population" value={data.totalPopulation} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base text-rsp-navy">Assigned Sankalp Prerak</CardTitle>
            {isAdmin && (
              <Button size="sm" variant="ghost" asChild>
                <Link to={ROUTES.VILLAGES.ADD_PRERAK(id)}>
                  <Plus className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {activePrerak ? (
              <div className="space-y-2 text-sm">
                <p className="font-medium text-rsp-navy">{activePrerak.fullName}</p>
                <p className="text-muted-foreground">{activePrerak.employeeCode}</p>
                <p>{activePrerak.mobileNumber}</p>
                <Button size="sm" variant="link" className="h-auto p-0" asChild>
                  <Link to={ROUTES.SANKALP_PRERAKS.PROFILE(activePrerak.id)}>View Profile</Link>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No active Sankalp Prerak assigned.</p>
            )}
            {(data.sankalpPreraks?.length ?? 0) > 1 && (
              <div className="mt-4 border-t pt-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">History</p>
                <div className="space-y-2">
                  {data.sankalpPreraks
                    ?.filter((p) => p.status !== 'ACTIVE')
                    .map((p) => (
                      <div key={p.id} className="flex items-center justify-between text-sm">
                        <span>{p.fullName}</span>
                        <StatusBadge variant="danger">inactive</StatusBadge>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base text-rsp-navy">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {data.stats.recentActivities.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent activities recorded.</p>
          ) : (
            <div className="space-y-4">
              {data.stats.recentActivities.map((activity) => (
                <div key={activity.id} className="flex flex-wrap items-start justify-between gap-2 border-b pb-4 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-rsp-navy">
                      {formatDate(activity.workDate)} — {WORK_CATEGORY_LABELS[activity.workCategory as keyof typeof WORK_CATEGORY_LABELS]}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.workTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.sankalpPrerak.fullName}
                      {activity.familiesCovered ? ` · ${activity.familiesCovered} families` : ''}
                      {activity.peopleBenefited ? ` · ${activity.peopleBenefited} people` : ''}
                    </p>
                  </div>
                  <StatusBadge variant={activity.status === 'COMPLETED' ? 'success' : 'warning'}>
                    {WORK_STATUS_LABELS[activity.status as keyof typeof WORK_STATUS_LABELS].toLowerCase()}
                  </StatusBadge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}

function Info({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-rsp-navy">{value ?? '—'}</p>
    </div>
  );
}
