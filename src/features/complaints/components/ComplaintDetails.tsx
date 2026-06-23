import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  Lightbulb,
  MapPin,
  Phone,
  Shield,
  User,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EMPTY_CELL } from '@/lib/typography';
import { cn, formatDate, getInitials } from '@/lib/utils';
import {
  AFFECTED_PEOPLE_OPTIONS,
  GENDER_OPTIONS,
  PROBLEM_CATEGORY_OPTIONS,
} from '@/features/complaints/schemas/complaint.schema';
import { BRAND_NAME, BRAND_PRODUCT } from '@/constants/brand';
import { BrandLogo } from '@/components/common/BrandLogo';
import type { Complaint } from '@/types';
import type { ProblemCategory } from '@/types/api.types';

interface ComplaintDetailsProps {
  complaint: Complaint;
}

const CATEGORY_STYLES: Record<
  ProblemCategory,
  { label: string; accent: string; badge: string }
> = {
  WATER_IRRIGATION: {
    label: 'Water',
    accent: 'border-l-sky-500',
    badge: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  ELECTRICITY: {
    label: 'Electricity',
    accent: 'border-l-amber-500',
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  ROAD_TRANSPORT: {
    label: 'Road & Transport',
    accent: 'border-l-stone-500',
    badge: 'bg-stone-100 text-stone-800 border-stone-200',
  },
  EDUCATION: {
    label: 'Education',
    accent: 'border-l-indigo-500',
    badge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  HEALTH: {
    label: 'Health',
    accent: 'border-l-rose-500',
    badge: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  EMPLOYMENT: {
    label: 'Employment',
    accent: 'border-l-emerald-500',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  CORRUPTION_ADMINISTRATIVE: {
    label: 'Corruption & Administrative',
    accent: 'border-l-orange-500',
    badge: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  OTHER: {
    label: 'Other',
    accent: 'border-l-rsp-navy',
    badge: 'bg-muted text-rsp-navy border-border',
  },
};

function getOptionLabel<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string
) {
  return options.find((option) => option.value === value)?.label ?? value.replace(/_/g, ' ');
}

function displayValue(value?: string | number | null) {
  if (value === undefined || value === null || value === '') {
    return <span className="text-muted-foreground">{EMPTY_CELL}</span>;
  }
  return value;
}

function DetailField({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-1', className)}>
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function DetailSection({
  title,
  icon: Icon,
  accent,
  children,
  className,
}: {
  title: string;
  icon: LucideIcon;
  accent: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn('overflow-hidden border-border/80 shadow-sm', accent, className)}>
      <CardHeader className="border-b border-border/60 bg-muted/30 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
            <Icon className="h-4 w-4 text-rsp-navy" />
          </div>
          <CardTitle className="text-base font-semibold text-rsp-navy">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

export function ComplaintDetails({ complaint }: ComplaintDetailsProps) {
  const category = CATEGORY_STYLES[complaint.problemCategory];
  const genderLabel = getOptionLabel(GENDER_OPTIONS, complaint.gender);
  const affectedLabel = getOptionLabel(AFFECTED_PEOPLE_OPTIONS, complaint.affectedPeople);
  const locationLine = [complaint.village, complaint.tehsil, complaint.district, complaint.state]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-border/80 shadow-sm">
        <div className="tricolor-bar-thin" />
        <div className="flex flex-col gap-4 border-b border-border/60 bg-rsp-navy px-5 py-4 text-white md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo variant="document" showTagline={false} className="items-start text-left" />
            <div className="min-w-0">
              <p className="font-brand text-sm font-semibold leading-tight md:text-base">{BRAND_NAME}</p>
              <p className="text-xs text-white/75">{BRAND_PRODUCT} — Complaint Record</p>
              <p className="mt-1 text-[10px] tracking-wide text-rsp-saffron uppercase">राष्ट्र सर्वोपरि</p>
            </div>
          </div>
          <div className="shrink-0 md:text-right">
            <p className="text-[10px] font-medium tracking-wider text-white/60 uppercase">Case ID</p>
            <p className="font-mono text-lg font-semibold text-rsp-saffron">{complaint.caseId}</p>
          </div>
        </div>

        <div className="border-b border-border/60 bg-linear-to-r from-rsp-navy/4 via-white to-rsp-saffron/6 px-5 py-5 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14 border-2 border-rsp-saffron/25 shadow-sm">
                <AvatarFallback className="bg-rsp-navy text-base font-semibold text-white">
                  {getInitials(complaint.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-brand text-xl font-bold tracking-tight text-rsp-navy md:text-2xl">
                    {complaint.fullName}
                  </h2>
                  <Badge variant="success" className="font-medium">
                    Registered
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {locationLine || EMPTY_CELL}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    Filed {formatDate(complaint.submittedDate)}
                  </span>
                </div>
              </div>
            </div>
            <span
              className={cn(
                'inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold',
                category.badge
              )}
            >
              {category.label}
            </span>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <DetailSection title="Problem Details" icon={AlertCircle} accent="border-l-4 border-l-rsp-saffron">
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailField label="Category" value={category.label} />
                <DetailField label="Affected People" value={affectedLabel} />
              </div>
              <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
                <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Problem Description
                </p>
                <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                  {complaint.problemDescription}
                </p>
              </div>
            </div>
          </DetailSection>

          <DetailSection title="Personal Information" icon={User} accent="border-l-4 border-l-rsp-navy">
            <dl className="grid gap-4 sm:grid-cols-2">
              <DetailField label="Full Name" value={complaint.fullName} />
              <DetailField label="Father / Husband Name" value={complaint.fatherName} />
              <DetailField label="Age" value={complaint.age} />
              <DetailField label="Gender" value={genderLabel} />
              <DetailField
                label="Mobile"
                value={
                  <a href={`tel:${complaint.mobile}`} className="inline-flex items-center gap-1.5 hover:text-rsp-saffron">
                    <Phone className="h-3.5 w-3.5" />
                    {complaint.mobile}
                  </a>
                }
              />
              <DetailField label="Email" value={displayValue(complaint.email)} />
              <DetailField label="Education" value={displayValue(complaint.education)} />
              <DetailField label="Occupation" value={displayValue(complaint.occupation)} />
              <DetailField label="Family Members" value={complaint.familyMembers} />
            </dl>
          </DetailSection>

          <DetailSection title="Address Information" icon={MapPin} accent="border-l-4 border-l-rsp-green">
            <dl className="grid gap-4 sm:grid-cols-2">
              <DetailField label="Pincode" value={complaint.pincode} />
              <DetailField label="State" value={complaint.state} />
              <DetailField label="District" value={complaint.district} />
              <DetailField label="Post Office" value={complaint.postOffice} />
              <DetailField label="Village" value={displayValue(complaint.village)} />
              <DetailField label="Tehsil" value={displayValue(complaint.tehsil)} />
            </dl>
          </DetailSection>

          <DetailSection title="Authority Information" icon={Building2} accent="border-l-4 border-l-amber-500">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Contacted Authority
                </span>
                <Badge variant={complaint.contactedAuthority === 'YES' ? 'warning' : 'outline'}>
                  {complaint.contactedAuthority === 'YES' ? 'Yes' : 'No'}
                </Badge>
              </div>
              {complaint.contactedAuthority === 'YES' && complaint.authorityDetails ? (
                <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
                  <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Authority Details
                  </p>
                  <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                    {complaint.authorityDetails}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No prior authority contact recorded.</p>
              )}
            </div>
          </DetailSection>

          {complaint.suggestedSolution && (
            <DetailSection title="Suggested Solution" icon={Lightbulb} accent="border-l-4 border-l-emerald-500">
              <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {complaint.suggestedSolution}
              </p>
            </DetailSection>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-border/80 shadow-sm lg:sticky lg:top-20">
            <CardHeader className="border-b border-border/60 bg-muted/30 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                  <FileText className="h-4 w-4 text-rsp-navy" />
                </div>
                <CardTitle className="text-base font-semibold text-rsp-navy">Case Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              <DetailField label="Case ID" value={<span className="font-mono">{complaint.caseId}</span>} />
              <DetailField label="Category" value={category.label} />
              <DetailField label="District" value={complaint.district} />
              <DetailField label="Pincode" value={complaint.pincode} />
              <DetailField label="Submitted On" value={formatDate(complaint.submittedDate)} />
              <DetailField label="Last Updated" value={formatDate(complaint.updatedAt)} />
              <DetailField
                label="Filed By"
                value={
                  complaint.creator ? (
                    <div className="space-y-0.5">
                      <p>{complaint.creator.fullName}</p>
                      <p className="text-xs font-normal text-muted-foreground">{complaint.creator.email}</p>
                    </div>
                  ) : (
                    displayValue(null)
                  )
                }
              />
              <div className="rounded-lg border border-rsp-green/20 bg-rsp-green/5 p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rsp-green" />
                  <div>
                    <p className="text-sm font-medium text-rsp-navy">Declaration Accepted</p>
                    <p className="text-xs text-muted-foreground">
                      Complainant confirmed information is true and correct.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/80 shadow-sm">
            <CardHeader className="border-b border-border/60 bg-muted/30 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Users className="h-4 w-4 text-rsp-navy" />
                </div>
                <CardTitle className="text-base font-semibold text-rsp-navy">Impact</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-5">
              <DetailField label="Scope" value={affectedLabel} />
              <DetailField
                label="Category"
                value={getOptionLabel(PROBLEM_CATEGORY_OPTIONS, complaint.problemCategory)}
              />
              <div className="flex items-start gap-2 rounded-lg border border-border/70 bg-muted/20 p-3">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-rsp-navy" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  This record is maintained under Rashtra Sankalp Parishad — Samasya Manch for citizen grievance
                  tracking.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
