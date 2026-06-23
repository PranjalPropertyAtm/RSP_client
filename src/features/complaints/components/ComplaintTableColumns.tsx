import { Link, useNavigate } from 'react-router-dom';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { RowActionMenu } from '@/components/data-table/row-action-menu';
import { ROUTES } from '@/constants/routes';
import { EMPTY_CELL, tableTypography } from '@/lib/typography';
import { cn, formatDate } from '@/lib/utils';
import type { Complaint } from '@/types';

function ComplaintRowActions({ complaintId }: { complaintId: string }) {
  const navigate = useNavigate();

  return (
    <RowActionMenu
      actions={[
        {
          label: 'View details',
          onClick: () => navigate(ROUTES.COMPLAINTS.DETAILS(complaintId)),
        },
      ]}
    />
  );
}

export const complaintColumns: ColumnDef<Complaint>[] = [
  {
    accessorKey: 'caseId',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Case ID" />,
    enableSorting: true,
    size: 110,
    minSize: 96,
    meta: { sticky: true },
    cell: ({ row }) => (
      <span className={cn(tableTypography.cellNumeric, 'font-mono whitespace-nowrap')}>
        {row.original.caseId}
      </span>
    ),
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Complainant" />,
    enableSorting: true,
    size: 140,
    minSize: 120,
    meta: { sticky: true },
    cell: ({ row }) =>
      row.original.fullName ? (
        <Link
          to={ROUTES.COMPLAINTS.DETAILS(row.original.id)}
          className={cn(tableTypography.cellLink, 'whitespace-nowrap')}
        >
          {row.original.fullName}
        </Link>
      ) : (
        <span className={tableTypography.emptyValue}>{EMPTY_CELL}</span>
      ),
  },
  {
    id: 'creator',
    accessorFn: (row) => row.creator?.fullName ?? '',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Added By" />,
    enableSorting: true,
    cell: ({ row }) =>
      row.original.creator?.fullName ? (
        <span className={tableTypography.cell}>{row.original.creator.fullName}</span>
      ) : (
        <span className={tableTypography.emptyValue}>{EMPTY_CELL}</span>
      ),
  },
  {
    accessorKey: 'problemCategory',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    enableSorting: true,
    cell: ({ row }) => row.original.problemCategory.replace(/_/g, ' ').toLowerCase(),
  },
  {
    accessorKey: 'district',
    header: ({ column }) => <DataTableColumnHeader column={column} title="District" />,
    enableSorting: true,
    cell: ({ row }) => row.original.district || <span className={tableTypography.emptyValue}>{EMPTY_CELL}</span>,
  },
  {
    accessorKey: 'pincode',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pincode" />,
    enableSorting: true,
    cell: ({ row }) => (
      <span className={tableTypography.cellNumeric}>
        {row.original.pincode || EMPTY_CELL}
      </span>
    ),
  },
  {
    accessorKey: 'postOffice',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Post Office" />,
    enableSorting: true,
    cell: ({ row }) =>
      row.original.postOffice || <span className={tableTypography.emptyValue}>{EMPTY_CELL}</span>,
  },
  {
    accessorKey: 'mobile',
    header: 'Mobile',
    cell: ({ row }) => (
      <span className={tableTypography.cellNumeric}>{row.original.mobile || EMPTY_CELL}</span>
    ),
  },
  {
    accessorKey: 'submittedDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Submitted On" />,
    enableSorting: true,
    cell: ({ row }) => (
      <span className={tableTypography.cellNumeric}>{formatDate(row.original.submittedDate)}</span>
    ),
  },
  {
    id: 'actions',
    header: '',
    enableHiding: false,
    size: 48,
    minSize: 48,
    maxSize: 48,
    cell: ({ row }) => <ComplaintRowActions complaintId={row.original.id} />,
  },
];
