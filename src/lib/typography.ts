/** Table-specific typography tokens */
export const tableTypography = {
  header: 'text-xs font-semibold text-muted-foreground',
  cell: 'text-xs font-medium text-foreground',
  cellMuted: 'text-xs text-muted-foreground',
  cellNumeric: 'text-xs font-medium tabular-nums text-foreground',
  cellWarning: 'text-xs font-medium text-amber-700 dark:text-amber-400',
  cellLink: 'text-xs font-medium transition-colors hover:text-primary',
  emptyValue: 'text-muted-foreground',
} as const;

export const EMPTY_CELL = '—';
