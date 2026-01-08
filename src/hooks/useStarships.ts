import { useQuery } from '@tanstack/react-query';
import { swapiService } from '../lib/api/swapi';

export const useStarships = () => {
  return useQuery({
    queryKey: ['starships'],
    queryFn: () => swapiService.getStarships(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useStarship = (id: string) => {
  return useQuery({
    queryKey: ['starship', id],
    queryFn: () => swapiService.getStarship(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useStarshipByUrl = (url: string) => {
  return useQuery({
    queryKey: ['starship', url],
    queryFn: () => swapiService.getStarshipByUrl(url),
    enabled: !!url,
    staleTime: 5 * 60 * 1000,
  });
};
