const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export interface AnimeSketchResponse {
  success: boolean;
  imageUrl?: string;
  prompt?: string;
  characterName?: string;
  error?: string;
}

/**
 * Generate anime-style sketch image for a character
 */
export const generateAnimeSketch = async (
  characterName: string
): Promise<AnimeSketchResponse> => {
  try {
    const url = `${BACKEND_URL}/api/anime-sketch/generate`;
    console.log('[generateAnimeSketch] Making POST request to:', url);
    console.log('[generateAnimeSketch] Character:', characterName);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ characterName }),
    });

    console.log('[generateAnimeSketch] Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate anime sketch');
    }

    const data: AnimeSketchResponse = await response.json();
    console.log('[generateAnimeSketch] Anime sketch generated successfully:', !!data.imageUrl);
    return data;
  } catch (error) {
    console.error('[generateAnimeSketch] Error generating anime sketch:', error);
    throw error;
  }
};
