import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { BrandLogo } from '@/components/common/BrandLogo';

export function AuthLayout() {
  useEffect(() => {
    void import('@fontsource/noto-sans-devanagari/devanagari-400.css');
  }, []);
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-auth-pattern">
      <div className="tricolor-bar w-full shrink-0" />

      <div className="flex flex-1 items-center justify-center p-4 py-10">
        <div className="w-full max-w-md space-y-8">
          <BrandLogo variant="default" />
          <Outlet />
        </div>
      </div>

      <footer className="pb-6 text-center text-xs text-muted-foreground">
        राष्ट्र सर्वोपरि — Nation First
      </footer>
    </div>
  );
}
