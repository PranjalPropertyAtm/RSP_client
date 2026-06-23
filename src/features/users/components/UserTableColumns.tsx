import { useNavigate } from 'react-router-dom';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { RowActionMenu } from '@/components/data-table/row-action-menu';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ROLE_LABELS } from '@/constants/roles';
import { ROUTES } from '@/constants/routes';
import { EMPTY_CELL, tableTypography } from '@/lib/typography';
import { cn, formatDate } from '@/lib/utils';
import type { User } from '@/types';

function UserRowActions({ userId }: { userId: string }) {
  const navigate = useNavigate();

  return (
    <RowActionMenu
      actions={[
        {
          label: 'Edit user',
          onClick: () => navigate(ROUTES.USERS.EDIT(userId)),
        },
        {
          label: 'Change password',
          onClick: () => navigate(`${ROUTES.USERS.EDIT(userId)}#password`),
        },
      ]}
    />
  );
}

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'fullName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    enableSorting: true,
    cell: ({ row }) => (
      <span className={tableTypography.cellLink}>{row.original.fullName || EMPTY_CELL}</span>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    enableSorting: true,
    cell: ({ row }) =>
      row.original.email || <span className={tableTypography.emptyValue}>{EMPTY_CELL}</span>,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    enableSorting: true,
    cell: ({ row }) => ROLE_LABELS[row.original.role],
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => (
      <StatusBadge variant={row.original.isActive ? 'success' : 'danger'}>
        {row.original.isActive ? 'active' : 'inactive'}
      </StatusBadge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    enableSorting: true,
    cell: ({ row }) => (
      <span className={cn(tableTypography.cellNumeric)}>{formatDate(row.original.createdAt)}</span>
    ),
  },
  {
    id: 'actions',
    header: '',
    enableHiding: false,
    size: 48,
    minSize: 48,
    maxSize: 48,
    cell: ({ row }) => <UserRowActions userId={row.original.id} />,
  },
];
