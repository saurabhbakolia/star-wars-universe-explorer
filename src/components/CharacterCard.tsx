import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { useFavoritesStore } from '../store/favoritesStore';
import { extractIdFromUrl } from '../lib/utils';
import type { Character } from '../lib/schemas/swapi';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const navigate = useNavigate();
  const { isCharacterFavorite, addCharacter, removeCharacter } = useFavoritesStore();
  const isFavorite = isCharacterFavorite(character.url);
  const characterId = extractIdFromUrl(character.url);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeCharacter(character.url);
    } else {
      addCharacter(character.url);
    }
  };

  const handleCardClick = () => {
    navigate(`/characters/${characterId}`);
  };

  return (
    <Card hover onClick={handleCardClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{character.name}</CardTitle>
          <button
            onClick={handleFavoriteToggle}
            className="text-sw-gold hover:text-sw-gold/80 transition-colors"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-sw-gray/70">Height:</span>
            <span className="text-sw-gray">{character.height} cm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sw-gray/70">Mass:</span>
            <span className="text-sw-gray">{character.mass} kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sw-gray/70">Gender:</span>
            <span className="text-sw-gray capitalize">{character.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sw-gray/70">Birth Year:</span>
            <span className="text-sw-gold">{character.birth_year}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
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
