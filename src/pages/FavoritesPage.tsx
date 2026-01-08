import { useQueries } from '@tanstack/react-query';
import { useFavoritesStore } from '../store/favoritesStore';
import { CharacterCard } from '../components/CharacterCard';
import { StarshipCard } from '../components/StarshipCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { swapiService } from '../lib/api/swapi';
import type { Character, Starship } from '../lib/schemas/swapi';

export const FavoritesPage = () => {
  const { favoriteCharacters, favoriteStarships } = useFavoritesStore();

  // Fetch all favorite characters
  const characterQueries = useQueries({
    queries: favoriteCharacters.map((url) => ({
      queryKey: ['character', url],
      queryFn: () => swapiService.getCharacterByUrl(url),
      staleTime: 5 * 60 * 1000,
    })),
  });

  // Fetch all favorite starships
  const starshipQueries = useQueries({
    queries: favoriteStarships.map((url) => ({
      queryKey: ['starship', url],
      queryFn: () => swapiService.getStarshipByUrl(url),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const characters = characterQueries
    .map((query) => query.data)
    .filter((data): data is Character => data !== undefined);

  const starships = starshipQueries
    .map((query) => query.data)
    .filter((data): data is Starship => data !== undefined);

  const isLoadingCharacters = characterQueries.some((query) => query.isLoading);
  const isLoadingStarships = starshipQueries.some((query) => query.isLoading);
  const isLoading = isLoadingCharacters || isLoadingStarships;

  const hasAnyFavorites = favoriteCharacters.length > 0 || favoriteStarships.length > 0;
  const hasAnyData = characters.length > 0 || starships.length > 0;

  if (isLoading && !hasAnyData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!hasAnyFavorites) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="mb-3 sm:mb-4">
          <svg
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto text-sw-gray/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-sw-gold mb-2">No Favorites Yet</h2>
        <p className="text-sm sm:text-base md:text-lg text-sw-gray/70 px-4">
          Start exploring and add your favorite characters and starships!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sw-gold mb-2 sm:mb-3 md:mb-4">Favorites</h1>
        <p className="text-sm sm:text-base text-sw-gray/70">
          Your favorite Star Wars characters and starships
        </p>
      </div>

      {favoriteCharacters.length > 0 && (
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-sw-gray">
              Characters ({characters.length})
            </h2>
            {isLoadingCharacters && (
              <LoadingSpinner size="sm" />
            )}
          </div>
          {characters.length === 0 && isLoadingCharacters ? (
            <div className="text-center py-6 sm:py-8">
              <LoadingSpinner size="md" />
            </div>
          ) : characters.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <p className="text-sm sm:text-base text-sw-gray/70">Failed to load favorite characters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {characters.map((character) => (
                <CharacterCard key={character.url} character={character} />
              ))}
            </div>
          )}
        </div>
      )}

      {favoriteStarships.length > 0 && (
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-sw-gray">
              Starships ({starships.length})
            </h2>
            {isLoadingStarships && (
              <LoadingSpinner size="sm" />
            )}
          </div>
          {starships.length === 0 && isLoadingStarships ? (
            <div className="text-center py-6 sm:py-8">
              <LoadingSpinner size="md" />
            </div>
          ) : starships.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <p className="text-sm sm:text-base text-sw-gray/70">Failed to load favorite starships</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {starships.map((starship) => (
                <StarshipCard key={starship.url} starship={starship} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
