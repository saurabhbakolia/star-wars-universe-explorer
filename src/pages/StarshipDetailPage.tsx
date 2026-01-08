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
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        ← Back
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl mb-2">{starship.name}</CardTitle>
              <p className="text-sw-gray/70">{starship.model}</p>
            </div>
            <button
              onClick={() => {
                if (isFavorite) {
                  removeStarship(starship.url);
                } else {
                  addStarship(starship.url);
                }
              }}
              className="text-sw-gold hover:text-sw-gold/80 transition-colors"
            >
              {isFavorite ? (
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-sw-gold mb-4">Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Class:</span>
                  <span className="text-sw-gray capitalize">{starship.starship_class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Manufacturer:</span>
                  <span className="text-sw-gray">{starship.manufacturer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Length:</span>
                  <span className="text-sw-gray">{starship.length} m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Cost:</span>
                  <span className="text-sw-gold">
                    {starship.cost_in_credits === 'unknown'
                      ? 'Unknown'
                      : `${formatNumber(starship.cost_in_credits)} credits`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Hyperdrive Rating:</span>
                  <span className="text-sw-gray">{starship.hyperdrive_rating}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sw-gold mb-4">Crew & Capacity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Crew:</span>
                  <span className="text-sw-gray">{starship.crew}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Passengers:</span>
                  <span className="text-sw-gray">{starship.passengers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Cargo Capacity:</span>
                  <span className="text-sw-gray">{starship.cargo_capacity} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Consumables:</span>
                  <span className="text-sw-gray">{starship.consumables}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">MGLT:</span>
                  <span className="text-sw-gray">{starship.MGLT}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Pilots:</span>
                  <span className="text-sw-gray">{starship.pilots.length}</span>
                </div>
                <div className="flex justify-between">
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
