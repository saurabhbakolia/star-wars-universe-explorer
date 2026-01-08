import { useState, useMemo, useCallback } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import { CharacterCard } from '../components/CharacterCard';
import { SearchBar } from '../components/ui/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { Button } from '../components/ui/Button';

const ITEMS_PER_PAGE = 12;

export const CharactersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError, error, refetch } = useCharacters();

  // Reset to page 1 when search changes - use useCallback to stabilize
  const handleSearch = useCallback((query: string) => {
    setSearch(query);
    setPage(1);
  }, []);

  // Client-side filtering and pagination
  const filteredCharacters = useMemo(() => {
    if (!data) return [];
    if (!search) return data;
    return data.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE);

  // Stable pagination handlers
  const handlePrevious = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
  }, []);

  const handleNext = useCallback(() => {
    setPage((p) => Math.min(totalPages, p + 1));
  }, [totalPages]);

  const paginatedCharacters = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredCharacters.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCharacters, page]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorDisplay
        message={error instanceof Error ? error.message : 'Failed to load characters'}
        onRetry={() => refetch()}
      />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sw-gold mb-2 sm:mb-3 md:mb-4">Characters</h1>
        <p className="text-sm sm:text-base text-sw-gray/70 mb-4 sm:mb-6">
          Explore the vast universe of Star Wars characters ({filteredCharacters.length} total)
        </p>
        <SearchBar
          placeholder="Search characters by name..."
          onSearch={handleSearch}
          className="w-full sm:max-w-md"
        />
      </div>

      {filteredCharacters.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p className="text-base sm:text-lg text-sw-gray/70">No characters found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
            {paginatedCharacters.map((character) => (
              <CharacterCard key={character.url} character={character} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={page === 1}
                size="sm"
                className="w-full sm:w-auto"
              >
                Previous
              </Button>
              <span className="text-sm sm:text-base text-sw-gray">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={page >= totalPages}
                size="sm"
                className="w-full sm:w-auto"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
