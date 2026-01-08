import { useParams, useNavigate } from 'react-router-dom';
import { useCharacter } from '../hooks/useCharacters';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { useFavoritesStore } from '../store/favoritesStore';

export const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: character, isLoading, isError, error } = useCharacter(id || '');
  const { isCharacterFavorite, addCharacter, removeCharacter } = useFavoritesStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !character) {
    return (
      <ErrorDisplay
        message={error instanceof Error ? error.message : 'Character not found'}
        onRetry={() => navigate('/')}
      />
    );
  }

  const isFavorite = isCharacterFavorite(character.url);

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        ← Back
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl mb-2">{character.name}</CardTitle>
              <p className="text-sw-gray/70">Character Details</p>
            </div>
            <button
              onClick={() => {
                if (isFavorite) {
                  removeCharacter(character.url);
                } else {
                  addCharacter(character.url);
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
              <h3 className="text-lg font-semibold text-sw-gold mb-4">Physical Attributes</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Height:</span>
                  <span className="text-sw-gray">{character.height} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Mass:</span>
                  <span className="text-sw-gray">{character.mass} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Hair Color:</span>
                  <span className="text-sw-gray capitalize">{character.hair_color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Skin Color:</span>
                  <span className="text-sw-gray capitalize">{character.skin_color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Eye Color:</span>
                  <span className="text-sw-gray capitalize">{character.eye_color}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sw-gold mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Birth Year:</span>
                  <span className="text-sw-gold">{character.birth_year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Gender:</span>
                  <span className="text-sw-gray capitalize">{character.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Films:</span>
                  <span className="text-sw-gray">{character.films.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Starships:</span>
                  <span className="text-sw-gray">{character.starships.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sw-gray/70">Vehicles:</span>
                  <span className="text-sw-gray">{character.vehicles.length}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
