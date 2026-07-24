import { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadsApi } from '@/lib/uploads.api';
import { cn } from '@/lib/utils';

interface FileUploadFieldProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  className?: string;
}

export function FileUploadField({
  label,
  value,
  onChange,
  accept = 'image/jpeg,image/png,image/webp,application/pdf',
  className,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setIsUploading(true);
    try {
      const result = await uploadsApi.uploadSingle(file);
      onChange(result.url);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <p className="text-sm font-medium text-rsp-navy">{label}</p>
      {value ? (
        <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
          {value.match(/\.(jpg|jpeg|png|webp)$/i) ? (
            <img src={value} alt={label} className="h-16 w-16 rounded object-cover" />
          ) : (
            <a href={value} target="_blank" rel="noreferrer" className="text-sm text-rsp-saffron underline">
              View uploaded file
            </a>
          )}
          <Button type="button" variant="ghost" size="icon-sm" onClick={() => onChange('')}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full justify-start gap-2"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {isUploading ? 'Uploading...' : 'Choose file'}
        </Button>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
