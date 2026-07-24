import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorState } from '@/components/common/ErrorState';
import { ROUTES } from '@/constants/routes';
import { VillageForm } from '@/features/villages/components/VillageForm';
import { useUpdateVillage, useVillage } from '@/features/villages/hooks/useVillages';
import type { VillageFormValues } from '@/features/villages/schemas/village.schema';

function toPayload(values: VillageFormValues) {
  return {
    ...values,
    totalPopulation: values.totalPopulation === '' ? undefined : Number(values.totalPopulation),
    totalFamilies: values.totalFamilies === '' ? undefined : Number(values.totalFamilies),
  };
}

export function EditVillagePage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useVillage(id);
  const updateVillage = useUpdateVillage(id);

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

  return (
    <PageContainer>
      <PageHeader title="Edit Village" description={`Editing ${data.villageName}`} />
      <VillageForm
        defaultValues={data}
        submitLabel="Update Village"
        cancelHref={ROUTES.VILLAGES.DETAILS(id)}
        isSubmitting={updateVillage.isPending}
        onSubmit={(values) => {
          updateVillage.mutate(toPayload(values), {
            onSuccess: () => navigate(ROUTES.VILLAGES.DETAILS(id)),
          });
        }}
      />
    </PageContainer>
  );
}
