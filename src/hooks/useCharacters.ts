import { useQuery } from '@tanstack/react-query';
import { swapiService } from '../lib/api/swapi';

export const useCharacters = () => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: () => swapiService.getCharacters(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

export const useCharacter = (id: string) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => swapiService.getCharacter(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCharacterByUrl = (url: string) => {
  return useQuery({
    queryKey: ['character', url],
    queryFn: () => swapiService.getCharacterByUrl(url),
    enabled: !!url,
    staleTime: 5 * 60 * 1000,
  });
};
