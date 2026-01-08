import { useParams, useNavigate } from 'react-router-dom';
import { useStarship } from '../hooks/useStarships';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { useFavoritesStore } from '../store/favoritesStore';
import { formatNumber } from '../lib/utils';

export const StarshipDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: starship, isLoading, isError, error } = useStarship(id || '');
  const { isStarshipFavorite, addStarship, removeStarship } = useFavoritesStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !starship) {
    return (
      <ErrorDisplay
        message={error instanceof Error ? error.message : 'Starship not found'}
        onRetry={() => navigate('/starships')}
      />
    );
  }

  const isFavorite = isStarshipFavorite(starship.url);

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 sm:mb-6 text-sm sm:text-base">
        ← Back
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 break-words">{starship.name}</CardTitle>
              <p className="text-xs sm:text-sm text-sw-gray/70 break-words">{starship.model}</p>
            </div>
            <button
              onClick={() => {
                if (isFavorite) {
                  removeStarship(starship.url);
                } else {
                  addStarship(starship.url);
                }
              }}
              className="text-sw-gold hover:text-sw-gold/80 transition-colors flex-shrink-0"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? (
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-sw-gold mb-3 sm:mb-4">Specifications</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-sw-gray/70">Class:</span>
                  <span className="text-sw-gray capitalize break-words">{starship.starship_class}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-sw-gray/70">Manufacturer:</span>
                  <span className="text-sw-gray break-words">{starship.manufacturer}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-sw-gray/70">Length:</span>
                  <span className="text-sw-gray">{starship.length} m</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-sw-gray/70">Cost:</span>
                  <span className="text-sw-gold break-words">
                    {starship.cost_in_credits === 'unknown'
                      ? 'Unknown'
                      : `${formatNumber(starship.cost_in_credits)} credits`}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-sw-gray/70">Hyperdrive Rating:</span>
                  <span className="text-sw-gray">{starship.hyperdrive_rating}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-sw-gold mb-3 sm:mb-4">Crew & Capacity</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-sw-gray/70">Crew:</span>
                  <span className="text-sw-gray">{starship.crew}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-sw-gray/70">Passengers:</span>
                  <span className="text-sw-gray">{starship.passengers}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-sw-gray/70">Cargo Capacity:</span>
                  <span className="text-sw-gray">{starship.cargo_capacity} kg</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-sw-gray/70">Consumables:</span>
                  <span className="text-sw-gray">{starship.consumables}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-sw-gray/70">MGLT:</span>
                  <span className="text-sw-gray">{starship.MGLT}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-sw-gray/70">Pilots:</span>
                  <span className="text-sw-gray">{starship.pilots.length}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-sw-gray/70">Films:</span>
                  <span className="text-sw-gray">{starship.films.length}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
