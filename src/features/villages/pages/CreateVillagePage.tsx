import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { ROUTES } from '@/constants/routes';
import { VillageForm } from '@/features/villages/components/VillageForm';
import { useCreateVillage } from '@/features/villages/hooks/useVillages';
import type { VillageFormValues } from '@/features/villages/schemas/village.schema';

function toPayload(values: VillageFormValues) {
  return {
    ...values,
    totalPopulation: values.totalPopulation === '' ? undefined : Number(values.totalPopulation),
    totalFamilies: values.totalFamilies === '' ? undefined : Number(values.totalFamilies),
  };
}

export function CreateVillagePage() {
  const navigate = useNavigate();
  const createVillage = useCreateVillage();

  return (
    <PageContainer>
      <PageHeader title="Create Village" description="Add a new village to the master registry" />
      <VillageForm
        submitLabel="Create Village"
        cancelHref={ROUTES.VILLAGES.LIST}
        isSubmitting={createVillage.isPending}
        onSubmit={(values) => {
          createVillage.mutate(toPayload(values), {
            onSuccess: (village) => navigate(ROUTES.VILLAGES.DETAILS(village.id)),
          });
        }}
      />
    </PageContainer>
  );
}
