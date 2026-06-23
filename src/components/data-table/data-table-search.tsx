import { useEffect, useState } from 'react';
import { SearchInput } from '@/components/shared/SearchInput';

interface DataTableSearchProps {
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export function DataTableSearch({
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Search...',
  debounceMs = 300,
  className,
}: DataTableSearchProps) {
  const [localValue, setLocalValue] = useState(value ?? defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => onChange(localValue), debounceMs);
    return () => clearTimeout(timer);
  }, [localValue, debounceMs, onChange]);

  return (
    <SearchInput
      value={localValue}
      onChange={setLocalValue}
      placeholder={placeholder}
      containerClassName={className}
      className="h-8 pl-8 text-xs"
    />
  );
}
