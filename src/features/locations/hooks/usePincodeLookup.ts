import { useQuery } from '@tanstack/react-query';
import { locationsApi } from '@/features/locations/api/locations.api';
import { useDebounce } from '@/hooks/useDebounce';

export function usePincodeLookup(pincode: string) {
  const debouncedPincode = useDebounce(pincode, 400);

  return useQuery({
    queryKey: ['locations', 'pincode', debouncedPincode],
    queryFn: () => locationsApi.getByPincode(debouncedPincode),
    enabled: /^\d{6}$/.test(debouncedPincode),
    retry: false,
  });
}
