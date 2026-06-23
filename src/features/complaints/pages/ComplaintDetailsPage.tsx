import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageContainer } from '@/components/common/PageContainer';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorState } from '@/components/common/ErrorState';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { ComplaintDetails } from '@/features/complaints/components/ComplaintDetails';
import { useComplaint } from '@/features/complaints/hooks/useComplaints';

function BackToComplaints() {
  return (
    <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" asChild>
      <Link to={ROUTES.COMPLAINTS.LIST}>
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Complaints
      </Link>
    </Button>
  );
}

export function ComplaintDetailsPage() {
  const { id = '' } = useParams();
  const { data, isLoading, isError, refetch } = useComplaint(id);

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
        <div className="mb-4">
          <BackToComplaints />
        </div>
        <ErrorState title="Complaint not found" onRetry={() => refetch()} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-4 flex items-center justify-between gap-3">
        <BackToComplaints />
      </div>
      <ComplaintDetails complaint={data} />
    </PageContainer>
  );
}
