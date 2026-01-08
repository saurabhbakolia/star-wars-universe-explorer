import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { useFavoritesStore } from '../store/favoritesStore';
import { extractIdFromUrl, formatNumber } from '../lib/utils';
import type { Starship } from '../lib/schemas/swapi';

interface StarshipCardProps {
  starship: Starship;
}

export const StarshipCard = ({ starship }: StarshipCardProps) => {
  const navigate = useNavigate();
  const { isStarshipFavorite, addStarship, removeStarship } = useFavoritesStore();
  const isFavorite = isStarshipFavorite(starship.url);
  const starshipId = extractIdFromUrl(starship.url);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeStarship(starship.url);
    } else {
      addStarship(starship.url);
    }
  };

  const handleCardClick = () => {
    navigate(`/starships/${starshipId}`);
  };

  return (
    <Card hover onClick={handleCardClick}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base sm:text-lg md:text-xl break-words flex-1 min-w-0">{starship.name}</CardTitle>
          <button
            onClick={handleFavoriteToggle}
            className="text-sw-gold hover:text-sw-gold/80 transition-colors flex-shrink-0"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-sw-gray/70">Model:</span>
            <span className="text-sw-gray break-words text-right">{starship.model}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sw-gray/70">Class:</span>
            <span className="text-sw-gray capitalize">{starship.starship_class}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sw-gray/70">Cost:</span>
            <span className="text-sw-gold break-words text-right">
              {starship.cost_in_credits === 'unknown' 
                ? 'Unknown' 
                : `${formatNumber(starship.cost_in_credits)} credits`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sw-gray/70">Hyperdrive:</span>
            <span className="text-sw-gray">{starship.hyperdrive_rating}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3 sm:mt-4 text-xs sm:text-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
