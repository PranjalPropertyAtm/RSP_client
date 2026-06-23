import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface RowAction {
  label: string;
  onClick: () => void;
  destructive?: boolean;
  disabled?: boolean;
  separator?: boolean;
}

interface RowActionMenuProps {
  actions: RowAction[];
}

export function RowActionMenu({ actions }: RowActionMenuProps) {
  if (!actions.length) return null;

  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center" onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
            <MoreHorizontal className="h-3.5 w-3.5" />
            <span className="sr-only">Open row actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {actions.map((action, index) => (
            <div key={`${action.label}-${index}`}>
              {action.separator && index > 0 && <DropdownMenuSeparator />}
              <DropdownMenuItem
                disabled={action.disabled}
                className={action.destructive ? 'text-destructive focus:text-destructive' : undefined}
                onClick={action.onClick}
              >
                {action.label}
              </DropdownMenuItem>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
