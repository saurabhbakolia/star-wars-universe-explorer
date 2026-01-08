import { useMutation } from '@tanstack/react-query';
import { generateAnimeSketch } from '../lib/api/animeSketchApi';

/**
 * Hook to generate anime-style sketch images for characters
 */
export const useAnimeSketch = () => {
  const generateSketchMutation = useMutation({
    mutationFn: generateAnimeSketch,
  });

  const generateSketch = (characterName: string) => {
    console.log('[useAnimeSketch] generateSketch() called for:', characterName);
    generateSketchMutation.mutate(characterName);
  };

  return {
    imageUrl: generateSketchMutation.data?.imageUrl,
    prompt: generateSketchMutation.data?.prompt,
    isLoading: generateSketchMutation.isPending,
    isError: generateSketchMutation.isError,
    error: generateSketchMutation.error,
    generateSketch,
  };
};
