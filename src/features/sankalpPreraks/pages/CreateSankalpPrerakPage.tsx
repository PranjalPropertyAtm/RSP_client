import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { ROUTES } from '@/constants/routes';
import { SankalpPrerakForm } from '@/features/sankalpPreraks/components/SankalpPrerakForm';
import { useCreateSankalpPrerak } from '@/features/sankalpPreraks/hooks/useSankalpPreraks';
import type { SankalpPrerakFormValues } from '@/features/sankalpPreraks/schemas/sankalpPrerak.schema';

function toPayload(values: SankalpPrerakFormValues) {
  return {
    ...values,
    fatherOrHusbandName: values.fatherOrHusbandName || undefined,
    gender: values.gender || undefined,
    dateOfBirth: values.dateOfBirth || undefined,
    age: values.age ?? undefined,
    joiningDate: values.joiningDate || undefined,
    alternateMobile: values.alternateMobile || undefined,
    email: values.email || undefined,
    pincode: values.pincode || undefined,
    emergencyContactMobile: values.emergencyContactMobile || undefined,
  };
}

export function CreateSankalpPrerakPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const villageId = searchParams.get('villageId') ?? undefined;
  const createPrerak = useCreateSankalpPrerak();

  return (
    <PageContainer>
      <PageHeader title="Create Sankalp Prerak" description="Assign a new field volunteer to a village" />
      <SankalpPrerakForm
        presetVillageId={villageId}
        submitLabel="Create Sankalp Prerak"
        cancelHref={villageId ? ROUTES.VILLAGES.DETAILS(villageId) : ROUTES.SANKALP_PRERAKS.LIST}
        isSubmitting={createPrerak.isPending}
        onSubmit={(values) => {
          createPrerak.mutate(toPayload(values), {
            onSuccess: (prerak) => navigate(ROUTES.SANKALP_PRERAKS.PROFILE(prerak.id)),
          });
        }}
      />
    </PageContainer>
  );
}
