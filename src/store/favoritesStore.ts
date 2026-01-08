import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
  favoriteCharacters: string[];
  favoriteStarships: string[];
  addCharacter: (url: string) => void;
  removeCharacter: (url: string) => void;
  addStarship: (url: string) => void;
  removeStarship: (url: string) => void;
  isCharacterFavorite: (url: string) => boolean;
  isStarshipFavorite: (url: string) => boolean;
  clearAll: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteCharacters: [],
      favoriteStarships: [],

      addCharacter: (url) =>
        set((state) => ({
          favoriteCharacters: state.favoriteCharacters.includes(url)
            ? state.favoriteCharacters
            : [...state.favoriteCharacters, url],
        })),

      removeCharacter: (url) =>
        set((state) => ({
          favoriteCharacters: state.favoriteCharacters.filter((u) => u !== url),
        })),

      addStarship: (url) =>
        set((state) => ({
          favoriteStarships: state.favoriteStarships.includes(url)
            ? state.favoriteStarships
            : [...state.favoriteStarships, url],
        })),

      removeStarship: (url) =>
        set((state) => ({
          favoriteStarships: state.favoriteStarships.filter((u) => u !== url),
        })),

      isCharacterFavorite: (url) => get().favoriteCharacters.includes(url),
      isStarshipFavorite: (url) => get().favoriteStarships.includes(url),

      clearAll: () =>
        set({
          favoriteCharacters: [],
          favoriteStarships: [],
        }),
    }),
    {
      name: 'sw-favorites-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
