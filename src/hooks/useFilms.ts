import { useQuery } from '@tanstack/react-query';
import { swapiService } from '../lib/api/swapi';

export const useFilms = () => {
  return useQuery({
    queryKey: ['films'],
    queryFn: () => swapiService.getFilms(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFilm = (id: string) => {
  return useQuery({
    queryKey: ['film', id],
    queryFn: () => swapiService.getFilm(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
