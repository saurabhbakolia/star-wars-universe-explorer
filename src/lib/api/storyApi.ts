import { apiClient } from './client';
import type { Character } from '../schemas/swapi';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export interface StoryGenerationResponse {
  success: boolean;
  story?: string;
  cached?: boolean;
  characterName?: string;
  error?: string;
  createdAt?: string;
}

export interface CharacterStoryData extends Character {}

/**
 * Generate AI story for a character
 * IMPORTANT: This should ONLY be called when user explicitly clicks "Generate Story" button
 */
export const generateCharacterStory = async (
  character: CharacterStoryData
): Promise<StoryGenerationResponse> => {
  try {
    const url = `${BACKEND_URL}/api/stories/generate`;
    console.log('[generateCharacterStory] Making POST request to:', url);
    console.log('[generateCharacterStory] Character:', character.name);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });

    console.log('[generateCharacterStory] Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate story');
    }

    const data: StoryGenerationResponse = await response.json();
    console.log('[generateCharacterStory] Story generated successfully:', !!data.story);
    return data;
  } catch (error) {
    console.error('[generateCharacterStory] Error generating character story:', error);
    throw error;
  }
};

/**
 * Get cached story for a character by ID
 * Returns null if no cached story exists (404) - this is normal and not an error
 * IMPORTANT: This ONLY makes GET requests - it NEVER generates stories
 * Network errors (like "Failed to fetch") are handled gracefully and return null
 */
export const getCharacterStory = async (
  characterId: string
): Promise<StoryGenerationResponse | null> => {
  try {
    const url = `${BACKEND_URL}/api/stories/${characterId}`;
    console.log('[getCharacterStory] Making GET request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
    });

    console.log('[getCharacterStory] Response status:', response.status);

    if (!response.ok) {
      if (response.status === 404) {
        // 404 is expected if no cached story exists - return null instead of error
        console.log('[getCharacterStory] No cached story found (404) - returning null');
        return null;
      }
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to retrieve story');
    }

    const data: StoryGenerationResponse = await response.json();
    console.log('[getCharacterStory] Cached story found:', !!data.story);
    return data;
  } catch (error) {
    // Handle network errors gracefully - don't throw, just return null
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.warn('[getCharacterStory] Network error (backend may not be running):', error.message);
      console.warn('[getCharacterStory] Returning null - no cached story available');
      return null;
    }
    // For other errors, log but still return null to prevent breaking the UI
    console.error('[getCharacterStory] Error retrieving character story:', error);
    return null;
  }
};
