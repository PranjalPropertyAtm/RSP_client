import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize leading-none',
  {
    variants: {
      variant: {
        success: 'border-transparent bg-emerald-100 text-emerald-800',
        warning: 'border-transparent bg-amber-100 text-amber-800',
        danger: 'border-transparent bg-red-100 text-red-800',
        neutral: 'border-border bg-transparent text-foreground',
        primary: 'border-transparent bg-primary text-white',
        info: 'border-transparent bg-secondary text-white',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {}

export function StatusBadge({ className, variant, children, ...props }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
