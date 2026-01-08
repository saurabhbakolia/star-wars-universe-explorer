import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateCharacterStory, getCharacterStory } from '../lib/api/storyApi';
import { extractIdFromUrl } from '../lib/utils';
import type { Character } from '../lib/schemas/swapi';

/**
 * Hook to generate and retrieve character stories
 * IMPORTANT: This hook ONLY fetches cached stories on mount. 
 * It NEVER automatically generates stories. Generation must be explicitly triggered via generateStory()
 */
export const useCharacterStory = (character: Character | null) => {
  const queryClient = useQueryClient();
  const characterId = character ? extractIdFromUrl(character.url) : null;

  // Query for existing story - ONLY checks for cached stories, NEVER generates
  const storyQuery = useQuery({
    queryKey: ['characterStory', characterId],
    queryFn: async () => {
      console.log('[useCharacterStory] Query function called - fetching cached story for:', characterId);
      const result = await getCharacterStory(characterId!);
      console.log('[useCharacterStory] Query result:', result ? 'cached story found' : 'no cached story');
      return result || null;
    },
    enabled: !!characterId,
    staleTime: Infinity,
    retry: false,
    gcTime: Infinity,
    throwOnError: false,
  });

  // Mutation to generate new story - ONLY called when generateStory() is explicitly invoked
  const generateStoryMutation = useMutation({
    mutationFn: generateCharacterStory,
    onSuccess: (data) => {
      if (characterId) {
        // Update the query cache with the newly generated story
        queryClient.setQueryData(['characterStory', characterId], {
          ...data,
          cached: data.cached ?? false,
        });
      }
    },
  });

  const generateStory = () => {
    console.log('[useCharacterStory] generateStory() called explicitly by user');
    if (character) {
      console.log('[useCharacterStory] Calling mutation to generate story for:', character.name);
      generateStoryMutation.mutate(character);
    } else {
      console.warn('[useCharacterStory] generateStory() called but character is null');
    }
  };

  const cachedStory = storyQuery.data;
  const generatedStory = generateStoryMutation.data;
  
  return {
    story: cachedStory?.story || generatedStory?.story,
    isLoading: storyQuery.isLoading || generateStoryMutation.isPending,
    isError: storyQuery.isError || generateStoryMutation.isError,
    error: storyQuery.error || generateStoryMutation.error,
    isCached: cachedStory?.cached ?? generatedStory?.cached ?? false,
    generateStory, // Function to explicitly trigger generation - never called automatically
    refetch: storyQuery.refetch,
  };
};
