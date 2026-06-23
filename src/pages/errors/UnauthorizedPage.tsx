import { Link } from 'react-router-dom';
import { ShieldX } from 'lucide-react';
import { PageContainer } from '@/components/common/PageContainer';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

export function UnauthorizedPage() {
  return (
    <PageContainer className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <ShieldX className="h-16 w-16 text-destructive" />
      <h1 className="mt-4 text-2xl font-bold">Unauthorized</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        You do not have permission to access this page. Contact your administrator if you believe this is an error.
      </p>
      <Button asChild className="mt-6">
        <Link to={ROUTES.DASHBOARD}>Go to Dashboard</Link>
      </Button>
    </PageContainer>
  );
}
