import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Plus } from 'lucide-react';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorState } from '@/components/common/ErrorState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import {
  GENDER_LABELS,
  MARITAL_STATUS_LABELS,
  RECORD_STATUS_LABELS,
} from '@/constants/village-module';
import {
  useDeactivateSankalpPrerak,
  useSankalpPrerakProfile,
} from '@/features/sankalpPreraks/hooks/useSankalpPreraks';
import { WorkTimeline } from '@/features/workLogs/components/WorkTimeline';
import { useAuthStore } from '@/stores/auth.store';
import { formatDate, getInitials } from '@/lib/utils';

export function SankalpPrerakProfilePage() {
  const { id = '' } = useParams();
  const isAdmin = useAuthStore((s) => s.user?.role === ROLES.ADMIN);
  const { data, isLoading, isError, refetch } = useSankalpPrerakProfile(id);
  const deactivatePrerak = useDeactivateSankalpPrerak();

  if (isLoading) {
    return <PageContainer><LoadingSpinner /></PageContainer>;
  }

  if (isError || !data) {
    return <PageContainer><ErrorState title="Profile not found" onRetry={() => refetch()} /></PageContainer>;
  }

  return (
    <PageContainer>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" asChild>
          <Link to={ROUTES.SANKALP_PRERAKS.LIST}>
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Preraks
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link to={`${ROUTES.WORK_LOGS.CREATE}?prerakId=${id}&villageId=${data.villageId}`}>
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Work Entry
            </Link>
          </Button>
          {isAdmin && (
            <>
              <Button size="sm" variant="outline" asChild>
                <Link to={ROUTES.SANKALP_PRERAKS.EDIT(id)}>
                  <Edit className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Link>
              </Button>
              {data.status === 'ACTIVE' && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={deactivatePrerak.isPending}
                  onClick={() => {
                    if (confirm('Deactivate this Sankalp Prerak?')) {
                      deactivatePrerak.mutate(id);
                    }
                  }}
                >
                  Deactivate
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Avatar className="h-20 w-20 border-2 border-rsp-saffron/40">
          {data.profilePhoto && <AvatarImage src={data.profilePhoto} alt={data.fullName} />}
          <AvatarFallback className="bg-rsp-navy text-lg text-white">
            {getInitials(data.fullName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <PageHeader
            title={data.fullName}
            description={`${data.employeeCode} · ${data.designation}`}
            actions={
              <StatusBadge variant={data.status === 'ACTIVE' ? 'success' : 'danger'}>
                {RECORD_STATUS_LABELS[data.status]}
              </StatusBadge>
            }
          />
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Surveys Conducted', value: data.stats.surveyCount },
          { label: 'Complaints Collected', value: data.stats.complaintCount },
          { label: 'Total Work Entries', value: data.stats.workHistory.length },
        ].map((s) => (
          <Card key={s.label} className="border-l-4 border-l-rsp-green shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{s.label}</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold text-rsp-navy">{s.value}</p></CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base text-rsp-navy">Personal Details</CardTitle></CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
            <Info label="Father/Husband" value={data.fatherOrHusbandName} />
            <Info label="Gender" value={data.gender ? GENDER_LABELS[data.gender] : undefined} />
            <Info label="Date of Birth" value={data.dateOfBirth ? formatDate(data.dateOfBirth) : undefined} />
            <Info label="Age" value={data.age ?? undefined} />
            <Info label="Mobile" value={data.mobileNumber} />
            <Info label="Email" value={data.email} />
            <Info label="Marital Status" value={data.maritalStatus ? MARITAL_STATUS_LABELS[data.maritalStatus] : undefined} />
            <Info label="Joining Date" value={data.joiningDate ? formatDate(data.joiningDate) : undefined} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base text-rsp-navy">Assigned Village</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium text-rsp-navy">{data.village?.villageName}</p>
            <p className="text-muted-foreground">{data.village?.villageCode}</p>
            <p>{data.village?.block}, {data.village?.district}</p>
            {data.village?.id && (
              <Button size="sm" variant="link" className="h-auto p-0" asChild>
                <Link to={ROUTES.VILLAGES.DETAILS(data.village.id)}>View Village</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle className="text-base text-rsp-navy">Work Timeline</CardTitle></CardHeader>
        <CardContent>
          <WorkTimeline entries={data.stats.workHistory} />
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
