import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { ROUTES } from '@/constants/routes';
import { WorkLogForm } from '@/features/workLogs/components/WorkLogForm';
import { useCreateWorkLog } from '@/features/workLogs/hooks/useWorkLogs';
import type { WorkLogFormValues } from '@/features/sankalpPreraks/schemas/sankalpPrerak.schema';

function toPayload(values: WorkLogFormValues) {
  return {
    ...values,
    familiesCovered: values.familiesCovered === '' ? undefined : Number(values.familiesCovered),
    peopleBenefited: values.peopleBenefited === '' ? undefined : Number(values.peopleBenefited),
  };
}

export function CreateWorkLogPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prerakId = searchParams.get('prerakId') ?? undefined;
  const villageId = searchParams.get('villageId') ?? undefined;
  const createWorkLog = useCreateWorkLog();

  return (
    <PageContainer>
      <PageHeader
        title="Add Work Entry"
        description="Record field activity in the work register"
      />
      <WorkLogForm
        presetPrerakId={prerakId}
        presetVillageId={villageId}
        cancelHref={prerakId ? ROUTES.SANKALP_PRERAKS.PROFILE(prerakId) : ROUTES.SANKALP_PRERAKS.LIST}
        isSubmitting={createWorkLog.isPending}
        onSubmit={(values) => {
          createWorkLog.mutate(toPayload(values), {
            onSuccess: () => {
              if (values.sankalpPrerakId) {
                navigate(ROUTES.SANKALP_PRERAKS.PROFILE(values.sankalpPrerakId));
              } else {
                navigate(ROUTES.SANKALP_PRERAKS.LIST);
              }
            },
          });
        }}
      />
    </PageContainer>
  );
}
