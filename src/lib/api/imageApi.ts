import type { Character } from '../schemas/swapi';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export interface ImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  cached?: boolean;
  characterName?: string;
  error?: string;
}

export interface CharacterImageData extends Character {}

/**
 * Generate AI image for a character
 * IMPORTANT: This should ONLY be called when user explicitly clicks "Generate Image" button
 */
export const generateCharacterImage = async (
  character: CharacterImageData
): Promise<ImageGenerationResponse> => {
  try {
    const url = `${BACKEND_URL}/api/images/generate`;
    console.log('[generateCharacterImage] Making POST request to:', url);
    console.log('[generateCharacterImage] Character:', character.name);
    
    // Use axios directly for the backend API call
    const response = await fetch(url, {
      method: 'POST', // Explicitly set method to POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });

    console.log('[generateCharacterImage] Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate image');
    }

    const data: ImageGenerationResponse = await response.json();
    console.log('[generateCharacterImage] Image generated successfully:', !!data.imageUrl);
    return data;
  } catch (error) {
    console.error('[generateCharacterImage] Error generating character image:', error);
    throw error;
  }
};

/**
 * Get cached image for a character by ID
 * Returns null if no cached image exists (404) - this is normal and not an error
 * IMPORTANT: This ONLY makes GET requests - it NEVER generates images
 * Network errors (like "Failed to fetch") are handled gracefully and return null
 */
export const getCharacterImage = async (
  characterId: string
): Promise<ImageGenerationResponse | null> => {
  try {
    const url = `${BACKEND_URL}/api/images/${characterId}`;
    console.log('[getCharacterImage] Making GET request to:', url);
    
    const response = await fetch(url, {
      method: 'GET', // Explicitly set method to GET
    });

    console.log('[getCharacterImage] Response status:', response.status);

    if (!response.ok) {
      if (response.status === 404) {
        // 404 is expected if no cached image exists - return null instead of error
        console.log('[getCharacterImage] No cached image found (404) - returning null');
        return null;
      }
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to retrieve image');
    }

    const data: ImageGenerationResponse = await response.json();
    console.log('[getCharacterImage] Cached image found:', !!data.imageUrl);
    return data;
  } catch (error) {
    // Handle network errors gracefully - don't throw, just return null
    // This prevents React Query from treating network failures as critical errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.warn('[getCharacterImage] Network error (backend may not be running):', error.message);
      console.warn('[getCharacterImage] Returning null - no cached image available');
      return null;
    }
    // For other errors, log but still return null to prevent breaking the UI
    console.error('[getCharacterImage] Error retrieving character image:', error);
    return null;
  }
};
