import { BRAND_LOGO_SRC, BRAND_NAME } from '@/constants/brand';
import { cn } from '@/lib/utils';

interface BrandMarkProps {
  variant?: 'light' | 'dark';
  size?: 'default' | 'lg';
  className?: string;
}

const sizeStyles = {
  default: {
    logo: 'h-7 w-auto',
    logoDimensions: { width: 28, height: 28 },
    text: 'text-xs',
    gap: 'gap-2',
  },
  lg: {
    logo: 'h-10 w-auto',
    logoDimensions: { width: 40, height: 40 },
    text: 'text-sm',
    gap: 'gap-2.5',
  },
} as const;

export function BrandMark({ variant = 'light', size = 'default', className }: BrandMarkProps) {
  const styles = sizeStyles[size];

  return (
    <div className={cn('flex min-w-0 items-center', styles.gap, className)}>
      <img
        src={BRAND_LOGO_SRC}
        alt={BRAND_NAME}
        width={styles.logoDimensions.width}
        height={styles.logoDimensions.height}
        decoding="async"
        className={cn('shrink-0 object-contain', styles.logo)}
      />
      <span
        className={cn(
          'font-brand font-semibold leading-tight',
          styles.text,
          variant === 'light' ? 'text-rsp-navy' : 'text-white'
        )}
      >
        {BRAND_NAME}
      </span>
    </div>
  );
}
