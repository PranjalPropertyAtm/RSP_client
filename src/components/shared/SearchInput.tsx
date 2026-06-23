import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchInputProps extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  containerClassName?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className,
  containerClassName,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn('relative max-w-sm', containerClassName)}>
      <Search className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn('h-9 bg-card pl-9', className)}
        {...props}
      />
    </div>
  );
}
