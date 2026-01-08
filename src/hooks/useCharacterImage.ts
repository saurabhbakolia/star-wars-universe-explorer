import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateCharacterImage, getCharacterImage } from '../lib/api/imageApi';
import { extractIdFromUrl } from '../lib/utils';
import type { Character } from '../lib/schemas/swapi';

/**
 * Hook to generate and retrieve character images
 * IMPORTANT: This hook ONLY fetches cached images on mount. 
 * It NEVER automatically generates images. Generation must be explicitly triggered via generateImage()
 */
export const useCharacterImage = (character: Character | null) => {
  const queryClient = useQueryClient();
  const characterId = character ? extractIdFromUrl(character.url) : null;

  // Query for existing image - ONLY checks for cached images, NEVER generates
  // This is the ONLY automatic request - it only fetches cached images from the database
  // IMPORTANT: Even if this fails, it will NEVER automatically trigger generation
  const imageQuery = useQuery({
    queryKey: ['characterImage', characterId],
    queryFn: async () => {
      console.log('[useCharacterImage] Query function called - fetching cached image for:', characterId);
      // Explicitly only fetch cached images - this calls GET /api/images/:characterId
      // which only returns cached images and never generates new ones
      const result = await getCharacterImage(characterId!);
      // Return null if no cached image exists (404) or network error - this is normal, not an error
      console.log('[useCharacterImage] Query result:', result ? 'cached image found' : 'no cached image');
      return result || null;
    },
    enabled: !!characterId, // Only run if we have a character ID
    staleTime: Infinity, // Images don't change, cache forever
    retry: false, // Don't retry on any error - missing images are normal
    gcTime: Infinity, // Keep in cache indefinitely
    // Never throw errors - treat all failures (including network errors) as "no cached image"
    throwOnError: false,
  });

  // Mutation to generate new image - ONLY called when generateImage() is explicitly invoked
  const generateImageMutation = useMutation({
    mutationFn: generateCharacterImage,
    onSuccess: (data) => {
      if (characterId) {
        // Update the query cache with the newly generated image
        queryClient.setQueryData(['characterImage', characterId], {
          ...data,
          cached: data.cached ?? false,
        });
      }
    },
  });

  const generateImage = () => {
    console.log('[useCharacterImage] generateImage() called explicitly by user');
    if (character) {
      // This is the ONLY place that triggers image generation
      // It calls POST /api/images/generate
      console.log('[useCharacterImage] Calling mutation to generate image for:', character.name);
      generateImageMutation.mutate(character);
    } else {
      console.warn('[useCharacterImage] generateImage() called but character is null');
    }
  };

  // Return cached image from query if available, otherwise return mutation result if image was just generated
  // imageQuery.data will be null if no cached image exists (404), which is normal and not an error
  const cachedImage = imageQuery.data;
  const generatedImage = generateImageMutation.data;
  
  return {
    imageUrl: cachedImage?.imageUrl || generatedImage?.imageUrl,
    isLoading: imageQuery.isLoading || generateImageMutation.isPending,
    // Only show error for real errors, not missing cached images (null is normal)
    isError: imageQuery.isError || generateImageMutation.isError,
    error: imageQuery.error || generateImageMutation.error,
    // Mark as cached if it came from the query (existing image) or if mutation returned cached=true
    isCached: cachedImage?.cached ?? generatedImage?.cached ?? false,
    generateImage, // Function to explicitly trigger generation - never called automatically
    refetch: imageQuery.refetch,
  };
};
