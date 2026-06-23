import { BRAND_LOGO_SRC, BRAND_LOGIN_LOGO_SRC, BRAND_NAME, BRAND_PRODUCT } from '@/constants/brand';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  showTagline?: boolean;
  variant?: 'default' | 'compact' | 'document';
}

export function BrandLogo({
  className,
  imageClassName,
  showTagline = true,
  variant = 'default',
}: BrandLogoProps) {
  const variants = {
    default: {
      src: BRAND_LOGIN_LOGO_SRC,
      className: 'h-44 w-auto max-w-[300px]',
      width: 300,
      height: 300,
    },
    compact: {
      src: BRAND_LOGO_SRC,
      className: 'h-24 w-auto max-w-[180px]',
      width: 180,
      height: 180,
    },
    document: {
      src: BRAND_LOGO_SRC,
      className: 'h-32 w-auto max-w-[220px]',
      width: 220,
      height: 220,
    },
  };

  const config = variants[variant];

  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <img
        src={config.src}
        alt={BRAND_NAME}
        width={config.width}
        height={config.height}
        decoding="async"
        fetchPriority={variant === 'default' ? 'high' : undefined}
        className={cn('object-contain', config.className, imageClassName)}
      />
      {showTagline && variant === 'default' && (
        <p className="mt-4 text-sm font-medium text-rsp-saffron">
          {BRAND_PRODUCT} — Complaint Management
        </p>
      )}
    </div>
  );
}
