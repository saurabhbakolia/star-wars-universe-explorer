import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useFilms } from '../hooks/useFilms';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { Button } from '../components/ui/Button';
import { formatDate } from '../lib/utils';

const ITEMS_PER_PAGE = 6;

export const FilmsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch } = useFilms();
  const pageRef = useRef(page);
  const isInitialMount = useRef(true);

  // Update ref when page changes
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  // Sort films by episode_id
  const sortedFilms = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => a.episode_id - b.episode_id);
  }, [data]);

  const totalPages = Math.ceil(sortedFilms.length / ITEMS_PER_PAGE);

  // Only reset page on initial mount if needed, not on every data change
  useEffect(() => {
    if (isInitialMount.current && data && totalPages > 0) {
      isInitialMount.current = false;
      if (pageRef.current > totalPages) {
        setPage(1);
      }
    }
  }, [data, totalPages]);

  // Stable handlers
  const handlePrevious = useCallback(() => {
    setPage((p) => {
      const newPage = Math.max(1, p - 1);
      return newPage;
    });
  }, []);

  const handleNext = useCallback(() => {
    setPage((p) => {
      const newPage = Math.min(totalPages, p + 1);
      return newPage;
    });
  }, [totalPages]);

  // Paginate films - use page directly, not computed currentPage
  const paginatedFilms = useMemo(() => {
    const validPage = totalPages > 0 ? Math.min(Math.max(1, page), totalPages) : 1;
    const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
    return sortedFilms.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedFilms, page, totalPages]);

  const currentPage = totalPages > 0 ? Math.min(Math.max(1, page), totalPages) : 1;

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
        message={error instanceof Error ? error.message : 'Failed to load films'}
        onRetry={() => refetch()}
      />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-sw-gold mb-4">Films</h1>
        <p className="text-sw-gray/70 mb-6">
          Explore the complete Star Wars saga in chronological order ({sortedFilms.length} total)
        </p>
      </div>

      {sortedFilms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sw-gray/70 text-lg">No films found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedFilms.map((film) => (
              <Card key={film.url} hover>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-2xl">Episode {film.episode_id}</CardTitle>
                    <span className="text-sw-gold text-sm font-semibold">
                      {formatDate(film.release_date)}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-sw-gray">{film.title}</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sw-gray/70 text-sm mb-2">Director</p>
                      <p className="text-sw-gray">{film.director}</p>
                    </div>
                    <div>
                      <p className="text-sw-gray/70 text-sm mb-2">Producer</p>
                      <p className="text-sw-gray">{film.producer}</p>
                    </div>
                    <div>
                      <p className="text-sw-gray/70 text-sm mb-2">Opening Crawl</p>
                      <p className="text-sw-gray text-sm line-clamp-3 italic">
                        {film.opening_crawl}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-sw-gray/70 text-xs">
                        {film.characters.length} Characters • {film.starships.length} Starships
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sw-gray">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentPage >= totalPages}
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
