import { useNavigate } from 'react-router-dom';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { RowActionMenu } from '@/components/data-table/row-action-menu';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ROUTES } from '@/constants/routes';
import { RECORD_STATUS_LABELS } from '@/constants/village-module';
import { EMPTY_CELL, tableTypography } from '@/lib/typography';
import { useAuthStore } from '@/stores/auth.store';
import { ROLES } from '@/constants/roles';
import type { Village } from '@/types';

function VillageRowActions({ village }: { village: Village }) {
  const navigate = useNavigate();
  const isAdmin = useAuthStore((s) => s.user?.role === ROLES.ADMIN);

  const actions = [
    { label: 'View', onClick: () => navigate(ROUTES.VILLAGES.DETAILS(village.id)) },
    ...(isAdmin
      ? [
          { label: 'Edit', onClick: () => navigate(ROUTES.VILLAGES.EDIT(village.id)) },
          {
            label: 'Add Sankalp Prerak',
            onClick: () => navigate(ROUTES.VILLAGES.ADD_PRERAK(village.id)),
          },
        ]
      : []),
  ];

  return <RowActionMenu actions={actions} />;
}

export const villageColumns: ColumnDef<Village>[] = [
  {
    accessorKey: 'villageCode',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Village Code" />,
    enableSorting: true,
    cell: ({ row }) => (
      <span className={tableTypography.cellLink}>{row.original.villageCode}</span>
    ),
  },
  {
    accessorKey: 'villageName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Village Name" />,
    enableSorting: true,
  },
  {
    accessorKey: 'gramPanchayat',
    header: 'Gram Panchayat',
    cell: ({ row }) => row.original.gramPanchayat || EMPTY_CELL,
  },
  {
    accessorKey: 'block',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Block" />,
    enableSorting: true,
  },
  {
    accessorKey: 'district',
    header: ({ column }) => <DataTableColumnHeader column={column} title="District" />,
    enableSorting: true,
  },
  {
    accessorKey: 'totalFamilies',
    header: 'Total Families',
    cell: ({ row }) => row.original.totalFamilies ?? EMPTY_CELL,
  },
  {
    id: 'assignedPrerak',
    header: 'Assigned Sankalp Prerak',
    cell: ({ row }) => {
      const prerak = row.original.sankalpPreraks?.[0];
      return prerak ? prerak.fullName : <span className={tableTypography.emptyValue}>{EMPTY_CELL}</span>;
    },
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
    enableHiding: false,
    size: 48,
    cell: ({ row }) => <VillageRowActions village={row.original} />,
  },
];
