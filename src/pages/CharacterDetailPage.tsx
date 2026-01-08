import { useParams, useNavigate } from 'react-router-dom';
import { useCharacter } from '../hooks/useCharacters';
import { useCharacterImage } from '../hooks/useCharacterImage';
import { useCharacterStory } from '../hooks/useCharacterStory';
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
  const {
    imageUrl,
    isLoading: isImageLoading,
    isError: isImageError,
    error: imageError,
    generateImage,
    isCached,
  } = useCharacterImage(character || null);

  const {
    story,
    isLoading: isStoryLoading,
    isError: isStoryError,
    error: storyError,
    generateStory,
    isCached: isStoryCached,
  } = useCharacterStory(character || null);

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
          {/* AI Generated Image Section */}
          {/* NOTE: Images are ONLY fetched from cache when page loads. Generation happens ONLY when user clicks "Generate Image" button. */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-sw-gold">AI Generated Image</h3>
              {!imageUrl && (
                <Button
                  onClick={generateImage}
                  disabled={isImageLoading}
                  variant="outline"
                  size="sm"
                >
                  {isImageLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Generating...
                    </>
                  ) : (
                    '✨ Generate Image'
                  )}
                </Button>
              )}
            </div>
            
            {/* Show loading state only when actively generating a new image */}
            {isImageLoading && !imageUrl && (
              <div className="flex items-center justify-center min-h-[300px] bg-sw-dark/50 rounded-lg border border-sw-gray/20">
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="mt-4 text-sw-gray/70">Generating animated image...</p>
                </div>
              </div>
            )}
            
            {/* Only show error if generation failed (not if cached image doesn't exist - that's normal) */}
            {isImageError && !imageUrl && imageError && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-400 text-sm">
                  {imageError instanceof Error ? imageError.message : 'Failed to generate image'}
                </p>
                <Button
                  onClick={generateImage}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            )}
            
            {/* Show cached image if available - no generation needed */}
            {imageUrl && (
              <div className="relative group">
                <div className="relative overflow-hidden rounded-lg border-2 border-sw-gold/30 hover:border-sw-gold/60 transition-all duration-300">
                  <img
                    src={imageUrl}
                    alt={`AI generated image of ${character.name}`}
                    className="w-full h-auto max-h-[500px] object-contain bg-sw-dark/50"
                  />
                  <div className="absolute top-2 right-2 bg-sw-dark/80 px-2 py-1 rounded text-xs text-sw-gold">
                    {isCached ? '📦 Cached' : '✨ Generated'}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-sw-gray/70">
                    AI-generated animated illustration
                  </p>
                  <Button
                    onClick={generateImage}
                    disabled={isImageLoading}
                    variant="ghost"
                    size="sm"
                  >
                    {isImageLoading ? 'Regenerating...' : '🔄 Regenerate'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* AI Generated Story Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-sw-gold">Character Story</h3>
              {!story && (
                <Button
                  onClick={generateStory}
                  disabled={isStoryLoading}
                  variant="outline"
                  size="sm"
                >
                  {isStoryLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Generating...
                    </>
                  ) : (
                    '📖 Generate Story'
                  )}
                </Button>
              )}
            </div>
            
            {/* Show loading state only when actively generating a new story */}
            {isStoryLoading && !story && (
              <div className="flex items-center justify-center min-h-[200px] bg-gradient-to-br from-sw-dark/60 via-sw-dark/40 to-sw-dark/60 rounded-xl border border-sw-gold/20 shadow-lg shadow-sw-gold/10">
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="mt-4 text-sw-gray/70 text-sm">Generating story...</p>
                </div>
              </div>
            )}
            
            {/* Only show error if generation failed (not if cached story doesn't exist - that's normal) */}
            {isStoryError && !story && storyError && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 shadow-lg">
                <p className="text-red-400 text-sm">
                  {storyError instanceof Error ? storyError.message : 'Failed to generate story'}
                </p>
                <Button
                  onClick={generateStory}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            )}
            
            {/* Show cached or generated story if available */}
            {story && (
              <div className="relative group">
                <div className="relative bg-gradient-to-br from-sw-dark/70 via-sw-dark/50 to-sw-dark/70 rounded-xl border border-sw-gold/20 hover:border-sw-gold/40 transition-all duration-300 shadow-xl shadow-sw-gold/5 hover:shadow-2xl hover:shadow-sw-gold/10 backdrop-blur-sm overflow-hidden">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-sw-gold/20 to-transparent rounded-tl-xl pointer-events-none z-0"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-sw-gold/10 to-transparent rounded-br-xl pointer-events-none z-0"></div>
                  
                  {/* Cached badge */}
                  <div className="absolute top-4 right-4 bg-sw-dark/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-sw-gold border border-sw-gold/30 shadow-lg z-20">
                    {isStoryCached ? '📦 Cached Story' : '✨ New Story'}
                  </div>
                  
                  {/* Story content with fixed height and scrollbar */}
                  <div className="relative z-10 h-[400px] overflow-y-auto px-8 pt-12 pb-4 story-scroll">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-sm sm:text-base text-sw-gray/90 leading-7 sm:leading-8 whitespace-pre-wrap font-light tracking-wide pr-2">
                        {story}
                      </p>
                    </div>
                  </div>
                  
                  {/* Footer with action - fixed at bottom */}
                  <div className="relative z-10 border-t border-sw-gold/10 bg-sw-dark/40 backdrop-blur-sm px-8 py-4 flex items-center justify-between rounded-b-xl">
                    <p className="text-xs text-sw-gray/60 italic">
                      AI-generated short story • {isStoryCached ? 'From cache' : 'Freshly generated'}
                    </p>
                    <Button
                      onClick={generateStory}
                      disabled={isStoryLoading}
                      variant="ghost"
                      size="sm"
                      className="text-xs text-sw-gray/70 hover:text-sw-gold transition-colors"
                    >
                      {isStoryLoading ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-1.5" />
                          Regenerating...
                        </>
                      ) : (
                        '🔄 Regenerate'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

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
