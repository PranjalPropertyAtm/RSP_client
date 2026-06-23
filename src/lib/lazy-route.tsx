import { lazy, Suspense, type ComponentType } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function lazyRoute<M extends Record<string, ComponentType>>(
  loader: () => Promise<M>,
  exportName: keyof M & string
) {
  const LazyComponent = lazy(() =>
    loader().then((module) => ({ default: module[exportName] as ComponentType }))
  );

  return function LazyRoute() {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyComponent />
      </Suspense>
    );
  };
}
