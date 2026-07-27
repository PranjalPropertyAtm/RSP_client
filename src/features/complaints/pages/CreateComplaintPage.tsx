import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { ROUTES } from '@/constants/routes';
import { ComplaintForm } from '@/features/complaints/components/ComplaintForm';
import { useCreateComplaint } from '@/features/complaints/hooks/useComplaints';
import type { CreateComplaintFormValues } from '@/features/complaints/schemas/complaint.schema';

export function CreateComplaintPage() {
  const navigate = useNavigate();
  const createComplaint = useCreateComplaint();

  const handleSubmit = (values: CreateComplaintFormValues) => {
    createComplaint.mutate(
      {
        fullName: values.fullName,
        fatherName: values.fatherName || undefined,
        age: values.age ? Number(values.age) : undefined,
        gender: values.gender,
        mobile: values.mobile,
        email: values.email || undefined,
        education: values.education || undefined,
        occupation: values.occupation || undefined,
        familyMembers:
          typeof values.familyMembers === 'number' && Number.isFinite(values.familyMembers)
            ? values.familyMembers
            : 1,
        pincode: values.pincode,
        state: values.state,
        district: values.district,
        postOffice: values.postOffice,
        villageId: values.villageId || undefined,
        village: values.village || undefined,
        tehsil: values.tehsil || undefined,
        problemCategory: values.problemCategory,
        problemDescription: values.problemDescription,
        affectedPeople: values.affectedPeople,
        contactedAuthority: values.contactedAuthority,
        authorityDetails: values.authorityDetails || undefined,
        suggestedSolution: values.suggestedSolution || undefined,
        declarationAccepted: true,
      },
      { onSuccess: (data) => navigate(ROUTES.COMPLAINTS.DETAILS(data.id)) }
    );
  };

  return (
    <PageContainer>
      <PageHeader title="Create Complaint" description="Register a new citizen complaint" />
      <ComplaintForm isSubmitting={createComplaint.isPending} onSubmit={handleSubmit} />
    </PageContainer>
  );
}
