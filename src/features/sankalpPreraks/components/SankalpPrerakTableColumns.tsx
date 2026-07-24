import { useNavigate } from 'react-router-dom';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { RowActionMenu } from '@/components/data-table/row-action-menu';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ROUTES } from '@/constants/routes';
import { RECORD_STATUS_LABELS } from '@/constants/village-module';
import { EMPTY_CELL, tableTypography } from '@/lib/typography';
import type { SankalpPrerak } from '@/types';

function PrerakRowActions({ prerak }: { prerak: SankalpPrerak }) {
  const navigate = useNavigate();
  return (
    <RowActionMenu
      actions={[
        { label: 'View Profile', onClick: () => navigate(ROUTES.SANKALP_PRERAKS.PROFILE(prerak.id)) },
        { label: 'Edit', onClick: () => navigate(ROUTES.SANKALP_PRERAKS.EDIT(prerak.id)) },
      ]}
    />
  );
}

export const sankalpPrerakColumns: ColumnDef<SankalpPrerak>[] = [
  {
    accessorKey: 'employeeCode',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
    enableSorting: true,
    cell: ({ row }) => <span className={tableTypography.cellLink}>{row.original.employeeCode}</span>,
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    enableSorting: true,
  },
  {
    accessorKey: 'mobileNumber',
    header: 'Mobile',
  },
  {
    id: 'village',
    header: 'Village',
    cell: ({ row }) => row.original.village?.villageName ?? EMPTY_CELL,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <StatusBadge variant={row.original.status === 'ACTIVE' ? 'success' : 'danger'}>
        {RECORD_STATUS_LABELS[row.original.status].toLowerCase()}
      </StatusBadge>
    ),
  },
  {
    id: 'actions',
    header: '',
    size: 48,
    cell: ({ row }) => <PrerakRowActions prerak={row.original} />,
  },
];
