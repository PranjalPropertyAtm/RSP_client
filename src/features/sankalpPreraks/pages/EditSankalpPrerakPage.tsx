import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorState } from '@/components/common/ErrorState';
import { ROUTES } from '@/constants/routes';
import { SankalpPrerakForm } from '@/features/sankalpPreraks/components/SankalpPrerakForm';
import { useSankalpPrerak, useUpdateSankalpPrerak } from '@/features/sankalpPreraks/hooks/useSankalpPreraks';
import type { SankalpPrerakFormValues } from '@/features/sankalpPreraks/schemas/sankalpPrerak.schema';

function toPayload(values: SankalpPrerakFormValues) {
  const { villageId: _v, ...rest } = values;
  return {
    ...rest,
    fatherOrHusbandName: rest.fatherOrHusbandName || undefined,
    gender: rest.gender || undefined,
    dateOfBirth: rest.dateOfBirth || undefined,
    age: rest.age ? Number(rest.age) : undefined,
    joiningDate: rest.joiningDate || undefined,
    alternateMobile: rest.alternateMobile || undefined,
    email: rest.email || undefined,
    pincode: rest.pincode || undefined,
    emergencyContactMobile: rest.emergencyContactMobile || undefined,
  };
}

export function EditSankalpPrerakPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useSankalpPrerak(id);
  const updatePrerak = useUpdateSankalpPrerak(id);

  if (isLoading) {
    return <PageContainer><LoadingSpinner /></PageContainer>;
  }

  if (isError || !data) {
    return <PageContainer><ErrorState title="Prerak not found" onRetry={() => refetch()} /></PageContainer>;
  }

  return (
    <PageContainer>
      <PageHeader title="Edit Sankalp Prerak" description={`Editing ${data.fullName}`} />
      <SankalpPrerakForm
        defaultValues={data}
        submitLabel="Update Sankalp Prerak"
        cancelHref={ROUTES.SANKALP_PRERAKS.PROFILE(id)}
        isSubmitting={updatePrerak.isPending}
        onSubmit={(values) => {
          updatePrerak.mutate(toPayload(values), {
            onSuccess: () => navigate(ROUTES.SANKALP_PRERAKS.PROFILE(id)),
          });
        }}
      />
    </PageContainer>
  );
}
