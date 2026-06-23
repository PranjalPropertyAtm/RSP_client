import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FormActionsProps {
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelHref?: string;
}

export function FormActions({
  isSubmitting,
  submitLabel = 'Save',
  cancelHref,
}: FormActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end gap-3 border-t pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={() => (cancelHref ? navigate(cancelHref) : navigate(-1))}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : submitLabel}
      </Button>
    </div>
  );
}
